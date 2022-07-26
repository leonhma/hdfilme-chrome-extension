chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
    if (message.type === 'console') { 
        console.log(message.data)
        sendResponse()
    }
});
