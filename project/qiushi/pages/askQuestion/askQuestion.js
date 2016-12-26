var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    question:'',
    reward:100,
    time:3,
    arrayReward: ['100', '200', '300', '400'],
    indexReward: 0,
    arrayTime: ['3h', '6h', '12h', '24h'],
    indexTime: 0,
  },
  sendQuestion:function(){
    var time = parseInt(this.data.arrayTime[this.data.indexTime])
    var reward = this.data.arrayReward[this.data.indexReward]
    var content = this.data.question.trim();
    try {
      var userId = wx.getStorageSync('userId')
      if (userId) {
        console.log(userId,content,reward,time)
          util.postData('https://www.opt.com.cn/squareQuestion/',{from:userId,question:content,reward:reward,duration:time},function(){
            wx.showModal({
              title: '提示',
              content: '提问成功',
              showCancel:false,
              success: function(res) {
                if (res.confirm) {
                  // wx.navigateTo({url:'/pages/index/index'})
                  wx.navigateBack();
                }
              }
            })
          })
        }
    } catch (e) {
      console.log('获取用户信息失败',e)
    }
    

    wx.showModal({
      title: '提示',
      content: '问题提交中，请稍候',
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
          // wx.navigateTo({url:'/pages/index/index'})
          wx.navigateBack();
        }
      }
    })
  },
  textareaBlur:function(e){
    this.setData({question:e.detail.value})
  },
  pickerRewardChange:function(e){
    this.setData({indexReward:e.detail.value})
  },
  pickerTimeChange:function(e){
    this.setData({indexTime:e.detail.value})
  }
})