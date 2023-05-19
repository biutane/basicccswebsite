const queryString = window.location.search;
const querySearch = new URLSearchParams(queryString);
const codeRoom = querySearch.get("code");

let category;

const codeRoomEl = document.querySelector("#codeRoom");
codeRoomEl.innerHTML = codeRoom;

const roomsRef = firebase.database().ref("rooms");
const matchingRef = firebase.database().ref("matching");
const userRef = firebase.database().ref("users")

let playerNumber;
let matching = false;

const timerEl = document.querySelector(".waiting");
roomsRef.child(codeRoom).on("value", (snapshot) => {
    let roomInfo = snapshot.val();
    if (roomInfo.status == "start") {
        timerEl.innerHTML = "Found Player. Let's go!"
        matchingRef.child(codeRoom).remove();
        setTimeout(() => {
            window.location.href = `play_c1.html?code=${codeRoom}`;
        }, 1000)
    }
    setRoomInfo(roomInfo);
})

const categoryEl = document.querySelector("#categoryRoom");
const btnStart = document.querySelector("#btn-startgame");

function setRoomInfo(roomInfo){
    const currentUser = firebase.auth().currentUser;
    console.log("เข้ามาแล้ว!");
    console.log(roomInfo);
    if (roomInfo.uid1 == currentUser.uid) {
        playerNumber = "uid1";
        console.log(playerNumber);
    }
     else if (roomInfo.uid2 == currentUser.uid) {
        playerNumber = "uid2";
    }
    // else if (roomInfo.uid1 == currentUser.uid || roomInfo.uid2 == currentUser.uid) {
    //     console.log(playerNumber);
    //     roomsRef.child(roomInfo.uid1).on("value", user => {
    //         user = user.val()
    //         document.querySelector('#pic-profile img').src = user.photoURL
    //         document.querySelector('#nickname div').innerHTML = user.displayName
    //     })
    // }

    categoryEl.innerHTML = roomInfo.category;
    category = roomInfo.category;

    // if (roomInfo.uid1 && roomInfo.uid2){
    //     btnStart.disabled = false;
    // } else {
    //     btnStart.disabled = true;
    // }
}

// roomsRef.on("value", (snapshot)=>{
//     snapshot = snapshot.val()
//     const currentuser = firebase.auth().currentUser
//     for(const r in snapshot){
//         const roomInfo = snapshot[r]
//         console.log(roomInfo);
//         console.log(userRef);
//         if (roomInfo.uid1 == currentUser.uid || roomInfo.uid2 == currentUser.uid) {
//             // roomInfo = room
//             roomsRef.child(roomInfo.uid1).on("value", user => {
//             user = user.val()
//             document.querySelector('#pic-profile img').src = user.photoURL
//             document.querySelector('#nickname div').innerHTML = user.displayName
//         })
    
//         }
//     }
// })

        
btnStart.addEventListener("click", () => {
    roomsRef.child(codeRoom).once("value", (snapshot) => {
        const room = snapshot.val();
        if (room.uid1 && room.uid2) {
            startGame();
        } else {
            if (matching) {
                CancelMatching();
            } else {
                Matching();
            }
        }
    })
});

function startGame(){
    console.log("START GAME!");
    roomsRef.child(codeRoom).update({
        status: "start"
    })
}

let timerInterval;
function Matching(){
    matching = true;
    btnStart.innerHTML = "Cancel";
    timerEl.style.display = "block";
    console.log("Matching!");
    
    const currentUser = firebase.auth().currentUser;

    matchingRef.once("value", (snapshot) => {
        const roomsMatching = snapshot.val();
        if (roomsMatching != null){
            for (let code in roomsMatching){
                const roomWaiting = roomsMatching[code];
                let findRoom = false;
                if (roomWaiting.category == category){
                    roomsRef.child(code).once("value", (ss) => {
                        const room = ss.val();
                        if (room["uid1"] == null || room["uid1"] == ""){
                            console.log(code + " : Free for uid1");
                            roomsRef.child(code).update({
                                uid1: currentUser.uid,
                                status: "start"
                            })
                            findRoom = true;
                        } else if (room["uid2"] == null || room["uid2"] == ""){
                            console.log(code + " : Free for uid2");
                            roomsRef.child(code).update({
                                uid2: currentUser.uid,
                                status: "start"
                            })
                            findRoom = true;
                        }

                        if (findRoom) {
                            timerEl.innerHTML = "Found Player. Let's go!"
                            roomsRef.child(codeRoom).remove();
                            setTimeout(() => {
                                window.location.href = `play_c1.html?code=${code}`;
                            }, 1000)
                        }
                    })
                } else {
                    matchingRef.child(codeRoom).update({
                        category: category
                    })
                }
            }
        } else {
            matchingRef.child(codeRoom).update({
                category: category
            })
        }
    })

    let timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        timerEl.innerHTML = `Waiting for player... (${timer})`
    }, 1000)
}

function CancelMatching(){
    timerEl.style.display = "none";
    clearInterval(timerInterval);
    matching = false;
    matchingRef.child(codeRoom).remove();
    btnStart.innerHTML = "Start";
}

const btnBack = document.querySelector("#backto");
btnBack.addEventListener("click", () => {
    roomsRef.child(codeRoom).once("value", (snapshot) => {
        const room = snapshot.val();
        roomsRef.child(codeRoom).child(playerNumber).remove();
        const oppositePlayer = playerNumber == "uid1" ? "uid2" : "uid1";
        if (!room[oppositePlayer]) {
            roomsRef.child(codeRoom).remove();
        }

        setTimeout(() => {
            window.location.href = "mode.html";
        }, 500)
    });
})