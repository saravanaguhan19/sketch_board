let optionCont = document.querySelector(".option-container");
let toolsCont = document.querySelector(".tools-container");
let pencilToolCont = document.querySelector(".pencil-tool-container");
let eraserToolCont = document.querySelector(".eraser-tool-container");
let optionFlag = true;
//true -> tools show false -> tools hide
optionCont.addEventListener("click", () => {
  console.log("clicked");
  optionFlag = !optionFlag;

  if (optionFlag) openTools();
  else closeTools();
});

function openTools() {
  let iconElem = optionCont.children[0];
  iconElem.classList.remove("fa-x");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";
}

function closeTools() {
  let iconElem = optionCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-x");
  toolsCont.style.display = "none";

  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}
