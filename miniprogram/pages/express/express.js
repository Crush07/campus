Page({
  data: {
    array: ['工业南门邮政快递', '淮北工业菜鸟驿站', '百世快递', '极兔快递'],
    time: '12:01',
    index: 0,
    bigGood: 0,
    midGood: 0,
    smallGood: 0,
    userName:"",
    userPhone:"",
    address:"",
    price: 0,
    info:"",
    remark:"",
    fileList:""
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
  plusBigGood:function(){
    this.setData({
      bigGood: this.data.bigGood+1,
      price: this.data.price + 500
    })
  },
  minusBigGood:function(){
    this.setData({
      bigGood: this.data.bigGood-1,
      price: this.data.price - 500
    })
  },
  plusMidGood:function(){
    this.setData({
      midGood: this.data.midGood+1,
      price: this.data.price + 300
    })
  },
  minusMidGood:function(){
    this.setData({
      midGood: this.data.midGood-1,
      price: this.data.price - 300
    })
  },
  plusSmallGood:function(){
    this.setData({
      smallGood: this.data.smallGood+1,
      price: this.data.price + 200
    })
  },
  minusSmallGood:function(){
    this.setData({
      smallGood: this.data.smallGood-1,
      price: this.data.price - 200
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
        bigGood: this.data.bigGood,
        midGood: this.data.midGood,
        smallGood: this.data.smallGood,
        time: this.data.time,
        info: this.data.info,
        price: this.data.price,
        remark: this.data.remark,
        type:"express",
        fileList:this.data.fileList
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
  },
  
  upload:function(){
    // let that = this;
    // 选择一张图片
    var uuidjs = require('../../utils/uuid.js');
    var filename = uuidjs.wxuuid()+".png";
    this.setData({
      fileList:filename
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        // that.uploadFile(tempFilePaths) 如果这里不是=>函数
        //则使用上面的that = this
        this.uploadFile(tempFilePaths,filename) 
      },
    })
  },
  uploadFile:function(filePath,filename) {
    wx.cloud.uploadFile({
      cloudPath: filename, // 文件名
      filePath: filePath, // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID)
      },
      fail: err => {
        // handle error
      }
    })
  }
})