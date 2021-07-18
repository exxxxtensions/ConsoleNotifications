console.defaultError = console.error.bind(console);
console.errors = [];
window.onerror = function myErrorHandler(err, url, line) {
    showMessage(err);
    return false;
}
console.error = function () {
    console.defaultError.apply(console, arguments);
    console.errors.push(Array.from(arguments));
    console.log(Array.from(arguments));
    showMessage(arguments);
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

    containerForNotifications.appendChild(notificationNode);
}
