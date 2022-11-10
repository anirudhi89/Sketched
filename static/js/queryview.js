// document.onload((e) =>  {
//     //DEMO PURPOSES
//     localStorage.setItem("tempHash", 1014404);

//     //actual:
//     if (localStorage.getItem("tempHash") != null) {
//         var tempSessionID = localStorage.getItem("tempHash");
//         const params = {
//             id: tempSessionID
//         }
//         //post a request, get all sketches from user
//         fetch('/get/sketches', {
//             method: 'POST', 
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//            body : JSON.parse(params)
//         })
//         .then((response) =>  response)
//     }
//     else {
//         //ideally new user
//         //generate token, post method
//     }
// })