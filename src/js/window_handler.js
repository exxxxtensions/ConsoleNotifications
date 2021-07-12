console.defaultError = console.error.bind(console);
console.errors = [];
window.onerror = function myErrorHandler(err, url, line) {
    showMessage(err);
    return false;   // so you still log errors into console
}
console.error = function(){
    console.defaultError.apply(console, arguments);
    console.errors.push(Array.from(arguments));
    console.log(Array.from(arguments));
    showMessage(arguments);
}
function showMessage(message) {
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
