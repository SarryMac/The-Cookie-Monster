document.addEventListener('DOMContentLoaded', function() {
    console.log("Content script active");
    // Here you can later add code to interact with web pages
const dialog = findCookieConsentDialog();
if (dialog) {
    rejectCookies(dialog);
} else {
    console.log('No cookie consent dialog found');
}});

function findCookieConsentDialog(node = document) {
    let pepsiConsentDiv = node.querySelector('#teconsent');
    if (pepsiConsentDiv) {
        return pepsiConsentDiv;
    }

    // Your existing general selectors
    const selectors = ['cookie-consent', 'cookieBanner', 'cookie-notice'];
    for (let selector of selectors) {
        let dialog = node.querySelector(`[id*=${selector}], [class*=${selector}]`);
        if (dialog) {
            return dialog;
        }
    }
    return null;
}

function rejectCookies(dialog) {
    // Logic to 'click' the reject button in the dialog
    // This is highly dependent on the structure of the dialog
    const rejectButton = dialog.querySelector('button[title*="reject"], button[title*="decline"]');
    if (rejectButton) {
        rejectButton.click();
        console.log('Cookie consent rejected');
    }
}

// Function to handle mutations (changes) observed
function handleMutations(mutations, observer) {
    for (let mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check each added node if it is the cookie dialog
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
