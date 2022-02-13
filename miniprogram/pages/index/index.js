
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  apply:function(){
    wx.navigateTo({
      url: '../apply/apply',
    })
  },
  express:function(){
    wx.navigateTo({
      url: '../express/express',
    })
  },
  errands:function(){
    wx.navigateTo({
      url: '../errands/errands',
    })
  },
  selfHelp:function(){
    wx.navigateTo({
      url: '../selfHelp/selfHelp',
    })
  },
  myOrders:function(){
    wx.navigateTo({
      url: '../myOrders/myOrders',
    })
  },

  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 3000,
    active: 0,
  }

})