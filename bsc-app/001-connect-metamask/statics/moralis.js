const serverUrl = "https://swvy3c9kdaln.usemoralis.com:2053/server"
const appId = "ppmyasTLn2HboNbNlj4j24YEulTweoVchR7Wp3ze"
Moralis.start({ serverUrl, appId });

async function login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({ signingMessage: 'log in usring Moralis' }).then((user) => {
            console.log(user.get('ethAddress'));
            user.set('username', document.getElementById('username').value);
            user.set('email', document.getElementById('email').value);
            user.save();
        })
    }

    document.getElementById('connect').innerHTML = "Log out"
    document.getElementById('connect').onclick = logout

    if (user) {
        console.log(user.get('ethAddress'));
    }

    populate()
}


async function logout() {
    await Moralis.User.logOut();
    console.log('logged out');
    document.getElementById('connect').innerHTML = "Connect MetaMask"
    document.getElementById('connect').onclick = login
}

async function populate() {
    let user = Moralis.User.current();
    const balances = await Moralis.Web3API.account.getTokenBalances({'address': user.get('ethAddress')}).then((data) => {
        console.log(data);
    });
    
}


function buildTableBalance(data) {
    console.log('==>', data);
    let table = document.getElementById('balance')
    for (var i = 0; i < data.length; i++) {
        let row = `
        <tr>
            <td>${data[i].name}</td>
            <td>${data[i].symbol}</td>
            <td>${data[i].balance}</td>
        </tr>
        `
        table.innerHTML += row
    }
}