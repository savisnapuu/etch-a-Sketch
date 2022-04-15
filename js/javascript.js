const grid = document.getElementById("grid-main");
const body = document.body;
const someButtons = document.querySelectorAll(".side-buttons");
let canvasColor = document.getElementById("canvas-color").value;
let isDrawing = false;
body.onmousedown = function(){isDrawing = true};
body.onmouseup = function() {isDrawing = false};
let mode = "default";
let penColor = "#e66465"

function createBoard(gridSlider){
    let gridLayout = gridSlider * gridSlider;
    grid.style.gridTemplate = `repeat(${gridSlider}, 1fr) / repeat(${gridSlider}, 1fr)`;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    for(let i = 0; i < gridLayout; i++){
        const div = document.createElement("div");
        grid.appendChild(div);
        div.classList.add("grid-item");
        div.style.backgroundColor = 'rgb(255, 255, 255)';
        div.setAttribute("data-value", 0.1)
        div.addEventListener("mousedown", colorSquare);
        div.addEventListener("mousedown", shading);
        div.addEventListener("mouseover", colorSquare);
        div.addEventListener("mouseover", shading)
    }  
}

createBoard(16)

function sliderChange(val){
    document.getElementById("slider-value").innerHTML = `${val} x ${val}`;
}

document.getElementById("grid-slider").addEventListener("change", (e) => {
    gridSlider = e.target.value;
    createBoard(gridSlider);
})

function hexToRGB(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

function colorSquare(e){
    if (e.type === "mouseover" && isDrawing === false) return
    if(mode === "default"){
      e.target.style.backgroundColor = penColor;  
    } else if(mode === "pen"){
        e.target.style.backgroundColor = penColor;
    } else if(mode === "rainbow"){
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
    } else if(mode === "eraser"){
        e.target.style.backgroundColor = canvasColor;
        e.target.setAttribute("data-value", 0.1)
    }
}

function shading(e){
    if (e.type === "mouseover" && isDrawing === false) return
    if(penColor.length < 10){
       penColor = hexToRGB(penColor);
    }
    if(mode === "shading"){
        let shadingColor = penColor.slice(0, -1);
        let opacity = Number(e.target.getAttribute("data-value"));
            if(opacity <= 1){
                opacity += 0.1; 
            }
        let shadingColorNew = shadingColor + ", " + opacity.toFixed(1) + ")";
        e.target.setAttribute("data-value", `${opacity.toFixed(1)}`);
        e.target.style.backgroundColor = shadingColorNew;
    } else {
    return
    }
}

function onChangeCanvas(){
    canvasColor = this.value;
    document.querySelectorAll(".grid-item").forEach(item =>{
        item.style.backgroundColor = canvasColor;
        item.setAttribute("data-value", 0.1)
    }
)}

function clear(){
    document.querySelectorAll(".grid-item").forEach(item =>{
        item.style.backgroundColor = canvasColor;
        item.setAttribute("data-value", 0.1)
    }
)}

function eraser(){
    mode = "eraser"
}

document.getElementById("canvas-color").addEventListener("change", onChangeCanvas);
document.getElementById("pen-button").addEventListener("click", function() { mode = "pen";});
document.getElementById("rainbow-button").addEventListener("click", function() { mode = "rainbow";});
document.getElementById("shading-button").addEventListener("click", function() { mode = "shading";});
document.getElementById("color-picker").addEventListener("change", (e) => {penColor = e.target.value; isDrawing = false})
document.getElementById("clear-button").addEventListener("click", clear);
document.getElementById("eraser-button").addEventListener("click", eraser);

someButtons.forEach(button => button.addEventListener("click", e => {
    someButtons.forEach(el =>{
        el.classList.remove("active");
    })
    e.target.classList.add("active")
}))




