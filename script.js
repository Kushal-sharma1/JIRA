const addbtn = document.querySelector(".add-btn");
const modalcont =document.querySelector(".modal-cont");
let colors =['lightpink','lightgreen','lightblue','black'];
let modalColor = colors[colors.length-1];
const mainCont =document.querySelector(".main-cont");
const textArea =document.querySelector("textarea");

let isModal =false;
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

function createTicket(ticketColor,data){
let ticket = document.createElement("div");
ticket.setAttribute("class","ticket-cont");
ticket.innerHTML=`
<div class ="ticket-color ${ticketColor}"></div>
<div class="ticket-id"></div>
<div class="task-area">${data}</div>
`
mainCont.appendChild(ticket);
}



