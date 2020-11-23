const insert = document.getElementById('insert');
const find = document.getElementById('find');
let bottom = document.getElementById('bottom');
let input = document.getElementById('input');
let area = document.getElementById('area');

function Insert() {
    let value = area.value;
    let td = document.createElement('td');
    td.style.height = '40px';
    // td.style.width = '60px';
    td.style.padding = '4px';
    td.style.fontSize = '28px';
    td.innerHTML = value;
    td.style.color = '#fff';
    td.style.backgroundColor = 'pink';
    bottom.appendChild(td);
}

function Find() {
    let value = input.value;
    for (let i = 0; i < bottom.children.length; i++) {
        if (value === bottom.children[i].innerHTML) {
            // bottom.children[i].style.backgroundColor='red';
            let span = document.createElement('span');
            span.style.backgroundColor = 'blue';
            span.style.height = '28px';
            bottom.children[i].innerHTML = '';
            bottom.children[i].appendChild(span);
            span.innerText = input.value;
            // bottom.children[i].innerHTML = '<>';
        }
        else {
            alert('没有查找到相关内容');
        }
    }
}

insert.addEventListener("click", function() {
    Insert();
})

find.addEventListener("click", function() {
    Find();
})