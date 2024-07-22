import { html } from 'lit';
import { useArgs } from '@storybook/preview-api';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '@kyndryl-design-system/shidoka-foundation/components/card';
import '@kyndryl-design-system/shidoka-applications/components/reusable/search';
import Icons from '../manifest/icons.json';

export default {
  title: 'Icons',
};

export const Library = {
  args: {
    icons: Icons,
    searchTerm: '',
  },
  render: (args) => {
    const [{ searchTerm }, updateArgs] = useArgs();

    const handleInput = (e) => {
      // console.log(e.detail.value);
      updateArgs({ searchTerm: e.detail.value });
      updateArgs({
        icons: Icons.filter((icon) =>
          icon.friendly_name.toLowerCase().includes(e.detail.value.toLowerCase())
        ),
      });
    };

    return html`
      <kyn-search .value=${args.searchTerm} @on-input=${(e) => handleInput(e)}>Search</kyn-search>

      <div class="icons">
        ${args.icons.map((icon) => {
          return html`
            <kd-card>
              <div class="icon">
                <div class="icon-name kd-type--ui-04">${icon.friendly_name}</div>

                <div class="svg">
                  ${icon.duotone
                    ? unsafeHTML(require(`../svg/duotone/${icon.name}.svg`))
                    : unsafeHTML(require(`../svg/monochrome/32/${icon.name}.svg`))}
                </div>
              </div>
            </kd-card>
          `;
        })}
      </div>
    `;
  },
};
