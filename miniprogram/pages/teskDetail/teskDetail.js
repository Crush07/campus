// miniprogram/pages/teskDetail/teskDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        that.setData({
          openid:res.result.openid
        })
      }
    })
    if(options.id){
      const db = wx.cloud.database()
      db.collection('order').where({
        _openid: that.data.openid,
        _id: options.id
      }).get({
        success: function(res) {
          for (var i = 0; i < res.data.length; i++) {
            that.setData({
              id: res.data[0]._id,
              userName: res.data[0].userName,
              type: res.data[0].type,
              price: res.data[0].price,
              getGoodAddress: res.data[0].getGoodAddress,
              toAddress: res.data[0].toAddress,
              info: res.data[0].info,
              time: res.data[0].time,
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getTesk:function(){	
    var that = this;
    const db = wx.cloud.database();
    /**
    * 更新集合counters中的数据
    */
    db.collection('order').doc(this.data.id).update({
      data:{
        state:1,
        master:that.data.openid
      }
    }).then(res=>{
      console.log(res)
    })
  }
})