module.exports = {
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  babel: {
    presets: [
      [
        '@emotion/babel-preset-css-prop',
        {
          autoLabel: 'dev-only',
          labelFormat: '[local]',
          useBuiltIns: false,
          throwIfNamespace: true,
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '~': './src',
          },
        },
      ],
    ],
  },
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: 'javascript/auto',
            test: /\.mjs$/,
            include: /node_modules/,
          },
        ],
      },
    },
  },
};
