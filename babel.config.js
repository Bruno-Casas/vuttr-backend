module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/app/controllers',
        '@middlewares': './src/app/middlewares',
        '@services': './src/app/services',
        '@entities': './src/app/entities',
        '@routes': './src/app/routes',
        '@specs/errors': './src/app/specs/errors',
        '@specs/interfaces': './src/app/specs/interfaces',
        '@specs/maps': './src/app/specs/maps',
        '@config': './src/config'
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
  ignore: [
    './src/tests'
  ],
}
