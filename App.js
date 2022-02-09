// darkMode
const darkMode = [...document.querySelectorAll(".toggler")];
darkMode.forEach((item) => {
  item.addEventListener("click", () => {
    document.getElementById("root").classList.toggle("dark--mode");
  });
});

// backdrop
const backdrop = document.querySelector(".backdrop");
const btnCancel = document.querySelector(".btn--cancel");
const addNote = [...document.querySelectorAll(".add--note")];
addNote.forEach((item) => {
  item.addEventListener("click", () => {
    backdrop.style.display = "flex";
  });
});

btnCancel.addEventListener("click", () => {
  backdrop.style.display = "none";
});

