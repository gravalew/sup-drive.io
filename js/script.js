let recordLocalStorage = localStorage.getItem('record');
let record = document.querySelector('#record');
if (recordLocalStorage !== null) {
  record.innerHTML = `${recordLocalStorage}`;
}
function drawCanvas() {
  let menu = document.querySelector('.start-menu__container');
  menu.style.display = 'none';
  let canvasContainer = document.querySelector('.canvas__container');
  canvasContainer.style.display = 'block';
  let canvas = document.getElementById('myCanvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    let widthWindow = window.screen.availWidth;
    let heightWindow = window.screen.availHeight;
    canvas.setAttribute('width', widthWindow);
    canvas.setAttribute('height', (heightWindow / 6) * 5);
    if (widthWindow > heightWindow || heightWindow > 999) {
      canvas.setAttribute('height', heightWindow);
    }
    let x = canvas.width / 2;
    let ballRadius = 20;
    let y = canvas.height - 25;
    let dx = 2;
    let dy = -2;
    let paddleHeight = 10;
    let paddleWidth = 50 + Math.floor((widthWindow - 400) / 8);
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let coinRowCount = 3 + Math.floor(((heightWindow / 5) * 4 - 400) / 100);
    let coinWidth;
    if (widthWindow < 321) {
      coinWidth = 40;
    } else if (widthWindow < 426) {
      coinWidth = Math.floor(widthWindow / 10);
    } else if (widthWindow < 1025) {
      coinWidth = Math.floor(widthWindow / 13);
    } else if (widthWindow < 1500) {
      coinWidth = Math.floor(widthWindow / 17);
    } else {
      coinWidth = Math.floor(widthWindow / 20);
    }
    let coinHeight = coinWidth / 3.5;
    let coinPadding = 15;
    let coinOffsetTop = 50;
    let coinOffsetLeft = widthWindow;
    let coinColumnCount = 0;
    do {
      coinOffsetLeft -= coinPadding + coinWidth;
      coinColumnCount++;
    } while (coinOffsetLeft > coinPadding + coinWidth);
    coinOffsetLeft = (coinOffsetLeft + coinPadding) / 2;
    let score = 0;
    let lives = 3;
    let coins = [];
    for (let c = 0; c < coinColumnCount; c++) {
      coins[c] = [];
      for (let r = 0; r < coinRowCount; r++) {
        coins[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    /*Control keys for mobile phone permissions start*/
    document.getElementById('btnLeft').onclick = function () {
      if (paddleX > 0) {
        paddleX -= paddleWidth;
      }
    };
    document.getElementById('btnRight').onclick = function () {
      if (paddleX < canvas.width - paddleWidth) {
        paddleX += paddleWidth;
      }
    };
    /*Control keys for mobile phone permissions end*/
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    if (widthWindow > 999) {
      document.addEventListener('mousemove', mouseMoveHandler, false);
      function mouseMoveHandler(e) {
        let relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth / 2;
        }
      }
    }
    /*Control keyboard keys start*/
    function keyDownHandler(e) {
      if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
      } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
      }
    }
    function keyUpHandler(e) {
      if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
      } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
      }
    }
    /*Control keyboard keys end*/
    /*Function to record a record start */
    function record() {
      if (score > recordLocalStorage) {
        localStorage.setItem('record', `${score}`);
      }
    }
    /*Function to record a record end*/
    function congratulations(b) {
      dy = -dy;
      b.status = 0;
      score++;
      if (score == coinRowCount * coinColumnCount) {
        record();
        alert('YOU WIN, CONGRATULATIONS!');
        document.location.reload();
      }
    }
    function collisionDetection() {
      for (let c = 0; c < coinColumnCount; c++) {
        for (let r = 0; r < coinRowCount; r++) {
          let b = coins[c][r];
          if (b.status == 1) {
            if (x > b.x && x < b.x + coinWidth && y > b.y && y < b.y + coinHeight) {
              congratulations(b);
            }
            if (
              x + ballRadius / 2 > b.x &&
              x + ballRadius / 2 < b.x + coinWidth &&
              y + ballRadius / 2 > b.y &&
              y + ballRadius / 2 < b.y + coinHeight
            ) {
              congratulations(b);
            }
            if (
              x - ballRadius / 2 > b.x &&
              x - ballRadius / 2 < b.x + coinWidth &&
              y - ballRadius / 2 > b.y &&
              y - ballRadius / 2 < b.y + coinHeight
            ) {
              congratulations(b);
            }
          }
        }
      }
    }
    function drawScore() {
      ctx.font = '1.9rem Arial';
      ctx.fillStyle = '#b793ba';
      ctx.fillText('Coins: ' + score, coinOffsetLeft, 30);
    }
    function drawLives() {
      ctx.beginPath();
      let scaleVal = 3.5;
      ctx.fillStyle = '#b793ba';
      ctx.moveTo(canvas.width - coinOffsetLeft * 1.5 - 75 / scaleVal, 37 / scaleVal);
      ctx.bezierCurveTo(
        canvas.width - coinOffsetLeft * 1.5 - 75 / scaleVal,
        37 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 70 / scaleVal,
        25 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 50 / scaleVal,
        25 / scaleVal
      );
      ctx.bezierCurveTo(
        canvas.width - coinOffsetLeft * 1.5 - 20 / scaleVal,
        25 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 20 / scaleVal,
        62.5 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 20 / scaleVal,
        62.5 / scaleVal
      );
      ctx.bezierCurveTo(
        canvas.width - coinOffsetLeft * 1.5 - 20 / scaleVal,
        80 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 40 / scaleVal,
        102 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 75 / scaleVal,
        120 / scaleVal
      );
      ctx.bezierCurveTo(
        canvas.width - coinOffsetLeft * 1.5 - 110 / scaleVal,
        102 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 130 / scaleVal,
        80 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 130 / scaleVal,
        62.5 / scaleVal
      );
      ctx.bezierCurveTo(
        canvas.width - coinOffsetLeft * 1.5 - 130 / scaleVal,
        62.5 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 130 / scaleVal,
        25 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 100 / scaleVal,
        25 / scaleVal
      );
      ctx.bezierCurveTo(
        canvas.width - coinOffsetLeft * 1.5 - 85 / scaleVal,
        25 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 75 / scaleVal,
        37 / scaleVal,
        canvas.width - coinOffsetLeft * 1.5 - 75 / scaleVal,
        40 / scaleVal
      );
      ctx.fill();
      ctx.font = '0.8rem Arial';
      ctx.fillStyle = '#ffffff';
      if (lives > 9) {
        ctx.fillText(lives, canvas.width - coinOffsetLeft * 1.5 - 28, 25);
      } else {
        ctx.fillText(lives, canvas.width - coinOffsetLeft * 1.5 - 25, 25);
      }
    }
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#fac8fd';
      ctx.fill();
      let ball = document.getElementById('ball');
      ctx.drawImage(ball, x - 15, y - 15);
      ctx.closePath();
    }
    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = '#b793ba';
      ctx.fill();
      ctx.closePath();
    }
    function drawCoins() {
      for (let c = 0; c < coinColumnCount; c++) {
        for (let r = 0; r < coinRowCount; r++) {
          if (coins[c][r].status == 1) {
            let coinX = c * (coinWidth + coinPadding) + coinOffsetLeft;
            let coinY = r * (coinHeight + coinPadding) + coinOffsetTop;
            coins[c][r].x = coinX;
            coins[c][r].y = coinY;
            ctx.beginPath();
            ctx.rect(coinX, coinY, coinWidth, coinHeight);
            ctx.fillStyle = '#ffd700';
            ctx.fill();
            ctx.strokeRect(coinX, coinY, coinWidth, coinHeight);
            ctx.strokeStyle = '#998400';
            ctx.closePath();
          }
        }
      }
    }
    //Start main function
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCoins();
      drawBall();
      drawPaddle();
      collisionDetection();
      drawScore();
      drawLives();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          if ((y = y - paddleHeight)) {
            dy = -dy;
          }
        } else {
          lives--;
          if (!lives) {
            record();
            alert('GAME OVER');
            document.location.reload();
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
      x += dx;
      y += dy;
      //Start code pause
      let powerAnomation = true;
      let Idint = requestAnimationFrame(draw);
      let btnPause = document.getElementById('btnPause');
      btnPause.onclick = function () {
        if (powerAnomation) {
          cancelAnimationFrame(Idint);
          powerAnomation = false;
          btnPause.innerHTML = 'Play';
        } else {
          requestAnimationFrame(draw);
          powerAnomation = true;
          btnPause.innerHTML = 'Pause';
        }
      };
      //End code pause
    }
    //End main function
    draw();
  } else {
    // canvas-unsupported code here
  }
}
