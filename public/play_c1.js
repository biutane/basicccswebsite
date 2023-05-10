const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const allmode = urlParams.get('allmode')
console.log(allmode);



let dataf = "";
let num = 1;


console.log(dataf[urlParams.get("allmode")]);

let questionNumber = 1;
const showintro = document.querySelector(".intro");
console.log(showintro)

const showcode = document.querySelector(".areacode");
console.log('#intro_'+ allmode + questionNumber)
const showpre = document.querySelector(".preview");
const showpreans = document.querySelector(".preview");

document.querySelector('#intro_'+ allmode + num).style["display"] = 'block';
console.log('#intro_'+ allmode + num)
document.querySelector('#pre_'+ allmode + num).style["display"] = 'block';
document.querySelector('#area_'+ allmode + num).style["display"] = 'block';




// let txtcss = document.querySelector('#txt_' + allmode + num);
// console.log('#txt_' + allmode + num)




// const txtcss2 = txtcss.value;


let txtcss = document.querySelector('#txt_' + allmode + num);
console.log(txtcss.value)



txtcss.addEventListener('input', function handleChange(event) {
    console.log(event.target.value);
  });

// console.log('hello ' + $('#txt_' + allmode + num).val())
const btnans = document.querySelector('#btnsub');

btnans.addEventListener('click',checkans);


console.log('')

const btnNext = document.querySelector("#btnnext");
// console.log(clearans)


// console.log(clearans.value)

btnNext.addEventListener("click", (event) => {
    let clearans = document.querySelector('#txt_'+ allmode + questionNumber);
    clearans.value ='';
    console.log(clearans.value) 
    txtcss = document.querySelector('#txt_'+ allmode + num);
    console.log(txtcss.value) 
    
    // clearans.querySelector()
    // clearans = txtcss.value;
    showQuestion();
    questionNumber += 1;

});


function showQuestion(){
    // clearans.value = '';
    console.log('#area_'+ allmode + questionNumber + ', textarea')
    // console.log(clearans)
    document.querySelector('#btnsub').style["opacity"] = '1';
    document.querySelector('#btnnext').style["opacity"] = '0.5';
    // console.log(document.querySelector('#btnnext').style["opacity"])
    document.querySelector('#intro_'+ allmode + questionNumber).style["display"] = 'none';
    document.querySelector('#area_'+ allmode + questionNumber).style["display"] = 'none';
    document.querySelector('#txt_'+ allmode + questionNumber).style["display"] = 'none';
    console.log('#area_'+ allmode + questionNumber)
    document.querySelector('#preans_'+ allmode + questionNumber).style["display"] = 'none';
    
    
   
    
    // showintro.innerHTML = dataf[urlParams.get("allmode")][questionNumber]
    // showcode.innerHTML = dataf[urlParams.get("allmode")][questionNumber]
    // showpre.innerHTML = dataf[urlParams.get("allmode")][questionNumber]
    // showpreans.innerHTML = dataf[urlParams.get("allmode")][questionNumber]

    console.log('#intro_'+ allmode + (questionNumber+1))
    document.querySelector('#intro_'+ allmode + (questionNumber+1)).style["display"] = 'block';
    console.log(document.querySelector('#intro_'+ allmode + (questionNumber+1)).style["display"])
    document.querySelector('#area_'+ allmode + (questionNumber+1)).style["display"] = 'block';
    document.querySelector('#txt_'+ allmode +  (questionNumber+1)).style["display"] = 'block';
    document.querySelector('#pre_'+ allmode + (questionNumber+1)).style["display"] = 'block';

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

    console.log(checkans)
    fetch('./test.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data[mode])
        console.log(data[mode][num])
        const allans = data[mode][num];
        dataf = data[mode];

        let c = "";
        let v = "";
        
        // let qnum = "intro_flex";
        // let area = "area_flex";
        // let preans1 = "pre_flex";
        // let preans2 = "preans_flex";
        let fspace = /\s/g;
        for(let i = 0; i<(allans).length;i++){
            c += allans[i];
            console.log(c)
            // console.log(allans[i])
        }
        for(let i = 0; i<checktxt.value.length;i++){
            v += checktxt.value[i];
            console.log(v)
            // p += i
            // console.log(p)
            // console.log(v)
        }
        // for(let i = 0; i<16;i++){
        //     let txti =  i.toString();
        //     qnum += txti;
        //     area += txti;
        //     preans1 += txti;
        //     preans2 += txti;
        // }
            
        // btnNext.disabled = true;
        console.log('#txt_' + allmode + num)
        console.log(txtcss.value)


        if(c.toLowerCase().replace(/\s/g,'') == v.toLowerCase().replace(/\s/g,'')){
            // alert("ยินดีด้วย คุณช่วยเจ้าหมีได้สำเร็จ")
            // btnNext.disabled = false;
            document.querySelector('#btnsub').style["opacity"] = '1';
            document.querySelector('#pre_'+ allmode + (num)).style["display"] = 'none';
            document.querySelector('#preans_'+ allmode + (num)).style["display"] = 'block';
            document.querySelector('#btnnext').style["opacity"] = '1';
            

            num += 1;
            console.log(num) 
            document.querySelector('#btnsub').style["opacity"] = '0';
            // txtcss.value = '';
            
            
        }
        else if(!checktxt.value){
            // btnNext.disabled = true;
            // btnans.disabled = true;
     
            alert("No")
        }
        else{
            // btnNext.disabled = true;
            // btnans.disabled = true;
            // btnNext.disabled = true;
            alert("wrong")
        } 
        
    })
    // document.querySelector('#txt_' + allmode + num).value ='';
    // console.log(txtcss.value)
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