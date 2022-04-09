// app.js
App({
  globalData: {
    userInfo: null,
    theme: ''
  },
  onLaunch: function () {
    try {
      const res = wx.getSystemInfoSync()
      this.globalData.theme = res.theme
    } catch (e) {
      console.log(e)
    }
  },
  onThemeChange (e) {
    console.log(e)
  }
})
