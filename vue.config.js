const { APP_NAME } = require('./package.json').name
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   port: process.env.VUE_APP_PORT,
  //   allowedHosts: 'all',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // },
  configureWebpack: {
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: `${APP_NAME}-[name]`,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_微应用名称 即可
      chunkLoadingGlobal: `webpackJsonp_${APP_NAME}`,
    },
  },
})
