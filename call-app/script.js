//Variable Declaration and Selections
let addbtn=document.querySelector("#add-note");
let formContainer=document.querySelector(".form-container");
let closeForm=document.querySelector(".closeForm");
let form=document.querySelector("form");

const imageUrlInput=form.querySelector(
    "input[placeholder='https://example.com/photo.jpg']"
);

const fullNameInput=form.querySelector(
    "input[placeholder='Enter full name']"
);

const homeTownInput=form.querySelector(
    "input[placeholder='Enter home town']"
);

const purposeInput=form.querySelector(
    "input[placeholder='e.g., Quick appointment note']"
);

const categoryRadios=form.querySelectorAll("input[name='category']");

const submitButton=form.querySelector(".submit-btn");

const stack=document.querySelector(".stack");

const upBtn=document.querySelector("#upBtn");
const downBtn=document.querySelector("#downBtn");

//Coding 
addbtn.addEventListener("click",function(){
    formContainer.style.display="block";
});

closeForm.addEventListener("click",function(){
    formContainer.style.display="none";
});

function saveToLocalStorage(obj){
    if(localStorage.getItem("tasks")===null){
        let oldTask=[];
        oldTask.push(obj);
        localStorage.setItem("tasks",JSON.stringify(oldTask));
    }else
    {
        let oldTask=localStorage.getItem("tasks");
        oldTask=JSON.parse(oldTask);
        oldTask.push(obj);
        localStorage.setItem("tasks",JSON.stringify(oldTask));
    }
}

form.addEventListener("submit",function(e){
    e.preventDefault();

    let imageUrl=imageUrlInput.value.trim();
    let fullName=fullNameInput.value.trim();
    let homeTown=homeTownInput.value.trim();
    let purpose=purposeInput.value.trim();

    let selected=false;
    // categoryRadios.forEach(function(cat){
    //     if(cat.checked)
    //     {
    //         selected=cat.value;
    //     }
    // });

    categoryRadios.forEach(function(cat){
        if(cat.checked){
            selected=cat.value;
        }
    });

    if(imageUrl==""){
        alert("Enter ImageURL");
    }
    
    if(fullName==""){
        alert("Enter FullName");
    }

    if(homeTown==""){
        alert("Enter home Town");
    }

    if(purpose==""){
        alert("Enter purpose");
    }

    if(!selected){
        alert("Select Category");
    }

    saveToLocalStorage({
        imageUrl,
        fullName,
        homeTown,
        purpose,
        selected
    });

    form.reset();
    formContainer.style.display="none";
    showCard();
});

function showCard(){
    stack.innerHTML="";

    let allTasks=JSON.parse(localStorage.getItem("tasks"));

    allTasks.forEach(function(task){

        let card=document.createElement("div");
        card.classList.add("card");

        
        let avatar=document.createElement("img");
        avatar.src=task.imageUrl;
        avatar.classList.add("avatar");

        let name=document.createElement("h2");
        name.textContent=task.fullName;
        name.classList.add("h2");

        let homeTownInfo=document.createElement("div");
        homeTownInfo.classList.add("info");
        let homeTownLabel=document.createElement("span");
        homeTownLabel.textContent="HomeTown";
        let homeTownValue=document.createElement("span");
        homeTownValue.textContent=task.homeTown;
        homeTownInfo.appendChild(homeTownLabel);
        homeTownInfo.appendChild(homeTownValue);

        let purposeInfo=document.createElement("div");
        purposeInfo.classList.add("info");
        let purposeLabel=document.createElement("span");
        purposeLabel.textContent="purpose";
        let purposeValue=document.createElement("span");
        purposeValue.textContent=task.purpose;
        purposeInfo.appendChild(purposeLabel);
        purposeInfo.appendChild(purposeValue);

        let buttonsDiv=document.createElement("div");
        buttonsDiv.classList.add("buttons");
        let callBtn=document.createElement("button");
        callBtn.classList.add("call");
        callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';
        let msgBtn=document.createElement("button");
        msgBtn.classList.add("msg");
        msgBtn.textContent="Message";
        buttonsDiv.appendChild(callBtn);
        buttonsDiv.appendChild(msgBtn);

        card.appendChild(avatar);       
        card.appendChild(name);    
        card.appendChild(homeTownInfo);       
        card.appendChild(purposeInfo);       
        card.appendChild(buttonsDiv);
        stack.appendChild(card);      
    });
}
showCard();

upBtn.addEventListener("click",function(e){
    let lastChild=stack.lastElementChild;
    if(lastChild){
        stack.insertBefore(lastChild,stack.firstElementChild);
    }
});

downBtn.addEventListener("click",function(e){
    let firstChild=stack.firstElementChild;
    if(firstChild){
        stack.appendChild(firstChild);
    }
});



/* 
optimized code 

// DOM Selections
const addbtn = document.querySelector("#add-note");
const formContainer = document.querySelector(".form-container");
const closeForm = document.querySelector(".closeForm");
const form = document.querySelector("form");

const inputs = {
  imageUrl: form.querySelector("input[placeholder='https://example.com/photo.jpg']"),
  fullName: form.querySelector("input[placeholder='Enter full name']"),
  homeTown: form.querySelector("input[placeholder='Enter home town']"),
  purpose: form.querySelector("input[placeholder='e.g., Quick appointment note']"),
};

const categoryRadios = form.querySelectorAll("input[name='category']");
const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

// Show/Hide Form
addbtn.addEventListener("click", () => formContainer.style.display = "block");
closeForm.addEventListener("click", () => formContainer.style.display = "none");

// Save to Local Storage
function saveToLocalStorage(obj) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Form Submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = {
    imageUrl: inputs.imageUrl.value.trim(),
    fullName: inputs.fullName.value.trim(),
    homeTown: inputs.homeTown.value.trim(),
    purpose: inputs.purpose.value.trim(),
    selected: [...categoryRadios].find(r => r.checked)?.value || ""
  };

  // Validation
  for (const key in task) {
    if (!task[key]) {
      alert(`Please fill: ${key}`);
      return;
    }
  }

  saveToLocalStorage(task);
  form.reset();
  formContainer.style.display = "none";

  showCard();
});

// Show Cards
function showCard() {
  stack.innerHTML = "";
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  allTasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${task.imageUrl}" class="avatar" />
      <h2 class="h2">${task.fullName}</h2>

      <div class="info">
        <span>HomeTown:</span>
        <span>${task.homeTown}</span>
      </div>

      <div class="info">
        <span>Purpose:</span>
        <span>${task.purpose}</span>
      </div>

      <div class="buttons">
        <button class="call"><i class="ri-phone-line"></i> Call</button>
        <button class="msg">Message</button>
      </div>
    `;

    stack.appendChild(card);
  });
}
showCard();

// Move Cards
upBtn.addEventListener("click", () => {
  const last = stack.lastElementChild;
  if (last) stack.prepend(last);
});

downBtn.addEventListener("click", () => {
  const first = stack.firstElementChild;
  if (first) stack.append(first);
});

*/ 