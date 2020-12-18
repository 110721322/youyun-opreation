module.exports = {
  presets: [
    '@vue/app',
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'entry'
    }]
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "youyun-vue-components",
        style: (name) => {
          return `youyun-vue-components/lib/${name.slice(name.lastIndexOf('/') + 1, name.lastIndexOf('.'))}/style.css`
        },
        customName: (name) => {
          return `youyun-vue-components/lib/${name}/index.js`
        }
      }
    ]
  ]
}
