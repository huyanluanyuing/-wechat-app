// pages/home/home.js
Page({

    data: {
        text: "欢迎来到海带相互监督室，在这里同学们呢可以查询考研四六级资料，寻找学习搭子，讨论学习与大学生活",
        step: 1, // 滚动速度
        distance: 360, // 初始滚动距离
        space: 300,
        interval: 20 // 时间间隔
      },
      onShow: function() {
        var that = this;
        var query = wx.createSelectorQuery();
        // 选择id
        query.select('#mjltest').boundingClientRect();
        query.exec(function(res) {
          var length = res[0].width;
          var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
          that.setData({
            length: length,
            windowWidth: windowWidth,
            space:windowWidth
          });
          that.scrollling(); // 第一个字消失后立即从右边出现
        });
      },
      scrollling: function() {
        var that = this;
        var length = that.data.length; // 滚动文字的宽度
        var windowWidth = that.data.windowWidth; // 屏幕宽度
        var interval = setInterval(function() {
          var maxscrollwidth = length + that.data.space;
          var left = that.data.distance;
          if (left < maxscrollwidth) { // 判断是否滚动到最大宽度
            that.setData({
              distance: left + that.data.step
            })
          } else {
            that.setData({
              distance: 0 // 直接重新滚动
            });
            clearInterval(interval);
            that.scrollling();
          }
        }, that.data.interval);
      },
    

    1(){
        wx.navigateTo({
          url: '/pages/1/1',
        })
    },
    2(){
        wx.navigateTo({
          url: '/pages/2/2',
        })
    },
    3(){
        wx.navigateTo({
          url: '/pages/3/3',
        })
    },
    4(){
        wx.navigateTo({
          url: '/pages/4/4',
        })
    },
    5(){
        wx.navigateTo({
            url: '/pages/5/5',
          })
    },
    button(){
        wx.navigateTo({
            url: '/pages/checkbox/checkbox',
          })
    },
    toshare(){
        wx.navigateTo({
          url: '/pages/share/share',
        })
    },
    tostudy(){
        wx.navigateTo({
          url: '/pages/partner/partner',
        })
    },


})