// miniprogram/pages/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    phone:"",
    address:"",
    detailedAddress:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    
    var db=wx.cloud.database()
    db.collection("address").add({
      data: {
        userName:this.data.name,
        userPhone: this.data.phone,
        address: this.data.address,
        checked:false
      },
      success: res => {
        wx.showToast({
          title: '已提交成功!',
        })
      }
    })
    wx.navigateTo({
      url: '../myAddress/myAddress',
    })
  }
})