let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let Colors = ["red", "yellow", "green", "purple"];

let msg = document.getElementById("msg");
let Allbtns = document.getElementsByClassName("btn");

document.addEventListener("keypress", function () {
  if (!started) {
    started=true;
    console.log("The game is Started");
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("gameflash");
  started = true;
  setTimeout(() => {
    btn.classList.remove("gameflash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 200);
}

function levelUp() {
  userSeq=[];
  level++;
  msg.textContent = `Level-${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randCol = Colors[randIdx];
  let randBtn = document.querySelector(`.${randCol}`);

  gameSeq.push(randCol);
  gameFlash(randBtn);
}

for (btn of Allbtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  if(!started)return;
  userFlash(this);

  let userColor = this.getAttribute("id");
  userSeq.push(userColor);
   
  checkAns(userSeq.length-1);
}

function checkAns(idx){

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        msg.innerHTML=`Game Over! Your score is <span>${level-1}</span> Press any key to start again`;
        document.body.style.backgroundColor="red";
        setTimeout(()=>{
          document.body.style.backgroundColor="white";
        },150)
        reset();
    }
}

function reset(){
    level=0;
    gameSeq=[];
    userSeq=[];
    started=false;
}
