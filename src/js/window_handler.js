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
    showMessage(Array.from(arguments).toString());
}

function generateMessage(err, url, line) {
    let message = err;
    let fileWithExtension = url.substring(url.lastIndexOf('/') + 1);
    let file = fileWithExtension.substring(0, fileWithExtension.lastIndexOf('.'));
    let href = "<a target='_blank' href='" + url + "'>" + fileWithExtension + ":" + line + "</a>"
    let margins = "<br> &nbsp; &nbsp; &nbsp; "
    message += margins + "at " + file + " (" + href + ")"
    return message;
}

let containerForNotifications = null;
let clearAllButton = null;

function createClearAllButton() {
    clearAllButton= document.createElement('button');
    clearAllButton.innerHTML = 'Clear All';
    clearAllButton.onclick = () => {
        while (containerForNotifications.getElementsByTagName('notification-custom-html').length) {
            const elem = containerForNotifications.getElementsByTagName('notification-custom-html')[0];
            containerForNotifications.removeChild(elem);
        }
    }
    containerForNotifications.append(clearAllButton);

}

function createContainerForNotifications() {
    containerForNotifications = document.createElement('div');
    containerForNotifications.id = 'containerForNotifications';
    containerForNotifications.innerHTML = `
          <style>
          #containerForNotifications {
            display: flex;
            flex-direction: column;
            width: 400px;
            max-height: 300px;
            overflow-y: auto;
            position: fixed;
            left: 20px;
            bottom: 40px;
            z-index:  99999999999;
            -webkit-mask:linear-gradient(transparent, #fff);
            mask:linear-gradient(transparent, #fff);
          }
          #containerForNotifications::-webkit-scrollbar {
              width: 20px;
          }
            
          #containerForNotifications::-webkit-scrollbar-track {
              background-color: transparent;
          }
            
          #containerForNotifications::-webkit-scrollbar-thumb {
              background-color: #d6dee1;
              border-radius: 20px;
              border: 6px solid transparent;
              background-clip: content-box;
          }
            
          #containerForNotifications::-webkit-scrollbar-thumb:hover {
              background-color: #a8bbbf;
          }
        </style>`;
    document.body.append(containerForNotifications);
}

function showMessage(message) {
    if (!containerForNotifications) {
        createContainerForNotifications();
        createClearAllButton();
    }
    const notificationNode = document.createElement("notification-custom-html");
    setTimeout(() => notificationNode.setAttribute('message', message), 0);

    containerForNotifications.prepend(notificationNode);
    containerForNotifications.scrollTop = containerForNotifications.scrollHeight;
}
