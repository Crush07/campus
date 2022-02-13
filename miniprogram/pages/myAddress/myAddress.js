// miniprogram/pages/myAddress/myAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    addressCard:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    that.setData({
      type: options.type
    })
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
    db.collection('address').where({
      _openid: that.data.openid
    }).get({
      success: function(res) {
        for (var i = 0; i < res.data.length; i++) {
          var addressCard = that.data.addressCard;
          var obj = {
            userName: res.data[i].userName,
            userPhone: res.data[i].userPhone, 
            address: res.data[i].address, 
            checked: res.data[i].checked, 
          }
          addressCard.push(obj);
          that.setData({
            addressCard: addressCard
          })
        }
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
  add:function(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  choose:function(event){
    if(this.data.type == "express"){
      wx.navigateTo({
        url: '../express/express?name='+event.currentTarget.dataset.name+'&phone='+event.currentTarget.dataset.phone+'&address='+event.currentTarget.dataset.address,
      })
    }else if(this.data.type == "errands"){
      wx.navigateTo({
        url: '../errands/errands?name='+event.currentTarget.dataset.name+'&phone='+event.currentTarget.dataset.phone+'&address='+event.currentTarget.dataset.address,
      })
    }
        
  }
})