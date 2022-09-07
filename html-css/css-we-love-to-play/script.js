const text = document.getElementById('text');
const textAttr = text.innerText.split('');

const newEl = document.createElement('h1');

newEl.innerHTML = `
    ${textAttr.map( letter =>
        `<span style="${randomVisiable()}">${letter}</span>`
    ).join('')}
`;
newEl.classList.add('overlay');

document.body.appendChild(newEl);

function randomVisiable() {
    // return Math.random() < 0.5 ? 'display: none':  'display : inline-block';
    return Math.random() < 0.5 ? 'visibility: hidden' : 'visibility : visiable';
}

