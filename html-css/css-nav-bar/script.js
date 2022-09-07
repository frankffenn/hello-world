const openEl = document.querySelector('.open');
const navbar = document.querySelector('.navbar');

openEl.addEventListener('click', () => {
    navbar.classList.toggle('visible');
})
