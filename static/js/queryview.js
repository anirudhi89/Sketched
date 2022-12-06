//NOT LINKED TO HTML YET - KEEP IT THIS WAY
// document.onload((e) =>  {
//     //DEMO PURPOSES
//     localStorage.setItem("tempHash", 1014404);

//     //actual:f
    // if (localStorage.getItem("tempHash") != null) {
    //     var tempSessionID = localStorage.getItem("tempHash");
    //     const params = {
    //         id: tempSessionID
    //     }
    // }
//     else {
//         //ideally new user
//         //generate token, post method
//     }
// })

//post a request, get all sketches from user
// fetch('/get/sketches', {
//     method: 'POST', 
//     body : JSON.parse(params)
// })
// .then((response) =>  response)

function generate() {
    arr = [4]
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    const location = document.getElementById('test')

    var rows;
    var cols;
    const imgURL = 'https://i.etsystatic.com/18883082/r/il/24ac06/2116869557/il_570xN.2116869557_s9ue.jpg'
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 6) {
            cols = 3;
            rows = Math.ceil(arr[i]/3);
        }
        else if (arr[i] === 6) {
            cols = 3;
            rows = 2;
        }
        else if (arr[i] === 4) {
            rows = 2;
            cols = 2;
        }
    }

    for (let j = 0; j < rows; j++) {
        const rowHTML = document.createElement('tr')
        for (let k = 0; k < cols; k++) {
            const td = document.createElement("td");
            const cellImg = document.createElement('img');
            cellImg.src = imgURL;
            td.appendChild(cellImg);
            rowHTML.appendChild(td);
        }
        tblBody.appendChild(rowHTML);
    }

    tbl.appendChild(tblBody);
    location.appendChild(tbl);
    tbl.setAttribute("border", "2");
}

