// querySelector 查找 css 样式的元素，本例是寻找 class='progress-done' 的第一个元素
const progress = document.querySelector('.progress-done');


setInterval(() => {
    progress.style.opacity = 1;
    progress.style.width = progress.getAttribute('data-done') + '%';

}, 500);