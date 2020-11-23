/* ---------------- 引入dom结点 ----------------- */
const left_in = document.getElementById('left_in');
const right_in = document.getElementById('right_in');
const left_out = document.getElementById('left_out');
const right_out = document.getElementById('right_out');
let input = document.getElementById('input');
let show = document.getElementById('show');
// let value = input.value;  

// 插入数字
function Insert(str) {
    // 先判断输入的数字是否合法
    // let reg = /^[0-9]*$/;        // 利用的正则的方法来解决
    let value = input.value * 1;
    if (isNaN(value) === true || value === "" || value === null) {
        alert("请输入数字！");
    }
    else {
        let show_num = document.createElement('td');
        show_num.style.height = '40px';
        show_num.style.width = '80px';
        show_num.style.backgroundColor = 'red';
        show_num.style.fontSize = '18px';
        show_num.style.color = '#fff';
        show_num.innerHTML = input.value;
        str === "left" ? show.insertBefore(show_num, show.childNodes[0]) : show.appendChild(show_num);  // childNodes[0]是起到什么作用呢？ 插入到0结点
    }
}

// 删除数字
function Delete(str) {
    // 先判断是否还有数字可以删除
    if (show.children.length === 0) {
        alert('已经没数据了！');
    }
    else {
        str === "left" ? alert(show.firstChild.innerHTML) : alert(show.lastChild.innerHTML);
        str === "left" ? show.removeChild(show.firstChild) : show.removeChild(show.lastChild);
    }
}

// 进行按钮操作
left_in.addEventListener("click", function() {
    Insert("left")
})
right_in.addEventListener("click", function() {
    Insert("right")
})

left_out.addEventListener("click", function() {
    Delete("left")
})
right_out.addEventListener("click", function() {
    Delete("right")
})