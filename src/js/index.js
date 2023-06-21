//  用于主页动态渲染（应用、网络数据）、右键小菜单等
// let filesTree = {
//     // 便于index.html文件读取，所以相对路径采用index.html的
//     myComputer: {
//         name:'我的电脑',
//         imgSrc: '../../img/icon/我的电脑.png',
//         dir: {}
//     },
//     test: {
//         name: '测试',
//         imgSrc: '../../img/icon/我的电脑.png',
//         dir: {}
//     }
// }
let tempImageBase64 = "../../img/usual/bgi.jpg"
let preview 
let taskIDNumber = -1
// const taskbar = document.getElementById('taskbar')
const templateFileWindow = document.querySelector('#template-file-window')
const templateFile = document.querySelector('#template-file')
// let app = document.getElementById('app')
let file = document.getElementsByClassName('file')
// let fileWindow = document.getElementsByClassName('file-window')

// console.log(templateFileWindow)
for(let i = 0; i < file.length; i ++) {
    file[i].addEventListener('dblclick', () => {
        // console.log('hi')
        let filename = ''
        let newFileWindow = document.importNode(templateFileWindow.content, true)
        newFileWindow.querySelector('.window-name').innerText = filename = file[i].querySelector('.file-name').innerText
        // console.log(file[i].querySelector('.file-name'))
        // console.log(newFileWindow.querySelector('.window-name'))
        if(filename === '我的电脑') {
            newFileWindow.querySelector('.window-content').innerHTML = 
            ` <div class="my-computer" style="display: flex;justify-content:center;overflow-y: auto;">
            <div style="width: 40vw;">
            <br>
            <img style="width: 50% ;height: 50%; margin:80px 50px 0 100px;" src="../img/icon/windowsXP1.png" alt="资源丢失">
            </div>
            <div style="width: 40vw;color: ;">
                <div>
                <br><br>
                    <div style="color: black;">系统:</div>
                    <div >
                        <ul style="list-style: none;margin-left: 2vw;color: ;" >
                            <li style="color: black;">Microsoft Windows XP</li>
                            <li style="color: black;">Professional</li>
                            <li style="color: black;">版本 2022</li>
                            <li style="color: black;">Service Pack 3</li>
                        </ul>
                    </div>

                </div>
                <br>
                <div>
                    <div style="color: black;">注册到:</div>
                    <div>
                        <ul style="list-style: none;margin-left: 2vw;">
                            <li style="color: black;">姜子杨的前端项目</li>
                            <li style="color: black;">www.jzy.com</li>
                            <li style="color: black;">66666-666-66666666-666666</li>
                        </ul>
                    </div>

                </div>
                <br>
                <div>
                    <div style="color: black;">计算机:</div>
                    <div>
                        <ul style="list-style: none;margin-left: 2vw;">
                            <li style="color: black;">AMD Sempron(tm) Processor</li>
                            <br>
                            <li style="color: black;">LE-1100</li>
                            <li style="color: black;">1.91 GHz, 960 MB 的内存</li>
                            <li style="color: black;">物理地址扩展</li>
                        </ul>
                    </div>

                </div>
            </div>

    </div>
`
        } else if(filename === '浏览器') {
            newFileWindow.querySelector('.window-content').innerHTML = 
            `<iframe src="https://bing.com/" frameborder="0" style="width: 100%;height: 100%;"></iframe>`
        } else if(filename === '虚拟机') {
            let url = window.location
            if(window != window.top) {
                alert('禁止套娃!')
                return 
            } else {
                newFileWindow.querySelector('.window-content').innerHTML = 
                `<iframe src="${url}" frameborder="0" style="width: 100%;height: 100%;font-size: 18px"></iframe>`
            }
        } else if(filename === '贪吃蛇') {
            newFileWindow.querySelector('.window-content').innerHTML = 
            `
                <div class="map">
                    <div class="score">   
                        得分
                        <div class="score">0</div>
                    </div>
                </div>
            `
            newFileWindow.querySelector('.max-btn').style.display = 'none'
            let timeId = setTimeout(() => {
                snakeGame()
            },200)
                
        } else if(filename === '记事本') {
            let textarea = document.createElement('textarea')
            textarea.setAttribute('class', 'note')
            textarea.setAttribute('placeholder', 'Hello World!')
            if(sessionStorage.getItem('note')) {
                textarea.innerText = sessionStorage.getItem('note')
            }
            newFileWindow.querySelector('.window-content').appendChild(textarea)
        } else if(filename === '计算器') {
            let expressStack = []
            newFileWindow.querySelector('.window-content').innerHTML = 
            `
            <div class="calculator">
                <div class="expression"></div>
                <div class="math-symbols">
                    <div class="math-left">(</div><div class="math-right">)</div><div class="math-mode">%</div><div class="math-clear">C</div>
                    <div class="math-one">1</div><div class="math-two">2</div><div class="math-two">3</div><div class="math-division">/</div>
                    <div class="math-two">4</div><div class="math-two">5</div><div class="math-two">6</div><div class="math-multiplication">*</div>
                    <div class="math-two">7</div><div class="math-two">8</div><div class="math-two">9</div><div class="math-minus">-</div>
                    <div class="math-zero">0</div><div class="math-dot">.</div><div class="math-equal" style="color:#ff3700;">=</div><div class="math-plus">+</div>
                </div>
            </div>
            `
            let timeId = setTimeout(() => {
                let expression = document.getElementsByClassName('expression')[0]
                let mathSymbols = document.getElementsByClassName('math-symbols')[0].querySelectorAll('div')
                // console.log(mathSymbols)
                for(let i = 0; i < mathSymbols.length; i ++) {
                    if(i == 3) {    // clear清除
                        mathSymbols[i].onclick = () => {
                            expression.innerText = expressStack.join('')
                            expressStack = expressStack.slice(0, 0)
                        }
                    } else if(i == 18) { // 等号
                        mathSymbols[i].onclick = () => {
                            try {
                                let finalExpression = expressStack.join('')
                                console.log(finalExpression)
                                // debugger
                                let result = eval(finalExpression)
                                // debugger
                                expressStack = expressStack.slice(0, 0)
                                expressStack.push(result)
                                expression.innerText = result
                            } catch(e) {
                                // debugger
                                expressStack =  expressStack.slice(0, 0)
                                // debugger
                                expression.innerText = '非法运算!'
                                
                            }
                        }
                    } else  {   // 数字或其他运算符号
                        mathSymbols[i].onclick = () => {
                            expressStack.push(mathSymbols[i].innerText)
                            expression.innerText = expressStack.join('')
                        }
                    }
                }
            }, 300)
        } else if(filename === '壁纸') {
        //    let fileInput = document.getElementById('file-input')
        //    console.log(filename)
        //    fileInput.addEventListener('input', (e) => {
        //         console.log(e)
        //    })
            newFileWindow.querySelector('.window-content').innerHTML = 
            `<h1 style="text-align:center;color:#333;">自定义背景</h1>
            <input type="file" id="file-input" onchange="setBackgroundImage(this)"> 
            <input type="button" id="file-check">
            <div class="preview">
                <img src="../img/usual/bgi.jpg" alt="">
            </div>
            <label class="file-input-lable" for="file-input">选择</label>
            <lable class="file-sure-btn" for="file-check" onclick="makeSureImage()">确定</lable>
            <label class="file-reset" onclick="resetImage()">重置</label>
            <!-- 为啥要三个label?为了形式统一啦.... -->
             `
             let timeId = setTimeout(() => {
                preview = document.getElementsByClassName('preview')[0].querySelector('img')
                preview.src = tempImageBase64
             }, 200)
        }
        
        let newTask = document.createElement('div')
        newTask.setAttribute('class', 'task')
        newTask.setAttribute('id', 'task' + (++ taskIDNumber % 65535))
        newTask.innerText = filename
        setTimeout(() => {
            let index = (newTask.id).substring(4)
            console.log(index)
            newTask.onclick = () => {

                if(document.getElementsByClassName('file-window')[index].style.display =='block') {
                    document.getElementsByClassName('file-window')[index].style.display ='none'
                } else {
                    document.getElementsByClassName('file-window')[index].style.display ='block'
                }    
            }
        }, 200)
        app.append(newFileWindow.cloneNode(true))
        taskbar.append(newTask)
        windowEventBind()
    })
}

//时间显示
var int = self.setInterval("clock()", 50);
function clock()
{
    var t = new Date();
    t = String(t).split(' ').slice(0, 5).join(' ')
    document.getElementById("clock").innerText = t;
}

// 问候并提示
var curTime = new Date();
var curHour = curTime.getHours();
let greet = document.getElementById('greet');
let codetip = document.querySelector('.code-tip');
let gotocode = document.querySelector('.goto-code');
// console.log(curHour)
if(curHour>0 && curHour<12){
    greet.style.backgroundImage = "url('../img/usual/早上.png')";
    codetip.innerHTML = `
    <div style="font-size:54px;font-weight:700;">早上好</div>
    <div style="font-size:24px;margin:10px 0 0 4px;">开始新一天的学习!</div>` 
}
else if(curHour>=12 && curHour<=18){
    greet.style.backgroundImage = "url('../img/usual/下午.png')";
    codetip.innerHTML = `
    <div style="font-size:54px;font-weight:700;">下午好</div>
    <div style="font-size:24px;margin:10px 0 0 4px;">继续加油努力学习!</div>` 
}
else{
    greet.style.backgroundImage = "url('../img/usual/晚上.png')";
    codetip.innerHTML = `
    <div style="font-size:54px;font-weight:700;">晚上好</div>
    <div style="font-size:24px;margin:10px 0 0 4px;">下班了,回去陪陪家人吧!</div>` 
}
gotocode.onclick = function(){
    greet.style.right = `-100%`
}




function setBackgroundImage () {
    preview = document.getElementsByClassName('preview')[0].querySelector('img')
    let file = document.getElementById('file-input').files[0]
    // console.log("???")
    // 3*8 => 4*6  
    let imageSize = (file.size * 3 / 4 / 1024 / 1024 / 8).toFixed(0) // 单位转为MB 
    if((file.type).indexOf("image/")==-1) {
        alert("请上传图片")
        return 
    } else if(imageSize > 15) {
        alert("图片过大")
        return 
    }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    // console.log(file, preview)
    fileReader.onload = function (e) {
        tempImageBase64 = preview.src = this.result
        console.log(this.result)
    }
}


function makeSureImage () {
    console.log(tempImageBase64)
    app.style.backgroundImage = `url(${tempImageBase64})`
    // console.log("ahahaha", app.style.backgroundImage)
}

function resetImage () {
    app.style.backgroundImage = `url("../../img/usual/bgi.jpg")`
    tempImageBase64 = "../../img/usual/bgi.jpg"
    preview.src = "../../img/usual/bgi.jpg"
}

// 各种配置初始化做完之后，加载动画
window.onload = () => {
    let timeId = setTimeout(() => {
        const pw = document.getElementById('poweron-wrapper')
        document.getElementById('app').removeChild(pw)
        new Audio('../../audio/poweron.mp3').play()
        clearTimeout(timeId)
    }, 4500)
}