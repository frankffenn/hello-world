const canvas = document.getElementById('canvas');
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const ctx  = canvas.getContext('2d');

let size = 10;
let isPresssed = false;
let color = 'black';

let x = undefined;
let y = undefined;

sizeEl.innerHTML = size;

canvas.addEventListener('mousemove', (e) => {
    if (isPresssed) {
        drawLine(x, y, e.offsetX, e.offsetY);
        drawCircle(e.offsetX, e.offsetY);

        x = e.offsetX;
        y = e.offsetY;
    }
})

canvas.addEventListener('mousedown', (e) => {
    isPresssed = true;

    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener('mouseup', (e) => {
    isPresssed = false;

    x = undefined;
    y = undefined;
})


increase.addEventListener('click', () => {
    size += 5;
    if (size > 50) {
        size = 50;
    }
    updateSize()
})

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
})

decrease.addEventListener('click', () => {
    size -= 5;
    if (size < 5) {
        size = 5;
    }
    updateSize()
})


clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})


function updateSize() {
    sizeEl.innerHTML = size
}


// 画圆
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

// 画线
function drawLine(x, y, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size *2;
    ctx.stroke()
}