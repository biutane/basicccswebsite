const queryString = window.location.search;
const querySearch = new URLSearchParams(queryString);
const codeRoom = querySearch.get("code");

const codeRoomEl = document.querySelector("#codeRoom");
codeRoomEl.innerHTML = codeRoom;

const roomsRef = firebase.database().ref("rooms")

let playerNumber;

roomsRef.child(codeRoom).on("value", (snapshot) => {
    let roomInfo = snapshot.val();
    if (roomInfo.status == "start") {
        window.location.href = `play_c1.html?code=${codeRoom}`;
    }
    setRoomInfo(roomInfo);
})

const categoryEl = document.querySelector("#categoryRoom");
const btnStart = document.querySelector("#btn-startgame");
function setRoomInfo(roomInfo){
    const currentUser = firebase.auth().currentUser;
    if (roomInfo.uid1 == currentUser.uid) {
        playerNumber = "uid1";
    } else if (roomInfo.uid2 == currentUser.uid) {
        playerNumber = "uid2";
    }

    categoryEl.innerHTML = roomInfo.category;

    if (roomInfo.uid1 && roomInfo.uid2){
        btnStart.disabled = false;
    } else {
        btnStart.disabled = true;
    }
}

btnStart.addEventListener("click", startGame);
function startGame(){
    console.log("START GAME!");
    roomsRef.child(codeRoom).update({
        status: "start"
    })
}