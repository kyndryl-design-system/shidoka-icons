import { html } from 'lit';
import { useArgs } from '@storybook/preview-api';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import '@kyndryl-design-system/shidoka-foundation/components/card';
import '@kyndryl-design-system/shidoka-applications/components/reusable/search';
// import Categories from '../manifest/categories.json';
import Icons from '../manifest/icons.json';

import amMono from '../svg/monochrome/32/access-management.svg';
import amDuo from '../svg/duotone/access-management.svg';

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
  title: 'Icons',
};

export const Library = {
  args: {
    icons: sortIcons(Icons),
    searchTerm: '',
  },
  render: (args) => {
    let currentCategory;
    const [{ searchTerm }, updateArgs] = useArgs();

    const handleSearch = (e) => {
      updateArgs({ searchTerm: e.detail.value });

      const filteredIcons = Icons.filter((icon) => {
        let returnVal = false;

        if (icon.friendly_name.toLowerCase().includes(e.detail.value.toLowerCase())) {
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

    return html`
      <kyn-search .value=${searchTerm} @on-input=${(e) => handleSearch(e)}>Search</kyn-search>

      <div class="icons">
        ${args.icons.map((icon) => {
          let renderCategory = false;

          if (currentCategory !== icon.category) {
            currentCategory = icon.category;
            renderCategory = true;
          }

          return html`
            ${renderCategory
              ? html` <div class="category-name kd-type--headline-08">${icon.category}</div> `
              : null}

            <kd-card>
              <div class="icon">
                <div class="icon-name kd-type--ui-04">${icon.friendly_name}</div>

                <div class="svg">
                  ${icon.duotone
                    ? unsafeSVG(require(`../svg/duotone/${icon.name}.svg`))
                    : unsafeSVG(require(`../svg/monochrome/32/${icon.name}.svg`))}
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
