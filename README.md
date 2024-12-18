# Shidoka Icons

## Contributing

Read the [Contributing Guide](CONTRIBUTING.md) here.

## Usage

### Install

```bash
npm install -S @kyndryl-design-system/shidoka-icons @kyndryl-design-system/shidoka-foundation
```

### Set up an SVG Inline Loader

Below is a list of links to some loaders that should work for most projects:

Generic loaders:

- [Vite SVG Loader](https://www.npmjs.com/package/vite-svg-loader)
- [Webpack SVG Inline Loader](https://www.npmjs.com/package/svg-inline-loader)
- [Rollup Plugin SVG](https://www.npmjs.com/package/rollup-plugin-svg)

React [SVGR](https://react-svgr.com/) loaders:

- [Vite Plugin SVGR](https://www.npmjs.com/package/vite-plugin-svgr)
- [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack)
- [@svgr/rollup](https://www.npmjs.com/package/@svgr/rollup)

Angular loaders:

- [Angular SVG Icon](https://www.npmjs.com/package/angular-svg-icon)

### Import an Icon

_Example only, refer to loader documentation._

```js
// monochrome. 4 sizes available: 16, 20, 24, 32
import iconName from '@kyndryl-design-system/shidoka-icons/svg/monochrome/32/<icon-name>.svg';

// duotone. one size available (48)
import iconName from '@kyndryl-design-system/shidoka-icons/svg/duotone/<icon-name>.svg';
```

### Render the Icon

_Example for Lit, refer to loader/framework documentation._

```html
<div>${iconName}</div>
```

### Customize the icon

#### Monochrome Fill

Monochrome icons use `fill="currentColor"` by default, so they will inherit the CSS text color. You can override this by specifying a CSS `fill` on the SVG element. Example:

```css
svg {
  fill: red;
}
```

#### Duotone Fill

Duotone icons have two layers, `primary` and `secondary`, and default colors of Primary `#29707A` and Secondary `#5FBEAC`. These can be customized by changing the fill color of each layer. Example:

```css
svg .primary {
  fill: red;
}

svg .secondary {
  fill: blue;
}
```

#### Icon Size

Generally you should import the icon of the size you need. Since they are vectors, if needed they will scale to any size via CSS override. Example:

```css
svg {
  width: 128px;
  height: 128px;
}
```
