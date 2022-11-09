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
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.rect(0, 0, canvas.width, canvas.height);
context.fillStyle = "rgb(255,255,136)";
context.fill();

function resize() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "rgb(255,255,136)";
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

async function storeSketchAsImage() {
    let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    let formData = new FormData();
    formData.append("image", imageBlob, "image.png");
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(imageBlob);
    // document.querySelector("#image").src = imageUrl;
    return imageUrl;
}
if (submit) {
    submit.addEventListener('click', async e => {
        let sketchurl = await storeSketchAsImage()
        const params = {
            url: sketchurl
        }
        fetch('/submit/confirm',  {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(params)
        })
          .then((response) =>response)
          .then((response) => {
            // var response = JSON.parse(response);
            console.log(response);
            var message = response["values"]; 
            window.location = "/submit/redirConfirm="+message;
          })
    });
}



