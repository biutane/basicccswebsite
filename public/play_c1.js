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

let nextlevel1 = document.querySelector(".btnnext1");
let nextlevel2 = document.querySelector(".btnnext2");

nextlevel1.disabled = true;
nextlevel2.disabled = true;

roomsRef.child(codeRoom).on("value", (snapshot) => {
    const roomInfo = snapshot.val();
    console.log(roomInfo.status);
    if (roomInfo.status == "finish") {
        document.querySelector(".result-win").classList.remove("d-none");
        setTimeout(() => {
            window.location.href = `result.html?code=${codeRoom}`;
        }, 1000)
    }
    else if (roomInfo.status == "giveup") {
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
    if(allmode == "selector"){
        document.querySelector('#editor').style["display"] = 'none';
        document.querySelector('.all_editor').style["display"] = 'flex';
        document.querySelector('.preview_' + allmode).style["display"] = 'block';
        document.querySelector('#area_'+ allmode + num).style["display"] = 'block';
        document.querySelector('#html_'+ allmode + num).style["display"] = 'block';
        document.querySelector('#pre_'+ allmode + num).style["display"] = 'block';  

        document.querySelector('#intro_'+ allmode + num).style["display"] = 'block';
        document.querySelector('.btnsub1').style["display"] = 'block';
        document.querySelector('.btnnext2').style["display"] = 'block';

        document.querySelector('#suborder').innerHTML = num +'/'+ maxQuestion;

        txtcss = document.querySelector('#txt_' + roomInfo.category + num);
        console.log(txtcss.value)
    }

    else{
    document.querySelector('.preview_' + allmode).style["display"] = 'block';
    document.querySelector('#area_'+ allmode + num).style["display"] = 'block';
    document.querySelector('#pre_'+ allmode + num).style["display"] = 'block';  
    
    // console.log('#intro_'+ allmode + num)
    document.querySelector('#intro_'+ allmode + num).style["display"] = 'block';
    // console.log('#intro_'+ allmode + num)
    document.querySelector('.btnsub1').style["display"] = 'block';
    document.querySelector('.btnnext1').style["display"] = 'block';

    document.querySelector('#suborder').innerHTML = num +'/'+ maxQuestion;

   
    
    txtcss = document.querySelector('#txt_' + roomInfo.category + num);
    console.log(txtcss.value)
    
    // showQuestion();
    txtcss.addEventListener('input', function handleChange(event) {
        console.log(event.target.value);
      });
    }
}

console.log(dataf[urlParams.get("allmode")]);


const btnans = document.querySelector('.btnsub1');

btnans.addEventListener('click',checkans);

console.log(btnans)
console.log('')

const btngo1 = document.querySelector(".btnnext1");
console.log(btngo1)

const btnsubs = document.querySelectorAll(".btnsub2");
btnsubs.forEach((btn) => {
  btn.addEventListener("click", checkans);
})
// console.log(clearans.value)



btngo1.addEventListener("click", (event) => {
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

const btngo2 = document.querySelector(".btnnext2");
btngo2.addEventListener("click", (event) => {
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


// allmode = "selector"
function showQuestion(){
    // clearans.value = '';
    if (allmode == "selector"){
        document.querySelector('#editor').style["display"] = 'none';
        document.querySelector('.all_editor').style["display"] = 'flex';
        document.querySelector('.btnsub2').style["display"] = 'block';
        document.querySelector('.btnnext2').style["opacity"] = '0.5';
        document.querySelector('#intro_'+ allmode + (num-1)).style["display"] = 'none';
        document.querySelector('#area_'+ allmode + (num-1)).style["display"] = 'none';
        document.querySelector('#html_'+ allmode + (num-1)).style["display"] = 'none';
        document.querySelector('#txt_'+ allmode + (num-1)).style["display"] = 'none';
        console.log('#area_'+ allmode + (num-1))
        document.querySelector('#preans_'+ allmode + (num-1)).style["display"] = 'none';
        
        nextlevel1.disabled = true;
        nextlevel2.disabled = true;
        
        txtcss = document.querySelector('#txt_'+ allmode + num);
        console.log('#intro_'+ allmode + (num))
        document.querySelector('#intro_'+ allmode + (num)).style["display"] = 'block';
        console.log(document.querySelector('#intro_'+ allmode + (num)).style["display"])
        document.querySelector('#area_'+ allmode + (num)).style["display"] = 'block';
        document.querySelector('#html_'+ allmode + (num)).style["display"] = 'block';
        document.querySelector('#txt_'+ allmode +  (num)).style["display"] = 'block';
        document.querySelector('#pre_'+ allmode + (num)).style["display"] = 'block';
    }
    else{
    console.log('#area_'+ allmode + (num-1) + ', textarea')
    // console.log(clearans)
    document.querySelector('.btnsub1').style["display"] = 'block';
    document.querySelector('.btnnext1').style["opacity"] = '0.5';
    // console.log(document.querySelector('#btnnext').style["opacity"])
    document.querySelector('#intro_'+ allmode + (num-1)).style["display"] = 'none';
    document.querySelector('#area_'+ allmode + (num-1)).style["display"] = 'none';
    document.querySelector('#txt_'+ allmode + (num-1)).style["display"] = 'none';
    console.log('#area_'+ allmode + (num-1))
    // document.querySelector('#pre_'+ allmode + (num-1)).style["display"] = 'none';
    document.querySelector('#preans_'+ allmode + (num-1)).style["display"] = 'none';
    
    nextlevel1.disabled = true;
    nextlevel2.disabled = true;
    
    txtcss = document.querySelector('#txt_'+ allmode + num);
    console.log('#intro_'+ allmode + (num))
    document.querySelector('#intro_'+ allmode + (num)).style["display"] = 'block';
    console.log(document.querySelector('#intro_'+ allmode + (num)).style["display"])
    document.querySelector('#area_'+ allmode + (num)).style["display"] = 'block';
    document.querySelector('#txt_'+ allmode +  (num)).style["display"] = 'block';
    document.querySelector('#pre_'+ allmode + (num)).style["display"] = 'block';
    }
   
}


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
        const ansUserList = ansInput.value.trim().replace("\n", "").split(";")
        console.log(ansUserList)
        const ansUserListFilter = ansUserList.filter((ans) => ans.trim() != "")
        console.log(ansUserListFilter);
        console.log(allans);
        
        let allAnsCheckArray = [...allans]
        let countCorrect = 0;
        ansUserList.forEach((ans) => {
            const ansTrim = ans.trim().toLowerCase();
            const ansSplits = ansTrim.split(":");
            let ansTrimNew;
            if (allmode == "selector"){
                ansTrimNew = ansTrim
            }
            else{
                ansTrimNew = `${ansSplits[0]?.trim()}:${ansSplits[1]?.trim()}`
            }
       
            console.log(ansTrimNew);
            if (allAnsCheckArray.includes(ansTrimNew)) {
                countCorrect += 1;
                allAnsCheckArray = allAnsCheckArray.filter((ans) => ans != ansTrim)
            }
        })
        
        console.log(allans.length);
        console.log(countCorrect);
        
        let userAnsLength = ansUserListFilter.length;
        console.log(userAnsLength);

        if (allans.length == countCorrect && userAnsLength == allans.length) {
            alert("ยินดีด้วย คุณตอบถูก!")
            // document.getElementById('pre_'+ allmode + num).style["display"] = 'none';
            document.getElementById('pre_'+ allmode + num).classList.add("close");
            document.getElementById('preans_'+ allmode + num).style["display"] = 'block';

            nextlevel1.disabled = false;
            if(allmode == "selector"){
                document.querySelector('.btnnext2').style["opacity"] = '1';
                document.querySelector('.btnnext2').style["cursor"] = 'pointer';
                nextlevel2.disabled = false;
            }
            else{
                document.querySelector('.btnnext1').style["opacity"] = '1';
                document.querySelector('.btnnext1').style["cursor"] = 'pointer';
                nextlevel1.disabled = false;
            }

            
            

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
                    if(allmode == "selector"){
                        document.querySelector('.btnnext2').innerHTML = "Finish";
                    }
                    else{
                        document.querySelector('.btnnext1').innerHTML = "Finish";
                    }
                  
                }
            })

            console.log(num) 
            if(allmode == "selector"){
                document.querySelector('.btnsub2').style["display"] = 'none';
            }
            else{
                document.querySelector('.btnsub1').style["display"] = 'none';
            }
          
            // document.querySelector('.btnsub').style["display"] = 'none';  

        }
        else if(!checktxt.value){
            alert("คุณยังไม่ได้กรอกคำตอบ")
            nextlevel1.disabled = true;
            nextlevel2.disabled = true;
        }
        else{
            alert("ลองใหม่อีกครั้งนะ!")
            nextlevel1.disabled = true;
            nextlevel2.disabled = true;
        } 

    })
}

const btnBack = document.querySelector(".btnmenu");
btnBack.addEventListener("click", () => {
    roomsRef.child(codeRoom).once("value", (snapshot) => {
            roomsRef.child(codeRoom).update({
                winner: playerNumber == "uid1" ? "uid2" : "uid1",
                status: "giveup"
                
            })

    });
})
