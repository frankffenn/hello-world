const container = document.getElementById('dot-container');
const rows = 15;
const cols = 15;
let circleArr = [];

for (var i = 0; i< rows; i++ ){ 
    circleArr[i] = [];
    for (var j = 0; j <cols; j++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        container.appendChild(circle);
        circleArr[i].push(circle);
    }
}


circleArr.forEach((rows, i) => {
    rows.forEach((circle,j) => {
        circle.addEventListener('click', () => {
            growCircle(i,j)
        })
    })
})


function growCircle(i, j) {
    if (circleArr[i] && circleArr[i][j]) {
        if (!circleArr[i][j].classList.contains('grow')){
            circleArr[i][j].classList.add('grow');
            setTimeout(() => {
                growCircle(i-1,j);
                growCircle(i+1,j);
                growCircle(i,j-1);
                growCircle(i,j+1);
            }, 100);

            setTimeout(() => {
                circleArr[i][j].classList.remove('grow');
            }, 300);
        }
    }

}