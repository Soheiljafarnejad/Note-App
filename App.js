const darkMode = [...document.querySelectorAll(".toggler")];
darkMode.forEach((item)=>{
    item.addEventListener("click", () => {
      document.getElementById("root").classList.toggle("dark--mode");
    });
})
