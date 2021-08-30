
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task-input');

loadEventListeners();
function loadEventListeners(){
	document.addEventListener('DOMContentLoaded',getTasks);
	form.addEventListener('submit',addTask);
	taskList.addEventListener('click',removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
}
function getTasks(){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks')); 
	}
	tasks.forEach(function(task){
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task));
		const link = document.createElement('a');
		link.className = "delete-item secondary-content";
		link.innerHTML = '<i class="far fa-times-circle"></i>';
		li.appendChild(link);
		taskList.appendChild(li);
	});
}
function addTask(e){
	if(taskInput.value === ''){
		alert('Add a task');
	}
	const li = document.createElement('li');
	li.className = 'collection-item';
	li.appendChild(document.createTextNode(taskInput.value));
	const link = document.createElement('a');
	link.className = "delete-item secondary-content";
	link.innerHTML = '<i class="far fa-times-circle"></i>';
	li.appendChild(link);
	taskList.appendChild(li);
	storeTaskInLocalStorage(taskInput.value);
	taskInput.value = '';
	e.preventDefault();
}

function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		e.target.parentElement.parentElement.remove();
		removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	}
}

function removeTaskFromLocalStorage(task){
	console.log(task.textContent);
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks')); 
	}
	for(var i = 0 ; i<tasks.length;i++){
		if(tasks[i] === task.textContent){
			tasks.splice(i,1);
			break;
		}
	}
	// tasks.forEach(function(taskItem, index){
	// 	if(taskItem === task.textContent){
	// 		tasks.splice(index, 1);
	// 	}
	// });
	localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(e){
	 while(taskList.firstChild){
	 	taskList.removeChild(taskList.firstChild);
	 }
	 clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage(){
	localStorage.clear();
}

function filterTasks(e){
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(
		function(task){

			if(task.firstChild.textContent.toLowerCase().indexOf(text) != -1){
				task.style.display = 'list-item';
			}else{
				task.style.display = 'none';
			}
		})
}

function storeTaskInLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks',JSON.stringify(tasks));
}
