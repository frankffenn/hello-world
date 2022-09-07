const tagsEl = document.getElementById('tags');
const textareaEl = document.getElementById('textarea');


textareaEl.addEventListener('keyup', (e)=>{
    createTag(e.target.value);

    if (e.key == 'Enter') {
        randomSelect();
    }
})

function createTag(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());

    // clean up the tags
    tagsEl.innerHTML = '';

    tags.map(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    })

}

function randomSelect() {
    const times = 30;

    const interval = setInterval(() => {
        const tags = document.querySelectorAll('.tag');
        const tagEl = tags[Math.floor(Math.random() * tags.length)]
        tagEl.classList.add('highlight');

        setTimeout(() => {
            tagEl.classList.remove('highlight');
        }, 100);

    }, 100);

    setTimeout(() => {
        clearInterval(interval);

        const tags = document.querySelectorAll('.tag');
        const tagEl = tags[Math.floor(Math.random() * tags.length)]
        setTimeout(() => {
            tagEl.classList.add('highlight');
        }, 100);
    }, times * 100);

}