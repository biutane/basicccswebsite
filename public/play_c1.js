const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const codeRoom = urlParams.get('code')
let allmode = urlParams.get('allmode')
console.log(allmode);

let maxQuestion = 0; 

let dataf = "";
let num = 1;

const roomsRef = firebase.database().ref("rooms");
let playerNumber;

roomsRef.child(codeRoom).on("value", (snapshot) => {
    const roomInfo = snapshot.val();
    console.log(roomInfo.status);
    if (roomInfo.status == "finish") {
        document.querySelector(".result-win").classList.remove("d-none");
        setTimeout(() => {
            window.location.href = `result.html?code=${codeRoom}`;
        }, 1000)
    }

    console.log(roomInfo);
    allmode = roomInfo.category;

    const currentUser = firebase.auth().currentUser;
    
    if (roomInfo.uid1 == currentUser.uid) {
        playerNumber = "uid1";
    } else if (roomInfo.uid2 == currentUser.uid) {
        playerNumber = "uid2";
    }

    setupUI(roomInfo);
})


let txtcss;
function setupUI(roomInfo){
    document.querySelector('.preview_' + allmode).style["display"] = 'block';
    document.querySelector('#area_'+ allmode + num).style["display"] = 'block';
    document.querySelector('#pre_'+ allmode + num).style["display"] = 'none';   
    // console.log('#intro_'+ allmode + num)
    document.querySelector('#intro_'+ allmode + num).style["display"] = 'block';
    // console.log('#intro_'+ allmode + num)
    document.querySelector('#btnsub').style["display"] = 'block';
    document.querySelector('#btnnext').style["display"] = 'block';

   
    
    txtcss = document.querySelector('#txt_' + roomInfo.category + num);
    console.log(txtcss.value)
    
    // showQuestion();
    txtcss.addEventListener('input', function handleChange(event) {
        console.log(event.target.value);
      });
}

console.log(dataf[urlParams.get("allmode")]);


// let questionNumber = 1;
// const showintro = document.querySelector(".intro");
// console.log(showintro)

// const showcode = document.querySelector(".areacode");
// console.log('#intro_'+ allmode + questionNumber)

// const showpreans = document.querySelector(".preview");



// const showpre = document.querySelector(".preview");


// const codeRoomEl = document.querySelector("#codeRoom");
// codeRoomEl.innerHTML = codeRoom;


// document.querySelector("#profile-image").innerHTML = `<img src='${user.photoURL}' width='40px' height='40px' style="border-radius: 50%">`
//         profileName = document.querySelector("#profile-name").innerHTML = user.displayName

// function setupUI(user) {
//     if (user) {
//         document.querySelector("#profile-image").innerHTML = `<img src='${user.photoURL}' width='40px' height='40px' style="border-radius: 50%">`
//         profileName = document.querySelector("#profile-name").innerHTML = user.displayName
//         loginItems.forEach((item) => { 
//             item.style.display = 'flex' 
//         })
//         logoutItems.forEach((item) => { 
//             item.style.display = 'none' 
//         })
//     } else {
//         loginItems.forEach((item) => { 
//             item.style.display = 'none' 
//         })
//         logoutItems.forEach((item) => { 
//             item.style.display = 'flex' 
//         })
//     }
// }



// if (allmode){
//     document.querySelector('.preview_' + allmode).style["display"] = 'block';
//     console.log('#intro_'+ allmode + num)
//     document.querySelector('#intro_'+ allmode + num).style["display"] = 'block';
//     console.log('#intro_'+ allmode + num)
//     document.querySelector('#pre_'+ allmode + num).style["display"] = 'block';
//     document.querySelector('#area_'+ allmode + num).style["display"] = 'block';
// } 



// let txtcss = document.querySelector('#txt_' + allmode + num);
// console.log('#txt_' + allmode + num)




// const txtcss2 = txtcss.value;


// let txtcss = document.querySelector('#txt_' + allmode + num);
// console.log(txtcss.value)



// txtcss.addEventListener('input', function handleChange(event) {
//     console.log(event.target.value);
//   });

// console.log('hello ' + $('#txt_' + allmode + num).val())
const btnans = document.querySelector('#btnsub');

btnans.addEventListener('click',checkans);


console.log('')

const btnNext = document.querySelector("#btnnext");
// console.log(clearans)


// console.log(clearans.value)

btnNext.addEventListener("click", (event) => {
    if (num >= maxQuestion) {
        roomsRef.child(codeRoom).update({
            status: "finish"
        })
    } else {
        let clearans = document.querySelector('#txt_'+ allmode + num);
        clearans.value ='';
        console.log(clearans.value) 
        // clearans.querySelector()
        // clearans = txtcss.value;
        num += 1;
        showQuestion();
        // questionNumber += 1;
    }


});


function showQuestion(){
    // clearans.value = '';
    console.log('#area_'+ allmode + (num-1) + ', textarea')
    // console.log(clearans)
    document.getElementById('btnsub').style["display"] = 'block';
    document.getElementById('btnnext').style["opacity"] = '0.5';
    // console.log(document.querySelector('#btnnext').style["opacity"])
    document.querySelector('#intro_'+ allmode + (num-1)).style["display"] = 'none';
    document.querySelector('#area_'+ allmode + (num-1)).style["display"] = 'none';
    document.querySelector('#txt_'+ allmode + (num-1)).style["display"] = 'none';
    console.log('#area_'+ allmode + (num-1))
    document.querySelector('#preans_'+ allmode + (num-1)).style["display"] = 'none';
    
    
    
    // showintro.innerHTML = dataf[urlParams.get("allmode")][questionNumber]
    // showcode.innerHTML = dataf[urlParams.get("allmode")][questionNumber]
    // showpre.innerHTML = dataf[urlParams.get("allmode")][questionNumber]
    // showpreans.innerHTML = dataf[urlParams.get("allmode")][questionNumber]
    
    txtcss = document.querySelector('#txt_'+ allmode + num);
    console.log('#intro_'+ allmode + (num))
    document.querySelector('#intro_'+ allmode + (num)).style["display"] = 'block';
    console.log(document.querySelector('#intro_'+ allmode + (num)).style["display"])
    document.querySelector('#area_'+ allmode + (num)).style["display"] = 'block';
    document.querySelector('#txt_'+ allmode +  (num)).style["display"] = 'block';
    document.querySelector('#pre_'+ allmode + (num)).style["display"] = 'block';
   

    // showintro.innerHTML = dataf[urlParams.get("allmode")][questionNumber+1]
    // showcode.innerHTML = dataf[urlParams.get("allmode")][questionNumber+1]
    // showpre.innerHTML = dataf[urlParams.get("allmode")][questionNumber+1]
    // showpreans.innerHTML = dataf[urlParams.get("allmode")][questionNumber+1]

   
}


// btn.addEventListener('click', function handleClick() {
//     // 👇️ log value before clearing it
//     console.log(textarea.value);
  
//     // 👇️ clear textarea value
//     textarea.value = '';
//   });

function checkans(){
    const mode = allmode;
    const checktxt = txtcss;
    console.log(checktxt);
    fetch('./test.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data[mode])
        console.log(data[mode][num])
        const allans = data[mode][num];
        maxQuestion = data[mode]["max-question"];
        console.log(maxQuestion);
        dataf = data[mode];

        let c = "";
        let v = "";
        

        let fspace = /\s/g;
        for(let i = 0; i<(allans).length;i++){
            c += allans[i];
            console.log(c)
   
        }
        for(let i = 0; i<checktxt.value.length;i++){
            v += checktxt.value[i];
            console.log(v)

        }

        const ansInput = document.querySelector(`#txt_${allmode}${num}`)
        const ansUserList = ansInput.value.replace("\n", "").split(";")
        console.log(ansUserList)
        console.log(allans);

        let allAnsCheckArray = [...allans]
        let countCorrect = 0;
        ansUserList.forEach((ans) => {
            const ansTrim = ans.trim().toLowerCase();
            if (allAnsCheckArray.includes(ansTrim)) {
                countCorrect += 1;
                allAnsCheckArray = allAnsCheckArray.filter((ans) => ans != ansTrim)
            }
        })

        console.log(allans.length);
        console.log(countCorrect);

        let userAnsLength = ansUserList.length;
        if (ansUserList[ansUserList.length - 1] == "") {
            userAnsLength -= 1;
        }
        console.log(userAnsLength);

        if (allans.length == countCorrect && userAnsLength == allans.length) {
  
            alert("ยินดีด้วย คุณตอบถูก!")
            document.getElementById('pre_'+ allmode + num).style["display"] = 'none';
            document.getElementById('preans_'+ allmode + num).style["display"] = 'block';
            document.getElementById('btnnext').style["opacity"] = '1';

            roomsRef.child(codeRoom).once("value", (snapshot) => {
                const roomInfo = snapshot.val();
                if (roomInfo[`${playerNumber}-score`]) {
                    roomsRef.child(codeRoom).update({
                        [`${playerNumber}-score`]: roomInfo[`${playerNumber}-score`] + 1
                    })
                } else {
                    roomsRef.child(codeRoom).update({
                        [`${playerNumber}-score`]: 1
                    })
                }

                if (num == maxQuestion) {
                    if (roomInfo.winner == null) {
                        roomsRef.child(codeRoom).update({
                            winner: playerNumber
                        })
                    }
                    document.querySelector('#btnnext').innerHTML = "Finish";
                }
            })

            console.log(num) 
            document.querySelector('#btnsub').style["display"] = 'none';      
        }
        else if(!checktxt.value){
            alert("คุณยังไม่ได้กรอกคำตอบ")
        }
        else{
            alert("ลองใหม่อีกครั้งนะ!")
        } 

    })
}




// function runcode(){
//     let cssCode = document.getElementById("csstxt").value;
//     let output = document.getElementById("output");

//     const mode = "Selectors";
//         const order = "1";
//         fetch('./test.json')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             console.log(data[mode][order][1])
//             const allcode = data[mode][order][1]
            
//             output.contentDocument.body.innerHTML = allcode+"<style>"+cssCode+"</style>";
//         })

// }
        
        
        
        // let htmlCode = document.getElementById("htmlwindow").value;
            
            
      

    // let output = document.querySelector("#output").contentWindow.document;
    // output.open();
    // output.write(htmlCode+cssCode);
    // output.close();

    // document.querySelector("#html-code").addEventListener("keyup", runcode);
    // document.querySelector("#css-code").addEventListener("keyup", runcode);



//time//
// let timeSecond = 120;
// const timeH = document.querySelector("#timer");

// displayTime(timeSecond);

// const countDown = setInterval(() => {
// timeSecond--;
// displayTime(timeSecond);
// if (timeSecond == 0 || timeSecond < 1) {
//     endCount();
//     clearInterval(countDown);
// }
// }, 1000);

// function displayTime(second) {
// const min = Math.floor(second / 60);
// const sec = Math.floor(second % 60);
// timeH.innerHTML = `
// ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
// `;
// }

// function endCount() {
// timeH.innerHTML = "Time out";
// }


// let p = document.createElement('p')
//     p.innerHTML = "_"
//     css-code.appendChild(p)


// const txtcss = cssans.getAttribute("id");


// const txtcss2 = txtcss.value;

// btnNext.addEventListener('click',nextques);
// const btnNext = document.getElementById('btnnext');
// console.log(txtcss)
// console.log(txtcss2)


// let txtrea = ""
// txtcss.addEventListener("keyup", () =>{
//     console.log(txtcss.value)
//     txtrea += txtcss.value;
// });









// let questionNumber = 0;
//     const showintro = document.querySelector(".intro");
//     const showcode = document.querySelector(".csscode");
//     const showpre = document.querySelector(".preview");
//     const showpreans = document.querySelector(".preview");
// showQuestion();

// function showQuestion(){
//     document.getElementById('btnsub').style["display"] = '0';
//     document.getElementById('pre_flex' + num).style["display"] = 'none';
//     document.getElementById('preans_flex' + num).style["display"] = 'block';
//     document.getElementById('btnnext').style["display"] = 'block';
//     containerEl.innerHTML = questions[questionNumber].name;
//     const showintro = document.querySelector(".intro");
//     const showcode = document.querySelector(".csscode");
//     const showpre = document.querySelector(".preview");
//     const showpreans = document.querySelector(".preview");

// }

// const btnNext = document.querySelector("#btnNext");
// btnNext.addEventListener("click", (event) => {
//     questionNumber += 1;
//     showQuestion()
// })




// function CheckCssUpgrade(){
//     const cssInputs = cssUserEl.value.split("\n");
//     console.log(cssInputs);

//     let cssAnswers = ["text-align:center"];
//     cssInputs.forEach((input, index) => {
//         console.log(input);
//         let cssUserSplit = input.split(":")
//         console.log(cssUserSplit);
//         let cssKey = cssUserSplit[0].trim();
//         let cssValue = cssUserSplit[1].replace(";", "").trim();
//         console.log(cssKey, cssValue);


//         if (cssKey == cssAnswers[index].split(":")[0] &&  cssValue == cssAnswers[index].split(":")[1])
//         {
//             console.log("YES!");
//         }
//         else{
//             console.log("NO!");
//         }
//     })
// }






// let queryString = window.location.search;
// console.log(queryString);
// let query = new URLSearchParams(queryString);
// console.log(query.get("mode"));

// console.log(questions[query.get("mode")]);

// let questionNumber = 1;
// const showintro = document.querySelector(".intro");
// const showcode = document.querySelector(".csscode");
// const showpre = document.querySelector(".preview");
// const showpreans = document.querySelector(".preview");

// showQuestion();

// function showQuestion(){
//     console.log("container-" + questionNumber);
//     console.log("box-" + questionNumber);
//     console.log("prefix-" + questionNumber);
//     containerEl.innerHTML = questions[query.get("mode")][questionNumber].name;
// }

// const btnNext = document.querySelector("#btnNext");
// btnNext.addEventListener("click", (event) => {
//     questionNumber += 1;
//     showQuestion()
// })







//     })
// if(txtcss.value==allans[txtIndex]){
//     console.log(allans[txtIndex])
//     alert("correct!!");
// }
// else{
//     alert("Incorrect!!");
// }
// let datastr = data.val();
// let ans = datastr.ans;
// // console.log(datastr.img)
// test = ans
// // console.log(ansfill.hasChildNodes())
// for(let i = 0; i<ans.length;i++){
//     let p = document.createElement('p')
//     p.innerHTML = "_"
//     css-code.appendChild(p)
// }
//     })
// document.getElementById('cssans').value = "";


// console.log(data)
// console.log(data[mode][order])
// const allans = data[mode][order]
// let txtIndex = []
// if(txtcss.value==allans[txtIndex]){
//     console.log(allans[txtIndex])
//     alert("correct!!");
// }
// else{
//     alert("Incorrect!!");
// }
// };

//     let test = ""
//     $("#btnsub").click(() => {
//     // console.log(test)
//     const useranswer = document.getElementById('cssans').value
//     // const answerFeedback = document.querySelector("#feedback-msg-answer");
//     if(useranswer.toLowerCase() == test.toLowerCase()){
//         // When click and answer TRUE
//     refRooms.child(roomInfo.uid).child("tables").child($('#vocabModalLabel').val()).update({
//         own : roomInfo.turn
//     })
//     refRooms.child(roomInfo.uid).update({
//         turn: roomInfo.turn === "X" ? "O" : "X",
//         time: 59
//     })
//     answerFeedback.innerText = `NameTH : ${roomInfo["tables"][$("#vocabModalLabel").val()]["nameTH"]}`;
//     answerFeedback.style = `color:green`;
//     // setTimeout(() => {
//     $("#vocabModal").val("")
//     $("#vocabModal").modal("hide")
//     // }, 2000)
//     }
//     else{
//         answerFeedback.style = `color:crimson`;
//         answerFeedback.innerText = `Your answer is incorrect`;
//     }

// })