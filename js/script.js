{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), { ...tasks[taskIndex], done: !tasks[taskIndex].done }, ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleHideTasks = () => {
    if (tasks.some(({ done }) => done)) {
      hideDoneTasks = !hideDoneTasks;
    }
    render();
  };

  const markAllTasksAsDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const focusOnSubmit = () => {
    const newTask = document.querySelector(".js-newTask");
    newTask.value = "";
    newTask.focus();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindToggleHideTasksEvent = () => {
    const hideTasksButton = document.querySelector(".js-hideTasksButton");
    if (hideTasksButton) {
      hideTasksButton.addEventListener("click", () => {
        toggleHideTasks();
      });
    }
  };

  const bindMarkAllTasksAsDoneEvent = () => {
    const markAllTasksAsDoneButton = document.querySelector(".js-markAllTasksAsDoneButton");
    if (markAllTasksAsDoneButton) {
      markAllTasksAsDoneButton.addEventListener("click", () => {
        markAllTasksAsDone();
      });
    }
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="tasks__item ${task.done ? "tasks__item--done" : ""} 
      ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
        <button class="tasks__button js-done">${task.done ? "???" : ""}</button>
          <span class="tasks__task">${task.content}</span>
        <button class="tasks__button tasks__button--remove js-remove">????</button>
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlString = "";
    if (tasks.length > 0) {
      htmlString += `
        <button class="buttons__button js-button js-hideTasksButton">
          ${hideDoneTasks ? "Poka??" : "Ukryj"} uko??czone
        </button>
        <button ${tasks.every(({ done }) => done) ? "disabled" : ""}
        class="buttons__button js-button js-markAllTasksAsDoneButton">
          Uko??cz wszystkie
        </button>
      `;
    }

    document.querySelector(".js-buttons").innerHTML = htmlString;
  };

  const render = () => {
    renderButtons();
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();
    bindToggleHideTasksEvent();
    bindMarkAllTasksAsDoneEvent();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      focusOnSubmit();
      return;
    }

    addNewTask(newTaskContent);
    focusOnSubmit();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
