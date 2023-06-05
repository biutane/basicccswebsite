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
