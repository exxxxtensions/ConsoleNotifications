function injectScript(file, node) {
    const th = document.getElementsByTagName(node)[0];
    const s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript( chrome.runtime.getURL('/js/notification_html_element.js'), 'body');
injectScript( chrome.runtime.getURL('/js/window_handler.js'), 'body');
console.log('**Console Notifications V1.0**');
