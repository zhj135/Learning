//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    questionList:{},
    totalPages:3
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(){
    var that = this;
    wx.request({
    url: 'https://www.opt.com.cn/allSquareQuest/',
    data:{
      state: 0
    },
    header:{ 
      'content-type': 'application/json'
    },
    method:"GET",
    success:function(result){
      console.log(result)
      that.setData({questionList:result.data.questionList,totalPage:result.totalPage})
    },
    // complete:function(result){
    //   console.log(result)
    // }
  })
  }
})
