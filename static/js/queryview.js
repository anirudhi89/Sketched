//NOT LINKED TO HTML YET - KEEP IT THIS WAY

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


window.onload = async function() {
    var arr = []
    //post a request, get all sketches from us
    async function getImages() {
        var array = []
        await fetch('/get/images', {
            method: 'GET',
            headers: {'Content-Type' : 'application.json'}
        })
         .then(response => response.text())
         .then(response => {
            array = response
         })
         return array
    }
    async function getIMGs() {
        await fetch('/get/images', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
          .then(response => response.text())
          .then(response => { arr = response; });
    }
    async function storeArray() {
        await getImages().then(response => arr = response);
    }
    storeArray()
    console.log(arr)
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    const location = document.getElementById('temp')

    var rows;
    var cols;
    const imgURL = 'https://i.etsystatic.com/18883082/r/il/24ac06/2116869557/il_570xN.2116869557_s9ue.jpg'
    if (arr.length > 6) {
        cols = 3;
        rows = Math.ceil(arr.length/3);
    }
    else if (arr.length === 6) {
        cols = 3;
        rows = 2;
    }
    else if (arr.length === 4) {
        rows = 2;
        cols = 2;
    }       
        
    for (let j = 0; j < rows; j++) {
        const rowHTML = document.createElement('tr')
        for (let k = 0; k < cols; k++) {
            const td = document.createElement("td");
            const cellImg = document.createElement('img');
            cellImg.src = arr;
            td.appendChild(cellImg);
            rowHTML.appendChild(td);
        }
        tblBody.appendChild(rowHTML);
    }

    tbl.appendChild(tblBody);
    location.appendChild(tbl);
    tbl.setAttribute("border", "2");
    for (let i = 1; i < arr.length + 1; i++) {
        var imgtemp = document.getElementById(i.toString());
        imgtemp.src = arr[i-1];
    }
    
}
