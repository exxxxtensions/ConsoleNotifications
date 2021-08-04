console.defaultError = console.error.bind(console);
consoleErrors = [];
window.onerror = function myErrorHandler(message, source, lineno, colno, error) {
    showMessage(generateMessage(message, source, lineno, colno, error));
    return false;
}
console.error = function () {
    console.defaultError.apply(console, arguments);
    consoleErrors.push(Array.from(arguments));
    console.log(Array.from(arguments));
    showMessage(Array.from(arguments).toString());
}

function generateMessage(message, source, lineno, colno, error) {
    let resultMessage = message;
    let fileWithExtension = source.substring(source.lastIndexOf('/') + 1);
    let file = fileWithExtension.substring(0, fileWithExtension.lastIndexOf('.'));
    let href = "<a target='_blank' href='" + source + "'>" + fileWithExtension + ":" + lineno + "</a>";
    let margins = "<br> &nbsp; &nbsp; &nbsp; ";
    resultMessage += margins + "at " + file + " (" + href + ")";
    return resultMessage;
}

let containerForNotifications = null;

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
    }
    const notificationNode = document.createElement("notification-custom-html");
    setTimeout(() => notificationNode.setAttribute('message', message), 0);

    containerForNotifications.prepend(notificationNode);
    containerForNotifications.scrollTop = containerForNotifications.scrollHeight;
}
