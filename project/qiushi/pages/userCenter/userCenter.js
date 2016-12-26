var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      name:'-',
      answerNum:'-',
      questionNum:'-',
      focusNum:'-'
    }
  },
  onLoad(){
    var self = this;
    var appInstance = getApp();
    var targetUrl = appInstance.globalData.targetUrl;
    var url = targetUrl + 'professional/' + wx.getStorageSync('userId');
    util.getData(url,{},function(result){
      console.log(result)
      self.setData({userInfo:result.data})
    })
  }
})