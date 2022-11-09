//color chooser
const penColor = document.getElementById('pencolor');

let eraseMode = false;
let drawMode = true;
let eraseButton = document.getElementById("erase-button");
let penButton = document.getElementById("pen-button");
let backgroundButton = document.getElementById("background-color");
let clearButton = document.getElementById("clear-button");
let penWeight = document.getElementById("pen-weight-slider");
let toolType = document.getElementById("tool-type");
// default to pen
toolType.innerHTML = "Pen Weight";


var stickyNoteBg;
var color;
penColor.addEventListener('input', (event) => {
    color = penColor.value;
});

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 
context.rect(0, 0, canvas.width, canvas.height); 
context.fillStyle = stickyNoteBg || "rgb(255,255,136)"; 
context.fill();
// backgroundButton.value = "#FFFF88";

function resize() {
    context.canvas.width = window.innerWidth; 
    context.canvas.height = window.innerHeight;
    context.rect(0, 0, context.canvas.width, context.canvas.height); 
    context.fillStyle = stickyNoteBg || "rgb(255,255,136)"; 
    context.fill();
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
    context.lineWidth = penWeight.value;
    context.lineCap = "round";
    context.strokeStyle = color;
    context.moveTo(coord.x, coord.y);
    reposition(event);
    context.lineTo(coord.x, coord.y);
    context.stroke();
    if (eraseMode) {
        //destination-out draws new shapes behind the existing canvas content
        context.globalCompositeOperation = "destination-out";
      } else {
        context.globalCompositeOperation = "source-over";
      }
}
// change background color
backgroundButton.addEventListener("change", () => {
    stickyNoteBg = backgroundButton.value;
});

// clear canvas
clearButton.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = backgroundButton.value;
});

// erase mode
eraseButton.addEventListener("click", () => {
    eraseMode = true;
    //set range title to erase size
    toolType.innerHTML = "Eraser Weight";
});
// pen mode
penButton.addEventListener("click", () => {
    //set range title to pen size
    toolType.innerHTML = "Pen Weight";
    eraseMode = false;
});
///// *TODO*: Make cursor equal to penWeight when hovering over canvas so that you can see how big the weight is without drawing (circle around cursor)

//Submit sketch

/*
    3 parts:
    1. Store sketch as img
    2. Make Fetch call
    3. Make route handler to store image
*/

var submit = document.getElementById('save-button');

if (submit) {
    submit.addEventListener('click', async e => {
        let sketchurl = await storeSketchAsImage()
        const params = {
            url: sketchurl
        }
        fetch('/submit/confirm',  {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        })
          .then((response) => response.text())
          .then((response) => {
            // console.log(response.type);
            // if (typeof(response) === 'object' && response !== null) {
            //     message = response.toString()
            // }
            var message = response;
            console.log(message);
            window.location = "/submit/redirConfirm"+message;
          })
          .catch(e => {
            console.log(e);
          })
    });
}

async function storeSketchAsImage() {
    let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    let formData = new FormData();
    formData.append("image", imageBlob, "image.png");
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(imageBlob);
    // document.querySelector("#image").src = imageUrl;
    return imageUrl;
}