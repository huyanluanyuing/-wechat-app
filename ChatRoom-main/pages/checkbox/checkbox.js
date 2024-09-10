// pages/checkbox/checkbox.js
const app = getApp()
const db = wx.cloud.database()
Page({
    /**
     * 页面的初始数据
     */
    data: {
    text1:"",
    text2:"",
    text3:"",
    check1: false ,
    check2: false ,
    check3: false ,
    i:1,
    checklist:[],
    },

    change:function(data){
        //console.log(data.detail.value)
        var that=this;
        var char1="1"
        var char2="2"
        var char3="3"
         var c=[0,0,0]
        that.checklist=data.detail.value
        console.log(that.checklist)
        for(var a=0, lenA=that.checklist.length; a<lenA; a++)
        {
            if(this.checklist[a]==char1)
            {
                that.setData({
                check1:true
             })  
             c[0]=1          
            } 
            else if(this.checklist[a]==char2){
            that.setData({
                check2:true
            })
            c[1]=1
        }
            else if(this.checklist[a]==char3){
            that.setData({
                check3:true
            })
            c[2]=1
        }
    }

       if(c[0]==0){
           that.setData({
               check1:false
           })
       }



           if(c[1]==0){
           that.setData({
            check2:false
           })
       }
       if(c[2]==0){
        that.setData({
            check3:false
        })
        }

        that.setData({
            checklist:data.detail.value
        })
        console.log("1"+that.data.check1)
        console.log("2"+that.data.check2)
        console.log("3"+that.data.check3)
        db.collection('chat_user').doc(app.globalData.userInfo._id).update({
            // data 传入需要局部更新的数据
            data: {
                check1: that.data.check1,
                check2: that.data.check2,
                check3: that.data.check3,
            }, success: function(res) {
                console.log('复选框改变')
              }
          })
          
    },


    text1(e){
        this.setData({
           text1: e.detail.value
        })
    },

    text2(e){
        this.setData({
           text2: e.detail.value
        })
    },
    text3(e){
        this.setData({
           text3: e.detail.value
        })
    },

reset(e){
    var that=this;
    that.setData({
        i:0,
    })

    db.collection('chat_user').doc(app.globalData.userInfo._id).update({
        // data 传入需要局部更新的数据
        data: {
            check1: false,
            check2: false,
            check3: false,  
        }, success: function(res) {
            console.log('复选框清零')
          }
      })
      that.setData({
          check1:false,
          check2:false,
          check3:false,
      })
},


    button(e)//设置每日计划
    {
        var that=this;//查找_id
        that.setData({
            i:1
        })
         db.collection('chat_user').where({
            account_id:app.globalData.userInfo.account_id
          }).get().then(res => {
            console.log(app.globalData.userInfo._id)   
          })
          const _ = db.command//更新数据
          db.collection('chat_user').doc(app.globalData.userInfo._id).update({
            // data 传入需要局部更新的数据
            data: {
                text1: that.data.text1,
                text2: that.data.text2,
                text3: that.data.text3,
                check1: that.data.check1,
                check2: that.data.check2,
                check3: that.data.check3,
            }, success: function(res) {
                console.log('更新成功')
              }
          })
//设置数据
        db.collection('chat_user').doc(app.globalData.userInfo._id).get().then(res => {
            // res.data 包含该记录的数据
            console.log(res.data)
            that.setData({
                text1: res.data.text1,
                text2: res.data.text2,
                text3: res.data.text3,
                check1:res.data.check1,
                check2:res.data.check2,
                check3:res.data.check3,
            })
          })
          

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this
        db.collection('chat_user').doc(app.globalData.userInfo._id).get().then(res => {
            // res.data 包含该记录的数据
            console.log(res.data)
            that.setData({
                text1: res.data.text1,
                text2: res.data.text2,
                text3: res.data.text3,
                check1: res.data.check1,
                check2: res.data.check2,
                check3: res.data.check3,
            })
          })
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        var that=this
        that.onLoad()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        var that=this
        that.onLoad()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})