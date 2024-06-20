const inputBox = document.getElementById("input-box");
const deadlineBox = document.getElementById("deadline");
const priorityBox = document.getElementById("priority");
const labelBox = document.getElementById("label");
const listContainer = document.getElementById("list-container");
const progressContainer = document.getElementById("progress");

function addTask(){
     if(inputBox.value ===''){
        alert("You must write something!");
     } else {
        let li = document.createElement("li");

        // Create task content with priority, deadline, and label
        li.innerHTML = `${inputBox.value} 
                        <br> <small>Deadline: ${deadlineBox.value || 'None'} 
                        | Priority: ${priorityBox.value} 
                        | Label: ${labelBox.value}</small>`;
        
        listContainer.appendChild(li);

        // Create and append the delete button (span) to the task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for multiplication sign (×)
        li.appendChild(span);

        // Clear input fields
        inputBox.value = "";
        deadlineBox.value = "";
        priorityBox.value = "Medium";
        labelBox.value = "";

        saveData();
        updateProgress();
    }
}

// Event listener for checking off or deleting tasks
listContainer.addEventListener("click", function(e){
   if(e.target.tagName === "LI"){
      e.target.classList.toggle("checked");
      saveData();
      updateProgress();
   } else if (e.target.tagName === "SPAN"){
      e.target.parentElement.remove();
      saveData();
      updateProgress();
   }
}, false);

// Function to save tasks
function saveData(){
   localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load tasks
function showTask(){
   listContainer.innerHTML = localStorage.getItem("data") || "";
   updateProgress();
}

// Function to update the progress of tasks
function updateProgress() {
   const tasks = listContainer.getElementsByTagName("li");
   const totalTasks = tasks.length;
   const completedTasks = listContainer.getElementsByClassName("checked").length;

   progressContainer.innerHTML = `Total Tasks: ${totalTasks} | Completed Tasks: ${completedTasks}`;
}

// Initial call to load tasks when the page loads
showTask();
