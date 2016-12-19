function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getData(url,obj,successFunc){
  wx.request({
    url: url,
    data:obj,
    header:{ 
      'content-type': 'application/json'
    },
    method:"GET",
    success:function(result){
      successFunc(result)
    }
    })
}
function postData(){

}
module.exports = {
  formatTime: formatTime,
  getData:getData
}
