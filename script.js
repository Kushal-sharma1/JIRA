var uid = new ShortUniqueId();
const addbtn = document.querySelector(".add-btn");
const modalcont =document.querySelector(".modal-cont");
let colors =['lightpink','lightgreen','lightblue','black'];
let modalColor = colors[colors.length-1];
const mainCont =document.querySelector(".main-cont");
const textArea =document.querySelector("textarea");
let ticketArr=[];
let toolBoxColor =document.querySelectorAll(".toolbox-color-cont>*");
let removeBtn = document.querySelector(".remove-btn");
let isModal =false;
//event on add button for creating displaying textarea
addbtn.addEventListener("click",function(){
  if(!isModal){
  modalcont.style.display="flex";
  }else{
    modalcont.style.display="none";
  }  
  isModal=!isModal;
});

const allPriorityColor = document.querySelectorAll(".priority-color");
allPriorityColor.forEach(function(colorele){
colorele.addEventListener("click",function(){
allPriorityColor.forEach(function(priorityColor){
    priorityColor.classList.remove("active");
})
 colorele.classList.add("active");
 modalColor=colorele.classList[0];
})

})

modalcont.addEventListener("keydown",function(e){
if(e.key=="Shift"){
// console.log(modalColor);
// console.log(textArea.value);
createTicket(modalColor,textArea.value);
modalcont.style.display="none";
isModal=false;
textArea.value="";
allPriorityColor.forEach(function(colorele){
    colorele.classList.remove('active');
})
}
})

function createTicket(ticketColor,data,ticketId){
let id = ticketId || uid();
let ticket = document.createElement("div");
ticket.setAttribute("class","ticket-cont");
ticket.innerHTML=`
<div class ="ticket-color ${ticketColor}"></div>
<div class="ticket-id">${id}</div>
<div class="task-area">${data}</div>
`
mainCont.appendChild(ticket);
handleRemove(ticket,id);
handleColor(ticket,id);
if(!ticketId){
  ticketArr.push(
   { ticketColor,
    data,
    ticketId:id
   }
  );
  localStorage.setItem("tickets",JSON.stringify(ticketArr));
}
}
//load previous content
if(localStorage.getItem("tickets")){
  ticketArr=JSON.parse(localStorage.getItem("tickets"));
  ticketArr.forEach(
    function (obj){
      createTicket(obj.ticketColor,obj.data,obj.ticketId);
    }
  )
}

// filter on color
for(let i=0;i<toolBoxColor.length;i++){
toolBoxColor[i].addEventListener("click",function(){
let targetColor =toolBoxColor[i].classList[0];
let filteredArr = ticketArr.filter(function( tickobj){
return (tickobj.ticketColor==targetColor) ;
});
let ticketCont =document.querySelectorAll(".ticket-cont");
//remove all tickets
for(let j=0;j<ticketCont.length;j++){
  ticketCont[j].remove();
}

//display targetcolor tickets
filteredArr.forEach(
  function (creatObj){
   createTicket(creatObj.ticketColor,creatObj.data,creatObj.ticketId);

  }
);

})

toolBoxColor[i].addEventListener("dblclick",function(){
let ticketCont =document.querySelectorAll(".ticket-cont");
//remove all tickets
for(let j=0;j<ticketCont.length;j++){
  ticketCont[j].remove();
}
//display all Tickets
ticketArr.forEach(
  function (creatObj){
   createTicket(creatObj.ticketColor,creatObj.data,creatObj.ticketId);

  }
);
  
})

}

// remove element 

let removeBtnActive =false;
removeBtn.addEventListener("click",function(){
    if(removeBtnActive){
      removeBtn.style.color="white";
    }else{
      removeBtn.style.color="red";
    }
  removeBtnActive = !removeBtnActive;
});

//give index from ticketArr (on the basis of id)

function getIdx(id){
let idx =ticketArr.findIndex(function(tickObj){
  return tickObj.ticketId==id ;
})
return idx;
}
//remove tickets 
function handleRemove(ticket,id){
ticket.addEventListener("click",function(){
if(!removeBtnActive) return;
let idxID = getIdx(id);
ticketArr.splice(idxID,1);
//update in local Storage
localStorage.setItem("tickets",JSON.stringify(ticketArr));
//update main-contain
ticket.remove();
});

}

// change the ticket color (or priority color)

function handleColor(ticket ,id){
let ticketStrip =ticket.querySelector(".ticket-color");
ticketStrip.addEventListener("click",function(){
let currColor = ticketStrip.classList[1];
let currColorIndx= colors.indexOf(currColor);
let newColorIndx = (currColorIndx+1)%colors.length;
//update color in tickets
ticketStrip.classList.remove(currColor);
ticketStrip.classList.add(colors[newColorIndx]);
//update color in local storage
let indxID =getIdx(id);
ticketArr[indxID].ticketColor=colors[newColorIndx];
localStorage.setItem("tickets",JSON.stringify(ticketArr));

});

}