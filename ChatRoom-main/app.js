// app.js
App({
  onLaunch() {
    
    wx.cloud.init({
      env:"cloud1-8gihbfn3a440af60"
    })
    if(wx.getStorageSync('userInfo')){
      this.globalData.userInfo = wx.getStorageSync('userInfo')
      console.log('get storage')
    }
  },
  globalData: {
    userInfo: null
  }
})
