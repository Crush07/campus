// miniprogram/pages/tesk/tesk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    errandsTesks:[],
    expressTesks:[],
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
    const db = wx.cloud.database()
    db.collection('order').where({
      _openid: that.data.openid,
      type: "errands"
    }).get({
      success: function(res) {
        for (var i = 0; i < res.data.length; i++) {
          var errandsTesks = that.data.errandsTesks;
          var obj = {
            id : res.data[i]._id,
            userName: res.data[i].userName,
            time: res.data[i].time,
            getGoodAddress: res.data[i].getGoodAddress, 
            toAddress: res.data[i].toAddress, 
            price: res.data[i].price, 
            state: res.data[i].state, 
          }
          errandsTesks.push(obj);
          that.setData({
            errandsTesks: errandsTesks
          })
        }
      }
    })

    
    db.collection('order').where({
      _openid: that.data.openid,
      type: "express"
    }).get({
      success: function(res) {
        var expressTesks = that.data.expressTesks;
        for (var i = 0; i < res.data.length; i++) {
          var obj = {
            id : res.data[i]._id,
            userName: res.data[i].userName,
            time: res.data[i].time,
            getGoodAddress: res.data[i].getGoodAddress, 
            toAddress: res.data[i].toAddress, 
            price: res.data[i].price, 
            state: res.data[i].state, 
          }
          expressTesks.push(obj);
        }
        console.log(expressTesks)
        that.setData({
          expressTesks: expressTesks
        })
      }
    })
    
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
  choose:function(event){
    wx.navigateTo({
      url: '../teskDetail/teskDetail?id='+event.currentTarget.dataset.id,
    })
  }
})