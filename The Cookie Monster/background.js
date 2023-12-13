chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension installed");
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        console.log(`Tab ${tabId} updated`);
    }
});
