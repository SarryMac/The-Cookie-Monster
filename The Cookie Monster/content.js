document.addEventListener('DOMContentLoaded', function() {
    console.log("Content script active");
    // Here you can later add code to interact with web pages  
});

function findCookieConsentDialog(node = document) {
    const rejectButton=document.getElementById("consent_blackbar");
    console.log(rejectButton);
    if(rejectButton){
        rejectButton.remove();
    }    

    document.getElementById("teconsent").remove()
    
}
findCookieConsentDialog()

function handleMutations(mutations, observer) {
    for (let mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) { // Make sure it's an element node
                    const dialog = findCookieConsentDialog(node);
                    if (dialog) {
                        rejectCookies(dialog);
                        observer.disconnect(); // Optional: disconnect the observer after finding the dialog
                    }
                }
            });
        }
    }
}

// Create a new MutationObserver instance
const observer = new MutationObserver(handleMutations);

// Options for the observer (what changes to observe)
const config = { childList: true, subtree: true };

// Start observing the document body for DOM changes
observer.observe(document.body, config);
