async function engine() {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: showMessage,
        });
}
function showMessage() {
        console.log('test');
        // const body = document.getElementsByTagName('body')[0];
        const notificationNode = document.createElement("div");
        notificationNode.style.width = "400px";
        notificationNode.style.height = "300px";
        notificationNode.style.background = "red";
        notificationNode.innerHTML = "Hello";
        notificationNode.style.position = "fixed";
        notificationNode.style.left = "20px";
        notificationNode.style.bottom = "40px";
        notificationNode.style.opacity = "0.15";
        notificationNode.style.zIndex = "99999999999";

        document.body.appendChild(notificationNode);
}
function testFunction() {
    console.log('test111');
    // const body = document.getElementsByTagName('body')[0];
    // const notificationNode = document.createElement("div");
    // notificationNode.style.width = "400px";
    // notificationNode.style.height = "300px";
    // notificationNode.style.background = "red";
    // notificationNode.innerHTML = "Hello";
    // notificationNode.style.position = "fixed";
    // notificationNode.style.left = "20px";
    // notificationNode.style.bottom = "40px";
    // notificationNode.style.opacity = "0.15";
    // notificationNode.style.zIndex = "99999999999";

    // document.body.appendChild(notificationNode);
}
document.getElementById("button1").addEventListener('click', () => engine());
// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: testFunction,
//       });
//   });
//   chrome.action.onClicked.addListener(tab => {
//     chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: testFunction,
//   }); });
// chrome.tabs.
