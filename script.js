// select the form
const form = document.querySelector("#signup");
const submit = document.querySelector("#submit");
const main = document.querySelector("main")[0];
let tasknumber = 1;
let tempObj = {};
let smile = document.querySelector("#smily").checked;

// get memory
const fetchMemory = () => {
  let tempArr = localStorage.getItem("task")
    ? JSON.parse(localStorage.getItem("task"))
    : [];
  return [...tempArr];
};

let createDivEl = () => {
  let list = "";
  for (let i = 0; i < taskArr.length; i++) {
    console.log(taskArr[i].task.smily);
    if (taskArr[i].smily) {
      list += `<div class="divTask container"><button class="removeBtn" onclick = deleteTask(${i}) >X</button><p>${taskArr[i].task}
        </p><p>${taskArr[i].date}
        </p><p>${taskArr[i].time}
        </p><canvas class = "mySmily" width="100" height="100" style="border:1px solid #000000;"></canvas></div></div>`;
    } else {
      list += `<div class="divTask container"><button class="removeBtn" onclick = deleteTask(${i}) >X</button><p>${taskArr[i].task}
        </p><p>${taskArr[i].date}
        </p><p>${taskArr[i].time}
        </p></div></div>`;
    }
    document.getElementById("notes").innerHTML = list;
    creatSmilyFace();
  }
};

let taskArr = fetchMemory();
createDivEl();
let removeBtn = document.querySelector(".removeBtn");
let divTask = document.querySelector(".divTask");

let deleteTask = (index) => {
  taskArr.splice(index, 1);
  localStorage.setItem("task", JSON.stringify(taskArr));
  // taskArr = fetchMemory();
  createDivEl();
};
// get new task
submit.onclick = () => {
  event.preventDefault();
  let task = document.querySelector("#assignment");
  let date = document.querySelector("#dateInput").value;
  let time = document.querySelector("#timeInput").value;
  let dateObj = new Date();
  console.log(task.value);
  if (!date) {
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    date = year + "/" + month + "/" + day;
  }
  if (!time) {
    time =
      dateObj.getHours() +
      ":" +
      dateObj.getMinutes() +
      ":" +
      dateObj.getSeconds();
  }
  if (document.querySelector("#smily:checked") !== null) {
    smile = true;
  } else {
    smile = false;
  }
  tempObj = {
    num: tasknumber,
    task: task.value,
    date: date,
    time: time,
    smily: smile,
  };
  taskArr.push(tempObj);
  localStorage.setItem("task", JSON.stringify(taskArr));
  createDivEl();
  tasknumber++;
};

function creatSmilyFace() {
  let f = document.querySelectorAll(".mySmily");
  for (let i = 0; i < f.length; i++) {
    let ctx = f[i].getContext("2d");
    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(35, 35, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
    ctx.arc(65, 35, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(50, 50, 25, 0, 1 * Math.PI);
    ctx.stroke();
  }
}
creatSmilyFace();
