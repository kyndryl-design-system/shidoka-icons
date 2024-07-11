module.exports = {
  plugins: [
    {
      name: 'removeAttrs',
      params: {
        attrs: 'path:fill',
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: 'svg:fill',
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: ['fill="currentColor"'],
      },
    },
  ],
};
