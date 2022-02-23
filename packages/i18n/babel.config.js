const { babelConfig } = require('@ttoss/config');

module.exports = babelConfig({
  plugins: [
    [
      'formatjs',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        ast: true,
      },
    ],
  ],
});
