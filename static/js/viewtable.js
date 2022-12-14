window.onload = function() {
    var arr = ["https://storage.googleapis.com/sketched-bucket/helloworld","https://storage.googleapis.com/sketched-bucket/hisketch","https://storage.googleapis.com/sketched-bucket/othersketch","https://storage.googleapis.com/sketched-bucket/samplesketch"]
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    const location = document.getElementById('temp')

    var rows;
    var cols;
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
    var counter = 1;
    for (let j = 0; j < rows; j++) {
        const rowHTML = document.createElement('tr')
        rowHTML.style.border = "transparent";
        for (let k = 0; k < cols; k++) {
            const td = document.createElement("td");
            const cellImg = document.createElement('img');
            cellImg.style.height='50%'; // CHANGE AS NEEDED
            cellImg.style.width='50%'; // CHANGE AS NEEDED
            cellImg.id = counter;
            cellImg.src = ''
            counter++
            td.appendChild(cellImg);
            rowHTML.appendChild(td);
        }
        tblBody.appendChild(rowHTML);
    }

    tbl.appendChild(tblBody);
    location.appendChild(tbl);
    location.setAttribute('height', '500px')
    location.setAttribute('width', '1500px')

    for (let i = 1; i < arr.length + 1; i++) {
        var imgtemp = document.getElementById(i.toString());
        imgtemp.src = arr[i-1];
    }
}