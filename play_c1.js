
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


// var p = document.createElement('p')
//     p.innerHTML = "_"
//     css-code.appendChild(p)


// const txtcss = cssans.getAttribute("id");


// const txtcss2 = txtcss.value;
const txtcss = document.getElementById('csstxt');
// const txtcss2 = txtcss.value;

console.log(txtcss.value)
const btnans = document.getElementById('btnsub');

btnans.addEventListener('click',checkans);
// console.log(txtcss)
// console.log(txtcss2)

function checkans(){
const mode = "Selectors";
const order = "1";
fetch('./test.json')
.then(response => response.json())
.then(data => {
    console.log(data)
    console.log(data[mode][order][0])
    const allans = data[mode][order][0]
    // let txtIndex = []
    c = ""
    v = ""
    p = 0
    for(let i = 0; i<(allans).length;i++){
        c += allans[i];
        // console.log(allans[i])
    }
    for(let i = 0; i<txtcss.value.length;i++){
        v += txtcss.value[i];
        // p += i
        // console.log(p)
        // console.log(v)
    }
    if(c.toLowerCase().replace(/\s/g,'') === v.toLowerCase().replace(/\s/g,'')){
        alert("ยินดีด้วย คุณช่วยเจ้าหมีได้สำเร็จ")
        document.getElementById('bear').style["align-items"] = 'flex-end';
        document.getElementById('btnsub').style["opacity"] = '1';

    }
    else if(!txtcss.value){
        document.getElementById('editor').style["align-items"] = 'flex-end';
        alert("คุณยังไม่ได้กรอกข้อมูล")
    }
    else{
        alert("คุณตอบคำถามไม่ถูกต้อง ลองใหม่อีกครั้งนะ")
    } 
})
}



//     })
// if(txtcss.value==allans[txtIndex]){
//     console.log(allans[txtIndex])
//     alert("correct!!");
// }
// else{
//     alert("Incorrect!!");
// }
// var datastr = data.val();
// var ans = datastr.ans;
// // console.log(datastr.img)
// test = ans
// // console.log(ansfill.hasChildNodes())
// for(let i = 0; i<ans.length;i++){
//     var p = document.createElement('p')
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

//     var test = ""
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