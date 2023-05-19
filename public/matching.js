const categoryModes = document.querySelectorAll(".category-mode")
const header = document.querySelector(".head h1");

const roomsRef = firebase.database().ref("rooms");
console.log(roomsRef)

let selectCategory = "";

categoryModes.forEach((category) => {
    category.addEventListener("click", (event) => {
        selectCategory = event.currentTarget.alt;
        // header.innerHTML = `Selected : ${selectCategory}`;
        CreateRoom()
    })
})

// const btnCreateRoom = document.querySelector("#btnCreateRoom");
// btnCreateRoom.addEventListener("click", CreateRoom);
// const btnQuickJoin = document.querySelector("#btnQuickJoin");
// btnQuickJoin.addEventListener("click", QuickJoin);

function CreateRoom(){
    if (selectCategory == "") return;
    console.log("Create Room!");

    let codeRandom;
    let canCreate = false;
    roomsRef.once("value", (snapshot) => {
        let rooms = snapshot.val();

        if (rooms != null){
            while (!canCreate){
                codeRandom = Math.floor(Math.random() * 9999 + 1);
                if (rooms[codeRandom] == null) {
                    canCreate = true;
                    break;
                }
            }
        } else {
            codeRandom = Math.floor(Math.random() * 9999 + 1);
            canCreate = true;
        }
        
        if (canCreate)
        {
            console.log(codeRandom);
            const currentUser = firebase.auth().currentUser;
            roomsRef.child(codeRandom).update({
                category: selectCategory,
                uid1: currentUser.uid
            })
            setTimeout(() => {
                window.location.href = `waiting.html?code=${codeRandom}`
            }, 100)
        }
    })
}





// function QuickJoin(){
//     if (selectCategory == "") return;
//     console.log("Quick join!");
//     const currentUser = firebase.auth().currentUser;

//     let codeRoomFind = "";
//     roomsRef.once("value", (snapshot) => {
//         let rooms = snapshot.val();

//         if (rooms != null){
//             for (let codeRoom in rooms) {
//                 let room = rooms[codeRoom];
//                 if (room["category"] == selectCategory){
//                     if (room["uid1"] == null || room["uid1"] == ""){
//                         console.log(codeRoom + " : Free for uid1");
//                         roomsRef.child(codeRoom).update({
//                             uid1: currentUser.uid
//                         })
//                         codeRoomFind = codeRoom;
//                         break;
//                     } else if (room["uid2"] == null || room["uid2"] == ""){
//                         console.log(codeRoom + " : Free for uid2");
//                         roomsRef.child(codeRoom).update({
//                             uid2: currentUser.uid
//                         })
//                         codeRoomFind = codeRoom;
//                         break;
//                     }
//                 }
//             }
//         }

//         if (codeRoomFind != ""){
//             window.location.href = `waiting.html?code=${codeRoomFind}`;
//         } else {
//             alert("Don't have any room, Please Create room!")
//         }
//     })
// }