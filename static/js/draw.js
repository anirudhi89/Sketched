//color chooser
const pencolor = document.getElementById('pencolor');
var color;
pencolor.addEventListener('input', (event) => {
    color = pencolor.value;
});

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();

function resize() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
}
function reposition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}
function start(event) {
    document.addEventListener("mousemove", draw);
    reposition(event);
}
function stop() {
    document.removeEventListener("mousemove", draw);
}
function draw(event) {
    context.beginPath();
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = color;
    context.moveTo(coord.x, coord.y);
    reposition(event);
    context.lineTo(coord.x, coord.y);
    context.stroke();
}

//Submit sketch

/*
    3 parts:
    1. Store sketch as img
    2. Make Fetch call
    3. Make route handler to store image
*/


var submit = document.getElementById('submitbutton');

if (submit) {
    submit.addEventListener('click', e => {
        let sketchurl = storeSketchAsImage();
        fetch('/submit/confirm',  {
            method: 'POST', 
            headers: {'Content-Type':'multipart/form-data'},
            body: sketchurl
        })
          .then((response) => console.log(response))
    });
}



function storeSketchAsImage() {
    return canvasUrl = canvas.toDataURL("image/jpeg");
}