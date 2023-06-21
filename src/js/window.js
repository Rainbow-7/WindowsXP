// let windowStack = []
let app = document.getElementById('app')
let files = document.getElementsByClassName('file')
let filesWrapper = document.getElementById('files-wrapper')
let buttonsWrapper = document.getElementsByClassName('buttons-wrapper')
let closeBtn = document.getElementsByClassName('close-btn')
let maxBtn = document.getElementsByClassName('max-btn')
let minBtn = document.getElementsByClassName('min-btn')
let fileWindow = document.getElementsByClassName('file-window')
let taskbar = document.getElementById('taskbar')

let isMouseDown = false
let isMouseMove = false
let isMax = false
// let clickOrDown = false // false是click, true是down
let mouseDownTime = -1
let mouseUpTime = -1
let deltaTime = 0

document.onmousedown = () => {
    isMouseDown = true
    mouseDownTime = new Date()
}
document.onmouseup = () => {
    isMouseDown = false
    mouseUpTime = new Date()
    deltaTime =  parseInt(mouseUpTime - mouseDownTime)
}
document.onmousemove = () => {
    isMouseMove = true
}
function windowEventBind() {
    // console.log(fileWindow)
    for(let i = 0; i < fileWindow.length; i ++) {
        fileWindow[i].onmousedown = (e) => {
            e = e || event
            let originX = e.clientX || e.x,
                originY = e.clientY || e.y,
                target = e.currentTarget || e.srcElement,
                left = target.offsetLeft,
                top = target.offsetTop
            // console.log(target, left, top)
                
            fileWindow[i].onmousemove = function(e){
                e = e || event
                let mouseX = e.clientX,
                    mouseY = e.clientY,
                    deltaX = mouseX - originX,
                    deltaY = mouseY - originY,
                    newTop = deltaY + top, 
                    // - target.style.height / 2,
                    newLeft = deltaX + left 
                    // - target.style.width / 2
                if(isMouseDown ) {
                    fileWindow[i].style.top = newTop +'px'
                    fileWindow[i].style.left = newLeft +'px'
                    fileWindow[i].style.zIndex = 9999
                    // console.log(isMouseDown)
                } else {
                    for(let j = 0; j < fileWindow.length; j ++) {
                        if(i !== j) {
                            fileWindow[j].style.zIndex = j + 1
                        }
                    }
                }           
            }
        }
   
        maxBtn[i].onclick = (e) => {
        isMax = !isMax ? 
        (fileWindow[i].style.width = `${100}vw`, 
        fileWindow[i].style.height = `${92}vh`,
        fileWindow[i].style.left = `50%`,
        fileWindow[i].style.top = `47%`,
        // fileWindow[i].style.transform = `translate(-50%, -50%)`, 
        true) :
        (fileWindow[i].style.width = `${64}vw`,
        fileWindow[i].style.height = `${56}vh`,
        false)
        }
        
      
        minBtn[i].onclick = (e) => {
            fileWindow[i].style.display = 'none'
        }

        // if(!closeBtn[i].onclick)         // 每次必须重新绑定删除事件
        closeBtn[i].onclick = (e) => {      // 因为这里没有设置key值做diff算法匹配,删除元素可能导致对应关系混乱，所以采用了这种稀奇古怪的操作
            if(fileWindow[i].querySelector('.window-name').innerText === '记事本') {
                console.log(fileWindow[i].querySelector('.note').value)
                sessionStorage.setItem('note', fileWindow[i].querySelector('.note').value)
            }
            
            app.removeChild(fileWindow[i])      
       
            let targetTask = document.getElementById(`task${i}`) 
            taskbar.removeChild(targetTask)

            let newTasks = document.getElementsByClassName('task')
            for(let j = i; j < newTasks.length; j ++) {
                newTasks[j].setAttribute('id', 'task' + (((newTasks[j].id).substring(4) - 1) % 65535))
            }
            taskIDNumber --
            
            windowEventBind()
        }

    }
}


windowEventBind()