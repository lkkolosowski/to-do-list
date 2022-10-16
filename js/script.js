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

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="list__item ${task.done ? "list__item--done" : ""}">
        <button class="list__button js-done">${task.done ? "✓" : ""}</button>
        <span class="list__task">${task.content}</span>
        <button class="list__button list__button--remove js-remove">🗑</button>
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {};

  const bindButtonsEvents = () => {};

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
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
