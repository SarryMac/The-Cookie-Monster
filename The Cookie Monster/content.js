const checkForElement = setInterval(() => {
    const diddelete=removeCookieConsentDialog()
    if (diddelete==true) { //would work without ""==true" as if gate only activated if the outcome is true
      console.log("stopping interval");
      clearInterval(checkForElement);
      // Run your code for the element here
    }
  }, 100); // Check every 100ms, adjust as necessary
  
  window.addEventListener('load', function() { 
    // window. wonrked in the above line. Document. did not
    console.log("Content script active");
    removeCookieConsentDialog()
});

const wordsToLookOutFor = [
    'consent', 'cookie', 'privacy'
]

function removeCookieConsentDialog() {
    const idsOnPage = getAllIdsOnDOM();
    console.log(idsOnPage);
    var diddelete=false
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
                diddelete=true
            }
        }
    })
    return diddelete
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




