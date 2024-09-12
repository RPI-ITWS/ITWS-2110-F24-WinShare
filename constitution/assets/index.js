function GodBlessAmerica(){
    const soundeffect = new Audio('./assets/sounds/eagle-screech.mp3')
    soundeffect.play()
}

let PreambleCounter = 0;

function DisplayPreamble(button) {
    const Text = document.getElementById('PreambleText');
    const Analysis = document.getElementById('PreambleAnalysis');
    const action = button.getAttribute('data-action');
    
    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');
        elementToShow.style.display = 'block'; 
        setTimeout(() => elementToShow.classList.add('show'), 10);
    };

    if (action === "standard") {
        if (PreambleCounter === 1) {
            Text.classList.remove('show'); 
            PreambleCounter = 0;
        } else {
            showElement(Text, Analysis); 
            PreambleCounter = 1;
        }
    } else if (action === "different") {
        if (PreambleCounter === 2) {
            Analysis.classList.remove('show');
            PreambleCounter = 0;
        } else {
            showElement(Analysis, Text);
            PreambleCounter = 2;
        }
    }
}



let ArCounter1 = 0;  

function DisplayArticle1(button) {
    const Text = document.getElementById('Article1Text');
    const Analysis = document.getElementById('Article1Analysis');
    const action = button.getAttribute('data-action');

    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');
        elementToShow.style.display = 'block';
        setTimeout(() => elementToShow.classList.add('show'), 10);
    };

    if (action === "standard") {
        if (ArCounter1 === 1) {
            Text.classList.remove('show');
            ArCounter1 = 0;
        } else {
            showElement(Text, Analysis); 
            ArCounter1 = 1;
        }
    } else if (action === "different") {
        if (ArCounter1 === 2) {
            Analysis.classList.remove('show');
            ArCounter1 = 0;
        } else {
            showElement(Analysis, Text); 
            ArCounter1 = 2;
        }
    }
}

let ArCounter2 = 0;  

function DisplayArticle2(button) {
    const Text = document.getElementById('Article2Text');
    const Analysis = document.getElementById('Article2Analysis');
    const action = button.getAttribute('data-action');

    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');
        elementToShow.style.display = 'block';
        setTimeout(() => elementToShow.classList.add('show'), 10);
    };

    if (action === "standard") {
        if (ArCounter2 === 1) {
            Text.classList.remove('show');
            ArCounter2 = 0;
        } else {
            showElement(Text, Analysis); 
            ArCounter2 = 1;
        }
    } else if (action === "different") {
        if (ArCounter2 === 2) {
            Analysis.classList.remove('show');
            ArCounter2 = 0;
        } else {
            showElement(Analysis, Text); 
            ArCounter2 = 2;
        }
    }
}

let ArCounter3 = 0;  

function DisplayArticle3(button) {
    const Text = document.getElementById('Article3Text');
    const Analysis = document.getElementById('Article3Analysis');
    const action = button.getAttribute('data-action');

    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');
        elementToShow.style.display = 'block';
        setTimeout(() => elementToShow.classList.add('show'), 10);
    };

    if (action === "standard") {
        if (ArCounter3 === 1) {
            Text.classList.remove('show');
            ArCounter3 = 0;
        } else {
            showElement(Text, Analysis); 
            ArCounter3 = 1;
        }
    } else if (action === "different") {
        if (ArCounter3 === 2) {
            Analysis.classList.remove('show');
            ArCounter3 = 0;
        } else {
            showElement(Analysis, Text); 
            ArCounter3 = 2;
        }
    }
}

let ArCounter4 = 0;  

function DisplayArticle4(button) {
    const Text = document.getElementById('Article4Text');
    const Analysis = document.getElementById('Article4Analysis');
    const action = button.getAttribute('data-action');

    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');
        elementToShow.style.display = 'block';
        setTimeout(() => elementToShow.classList.add('show'), 10);
    };

    if (action === "standard") {
        if (ArCounter4 === 1) {
            Text.classList.remove('show');
            ArCounter4 = 0;
        } else {
            showElement(Text, Analysis); 
            ArCounter4 = 1;
        }
    } else if (action === "different") {
        if (ArCounter4 === 2) {
            Analysis.classList.remove('show');
            ArCounter4 = 0;
        } else {
            showElement(Analysis, Text); 
            ArCounter4 = 2;
        }
    }
}

let ArCounter5 = 0;  

function DisplayArticle5(button) {
    const Text = document.getElementById('Article5Text');
    const Analysis = document.getElementById('Article5Analysis');
    const action = button.getAttribute('data-action');

    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');
        elementToShow.style.display = 'block';
        setTimeout(() => elementToShow.classList.add('show'), 10);
    };

    if (action === "standard") {
        if (ArCounter5 === 1) {
            Text.classList.remove('show');
            ArCounter2 = 0;
        } else {
            showElement(Text, Analysis); 
            ArCounter5 = 1;
        }
    } else if (action === "different") {
        if (ArCounter5 === 2) {
            Analysis.classList.remove('show');
            ArCounter5 = 0;
        } else {
            showElement(Analysis, Text); 
            ArCounter5 = 2;
        }
    }
}

let ArCounter6 = 0;  

function DisplayArticle6(button) {
    const Text = document.getElementById('Article6Text');
    const Analysis = document.getElementById('Article6Analysis');
    const action = button.getAttribute('data-action');

    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');
        elementToShow.style.display = 'block';
        setTimeout(() => elementToShow.classList.add('show'), 10);
    };

    if (action === "standard") {
        if (ArCounter6 === 1) {
            Text.classList.remove('show');
            ArCounter6 = 0;
        } else {
            showElement(Text, Analysis); 
            ArCounter6 = 1;
        }
    } else if (action === "different") {
        if (ArCounter6 === 2) {
            Analysis.classList.remove('show');
            ArCounter6 = 0;
        } else {
            showElement(Analysis, Text); 
            ArCounter6 = 2;
        }
    }
}

let ArCounter7 = 0;  

function DisplayArticle7(button) {
    const Text = document.getElementById('Article7Text');
    const Analysis = document.getElementById('Article7Analysis');
    const action = button.getAttribute('data-action');

    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');
        elementToShow.style.display = 'block';
        setTimeout(() => elementToShow.classList.add('show'), 10);
    };

    if (action === "standard") {
        if (ArCounter7 === 1) {
            Text.classList.remove('show');
            ArCounter7 = 0;
        } else {
            showElement(Text, Analysis); 
            ArCounter7 = 1;
        }
    } else if (action === "different") {
        if (ArCounter7 === 2) {
            Analysis.classList.remove('show');
            ArCounter7 = 0;
        } else {
            showElement(Analysis, Text); 
            ArCounter7 = 2;
        }
    }
}

let AmendCounter = 0;  
function DisplayAmendments(button) {
    const Text = document.getElementById('AmendmentsText');
    const Analysis = document.getElementById('AmendmentsAnalysis');
    const action = button.getAttribute('data-action');

    const showElement = (elementToShow, elementToHide) => {
        elementToHide.classList.remove('show');  
        elementToShow.style.display = 'block';  
        setTimeout(() => elementToShow.classList.add('show'), 10);  
    };

    if (action === "standard") {
        if (AmendCounter === 1) {
            Text.classList.remove('show'); 
            AmendCounter = 0;
        } else {
            showElement(Text, Analysis);
            AmendCounter = 1;
        }
    } else if (action === "different") {
        if (AmendCounter === 2) {
            Analysis.classList.remove('show');
            AmendCounter = 0;
        } else {
            showElement(Analysis, Text); 
            AmendCounter = 2;
        }
    }
}

