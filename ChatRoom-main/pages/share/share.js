// pages/study/study.js
const db = wx.cloud.database()
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      dataObj:"",
      like:0
    },
   
    like:function(e){
        console.log(e.currentTarget.dataset.id);//获得点赞文本的_id
        var that=this;
        const _ = db.command
        db.collection('board').doc(e.currentTarget.dataset.id).update({
            data: {
              
              like:_.inc(1)

            },
          
        })
        
    },

    update(e){

    },


    formSubmit:function(e){
        var that=this;
        var date=new Date();//新建日期对象
        var year=date.getFullYear()//获取留言时间
        var month=date.getMonth() + 1
        var day=date.getDate()
        var hour=date.getHours()
        var minute=date.getMinutes()
        var second=date.getSeconds()
        var time=year+"-"+month+"-"+ day+"  "+ " "+hour +":" +minute
        var random= "用户"+Math.floor(Math.random()*89999 + 1000) //每个留言用户随机生成五位数字
        var liuyantext=e.detail.value.liuyantext; //留言框内容
        //文本检测
        wx.cloud.callFunction({
            name:'ContentCheck',
            data:{
                txt:liuyantext
            },
            success(res){
                console.log(that.data.like)
                if(res.result.errCode==0){
                    db.collection("board").add({//将信息存入数据库
                        data:{
                            random:random,//用户名称
                            time:time,//时间
                            content:liuyantext,//留言框内容
                            like:that.data.like,
                            id:12
                        }
                    })
                    wx.showToast({//弹出留言成功弹窗
                        title:'已留言',
                        icon:"success",
                    });
                }else{

                }

            },fail(err){
                console.log('ContentCheck-err',err)
                wx.showToast({
                    icon:'error',
                    title:'文字违规'

                })
            }

        })
       
                 
        
    },







    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        db.collection("board").get({//从数据库提取信息
            success:res=>{//成功
                this.setData({ //变量渲染到视图层
                    dataObj:res.data
                })
                console.log(res)
            }
        })
        
    
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    //读出用户信息
    onReady: function() {
        
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
    //下拉刷新
    onPullDownRefresh: function() {
        db.collection("board").get({
            success:res=>{
                this.setData({
                    dataObj:res.data
                })
            }
        })

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