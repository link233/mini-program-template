// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    theme: ''
  },
  onLoad () {
    this.setData({
      theme: app.globalData.theme
    })
  }
})
