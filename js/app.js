document.addEventListener("DOMContentLoaded", () => {
  // LocalStorage Keys
  const STORAGE_KEYS = {
    THEME: "life_dashboard_theme",
    USER_NAME: "life_dashboard_user_name",
    TASKS: "life_dashboard_tasks",
    QUICK_LINKS: "life_dashboard_quick_links"
  };

  // 1. Challenge 1: Theme Management (Light / Dark Mode)
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLabel = document.getElementById("theme-label");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.textContent = "☀️";
      themeLabel.textContent = "Light";
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.textContent = "🌙";
      themeLabel.textContent = "Dark";
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // 2. Greeting & Real-time Clock (Challenge 2: Custom Name in Greeting)
  const clockDisplay = document.getElementById("clock-display");
  const dateDisplay = document.getElementById("date-display");
  const greetingText = document.getElementById("greeting-text");
  const editNameBtn = document.getElementById("edit-name-btn");
  const nameDisplayTag = document.getElementById("name-display-tag");
  const nameFormContainer = document.getElementById("name-form-container");
  const nameInput = document.getElementById("name-input");
  const saveNameBtn = document.getElementById("save-name-btn");
  const cancelNameBtn = document.getElementById("cancel-name-btn");

  let customUserName = localStorage.getItem(STORAGE_KEYS.USER_NAME) || "";

  function getGreetingSalutation(hours) {
    if (hours >= 5 && hours < 12) {
      return "Good Morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good Afternoon";
    } else if (hours >= 18 && hours < 22) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  }

  function updateClockAndGreeting() {
    const now = new Date();

    // Clock formatted as HH:MM:SS
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    // Date formatted as "Tuesday, January 27, 2026"
    const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    dateDisplay.textContent = now.toLocaleDateString("en-US", dateOptions);

    // Contextual greeting based on time of day + Custom Name
    const salutation = getGreetingSalutation(now.getHours());
    if (customUserName.trim()) {
      greetingText.textContent = `${salutation}, ${customUserName.trim()}`;
      nameDisplayTag.textContent = customUserName.trim();
    } else {
      greetingText.textContent = salutation;
      nameDisplayTag.textContent = "Set Name";
    }
  }

  // Initial call and start interval
  updateClockAndGreeting();
  setInterval(updateClockAndGreeting, 1000);

  // Custom name interaction
  editNameBtn.addEventListener("click", () => {
    nameInput.value = customUserName;
    nameFormContainer.classList.toggle("hidden");
    if (!nameFormContainer.classList.contains("hidden")) {
      nameInput.focus();
    }
  });

  saveNameBtn.addEventListener("click", () => {
    customUserName = nameInput.value.trim();
    localStorage.setItem(STORAGE_KEYS.USER_NAME, customUserName);
    nameFormContainer.classList.add("hidden");
    updateClockAndGreeting();
  });

  cancelNameBtn.addEventListener("click", () => {
    nameFormContainer.classList.add("hidden");
  });

  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveNameBtn.click();
    } else if (e.key === "Escape") {
      cancelNameBtn.click();
    }
  });

  // ==========================================
  // 3. Focus Timer (Standard 25-Minute Pomodoro)
  // ==========================================
  const timerDisplay = document.getElementById("timer-display");
  const timerStartBtn = document.getElementById("timer-start");
  const timerStopBtn = document.getElementById("timer-stop");
  const timerResetBtn = document.getElementById("timer-reset");

  const DEFAULT_SECONDS = 25 * 60; // 25 minutes
  let remainingSeconds = DEFAULT_SECONDS;
  let timerInterval = null;
  let isTimerRunning = false;

  function renderTimer() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function playTimerCompletionSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.2); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log("Audio notification skipped");
    }
  }

  function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    timerStartBtn.disabled = true;
    timerStartBtn.style.opacity = "0.6";

    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        renderTimer();
      } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timerStartBtn.disabled = false;
        timerStartBtn.style.opacity = "1";
        playTimerCompletionSound();
        alert("Focus session completed! Great job taking care of your day.");
        resetTimer();
      }
    }, 1000);
  }

  function stopTimer() {
    if (!isTimerRunning) return;
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerStartBtn.disabled = false;
    timerStartBtn.style.opacity = "1";
  }

  function resetTimer() {
    stopTimer();
    remainingSeconds = DEFAULT_SECONDS;
    renderTimer();
  }

  timerStartBtn.addEventListener("click", startTimer);
  timerStopBtn.addEventListener("click", stopTimer);
  timerResetBtn.addEventListener("click", resetTimer);

  // Initialize timer
  renderTimer();

  // 4. Challenge 3: Prevent Duplicate Tasks
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskAlert = document.getElementById("task-alert");
  const taskList = document.getElementById("task-list");
  const emptyTasksMsg = document.getElementById("empty-tasks-msg");

  // Initial starter tasks matching expected output
  let tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS));
  if (!tasks || !Array.isArray(tasks)) {
    tasks = [
      { id: "task-1", text: "belanja", completed: true },
      { id: "task-2", text: "belajar", completed: false }
    ];
    saveTasks();
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  function showTaskAlert(message) {
    taskAlert.textContent = message;
    taskAlert.classList.remove("hidden");
    setTimeout(() => {
      taskAlert.classList.add("hidden");
    }, 3500);
  }

  function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      emptyTasksMsg.classList.remove("hidden");
      return;
    } else {
      emptyTasksMsg.classList.add("hidden");
    }

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;
      li.dataset.id = task.id;

      // Left section: Checkbox + Text
      const leftDiv = document.createElement("div");
      leftDiv.className = "task-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark ${task.text} as ${task.completed ? "incomplete" : "done"}`);
      checkbox.addEventListener("change", () => toggleTaskComplete(task.id));

      const textSpan = document.createElement("span");
      textSpan.className = "task-text";
      textSpan.textContent = task.text;
      textSpan.title = "Double-click to edit task";
      textSpan.addEventListener("dblclick", () => enableInlineEdit(li, task));

      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(textSpan);

      // Right section: Actions (Edit & Delete)
      const actionsDiv = document.createElement("div");
      actionsDiv.className = "task-actions";

      const editBtn = document.createElement("button");
      editBtn.className = "btn-edit";
      editBtn.textContent = "Edit";
      editBtn.title = "Edit task";
      editBtn.addEventListener("click", () => enableInlineEdit(li, task));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn-delete";
      deleteBtn.textContent = "Delete";
      deleteBtn.title = "Delete task";
      deleteBtn.addEventListener("click", () => deleteTask(task.id));

      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(leftDiv);
      li.appendChild(actionsDiv);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const rawText = taskInput.value.trim();

    if (!rawText) {
      showTaskAlert("Task description cannot be empty.");
      return;
    }

    // Challenge 3: Prevent duplicate tasks (case-insensitive)
    const isDuplicate = tasks.some(
      t => t.text.trim().toLowerCase() === rawText.toLowerCase()
    );

    if (isDuplicate) {
      showTaskAlert(`Task "${rawText}" already exists! Duplicate tasks are prevented.`);
      return;
    }

    const newTask = {
      id: "task-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
      text: rawText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskAlert.classList.add("hidden");
  }

  function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    }
  }

  function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
  }

  function enableInlineEdit(taskLi, task) {
    const leftDiv = taskLi.querySelector(".task-left");
    const textSpan = taskLi.querySelector(".task-text");
    const actionsDiv = taskLi.querySelector(".task-actions");

    if (taskLi.classList.contains("editing")) return;
    taskLi.classList.add("editing");

    textSpan.classList.add("hidden");
    actionsDiv.classList.add("hidden");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task-edit-input";
    editInput.value = task.text;

    const saveInlineEdit = () => {
      const updatedText = editInput.value.trim();
      if (!updatedText) {
        showTaskAlert("Task text cannot be empty.");
        editInput.focus();
        return;
      }

      // Check duplicates with other tasks
      const isDuplicate = tasks.some(
        t => t.id !== task.id && t.text.trim().toLowerCase() === updatedText.toLowerCase()
      );

      if (isDuplicate) {
        showTaskAlert(`Another task with "${updatedText}" already exists!`);
        editInput.focus();
        return;
      }

      task.text = updatedText;
      saveTasks();
      renderTasks();
    };

    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveInlineEdit();
      } else if (e.key === "Escape") {
        renderTasks();
      }
    });

    editInput.addEventListener("blur", saveInlineEdit);

    leftDiv.appendChild(editInput);
    editInput.focus();
  }

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });

  // Initial render of tasks
  renderTasks();

  // ==========================================
  // 5. Quick Links
  // ==========================================
  const linkNameInput = document.getElementById("link-name-input");
  const linkUrlInput = document.getElementById("link-url-input");
  const addLinkBtn = document.getElementById("add-link-btn");
  const linkAlert = document.getElementById("link-alert");
  const quickLinksList = document.getElementById("quick-links-list");
  const emptyLinksMsg = document.getElementById("empty-links-msg");

  // Initial starter links matching expected output
  let quickLinks = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUICK_LINKS));
  if (!quickLinks || !Array.isArray(quickLinks)) {
    quickLinks = [
      { id: "link-1", name: "Google", url: "https://www.google.com" },
      { id: "link-2", name: "Gmail", url: "https://mail.google.com" },
      { id: "link-3", name: "Calendar", url: "https://calendar.google.com" }
    ];
    saveQuickLinks();
  }

  function saveQuickLinks() {
    localStorage.setItem(STORAGE_KEYS.QUICK_LINKS, JSON.stringify(quickLinks));
  }

  function showLinkAlert(message) {
    linkAlert.textContent = message;
    linkAlert.classList.remove("hidden");
    setTimeout(() => {
      linkAlert.classList.add("hidden");
    }, 3500);
  }

  function normalizeUrl(url) {
    let clean = url.trim();
    if (!/^https?:\/\//i.test(clean)) {
      clean = "https://" + clean;
    }
    return clean;
  }

  function renderQuickLinks() {
    quickLinksList.innerHTML = "";

    if (quickLinks.length === 0) {
      emptyLinksMsg.classList.remove("hidden");
      return;
    } else {
      emptyLinksMsg.classList.add("hidden");
    }

    quickLinks.forEach(item => {
      const chip = document.createElement("div");
      chip.className = "quick-link-chip";

      const anchor = document.createElement("a");
      anchor.href = item.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = item.name;
      anchor.title = `Open ${item.name} (${item.url})`;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "link-delete-btn";
      deleteBtn.innerHTML = "&times;";
      deleteBtn.title = `Remove ${item.name}`;
      deleteBtn.setAttribute("aria-label", `Remove link ${item.name}`);
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteQuickLink(item.id);
      });

      chip.appendChild(anchor);
      chip.appendChild(deleteBtn);
      quickLinksList.appendChild(chip);
    });
  }

  function addQuickLink() {
    const name = linkNameInput.value.trim();
    const rawUrl = linkUrlInput.value.trim();

    if (!name) {
      showLinkAlert("Please enter a link name.");
      linkNameInput.focus();
      return;
    }

    if (!rawUrl) {
      showLinkAlert("Please enter a valid website URL.");
      linkUrlInput.focus();
      return;
    }

    const finalUrl = normalizeUrl(rawUrl);

    const newLink = {
      id: "link-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
      name: name,
      url: finalUrl
    };

    quickLinks.push(newLink);
    saveQuickLinks();
    renderQuickLinks();

    linkNameInput.value = "";
    linkUrlInput.value = "";
    linkAlert.classList.add("hidden");
  }

  function deleteQuickLink(linkId) {
    quickLinks = quickLinks.filter(l => l.id !== linkId);
    saveQuickLinks();
    renderQuickLinks();
  }

  addLinkBtn.addEventListener("click", addQuickLink);
  linkUrlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addQuickLink();
    }
  });

  // Initial render of links
  renderQuickLinks();
});
