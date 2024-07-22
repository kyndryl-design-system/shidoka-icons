import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '@kyndryl-design-system/shidoka-foundation/components/card';
import Icons from '../manifest/icons.json';

export default {
  title: 'Icons',
};

export const Library = {
  render: () => {
    return html`
      <div class="icons">
        ${Icons.map((Icon) => {
          return html`
            <kd-card>
              <div class="icon">
                <div class="icon-name kd-type--ui-04">${Icon.friendly_name}</div>

                <div class="svg">
                  ${Icon.duotone
                    ? unsafeHTML(require(`../svg/duotone/${Icon.name}.svg`))
                    : unsafeHTML(require(`../svg/monochrome/32/${Icon.name}.svg`))}
                </div>
              </div>
            </kd-card>
          `;
        })}
      </div>
    `;
  },
};
