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
        '@config': './src/main/config',
        '@models': './src/main/models',
        '@controllers': './src/main/controllers',
        '@views': './src/main/views'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
