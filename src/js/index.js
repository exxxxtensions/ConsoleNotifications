async function engine() {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: testFunction,
    });
}

function testFunction() {
    console.log('test');

}

document.getElementById("button1").addEventListener('click', () => engine());

