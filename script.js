var todoList = {
	todos: [], //stores todos, because database systems ki ab tak meri aukaad nahi

	//functions for modifying todolist

	addTodo: function(todoText) {
	  this.todos.push({
		todoText: todoText,
		completed: false
	  }); //thus every todo is an object with 'todoText' and 'completed' properties
	},

	changeTodo: function(position, todoText) {
	  this.todos[position].todoText = todoText;
	},

	deleteTodo: function(position) {
	  this.todos.splice(position, 1);
	},

	toggleCompleted: function(position) {
	  this.todos[position].completed = !this.todos[position].completed;
	},

	toggleAll: function() {
		var unticked = [];
		for (var i = 0; i < this.todos.length; i++) {
			if (this.todos[i].completed === false) {
				unticked.push(i);
			}
		}
		if (unticked.length > 0) {
			for (var pos of unticked) {
				this.todos[pos].completed = true;
			}
		} else {
			for (var item of this.todos) {
				item.completed = false;
			}
		}
	}
};

  var handlers = {
	//functions for handling button-click events relating to
	//modification of the todolist

	addTodo: function() {
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		if (addTodoTextInput.value !== "") {
			//todo will be added only if input isn't empty
			todoList.addTodo(addTodoTextInput.value);
		}
		addTodoTextInput.value = "";
		view.displayTodos();
	},

	changeTodo: function(position, value) {
		todoList.changeTodo(position, value);
		view.displayTodos();
	},

	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},

	toggleCompleted: function(position) {
		todoList.toggleCompleted(position);
		view.displayTodos();
	},

	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	}
  };

  var view = {
	//modifies dom to reflect changes after every modification of
	//the todolist

	displayTodos: function() {
		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = "";  //ensures that the list is cleared before being reformed; otherwise the list will become cumulative;
		for (var i = 0; i < todoList.todos.length; i++) {
			var todoLi = document.createElement("li");
			var todo = todoList.todos[i];
			var todoTextWithCompletion = "";

			if (todo.completed === true) {
			todoTextWithCompletion = "(x) " + todo.todoText;
			} else {
			todoTextWithCompletion = "( ) " + todo.todoText;
			}

			todoLi.id = i;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todoLi.appendChild(this.createToggleButton());
			todoLi.appendChild(this.createChangeButton());
			todosUl.appendChild(todoLi);
		}
	},

	createDeleteButton: function() {
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},

	createToggleButton: function() {
		var toggleButton = document.createElement("button");
		toggleButton.textContent = "Toggle";
		toggleButton.className = "toggleButton";
		return toggleButton;
	},

	createChangeButton: function() {
	  var changeButton = document.createElement("button");
	  changeButton.textContent = "Change";
	  changeButton.className = "changeButton";
	  return changeButton;
	},

	//sets up event listeners for all buttons for every todo item (delete, toggle, change)
	setUpEventListeners: function() {
		document.querySelector("ul").addEventListener("click", function(event) {
			//for deleting
			if (event.target.className === "deleteButton") {
			handlers.deleteTodo(parseInt(event.target.parentNode.id));
			}

			//for toggling
			if (event.target.className === "toggleButton") {
			handlers.toggleCompleted(parseInt(event.target.parentElement.id));
			}

			//for changing
			if (event.target.className === "changeButton") {
				var todoToChange = event.target.parentElement;
				todoToChange.innerHTML = ""; //empties the li, but its id is maintained

				//for new input box
				var newInput = document.createElement("input");
				newInput.value = todoList.todos[parseInt(todoToChange.id)].todoText;
				todoToChange.appendChild(newInput);

				//for 'done' button
				var doneButton = document.createElement("button");
				doneButton.textContent = "Done";
				todoToChange.appendChild(doneButton);

				//handling click-event of 'done' button
				doneButton.addEventListener("click", function() {
					if (newInput.value !== "") {
						handlers.changeTodo(parseInt(todoToChange.id), newInput.value);
					} else {
						view.displayTodos();
					}
				});
			}
		});
	}
};

  view.setUpEventListeners(); //executes the event listening setup
