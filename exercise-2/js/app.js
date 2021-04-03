var addButton = document.getElementsByTagName("button")[0];
var addInput = document.getElementsByTagName("input")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
var incompleteTask = JSON.parse(localStorage.getItem("incomplete")) || [];
var completeTask = JSON.parse(localStorage.getItem("complete")) || [];


var setIncompleteLocalStorage = (incomplete) => {

  incompleteTask = [...incompleteTask, incomplete];
  localStorage.setItem("incomplete", JSON.stringify(incompleteTask));


}
var setcompleteLocalStorage = function(complete) {
  completeTask.push(complete);
  localStorage.setItem("complete", JSON.stringify(completeTask));

}

var deleteIncompltelocalStorage = (element) => {

  var index = incompleteTask.indexOf(element);
  if (index !== -1) {
    incompleteTask.splice(index, 1);
  }
  localStorage.setItem("incomplete", JSON.stringify(incompleteTask));


}

var deletecompltelocalStorage = (element) => {

  var index = completeTask.indexOf(element);
  if (index !== -1) {
    completeTask.splice(index, 1);
  }
  localStorage.setItem("complete", JSON.stringify(completeTask));


}

var deleteItemFromlocalStorage = (element, listName) => {
  if (listName == "incomplete-tasks") {
    deleteIncompltelocalStorage(element);
  } else {
    deletecompltelocalStorage(element);
  }
}

var init = function() {
  incompleteTask.forEach((value) => {
    let listItem = createNewTaskElement(value);
    incompleteTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
  })

  completeTask.forEach((value) => {
    let listItem = createNewTaskElement(value);
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  })

}


var createNewTaskElement = function(taskString, arr) {
  listItem = document.createElement("li");
  checkBox = document.createElement("input");
  label = document.createElement("label");
  editInput = document.createElement("input");
  editButton = document.createElement("button");
  deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function() {
  let taskInput = document.getElementById("new-task");
  if (taskInput.value == "") {
    document.getElementById("item-error").style.display = 'flex';
    document.getElementById("new-task").classList.add('error-border');

    return false;
  }
  document.getElementById("item-error").style.display = 'none';
  document.getElementById("new-task").classList.remove('error-border');
  var listItemName = taskInput.value || "New Item"
  listItem = createNewTaskElement(listItemName)
  incompleteTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted)
  setIncompleteLocalStorage(taskInput.value);
  taskInput.value = "";
};

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelectorAll("input[type=text")[0];
  var label = listItem.querySelector("label");
  var button = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value
    button.innerText = "Edit";
  } else {
    editInput.value = label.innerText
    button.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

var deleteTask = function(el) {


  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);

  deleteItemFromlocalStorage(this.parentNode.children[1].innerHTML, ul.id);
};

var taskCompleted = function(el) {

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

  setcompleteLocalStorage(this.nextSibling.innerHTML);
  deleteIncompltelocalStorage(this.nextSibling.innerHTML);
};

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  setIncompleteLocalStorage(this.nextSibling.innerHTML);
  deletecompltelocalStorage(this.nextSibling.innerHTML);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  var editButton = taskListItem.querySelectorAll("button.edit")[0];
  var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);
addInput.addEventListener("keyup", function(event) {

  if (event.keyCode === 13) {
    addTask();
  }
});


init();

var checkboxes = document.querySelectorAll("input[type=checkbox]");
let enabledSettings = []

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('keyup', function(e) {
    if (e.key == "Enter") {
      checkbox.click();
    } else {
      e.preventDefault();
    }
  })
});


for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}