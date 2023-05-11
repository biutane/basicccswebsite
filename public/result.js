const queryString = window.location.search;
const querySearch = new URLSearchParams(queryString);
const codeRoom = querySearch.get("code");

const roomsRef = firebase.database().ref("rooms");
const usersRef = firebase.database().ref("users");

let playerNumber;

roomsRef.child(codeRoom).once("value", (snapshot) => {
    const roomInfo = snapshot.val();
    const currentUser = firebase.auth().currentUser;

    const result = document.querySelector(".result");
    result.innerHTML = "";

    if (roomInfo.uid1 == currentUser.uid) {
        playerNumber = "uid1";
    } else if (roomInfo.uid2 == currentUser.uid) {
        playerNumber = "uid2";
    }

    const winnerUid = roomInfo[roomInfo.winner];
    const loserUid = roomInfo[roomInfo.winner == "uid1" ? "uid2" : "uid1"];

    usersRef.child(winnerUid).once("value", (ss) => {
        const user = ss.val();
        result.innerHTML += `<div>winner : ${user.displayName}</div>`;
    })

    usersRef.child(loserUid).once("value", (ss) => {
        const user = ss.val();
        result.innerHTML += `<div>loser : ${user.displayName}</div>`;
    })
})

const btnBack = document.querySelector(".btnmenu");
btnBack.addEventListener("click", () => {
    roomsRef.child(codeRoom).once("value", (snapshot) => {
        const room = snapshot.val();
        roomsRef.child(codeRoom).child(playerNumber).remove();
        const oppositePlayer = playerNumber == "uid1" ? "uid2" : "uid1";
        if (!room[oppositePlayer]) {
            roomsRef.child(codeRoom).remove();
        }

        setTimeout(() => {
            window.location.href = "index.html";
        }, 500)
    });
})