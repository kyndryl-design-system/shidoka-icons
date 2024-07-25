import { html } from 'lit';
import { useArgs } from '@storybook/preview-api';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import '@kyndryl-design-system/shidoka-foundation/components/card';
import '@kyndryl-design-system/shidoka-applications/components/reusable/textInput';
import '@kyndryl-design-system/shidoka-applications/components/reusable/dropdown';
import '@kyndryl-design-system/shidoka-applications/components/reusable/toggleButton';
// import Categories from '../manifest/categories.json';
import Icons from '../manifest/icons.json';

import amMono from '../svg/monochrome/32/access-management.svg';
import amDuo from '../svg/duotone/access-management.svg';
import copy from '../svg/monochrome/16/copy.svg';
import search from '../svg/monochrome/24/search.svg';

const sortIcons = (icons) => {
  // sort by name
  const sortedIcons = icons.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  // sort by category
  sortedIcons.sort(function (a, b) {
    return a.category.localeCompare(b.category);
  });

  return sortedIcons;
};

const copyCode = (icon) => {
  const code = icon.duotone
    ? `import iconName from '@kyndryl-design-system/shidoka-icons/svg/duotone/${icon.name}.svg'`
    : `import iconName from '@kyndryl-design-system/shidoka-icons/svg/monochrome/32/${icon.name}.svg'`;
  navigator.clipboard.writeText(code);
};

export default {
  title: 'Icons',
  parameters: {
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
  },
};

export const Library = {
  args: {
    icons: sortIcons(Icons),
    searchTerm: '',
    size: 32,
    duotone: true,
  },
  render: (args) => {
    let currentCategory;
    const [{ searchTerm, size }, updateArgs] = useArgs();

    const handleSearch = (e) => {
      updateArgs({ searchTerm: e.detail.value });

      const filteredIcons = Icons.filter((icon) => {
        let returnVal = false;

        if (
          icon.friendly_name
            .toLowerCase()
            .includes(e.detail.value.toLowerCase())
        ) {
          returnVal = true;
        } else {
          icon.aliases.forEach((alias) => {
            if (alias.toLowerCase().includes(e.detail.value.toLowerCase())) {
              returnVal = true;
            }
          });
        }

        return returnVal;
      });

      updateArgs({
        icons: sortIcons(filteredIcons),
      });
    };

    const handleSize = (e) => {
      updateArgs({ size: Number(e.detail.value) });
    };

    const handleDuotone = (e) => {
      updateArgs({ duotone: e.detail.checked });
    };

    return html`
      <div class="filters">
        <kyn-text-input
          placeholder="Search"
          .value=${searchTerm}
          @on-input=${(e) => handleSearch(e)}
        >
          Search
          <span slot="icon" class="search-icon"> ${unsafeSVG(search)} </span>
        </kyn-text-input>

        <kyn-dropdown @on-change=${(e) => handleSize(e)}>
          <span slot="label">Size</span>
          <kyn-dropdown-option value="16" ?selected=${size === 16}>
            16
          </kyn-dropdown-option>
          <kyn-dropdown-option value="20" ?selected=${size === 20}>
            20
          </kyn-dropdown-option>
          <kyn-dropdown-option value="24" ?selected=${size === 24}>
            24
          </kyn-dropdown-option>
          <kyn-dropdown-option value="32" ?selected=${size === 32}>
            32
          </kyn-dropdown-option>
        </kyn-dropdown>

        <kyn-toggle-button
          class="duotone-toggle"
          checked
          checkedtext="Visible"
          uncheckedtext="Hidden"
          @on-change=${(e) => handleDuotone(e)}
        >
          Duotone
        </kyn-toggle-button>
      </div>

      <div class="icons">
        ${args.icons.map((icon) => {
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

            <kd-card>
              <div class="icon">
                <div class="icon-name kd-type--ui-04">
                  ${icon.friendly_name}
                </div>

                <div class="svg">
                  ${icon.duotone && args.duotone
                    ? unsafeSVG(require(`../svg/duotone/${icon.name}.svg`))
                    : unsafeSVG(
                        require(`../svg/monochrome/${size}/${icon.name}.svg`)
                      )}
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
            </kd-card>
          `;
        })}
      </div>
    `;
  },
};

export const Monochrome = {
  args: {
    fill: 'currentColor',
  },
  render: (args) => {
    return html`
      <style>
        svg {
          fill: ${args.fill};
        }
      </style>

      ${unsafeSVG(amMono)}
    `;
  },
};

export const Duotone = {
  args: {
    primaryFill: '#29707A',
    secondaryFill: '#5FBEAC',
  },
  render: (args) => {
    return html`
      <style>
        svg .primary {
          fill: ${args.primaryFill};
        }
        svg .secondary {
          fill: ${args.secondaryFill};
        }
      </style>

      ${unsafeSVG(amDuo)}
    `;
  },
};
