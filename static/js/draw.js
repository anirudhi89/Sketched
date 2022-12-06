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

var tagList = [];
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
    canvas.style.backgroundColor =  stickyNoteBg || "rgb(255,255,136)";
    tagList = [];
    document.getElementById('tag-form').value = "";
    document.getElementById('tag-list').innerHTML = "Tags:";
    document.getElementById('tag-form').placeholder = "Add a tag (max 3)";

    document.getElementById('tag-form').readOnly = false;
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

// Add a tag to the list of tags when user presses enter key within tag form
document.getElementById('tag-form').onkeydown = function(e){
    if(tagList.length >= 3)
        return;
    if(e.keyCode == 13){
      tagList.push(document.getElementById('tag-form').value);
     // console.log(tagList);
      document.getElementById('tag-form').value = "";
      // lists the tags with a comma and a space next to Tags:
      const showListAsString = tagList.join(', ');
      document.getElementById('tag-list').innerHTML = "Tags: " + showListAsString + " ";
      // Limit user to adding 3 tags
      if(tagList.length >= 3){
        document.getElementById('tag-form').readOnly = true;
        document.getElementById('tag-form').placeholder = "Tag limit reached";
    }
    }
 };

// circle follows cursor
const mouse = document.getElementById("mouse");
document.getElementById("canvas").addEventListener("mousemove", function(e) {
    mouse.style.left = e.clientX + "px",
    mouse.style.top = e.clientY + "px";
    mouse.style.height = context.lineWidth + "px";
    mouse.style.width =  context.lineWidth + "px";
    mouse.style.background =  penColor.value;
});



//Submit sketch

/*
    3 parts:
    1. Store sketch as img
    2. Make Fetch call
    3. Make route handler to store image
*/

var uniqueId = 0;
const output = async function() {
    uniqueId = await biri();
    console.log(uniqueId);
}
//AUTHENTICATION
//DEMO PURPOSES
window.addEventListener('load', (e) => {
    localStorage.setItem("tempID", uniqueId);
})

var submit = document.getElementById('save-button');

if (submit) {
    submit.addEventListener('click', async e => {
        let sketchurl = await storeSketchAsImage()
        var userid = localStorage.getItem('tempID')
        var params;
        var tagString = "";
        tagList.forEach((x, i) => {
            if (i === 0) {
                tagString = `${x}`
            }
            else {
                tagString += ` , ${x}`
            }
          });
        if (userid != null) {
            params = {
                id: userid,
                url: sketchurl,
                tags: tagString
            }
        }
        else {
            params = {
                url: sketchurl,
                tags: tagList
            }
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