//index.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    questionList:{},
    totalPages:3,
    state:0
  },
  onLoad: function(){
    var that = this;
    wx.setStorage({
      key:"userId",
      data:"57a7ffb64fe7f46f7d144305"
    });
    util.getData(
      'https://www.opt.com.cn/allSquareQuest/',
      {state:0},
      function(result){
        that.setData({questionList:result.data.questionList,totalPage:result.totalPage})
      }
    )
  },
  toRewardProtocol:function(){
    wx.showModal({
      title: '悬赏规则',
      content: '细则',
      confirmText:'我知道了',
      showCancel:false
    })
  },
  toSolved:function(){
    this.setData({state:2})
    var that = this
    util.getData(
      'https://www.opt.com.cn/allSquareQuest/',
      {state:2},
      function(result){
        that.setData({questionList:result.data.questionList,totalPage:result.totalPage})
      }
    )
  },
  toSolving:function(){
    this.setData({state:0})
    var that = this
    util.getData(
      'https://www.opt.com.cn/allSquareQuest/',
      {state:0},
      function(result){
        that.setData({questionList:result.data.questionList,totalPage:result.totalPage})
      }
    )
  }
})
