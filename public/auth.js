const loginbtn = document.querySelector(".loginbtn");
loginbtn.addEventListener('click', loginUser)

const usersRef = firebase.database().ref("users")


firebase.auth().onAuthStateChanged((user) => {
    console.log('User: ', user);
    getList(user)
    setupUI(user)
})

const btnLogout = document.querySelector("#btnLogout");
btnLogout.addEventListener('click', () => {
    firebase.auth().signOut()
    console.log('Logout completed.');
})

function loginUser(event){
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        const user = result.user;
        // user = JSON.parse(result.user)
        console.log(user);
        usersRef.child(user.uid).update({
            displayName: user.displayName,
            photoURL: user.photoURL
        })
        // if( user){
        //     window.location.href = "./menu.html"
        // }
        // location.replace("./menu.html")
        // setTimeout(function (){
        //     // loginModal.hide();
        //     window.location.href = "./menu.html"
        // }, 1000);
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorMessage);
    });

    // firebase.auth().signInWithRedirect(provider);
}