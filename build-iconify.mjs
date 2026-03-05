import {
  importDirectory,
  cleanupSVG,
  runSVGO,
  parseColors,
  isEmptyColor,
} from '@iconify/tools';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, 'dist');

const monochromeSizes = [16, 20, 24, 32];
const duotoneSizes = [48, 64, 96];

/**
 * Build an Iconify JSON file for a set of SVGs.
 * @param {string} srcDir - Directory containing SVGs
 * @param {string} outputName - Output filename (without .json)
 * @param {object} options
 * @param {boolean} options.monotone - Whether to replace colors with currentColor
 * @param {string} options.prefix - Iconify prefix for the icon set
 */
async function buildIconSet(
  srcDir,
  outputName,
  { monotone = false, prefix } = {}
) {
  const iconSet = await importDirectory(srcDir, { prefix });

  await iconSet.forEach(async (name) => {
    const svg = iconSet.toSVG(name);
    if (!svg) {
      iconSet.remove(name);
      return;
    }

    try {
      await cleanupSVG(svg);

      if (monotone) {
        await parseColors(svg, {
          defaultColor: 'currentColor',
          callback: (attr, colorStr, color) => {
            if (colorStr === 'currentColor') {
              return 'currentColor';
            }
            if (isEmptyColor(color)) {
              return color;
            }
            return 'currentColor';
          },
        });
      }

      await runSVGO(svg);
    } catch (err) {
      console.error(`Error processing icon "${name}" in ${outputName}:`, err);
      iconSet.remove(name);
      return;
    }

    iconSet.fromSVG(name, svg);
  });

  const exported = iconSet.export();

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  const outPath = join(outDir, `${outputName}.json`);
  writeFileSync(outPath, JSON.stringify(exported, null, 2));

  console.log(`Exported ${iconSet.count()} icons to ${outPath}`);
  return { name: outputName, count: iconSet.count() };
}

async function build() {
  const results = [];

  // Monochrome icons — source from src/svg, replace colors with currentColor
  for (const size of monochromeSizes) {
    const srcDir = resolve(__dirname, `src/svg/monochrome/${size}`);
    const result = await buildIconSet(srcDir, `monochrome-${size}`, {
      monotone: true,
      prefix: `kd-mono-${size}`,
    });
    results.push(result);
  }

  // Duotone icons — source from dist/svg (post-processed with CSS custom properties)
  for (const size of duotoneSizes) {
    const srcDir = resolve(__dirname, `dist/svg/duotone/${size}`);
    const result = await buildIconSet(srcDir, `duotone-${size}`, {
      monotone: false,
      prefix: `kd-duo-${size}`,
    });
    results.push(result);
  }

  // Generate index.js that re-exports all JSON files
  const imports = results
    .map(
      (r) =>
        `import ${r.name.replace('-', '')} from './${r.name}.json' with { type: 'json' };`
    )
    .join('\n');

  const exportNames = results.map((r) => r.name.replace('-', '')).join(', ');

  const indexContent = `${imports}\n\nexport { ${exportNames} };\nexport default { ${exportNames} };\n`;

  const indexPath = join(outDir, 'index.js');
  writeFileSync(indexPath, indexContent);

  console.log(`\nGenerated ${indexPath}`);
  console.log(
    `Total: ${results.reduce((sum, r) => sum + r.count, 0)} icons across ${results.length} sets`
  );
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
