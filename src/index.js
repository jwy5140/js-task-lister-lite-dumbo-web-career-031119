
//loads task submission form, fetches descriptionsList of already existant tasks, awaits task submission

let taskForm = document.getElementById("create-task-form");
let descriptionsList = document.getElementById("descriptionsList");
let taskDashboard = document.getElementById("dashboard");
let taskList = document.getElementById("main-content");
let dashID = document.getElementById("")

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
  .then(taskButtonsList)
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
    showDashboard(event.currentTarget.id);
  }
  else if (event.currentTarget.id !== taskDashboard.firstChild.className)
  {
    taskList.className = "selection";
    dashboard.className = "hidden";
  }

};

const showDashboard = (id) => {
  return fetch(`http://localhost:3000/tasks/${id}`)
  .then(resp => resp.json())
  .then(json => {
    createDashboard(json);
  }
  )
};

const createDashboard = (task) => { //clean up this section?
  document.querySelector("h1#dashtitle").innerHTML = `TASK: ${task.description}`;
  document.querySelector("div#details").innerHTML = `${task.details}`;
  document.querySelector("div#location").innerHTML = `${task.location}`;
  document.querySelector("div#reminder").innerHTML = `${task.reminder}`;
  dashboard.addEventListener("click", editDashboard);
};

const taskButtonsList = () => {
  let allButtons = document.querySelectorAll('.mainlist');
  allButtons.forEach(function(button){
    button.addEventListener("click", openTaskDashboard);
  })
}

const editDashBoard = () => {
  if (event.target.id === "details")
  {
    
  }
  else if (event.target.id === "location")
  {

  }
  else if (event.target.id === "reminder")
}
// add edit button to dashboard
// add delete button to dashboard
// const createTask = () => {

// }

//task description -> task details -> location details -> set reminder
//selection changes body in "main content" to be in "selection"