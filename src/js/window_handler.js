console.defaultError = console.error.bind(console);
console.errors = [];
window.onerror = function myErrorHandler(err, url, line) {
    showMessage(generateMessage(err, url, line));
    return false;
}
console.error = function () {
    console.defaultError.apply(console, arguments);
    console.errors.push(Array.from(arguments));
    console.log(Array.from(arguments));
    showMessage(arguments);
}

function generateMessage(err, url, line) {
    let message = err;
    let fileWithExtension = url.substring(url.lastIndexOf('/') + 1);
    let file = fileWithExtension.substring(0, fileWithExtension.lastIndexOf('.'));
    let href = "<a href='" + url + "'>" + fileWithExtension + ":" + line + "</a>"
    let margins = "<br> &nbsp; &nbsp; &nbsp; "
    message += margins + "at " + file + " (" + href + ")"
    return message;
}

let containerForNotifications = null;

function createContainerForNotifications() {
    containerForNotifications = document.createElement('div');
    containerForNotifications.id = 'containerForNotifications';
    containerForNotifications.innerHTML = `
  <style>
  #containerForNotifications {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    max-height: 400px;
    overflow: auto;
    position: fixed;
    left: 20px;
    bottom: 40px;
    z-index:  99999999999;
    -webkit-mask:linear-gradient(transparent, #fff);
    mask:linear-gradient(transparent, #fff);
  }
</style>`;
    document.body.appendChild(containerForNotifications);
}

function showMessage(message) {
    if (!containerForNotifications) {
        createContainerForNotifications();
    }
    const notificationNode = document.createElement("notification-custom-html");
    setTimeout(() => notificationNode.setAttribute('message', message), 0);

    containerForNotifications.prepend(notificationNode);
}
