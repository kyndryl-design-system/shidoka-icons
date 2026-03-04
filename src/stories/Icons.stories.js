import { html } from 'lit';
import { useArgs, useEffect } from 'storybook/preview-api';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import { repeat } from 'lit-html/directives/repeat.js';
import copyToClipboard from 'copy-to-clipboard';
import '@kyndryl-design-system/shidoka-applications/components/reusable/card';
import '@kyndryl-design-system/shidoka-applications/components/reusable/textInput';
import '@kyndryl-design-system/shidoka-applications/components/reusable/dropdown';
import '@kyndryl-design-system/shidoka-applications/components/reusable/toggleButton';
import '@kyndryl-design-system/shidoka-applications/components/reusable/loaders';
import Icons from '../manifest/icons.json';

import copy from '../svg/monochrome/16/copy.svg?raw';
import search from '../svg/monochrome/24/search.svg?raw';

// --- Performance: SVG cache keyed by "type/size" ---
const svgCache = new Map();

export default {
  title: 'Icon Library',
  parameters: {
    actions: {
      disable: true,
    },
  },
  argTypes: {
    searchTerm: {
      table: {
        disable: true,
      },
    },
    size: {
      options: [16, 20, 24, 32],
      control: { type: 'select' },
    },
    svgs: {
      table: {
        disable: true,
      },
    },
    loaded: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
  decorators: [
    (story) => html`
      <style>
        kyn-card {
          visibility: hidden;

          &.visible {
            visibility: visible;
          }
        }
      </style>
      ${story()}
    `,
  ],
};

async function getIconFiles(size = 32, type = 'monochrome') {
  const cacheKey = `${type}/${size}`;
  if (svgCache.has(cacheKey)) {
    return svgCache.get(cacheKey);
  }

  const svgs = {};
  const icons = Icons.filter((icon) =>
    type === 'duotone' ? icon.duotone : true
  );

  await Promise.all(
    icons.map(async (icon) => {
      const svg = await import(`../svg/${type}/${size}/${icon.name}.svg?raw`);
      svgs[icon.name] = svg.default;
    })
  );

  svgCache.set(cacheKey, svgs);
  return svgs;
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // in viewport
        entry.target.classList.add('visible');
      } else {
        // out of viewport
        entry.target.classList.remove('visible');
      }
    });
  },
  {
    threshold: 0,
  }
);

const startObserving = () => {
  observer.disconnect();
  document.querySelectorAll('kyn-card').forEach((element) => {
    observer.observe(element);
  });
  console.log(document.querySelectorAll('kyn-card'));
};

const sortIcons = (icons) => {
  return [...icons].sort(
    (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );
};

// Pre-sort once at module level
const sortedAllIcons = sortIcons(Icons);
const sortedDuotoneIcons = sortIcons(Icons.filter((icon) => icon.duotone));

// Pre-build lowercase search index so filtering never re-lowercases strings
Icons.forEach((icon) => {
  icon._searchText = [icon.friendly_name, ...(icon.aliases || [])]
    .join('\0')
    .toLowerCase();
});
export const Monochrome = {
  args: {
    searchTerm: '',
    size: 32,
    color: 'currentColor',
    svgs: {},
    loaded: false,
  },
  render: (args) => {
    let currentCategory;
    const [{ searchTerm, size, svgs }, updateArgs] = useArgs();

    useEffect(() => {
      updateArgs({ loaded: false });

      getIconFiles(size, 'monochrome').then((result) => {
        updateArgs({ svgs: result, loaded: true });
      });
    }, [size]);

    const currentIcons = searchTerm
      ? sortedAllIcons.filter((icon) =>
          icon._searchText.includes(searchTerm.toLowerCase())
        )
      : sortedAllIcons;

    useEffect(() => {
      startObserving();
    }, [searchTerm]);

    const handleSearch = (e) => {
      updateArgs({ searchTerm: e.detail.value });
    };

    const copyCode = (icon) => {
      const code = `import iconName from '@kyndryl-design-system/shidoka-icons/svg/monochrome/${args.size}/${icon.name}.svg'`;
      copyToClipboard(code);
    };

    return html`
      <style>
        .icons .svg {
          color: ${args.color};
        }
      </style>

      <div class="filters">
        <div class="kd-type--headline-05">Monochrome</div>

        <kyn-text-input
          hideLabel
          placeholder="Search"
          caption=${currentIcons.length + ' Icons'}
          .value=${searchTerm}
          @on-input=${(e) => handleSearch(e)}
        >
          Search
          <span slot="icon" class="search-icon"> ${unsafeSVG(search)} </span>
        </kyn-text-input>
      </div>

      <div class="monochrome icons">
        ${repeat(
          currentIcons,
          (icon) => icon.name,
          (icon) => {
            let renderCategory = false;

            if (currentCategory !== icon.category) {
              currentCategory = icon.category;
              renderCategory = true;
            }

            return html`
              ${renderCategory
                ? html`
                    <div class="category-name kd-type--headline-08">
                      ${icon.category}
                    </div>
                  `
                : null}

              <kyn-card>
                <div class="icon">
                  <div class="icon-name kd-type--ui-04">
                    ${icon.friendly_name}
                  </div>

                  <div class="svg">
                    ${args.loaded
                      ? unsafeSVG(svgs[icon.name])
                      : html`
                          <kyn-skeleton
                            width="${args.size}px"
                            height="${args.size}px"
                          ></kyn-skeleton>
                        `}
                  </div>

                  <div class="icon-path kd-type--ui-03">
                    ${icon.name}

                    <button
                      class="copy-code"
                      title="Copy import path"
                      @click=${() => copyCode(icon)}
                    >
                      ${unsafeSVG(copy)}
                    </button>
                  </div>
                </div>
              </kyn-card>
            `;
          }
        )}
      </div>
    `;
  },
};

export const Duotone = {
  argTypes: {
    size: {
      options: [48, 64, 96],
      control: { type: 'select' },
    },
  },
  args: {
    size: 48,
    searchTerm: '',
    primaryColor: 'var(--kd-color-icon-duotone-primary)',
    secondaryColor: 'var(--kd-color-icon-duotone-secondary)',
    svgs: {},
    loaded: false,
  },
  render: (args) => {
    let currentCategory;
    const [{ searchTerm, size, svgs }, updateArgs] = useArgs();

    useEffect(() => {
      updateArgs({ loaded: false });

      getIconFiles(size, 'duotone').then((result) => {
        updateArgs({ svgs: result, loaded: true });
      });
    }, [size]);

    const currentIcons = searchTerm
      ? sortedDuotoneIcons.filter((icon) =>
          icon._searchText.includes(searchTerm.toLowerCase())
        )
      : sortedDuotoneIcons;

    useEffect(() => {
      startObserving();
    }, [searchTerm]);

    const handleSearch = (e) => {
      updateArgs({ searchTerm: e.detail.value });
    };

    const copyCode = (icon) => {
      const code = `import iconName from '@kyndryl-design-system/shidoka-icons/svg/duotone/${args.size}/${icon.name}.svg'`;
      copyToClipboard(code);
    };

    return html`
      <style>
        .icons svg .primary {
          fill: ${args.primaryColor};
        }

        .icons svg .secondary {
          fill: ${args.secondaryColor};
        }
      </style>

      <div class="filters">
        <div class="kd-type--headline-05">Duotone</div>

        <kyn-text-input
          hideLabel
          placeholder="Search"
          caption=${currentIcons.length + ' Icons'}
          .value=${searchTerm}
          @on-input=${(e) => handleSearch(e)}
        >
          Search
          <span slot="icon" class="search-icon"> ${unsafeSVG(search)} </span>
        </kyn-text-input>
      </div>

      <div class="icons duotone">
        ${repeat(
          currentIcons,
          (icon) => icon.name,
          (icon) => {
            let renderCategory = false;

            if (currentCategory !== icon.category) {
              currentCategory = icon.category;
              renderCategory = true;
            }

            return html`
              ${renderCategory
                ? html`
                    <div class="category-name kd-type--headline-08">
                      ${icon.category}
                    </div>
                  `
                : null}

              <kyn-card>
                <div class="icon">
                  <div class="icon-name kd-type--ui-04">
                    ${icon.friendly_name}
                  </div>

                  <div class="svg">
                    ${args.loaded
                      ? unsafeSVG(svgs[icon.name])
                      : html`
                          <kyn-skeleton
                            width="${args.size}px"
                            height="${args.size}px"
                          ></kyn-skeleton>
                        `}
                  </div>

                  <div class="icon-path kd-type--ui-03">
                    ${icon.name}

                    <button
                      class="copy-code"
                      title="Copy import path"
                      @click=${() => copyCode(icon)}
                    >
                      ${unsafeSVG(copy)}
                    </button>
                  </div>
                </div>
              </kyn-card>
            `;
          }
        )}
      </div>
    `;
  },
};
