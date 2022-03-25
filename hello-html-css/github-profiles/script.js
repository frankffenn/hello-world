const APIURL = 'https://api.github.com/users/';

const form  = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json()

    document.getElementById('avatar').src = respData.avatar_url;
    document.getElementById('name').innerHTML = respData.name;
    document.getElementById('bio').innerHTML = respData.bio;
    document.getElementById('followers').innerHTML = respData.followers + '<strong>Followers</strong>';
    document.getElementById('following').innerHTML = respData.following + '<strong>Following</strong>';
    document.getElementById('public_repos').innerHTML = respData.public_repos + '<strong>Public_repos</strong>';
}

getUser('gnasnik')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value;

    if (user) {
        getUser(search.value);
    }

    search.value = '';
    
})