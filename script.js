let optionCont = document.querySelector(".option-container");
let toolsCont = document.querySelector(".tools-container");
let optionFlag = true;
let pencilToolCont = document.querySelector(".pencil-tool-container");
let eraserToolCont = document.querySelector(".eraser-tool-container");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
let pencilFlag = false;
let eraserFlag = false;

optionCont.addEventListener("click", () => {
  //true -> tools show false -> tools hide
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

pencil.addEventListener("click", (e) => {
  // true -> show pencil tool false ->hide pencil tool
  pencilFlag = !pencilFlag;

  if (pencilFlag) pencilToolCont.style.display = "block";
  else pencilToolCont.style.display = "none";
});

eraser.addEventListener("click", (e) => {
  // true -> show eraser tool false ->hide eraser tool
  eraserFlag = !eraserFlag;

  if (eraserFlag) eraserToolCont.style.display = "flex";
  else eraserToolCont.style.display = "none";
});

sticky.addEventListener("click", (e) => {
  let stickyTemplateHTML = `
     <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
      </div>
      <div class="note-container">
        <textarea></textarea>
      </div>
  `;
  createSticky(stickyTemplateHTML);
});
function noteActions(minimize, remove, stickyContainer) {
  remove.addEventListener("click", (e) => {
    stickyContainer.remove();
  });

  minimize.addEventListener("click", (e) => {
    let noteContainer = stickyContainer.querySelector(".note-container");
    let display = getComputedStyle(noteContainer).getPropertyValue("display");

    if (display === "none") noteContainer.style.display = "block";
    else noteContainer.style.display = "none";
    // console.log(noteContainer);
  });
}
function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);
  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}

upload.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let stickyTemplateHTML = `
     <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
      </div>
      <div class="note-container">
        <img src="${url}">
      </div>
  `;
    createSticky(stickyTemplateHTML);
  });
});

function createSticky(stickyTemplateHTML) {
  let stickyContainer = document.createElement("div");
  stickyContainer.setAttribute("class", "sticky-container");
  stickyContainer.innerHTML = stickyTemplateHTML;

  document.body.appendChild(stickyContainer);

  let minimize = stickyContainer.querySelector(".minimize");
  let remove = stickyContainer.querySelector(".remove");

  noteActions(minimize, remove, stickyContainer);

  stickyContainer.onmousedown = function (event) {
    dragAndDrop(stickyContainer, event);
  };

  stickyContainer.ondragstart = function () {
    return false;
  };
}
