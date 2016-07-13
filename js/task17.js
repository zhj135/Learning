/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chart = document.querySelector('.aqi-chart-wrap');
  var city = pageState.nowSelectCity,
      type = pageState.nowGraTime;
  var content = '';
  for(var key in chartData){
      if(chartData[key]<100){
        content += '<div style="background:green;height:'+ chartData[key] +'px" class="day" title="日期：'+ key +'数据：'+ chartData[key] +'"></div>';
      }else if(chartData[key]<300){
        content += '<div style="background:red;height:'+ chartData[key] +'px" class="day" title="日期：'+ key +'数据：'+ chartData[key] +'"></div>';
      }else{
        content += '<div style="background:black;height:'+ chartData[key] +'px" class="day" title="日期：'+ key +'数据：'+ chartData[key] +'"></div>'; 
      } 
  }
  content += '<div class="placeholder"></div>'
  chart.innerHTML = content;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  pageState.nowGraTime = this.value;
  pageState.nowSelectCity;
  // 设置对应数据
  chartData = aqiSourceData[pageState.nowSelectCity];
  switch(pageState.nowGraTime){
    case('day'):
      chartData = aqiSourceData[pageState.nowSelectCity];
      break;
    case('week'):
      var initialDay = 5,
          countWeek = 1;
      countDay = 0;
      total = 0;
      chartObj = {};
      for(var key in chartData){ 
        if(initialDay <= 7){
          total += chartData[key];
          countDay++;
          initialDay++; 
        }else{
          chartObj['第'+ countWeek +'周'] = Math.round(total/countDay);
          total = chartData[key];
          countDay = 1;
          initialDay = 2;
          countWeek++;
        }
      }    
      chartObj['第'+ countWeek++ +'周'] = Math.round(total/countDay);
      chartData = chartObj;
      break;
    case('month'):
      var countDay = 0,
          total = 0,
          initialMonth = '01',
          lastMonth = '',
          chartObj = {};
      for(var key in chartData){ 
        if(key.slice(5,7) === initialMonth){
          total += chartData[key];
          countDay++;
          lastMonth = key.slice(5,7);
        }else{
          chartObj[initialMonth+'月：'] = Math.round(total/countDay);
          initialMonth = key.slice(5,7);
          total = chartData[key];
          countDay = 1;
        }
      }
        chartObj[lastMonth+'月：'] = Math.round(total/countDay);
      chartData = chartObj;
  }
  // 调用图表渲染函数
  renderChart()
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  
  // 设置对应数据
  pageState.nowSelectCity = this.value;
  chartData = aqiSourceData[pageState.nowSelectCity]
  // 调用图表渲染函数
  console.log(pageState.nowGraTime)
  // graTimeChange()
  // renderChart()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var dateRadio = document.getElementsByName('gra-time');
  for(var i in dateRadio){
    // dateRadio[i].onclick = graTimeChange;
    dateRadio[i].onchange = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityArray = [];
  for(var key in aqiSourceData){
    cityArray.push(key);
  }
  var citySelect = document.getElementById('city-select');
  for(var i in cityArray){
    cityArray[i] = '<option>' + cityArray[i] +'</option>';
  }
  citySelect.innerHTML = cityArray.toString().replace(/,/g,'');
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式

  // 处理好的数据存到 chartData 中
  chartData = aqiSourceData[pageState.nowSelectCity]
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();