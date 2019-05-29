
//loads task submission form, fetches descriptionsList of already existant tasks, awaits task submission

const taskForm = document.getElementById("create-task-form");
const descriptionsList = document.getElementById("descriptionsList");
const taskDashboard = document.getElementById("dashboard");
const taskList = document.getElementById("main-content");
const title = document.getElementById("title");
// const dashID = document.getElementById("")


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
    title.className = "roygbiv";
  }
  else if (event.currentTarget.id !== taskDashboard.firstChild.className)
  {
    taskList.className = "selection";
    dashboard.className = "hidden";
    title.className = "";
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
  let details = document.querySelector("button#details")
  let location = document.querySelector("button#location")
  let reminder = document.querySelector("button#reminder")
  details.innerHTML = `${task.details}`;
  location.innerHTML = `${task.location}`;
  reminder.innerHTML = `${task.reminder}`;
  dashboard.addEventListener("click", () => {
    if (event.target.id === "details")
    {
      debugger;
      details = `
      <div>
      <form_tag action="http://localhost:3000/tasks" method="post">
      <text_field_tag name = "country" placeholder="Country">
      <text_field_tag name = "state" placeholder="State">
      <text_field_tag name = "city" placeholder="City">
      <textarea_tag name = "additional" placeholder="Enter additional information here...">
      <submit_tag name="submit">
      </form_tag>
      </div>`
    }
    else if (event.target.id === "location")
    {
  
    }
    else if (event.target.id === "reminder")
    {
      
    }
  });
};

const taskButtonsList = () => {
  let allButtons = document.querySelectorAll('.mainlist');
  allButtons.forEach(function(button){
    button.addEventListener("click", openTaskDashboard);
  })
}

// const editDashboard = (event, location) => {
//   if (event.target.id === "details")
//   {
//     location.innerHTML = `
//     <form_tag action="http://localhost:3000/tasks" method="post">
//     <text_field_tag name = "country" placeholder="Country">
//     <text_field_tag name = "state" placeholder="State">
//     <text_field_tag name = "city" placeholder="City">
//     <textarea_tag name = "additional" placeholder="Enter additional information here...">
//     <submit_tag name="submit">
//     </form_tag>`
//   }
//   else if (event.target.id === "location")
//   {

//   }
//   else if (event.target.id === "reminder")
//   {
    
//   }
// }
// add edit button to dashboard
// add delete button to dashboard
// const createTask = () => {

// }

//task description -> task details -> location details -> set reminder
//selection changes body in "main content" to be in "selection"