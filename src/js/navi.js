
// const naviWrapper = document.getElementById('navi-wrapper')

let flag = true;
let windowsXP = document.getElementById('menu');
let popup = document.getElementById('popup');;
windowsXP.onclick = function() {
    flag = flag ?
    (popup.style.display = 'block', false) :
    (popup.style.display = 'none', true);
}
windowsXP.onmouseover = function() {
    popup.style.display = 'block';
    }
windowsXP.onmouseout = function() {
    if(flag){
        popup.style.display = 'none';
    }
}
popup.onblur = function() {
    popup.style.display = 'none';
}

