var actualCode = '(' + function () {
    'use strict';
    var modifiedNavigator = Navigator.prototype;
    // Pretend to be Windows XP
    Object.defineProperties(modifiedNavigator, {
        userAgent: {
            value: 'android or so you thought @disable-devtool',
            configurable: false,
            enumerable: true,
            writable: false
        }
    });
} + ')();';

var s = document.createElement('script');
s.textContent = actualCode;
document.documentElement.appendChild(s);
s.remove();

window.onload = () => {
    chrome.runtime.sendMessage({
        type: 'console',
        data: navigator.userAgent.toLowerCase()
    })
}
