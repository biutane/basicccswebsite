
const ref = firebase.database().ref("userList");


function getList(user) {
    if (user) {
        ref.child(user.uid).on('value', (snapshot) => {
            // readList(snapshot)
        })
    }
}

const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');

function setupUI(user) {
    if (user) {
        document.querySelector("#profile-image").innerHTML = `<img src='${user.photoURL}' width='120px' height='120px' style="border-radius: 50%">`
        profileName = document.querySelector("#profile-name").innerHTML = user.displayName
        loginItems.forEach((item) => { 
            item.style.display = 'flex' 
        })
        logoutItems.forEach((item) => { 
            item.style.display = 'none' 
        })
    } else {
        loginItems.forEach((item) => { 
            item.style.display = 'none' 
        })
        logoutItems.forEach((item) => { 
            item.style.display = 'flex' 
        })
    }
}


const gotomode = document.querySelector('#btn-playgame');

// gotomode.addEventListener("click", (event) => {
//         setupUI();
// });




