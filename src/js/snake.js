function snakeGame() {

    (function(){
        var elements = [];//保存每个食物信息
        function Food(x, y, width, height){
        //横纵坐标
        //因为食物需要在地图上显示所以还需要把地图传给函数
        //具体操作就是把classname传给函数
            Food.prototype.init = function(map){

                //先删除，避免满屏食物
                (function(){
                    //elements数组中有这个食物
                    for(var i = 0; i < elements.length; i ++){
                        var elem = elements[i];
                        //在DOM元素中删除食物
                        elem.parentNode.removeChild(elem);
                        //在数组中删除食物
                        elements.splice(i,1);
                    }
                }());
                //创建食物并设置
                var div = document.createElement("div");
                map.appendChild(div);
                elements.push(div);//加到数组里面，方便删除
                div.style.width = this.width + "px";
                div.style.height = this.height + "px";
                
                div.style.left = this.x + "px";
                div.className = "food";

                //随机横纵坐标
                do{
                    this.x = (parseInt(Math.random() * (map.offsetWidth / this.width)) - 1)* this.width;
                }while(this.x >= map.offsetWidth || this.x < this.width);
                
                //目的是返回整数坐标
                //据说offsetWidth是可读不可写的，会四舍五入取整数
                //有时候直接读取width会返回null，但是offsetWidth不会
                do{
                    this.y = (parseInt(Math.random() * (map.offsetHeight / this.height)) - 1) * this.height;
                }while(this.y >= map.offsetHeight || this.y < this.height);
                
                div.style.left = this.x + "px";
                div.style.top = this.y + "px";
            };
            this.width = width ||20;
            this.height = height || 20;
            //背景颜色
            this.color =  "green";
        }
        //老实说我觉得return好一些
        window.Food = Food;
    }());

    var bodyLengthFlag = false;

    //小蛇初始化(无交互)
    (function(){

        var elements = [];//存放每个身体
        //小蛇的构造函数
        function Snake(width,height,direction){
            this.width = width || 20;
            this.height = height || 20;
            this.body=[
                {x:3,y:2},//头
                {x:2,y:2},//身体
                {x:1,y:2}//身体2
            ]
            //方向
            this.direction = direction || "right";    
        }
        Snake.prototype.init = function(map){
            (function(){
                var i = elements.length - 1;
                for(;i >= 0; i --){
                    if(elements.length > 3){
                        window.bodyLengthFlag = true;
                    }
                    var ele = elements[i];
                    ele.parentNode.removeChild(ele);
                    elements.splice(i, 1);
                }
            }());
            for(var i = 0; i < this.body.length; i ++){
                if(this.body.length > 4) {
                    bodyLengthFlag = true
                }
                var obj = this.body[i];
                var div = document.createElement("div");
                map.appendChild(div);
                elements.push(div);
                if(i == 0){
                    div.id = "head";
                }
                div.style.width = this.width - 6 + "px";
                div.style.height = this.height - 6 + "px";
                div.style.left = obj.x * this.width + "px";
                div.style.top = obj.y * this.height + "px";
                // div.style.backgroundColor = obj.color;
                div.className = "snake";
            }
        }

        Snake.prototype.move = function(food, map){
            //改变小蛇的身体的坐标位置
            var i = this.body.length - 1;
            for(;i > 0; i --){
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            //判断方向
            switch(this.direction){
                case "right" : this.body[0].x += 1;this.init(map);break;
                case "left"  : this.body[0].x -= 1;this.init(map);break;
                case "up"    : this.body[0].y -= 1;this.init(map);break;
                case "down"  : this.body[0].y += 1;this.init(map);break;
            }
            var headX = this.body[0].x * this.width;
            var headY = this.body[0].y * this.height;
            var foodX = food.x;
            var foodY = food.y;
            if(headX == foodX && headY == foodY){
                food.init(map);
                var tailDom = document.getElementsByClassName("snake")[this.body.length-1];
                tailDom.style.backgroundColor = "#ff6700";
                
                var score = document.getElementsByClassName("score")[1];
                score.innerHTML = (Number)(score.innerHTML) + 10;
                var tail = this.body[this.body.length - 1];
                setTimeout(() => {
                    tailDom.style.backgroundColor = "orange";
                }, 2500);
                
                this.body.push({
                    x:tail.x,
                    y:tail.y,
                });
            }
        }
        window.Snake = Snake;
    }());

    (function(){
        
        var that = null;

        function Game(map){
            this.food = new Food();
            this.snake = new Snake();
            this.map = map;
            that = this;
        }
        
        Game.prototype.start = function(){
            var divStart = document.createElement("div");
            this.map.appendChild(divStart);
            divStart.innerHTML = "开始游戏";
            divStart.className = "start";
            var temp = new Game(document.querySelector(".map"))
            
            divStart.addEventListener("click",function(){
                that.map.removeChild(divStart);
                temp.init(document.querySelector(".map"));
                var showScore = document.getElementsByClassName('score');
                showScore[0].style.display = "block";
                showScore[1].style.display = "block";
        
            },false);
        }

        Game.prototype.init = function(){
            //食物初始化
            this.food.init(this.map);
            //小蛇初始化
            this.snake.init(this.map);

            // setInterval(function(){
            //     // this.snake.init(this.map);
            //     // this.snake.move(this.food,this.map);
            //     //由于setinterval是window的方法，所以this会指向window
            //     //导致上述写法错误
            //     //于是我们var一个that保存一下Game对象的this(见上)
            //     that.snake.init(that.map);
            //     that.snake.move(that.food,that.map);
            // },100);
            this.runSnake(this.food, this.map);
            this.controlMove();
        };
        
        Game.prototype.runSnake = function(food, map){
            var time = 200;
            var reStart = document.createElement('div');
            var share = document.createElement('div');
            var again = new Game(document.querySelector(".map"));
            
            
            reStart.className = "restart";
            reStart.innerHTML = "重新开始";
        
            reStart.onclick = function(){
                map.removeChild(reStart);
                map.getElementsByClassName('score')[1].innerHTML = 0;
                again.start(); 
            }
        
            var timeId = setInterval(function(){
                this.snake.init(map);
                this.snake.move(food, map);
                //同样的，这里不能直接用this，因为setinterval是window的方法
                //让function调用bind方法，改变this指针指向，现在this就是that（that是Game）
                //传参得传实例化对象而不能直接传函数，所以不能直接传Game
                //上面用了that保存了实例对象的情况，所以可以传gm或者that
                var maxY  = parseInt(map.offsetHeight / this.snake.height);
                var maxX  = parseInt(map.offsetWidth / this.snake.width);
                var headY = parseInt(this.snake.body[0].y);
                var headX = parseInt(this.snake.body[0].x);

                if(headX <= 0 || headX >= maxX - 1|| headY <= 0 || headY >= maxY - 1){
                        clearInterval(timeId);
                        var temp = document.querySelector(".map");
                        temp.appendChild(reStart);
                }
                else{
                    for(var i = 1; i < this.snake.body.length; i ++){
                        if(headX == this.snake.body[i].x && headY == this.snake.body[i].y && bodyLengthFlag){
                            setTimeout(function(){
                                clearInterval(timeId);
                                var temp = document.querySelector(".map");
                                temp.appendChild(reStart);
                                
                            },time);
                        }
                    }
                }
            }.bind(that),time);
        }

        Game.prototype.controlMove = function(){
            document.addEventListener("keydown",function(e){
                console.log(e.key);
                switch(e.key){
                    case "a":
                        this.snake.direction = this.snake.direction == "right" ? "right" : "left";
                        break;
                    case "d":
                        this.snake.direction = this.snake.direction == "left" ? "left" : "right";
                        break;
                    case "w":
                        this.snake.direction = this.snake.direction == "down" ? "down" : "up";
                        break;
                    case "s":
                        this.snake.direction = this.snake.direction == "up" ? "up" : "down";
                    case "":
                        this.snake.direction = this.snake.direction == "up" ? "up" : "down";
                        break;
                }

            }.bind(that),false);
        }


        window.Game = Game;
    }());

    
    new Game(document.querySelector(".map")).start()
    // console.log('游戏开始')
}