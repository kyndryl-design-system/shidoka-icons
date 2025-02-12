import { html } from 'lit';
import { useArgs } from '@storybook/preview-api';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import '@kyndryl-design-system/shidoka-applications/components/reusable/card';
import '@kyndryl-design-system/shidoka-applications/components/reusable/textInput';
import '@kyndryl-design-system/shidoka-applications/components/reusable/dropdown';
import '@kyndryl-design-system/shidoka-applications/components/reusable/toggleButton';
import Icons from '../manifest/icons.json';

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

export default {
  title: 'Icon Library',
  parameters: {
    actions: {
      disable: true,
    },
  },
  argTypes: {
    icons: {
      table: {
        disable: true,
      },
    },
    searchTerm: {
      table: {
        disable: true,
      },
    },
    size: {
      options: [16, 20, 24, 32],
      control: { type: 'select' },
    },
  },
};

export const Monochrome = {
  args: {
    icons: sortIcons(Icons),
    searchTerm: '',
    size: 32,
    color: 'currentColor',
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

    const copyCode = (icon) => {
      const code = `import iconName from '@kyndryl-design-system/shidoka-icons/svg/monochrome/${args.size}/${icon.name}.svg'`;

      navigator.clipboard.writeText(code);
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
          caption=${args.icons.length + ' Icons'}
          .value=${searchTerm}
          @on-input=${(e) => handleSearch(e)}
        >
          Search
          <span slot="icon" class="search-icon"> ${unsafeSVG(search)} </span>
        </kyn-text-input>
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
                  ${unsafeSVG(
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

export const Duotone = {
  argTypes: {
    size: {
      options: [48, 64, 96],
      control: { type: 'select' },
    },
  },
  args: {
    size: 48,
    icons: sortIcons(Icons.filter((icon) => icon.duotone)),
    searchTerm: '',
    primaryColor: 'var(--kd-color-icon-duotone-primary)',
    secondaryColor: 'var(--kd-color-icon-duotone-secondary)',
  },
  render: (args) => {
    let currentCategory;
    const [{ searchTerm }, updateArgs] = useArgs();

    const handleSearch = (e) => {
      updateArgs({ searchTerm: e.detail.value });

      const filteredIcons = Icons.filter((icon) => {
        let returnVal = false;

        if (!icon.duotone) {
          return false;
        }

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

    const copyCode = (icon) => {
      const code = `import iconName from '@kyndryl-design-system/shidoka-icons/svg/duotone/${args.size}/${icon.name}.svg'`;

      navigator.clipboard.writeText(code);
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
          caption=${args.icons.length + ' Icons'}
          .value=${searchTerm}
          @on-input=${(e) => handleSearch(e)}
        >
          Search
          <span slot="icon" class="search-icon"> ${unsafeSVG(search)} </span>
        </kyn-text-input>
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
                  ${unsafeSVG(
                    require(`../svg/duotone/${args.size}/${icon.name}.svg`)
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
