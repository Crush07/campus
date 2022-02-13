Page({
  data: {
    array: ['工业南门邮政快递', '淮北工业菜鸟驿站', '百世快递', '极兔快递'],
    time: '12:01',
    index: 0,
    userName:"",
    userPhone:"",
    address:"",
    help:"",
    remark:"",
  },

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
    if(!options.name){
      const db = wx.cloud.database()
      db.collection('address').where({
        _openid: that.data.openid,
        checked: true
      }).get({
        success: function(res) {
          for (var i = 0; i < res.data.length; i++) {
            that.setData({
              userName: res.data[0].userName,
              userPhone: res.data[0].userPhone,
              address: res.data[0].address,
            })
          }
        }
      })
    }else{
      that.setData({
        userName: options.name,
        userPhone: options.phone,
        address: options.address,
      })
    }
  },

  getGoodAddress: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  selectAddress:function(event){
    wx.navigateTo({
      url: '../myAddress/myAddress?type='+event.currentTarget.dataset.type,
    })
  },
  submitOrder:function(){
    var db=wx.cloud.database()
    db.collection("order").add({
      data: {
        userName:this.data.userName,
        userPhone: this.data.userPhone,
        getGoodAddress: this.data.array[this.data.index],
        toAddress: this.data.address,
        time: this.data.time,
        help: this.data.help,
        price:this.data.price,
        remark: this.data.remark,
        type:"errands"
      },
      success: res => {
        wx.showToast({
          title: '已提交成功!',
        })
      }
    })
    wx.switchTab({
      url: '../index/index',
    })
  }
})