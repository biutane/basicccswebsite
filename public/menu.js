const roomsRef = firebase.database().ref("rooms");

const roomIdInput = document.querySelector("#roomid");
const btnJoin = document.querySelector(".btnjoinwith");
btnJoin.addEventListener("click", joinGame)

function joinGame(){
    let roomId = roomIdInput.value;
    let canJoin = false;

    const currentUser = firebase.auth().currentUser;
    roomsRef.once("value", (snapshot) => {
        let rooms = snapshot.val();
        if (rooms != null && rooms[roomId]) {
            canJoin = true;
        }

        if (canJoin) {
            const room = rooms[roomId];
            if (room["uid1"] == null || room["uid1"] == ""){
                console.log(roomId + " : Free for uid1");
                roomsRef.child(roomId).update({
                    uid1: currentUser.uid
                })
            } else if (room["uid2"] == null || room["uid2"] == ""){
                console.log(roomId + " : Free for uid2");
                roomsRef.child(roomId).update({
                    uid2: currentUser.uid
                })
            }
            window.location.href = `waiting.html?code=${roomId}`
        } else {
            alert("Wrong Code, Please Try Again!")
        }
    })
}

var pone = document.querySelector('.howto1');
var ptwo = document.querySelector('.howto2');
var pthree = document.querySelector('.howto3');
var pfour = document.querySelector('.howto4');
var pfive = document.querySelector('.howto5');
var btnone = document.querySelector('#page1')
var btntwo = document.querySelector('#page2');
var btnthree = document.querySelector('#page3');
var btnfour = document.querySelector('#page4');
var btnfive = document.querySelector('#page5');

function toggle() {
    var show = document.getElementById('howtoplay');
    var bgact = document.getElementById('btnhowtoplay');
    if(show.style.display == 'none'){
        show.style.display = 'block'
        bgact.style.backgroundColor = "#A234ED"
        pone.style.display = 'block'
        btnone.style.backgroundColor = '#515151'
        ptwo.style.display = 'none'
        pthree.style.display = 'none'
        pfour.style.display = 'none'
        pfive.style.display = 'none'
        btntwo.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
    else{
        show.style.display = 'none';
        bgact.style.backgroundColor = "#E473A0"
        pone.style.display = 'block'
        btnone.style.backgroundColor = '#515151'
        ptwo.style.display = 'none'
        pthree.style.display = 'none'
        pfour.style.display = 'none'
        pfive.style.display = 'none'
        btntwo.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
      
}

function pagetwo() {
    if(ptwo.style.display == 'none'){
        ptwo.style.display = 'block'
        btntwo.style.backgroundColor = '#515151'
        pone.style.display = 'none'
        pthree.style.display = 'none'
        pfour.style.display = 'none'
        pfive.style.display = 'none'
        btnone.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
    else{
        ptwo.style.display = 'block'
        btntwo.style.backgroundColor = '#515151'
        pone.style.display = 'none'
        pthree.style.display = 'none'
        pfour.style.display = 'none'
        pfive.style.display = 'none'
        btnone.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
}

function pagethree() {
    if(pthree.style.display == 'none'){
        pthree.style.display = 'block'
        btnthree.style.backgroundColor = '#515151'
        pone.style.display = 'none'
        ptwo.style.display = 'none'
        pfour.style.display = 'none'
        pfive.style.display = 'none'
        btnone.style.backgroundColor = '#DE4B92'
        btntwo.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
    else{
        pthree.style.display = 'block'
        btnthree.style.backgroundColor = '#515151'
        pone.style.display = 'none'
        ptwo.style.display = 'none'
        pfour.style.display = 'none'
        pfive.style.display = 'none'
        btnone.style.backgroundColor = '#DE4B92'
        btntwo.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
}

function pagefour() {
    if(pfour.style.display == 'none'){
        pfour.style.display = 'block'
        btnfour.style.backgroundColor = '#515151'
        pone.style.display = 'none'
        pthree.style.display = 'none'
        ptwo.style.display = 'none'
        pfive.style.display = 'none'
        btnone.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btntwo.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
    else{
        pfour.style.display = 'block'
        btnfour.style.backgroundColor = '#515151'
        pone.style.display = 'none'
        pthree.style.display = 'none'
        ptwo.style.display = 'none'
        pfive.style.display = 'none'
        btnone.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btntwo.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
}

function pagefive() {
    if(pfive.style.display == 'none'){
        pfive.style.display = 'block'
        btnfive.style.backgroundColor = '#515151'
        pone.style.display = 'none'
        pthree.style.display = 'none'
        pfour.style.display = 'none'
        ptwo.style.display = 'none'
        btnone.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btntwo.style.backgroundColor = '#DE4B92'
    }
    else{
        pfive.style.display = 'block'
        btnfive.style.backgroundColor = '#515151'
        pone.style.display = 'none'
        pthree.style.display = 'none'
        pfour.style.display = 'none'
        ptwo.style.display = 'none'
        btnone.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btntwo.style.backgroundColor = '#DE4B92'
    }
}

function pageone() {
    if(pone.style.display == 'none'){
        pone.style.display = 'block'
        btnone.style.backgroundColor = '#515151'
        ptwo.style.display = 'none'
        pthree.style.display = 'none'
        pfour.style.display = 'none'
        pfive.style.display = 'none'
        btntwo.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
    else{
        pone.style.display = 'block'
        btnone.style.backgroundColor = '#515151'
        ptwo.style.display = 'none'
        pthree.style.display = 'none'
        pfour.style.display = 'none'
        pfive.style.display = 'none'
        btntwo.style.backgroundColor = '#DE4B92'
        btnthree.style.backgroundColor = '#DE4B92'
        btnfour.style.backgroundColor = '#DE4B92'
        btnfive.style.backgroundColor = '#DE4B92'
    }
}