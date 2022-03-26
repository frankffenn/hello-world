const result  = document.getElementById('result');
const copyBtn = document.getElementById('copy');

const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');

const generateBtn = document.getElementById('generate')

const uppercaseLetter = 'ABCDEFGHIJKLMNOPQRSTUVWSYZ';
const lowercaseLetter = 'abcdefghijklmnopqrstuvwxyz';
const number = '1234567890';
const symbol = '!@#$%^&*_';

let password = '';

result.addEventListener('click', () => {
    copyBtn.style.opacity = 0.8;  
    copyToClipboard(password);
    password = '';
})


generateBtn.addEventListener('click', ()=>{
    copyBtn.style.opacity = 0;  
    password = '';
    let letters = '';
    
    if (upperEl.checked) {
        letters += uppercaseLetter;
    }

    if (lowerEl.checked) {
        letters += lowercaseLetter;
    }

    if (numberEl.checked) {
        letters += number;
    }

    if (symbolEl.checked) {
        letters += symbol;
    }

    if (letters === '') {
        alert("check at least one letter")
        return 
    }

    for (var i=0; i< 15; i++){
        password += letters[Math.floor(Math.random() * letters.length)];
    }

    result.innerText = password;
})

function copyToClipboard(password) {
    const textarea  = document.createElement('textarea');
    if (!password) {
        return
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    // alert('Password copy to clipboard');
}