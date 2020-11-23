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



// 将三大html的id标签拿到手
let show_chart = document.getElementById('show');
let city_select = document.getElementById('city-select');
let form_gra_time = document.getElementById('form-gra-time');



// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();             // 得到年份
    var m = dat.getMonth() + 1;            // 得到月份（注意+1  因为月份从0开始）
    m = m < 10 ? '0' + m : m;              // 让个位数的月份有固定的表达方式
    var d = dat.getDate();                 // 得到日期
    d = d < 10 ? '0' + d : d;              // 让个位数的日期有固定的表达方式
    return y + '-' + m + '-' + d;          // 打印日期
  }



  function randomBuildData(seed) {        
    var returnData = {};                   // 这个是写错了吗？  不应该是 [] 吗？
    var dat = new Date("2016-01-01");      // 获得初始时间
    var datStr = ''
    for (var i = 1; i < 92; i++) {
      datStr = getDateStr(dat);
      returnData[datStr] = Math.ceil(Math.random() * seed);  // 对于整数上取整---[]这里面放字符串是什么玩法？？---将其视为键值对中的键
      dat.setDate(dat.getDate() + 1);      // 每次循环增加一天的时间
    }
    return returnData;
  }
  

  var aqiSourceData = {        // 空气质量信息对象
    "重庆": randomBuildData(500),
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
    nowSelectCity: "重庆",
    nowGraTime: "day"
  }


  
  /**
   *  随机颜色生成函数--采用RGB的方法
   */ 
  function randomRgbColor() {                // 随机生成RGB颜色
    var r = Math.floor(Math.random() * 256); // 随机生成256以内r值
    var g = Math.floor(Math.random() * 256); // 随机生成256以内g值
    var b = Math.floor(Math.random() * 256); // 随机生成256以内b值
    return `rgb(${r},${g},${b})`;            // 返回rgb(r,g,b)格式颜色
}



  /**
   * 渲染图表
   */
function renderChart() {
  show_chart.innerHTML = "";
    for (let item in chartData) {
        let bar_color = randomRgbColor();
        let li = document.createElement('li');
        li.style.height = chartData[item] + 'px';
        li.style.width = pageState.width + 'px';       // 之后换成百分号
        li.style.backgroundColor = bar_color;
        li.title = item + '空气质量指数：' + chartData[item];
        show_chart.appendChild(li);
    }
}



  /**
   * 日、周、月的radio事件点击时的处理函数
   */
  function graTimeChange() {
    // 确定是否选项发生了变化 
    let inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                pageState.nowGraTime = inputs[i].value;
            }
        }
    // 调用图表渲染函数
    initAqiChartData();
  }
  




  /**
   * select发生变化时的处理函数(城市的选择)
   */
  function citySelectChange() {
    // 确定是否选项发生了变化 
    let options = document.getElementsByTagName('option');
    // 设置对应数据
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
                pageState.nowSelectCity = options[i].value;
        }
    }
    // 调用图表渲染函数
    initAqiChartData();
  }
  




  /**
   * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
   */
  function initGraTimeForm() {
        form_gra_time = addEventListener("click", graTimeChange);   
  }
  




  /**
   * 初始化城市Select下拉选择框中的选项
   */
  function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var content = " ";
    for (var city in aqiSourceData) {
        content += '<option value="' + city + '">' + city + '</option>';
    }
    city_select.innerHTML=content;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city_select.addEventListener("click",citySelectChange);           
  }
  




  /**
   * 初始化图表需要的数据格式
   */
  function initAqiChartData() {  // 有点问题
    // 将原始的源数据处理成图表需要的数据格式
    let arr_city_date = aqiSourceData[pageState.nowSelectCity];
    let arr_time = ['day', 'week', 'month'];
    // chartData = {};     // 先让chartData刷新 ---  这种好像是无法清空内容的
    // for (let key in chartData) {
    //     delete chartData[key];
    // }
    if (pageState.nowGraTime === arr_time[0]) {
        chartData = arr_city_date;
        pageState.width = 15.5;           // 宽度这里还需要再思考思考

    }
    else if (pageState.nowGraTime === arr_time[1]) {
        chartData = arr_city_date;
        pageState.width = 100;
        let sum  = 0, day = 0, week = 0;
        for (let item in arr_city_date) {
            sum += arr_city_date[item];
            day += 1;
            if (new Date(item).getDay() === 6) {    // .getDay()  是计算的星期几
                week += 1;
                chartData['2016年 第' + week + '周']=Math.round(sum / day);
                sum = 0;
                day = 0;
            }
        }

    }
    else {
        chartData = arr_city_date;
        pageState.width = 500;
        let sum = 0, day = 0, month = 0;
        for (let item in arr_city_date) { 
            if (new Date(item).getMonth() === month) {
                sum += arr_city_date[item];
                day += 1;
            }
            else {
                chartData['2016年 第' + month + '月'] = Math.round(sum / day);
                month += 1;
                sum = 0, day = 0;
            }
        }
    }
    renderChart();       // 最后画面的显示
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