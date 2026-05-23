const tabs = Array.from(document.querySelectorAll(".task-tab"));
const panels = Array.from(document.querySelectorAll(".task-panel"));

function activateTask(taskId) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.task === taskId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === taskId);
  });
}

tabs.forEach((tab) => {
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-controls", tab.dataset.task);
  tab.setAttribute("aria-selected", String(tab.classList.contains("is-active")));

  tab.addEventListener("click", () => {
    activateTask(tab.dataset.task);
    document.querySelector(".task-panels").scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });
});
