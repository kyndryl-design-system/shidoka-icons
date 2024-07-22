import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '@kyndryl-design-system/shidoka-foundation/components/card';
import Categories from '../manifest/categories.json';
import Icons from '../manifest/icons.json';

export default {
  title: 'Icons',
};

export const Library = {
  render: () => {
    return html`
      <div class="categories">
        ${Categories.map((Category) => {
          return html`
            <div class="category">
              <div class="category-name kd-type--headline-08">${Category.name}</div>
              <div class="icons">
                ${Category.members.map((Member) => {
                  const Icon = Icons.find((icon) => icon.name === Member);
                  return html`
                    <kd-card>
                      <div class="icon">
                        <div class="icon-name kd-type--ui-05">${Icon.friendly_name}</div>
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
            </div>
          `;
        })}
      </div>
    `;
  },
};
