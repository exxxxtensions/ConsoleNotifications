console.defaultError = console.error.bind(console);
console.errors = [];
window.onerror = function myErrorHandler(err, url, line) {  
    //Do some  stuff 
    console.log('err 2 ', err); // Uncaught SyntaxError: Invalid or unexpected token at Line no:- 1
    showMessage(err);
    return false;   // so you still log errors into console 
}
console.error = function(){
    // default &  console.error()
    console.defaultError.apply(console, arguments);
    // new & array data
    console.errors.push(Array.from(arguments));
    console.log(Array.from(arguments));
    console.log('here');
    showMessage(arguments);
}
function showMessage(message) {
    console.log('message - ', message);
    // const body = document.getElementsByTagName('body')[0];
    const notificationNode = document.createElement("div");
    notificationNode.style.width = "400px";
    notificationNode.style.height = "300px";
    notificationNode.style.background = "red";
    notificationNode.innerHTML = message;
    notificationNode.style.position = "fixed";
    notificationNode.style.left = "20px";
    notificationNode.style.bottom = "40px";
    notificationNode.style.opacity = "0.5";
    notificationNode.style.zIndex = "99999999999";

    document.body.appendChild(notificationNode);
}

console.log('test--');
// chrome.extension.onConnect.addListener(function(){
//     console.defaultError = console.error.bind(console);
//     console.errors = [];
//     window.onerror = function myErrorHandler(err, url, line) {  
//         //Do some  stuff 
//         console.log('err 2 ', err); // Uncaught SyntaxError: Invalid or unexpected token at Line no:- 1
//         showMessage(err);
//         return false;   // so you still log errors into console 
//     }
//     console.error = function(){
//         // default &  console.error()
//         console.defaultError.apply(console, arguments);
//         // new & array data
//         console.errors.push(Array.from(arguments));
//         console.log(Array.from(arguments));
//         console.log('here');
//         showMessage(arguments);
//     }
// });