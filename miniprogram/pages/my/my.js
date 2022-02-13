// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"请上传图片",
    name:"请输入姓名",
    phone:"请输入手机号"
  },

  login:function(){
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        debugger
        console.log('[云函数] [login] user openid: ', res.result.openid)
        wx.cloud.database().collection('test').add({
          data: {
            userId:res.result.openid
          }
        }).then((res) => {
          console.log(res)//返回的res里面有_id的值，这个_id是系统自动生成的。
        }).catch(err=>{
          console.log(err)
        })
      },
      fail: err => {
      console.error('[云函数] [login] 调用失败', err)
      }
    })
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

  }
})