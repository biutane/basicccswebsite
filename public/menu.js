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