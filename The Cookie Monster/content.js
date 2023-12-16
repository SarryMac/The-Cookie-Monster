document.addEventListener('DOMContentLoaded', function() {
    console.log("Content script active");
    // Here you can later add code to interact with web pages  
});

const wordsToLookOutFor = [
    'consent', 'cookie', 'privacy', 'test'
]

function removeCookieConsentDialog() {
    const idsOnPage = getAllIdsOnDOM();
    console.log(idsOnPage);

    idsOnPage.forEach(idString => {
        if(idString === 'truste-consent-text'){
            console.log('truste-consent-text')
        }
        const idStringLower = idString.toLowerCase();

        for (var i = 0, n = wordsToLookOutFor.length; i < n; ++i) {
            var currentReferenceWord = wordsToLookOutFor[i];

            if(idStringLower.includes(currentReferenceWord)){
                console.log(idStringLower, currentReferenceWord);
                deleteElement(idString);
            }
        }
    })
    
}

const varWillNeverChange = 1;
var varWillChange = 3;
varWillChange = 4;

// returns a list of all ids on the 
function getAllIdsOnDOM() {
    var allElements = document.getElementsByTagName("*");
    var allIds = [];
    for (var i = 0, n = allElements.length; i < n; ++i) {
    var el = allElements[i];
    if (el.id) { allIds.push(el.id); }
    }
    return allIds;
}

function deleteElement(idStringToDelete){
    const elementToDelete = document.getElementById(idStringToDelete);
    if(elementToDelete){
        elementToDelete.remove();
    }
}
removeCookieConsentDialog()



// function handleMutations(mutations, observer) {
//     for (let mutation of mutations) {
//         if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
//             mutation.addedNodes.forEach(node => {
//                 if (node.nodeType === Node.ELEMENT_NODE) { // Make sure it's an element node
//                     const dialog = findCookieConsentDialog(node);
//                     if (dialog) {
//                         rejectCookies(dialog);
//                         observer.disconnect(); // Optional: disconnect the observer after finding the dialog
//                     }
//                 }
//             });
//         }
//     }
// }

// // Create a new MutationObserver instance
// const observer = new MutationObserver(handleMutations);

// // Options for the observer (what changes to observe)
// const config = { childList: true, subtree: true };

// // Start observing the document body for DOM changes
// observer.observe(document.body, config);
