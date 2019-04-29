
//loads task submission form, fetches descriptionsList of already existant tasks, awaits task submission

let taskForm = document.getElementById("create-task-form");
let descriptionsList = document.getElementById("descriptionsList");
let taskDashboard = document.getElementById("dashboard");
let taskList = document.getElementById("main-content");

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/tasks")
    .then(resp => resp.json())
    .then(json => json.forEach(function(task){
      descriptionsList.innerHTML += taskButton(task);}))
    .then(() => {
      let allButtons = document.querySelectorAll('.mainlist');
      allButtons.forEach(function(button){
        button.addEventListener("click", openTaskDashboard);
      })
    });

  taskForm.addEventListener("submit", addSubmittedTask);
});

function addSubmittedTask(event){

  event.preventDefault();

  return fetch("http://localhost:3000/tasks", {
    method:"post",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      description: event.target.task_description.value,
      details: "No Details Yet!",
      location: "No Location Yet!",
      reminder: "No Reminder Yet!"
    })
  })
  .then(resp => resp.json())
  .then(json => {
    descriptionsList.innerHTML += taskButton(json)
  })
  .then(() => {
    let allButtons = document.querySelectorAll('.mainlist');
    allButtons.forEach(function(button){
      button.addEventListener("click", openTaskDashboard);
    })
  })
  .catch(error => console.log(error.message));
};

const taskButton = (task) => {
  return `<li><button class="mainlist" id="${task.id}"><span>${task.description}</span></button></li>`;
};

const openTaskDashboard = (event) => {
  if (taskList.className === "selection")
  {
    taskList.className = "openSelection";
    dashboard.className = "gui";
    createDashboard(event.currentTarget.id);
  }
  else
  {
    taskList.className = "selection";
    dashboard.className = "hidden";
  }

};

const createDashboard = (id) => {
  return fetch(`http://localhost:3000/tasks/${id}`)
  .then(resp => resp.json())
  .then(json => {
    document.querySelector("h1#dashtitle").innerHTML = `TASK: ${json.description}`;
    document.querySelector("div#details").innerHTML = `${json.details}`;
    document.querySelector("div#location").innerHTML = `${json.location}`;
    document.querySelector("div#reminder").innerHTML = `${json.reminder}`;
  }
  )
};

// add edit button to dashboard
// add delete button to dashboard
// const createTask = () => {

// }

//task description -> task details -> location details -> set reminder
//selection changes body in "main content" to be in "selection"