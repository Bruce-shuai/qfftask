/**
 	* aqiData，存储用户输入的空气指数数据
 	* 示例格式：
 	* aqiData = {
 	* "北京": 90,
 	* "上海": 40
 	* };
   */


/* ------------   先取得dom点  ------------ */  
let aqiData = {};
let city_input = document.getElementById("aqi-city-input") ;
let value_input = document.getElementById("aqi-value-input");
let add_btn = document.getElementById("add-btn");
let table = document.getElementById("aqi-table");
let delBtn = table.getElementsByTagName("button");
/* -------------------------------------- */
 	 
/**
* 从用户输入中获取数据，向aqiData中增加一条数据
* 然后渲染aqi-list列表，增加新增的数据
*/
function addAqiData() {
  //获取输入的内容 ---  注意trim()的效果
  const city = city_input.value.trim();
  const value = value_input.value.trim();
 	 
  //标识，当都为真时才能进行添加操作
  let cityflag = false;
  let valueflag = false;
 	 
  //正则--只能是中文（16进制来解）和英文
  let regCity = /^[a-zA-Z\u4E00-\u9FA5]+$/ ;
  //正则--整数
  let regValue = /[\d*]/;
 	 
  // 检验是否是符合正则要求的字符
  if(!regCity.test(city)) {
    alert("城市名称必须是中英文字符！");
    city_input.value = ''; //清除数据
  }
  else {
    cityflag = true;
  }
 	 
  // 检验是否符合正则要求的字符
  if( !regValue.test(value) ) {
    alert("空气质量指数必须为整数!");
 	  value_input.value = '';
  }
  else {
    valueflag = true;
  }	 
  // 判断是否满足两个要求
  if(cityflag && valueflag) {
 	  aqiData[city] = value ;
 	  }
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  let tr = '<tr>' + '<td>' + '城市' + '</td>' + '<td> '+ '空气质量'+' </td>' + '<td>' + '操作' + '</td>' + '</tr>';
  for (let x in aqiData) {
    tr += '<tr>' + '<td>' + x + '</td>' + '<td>' + aqiData[x] + '</td>' + '<td>' + "<button onclick='delBtnHandle(\""+x+"\")'>" + '删除' + '</button>' + '</td>' + '</tr>';
  }
 	table.innerHTML = tr;
}
 	 
/**
* 点击add-btn时的处理逻辑
* 获取用户输入，更新数据，并进行页面呈现的更新
*/
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}
 	 
/**
* 点击各个删除按钮的时候的处理逻辑
* 获取哪个城市数据被删，删除数据，更新表格显示
*/
function delBtnHandle(city) {
  delete aqiData[city];
  renderAqiList();
}
    
function init() {
  window.onload = function () {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
 	  add_btn.addEventListener("click", addBtnHandle);
  }
}

init();
