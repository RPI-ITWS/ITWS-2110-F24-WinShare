
function GodBlessAmerica(){
    const soundeffect = new Audio('./assets/sounds/eagle-screech.mp3')
    soundeffect.play()
}

let PreambleCounter = 0;

function DisplayPreamble(button) {
    const Text = document.getElementById('PreambleText');
    const Analysis = document.getElementById('PreambleAnalysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (PreambleCounter === 1) {
            Text.style.display = 'none';
            PreambleCounter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            PreambleCounter = 1;
        }
    } else if (action === "different") {
        if (PreambleCounter === 2) {
            Analysis.style.display = 'none';
            PreambleCounter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            PreambleCounter = 2;
        }
    }
}


let Ar1Counter = 0;
function DisplayArticle1(button) {
    const Text = document.getElementById('Article1Text');
    const Analysis = document.getElementById('Article1Analysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (Ar1Counter === 1) {
            Text.style.display = 'none';
            Ar1Counter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            Ar1Counter = 1;
        }
    } else if (action === "different") {
        if (Ar1Counter === 2) {
            Analysis.style.display = 'none';
            Ar1Counter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            Ar1Counter = 2;
        }
    }
}

let Ar2Counter = 0;
function DisplayArticle2(button) {
    const Text = document.getElementById('Article2Text');
    const Analysis = document.getElementById('Article2Analysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (Ar2Counter === 1) {
            Text.style.display = 'none';
            Ar2Counter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            Ar2Counter = 1;
        }
    } else if (action === "different") {
        if (Ar2Counter === 2) {
            Analysis.style.display = 'none';
            Ar2Counter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            Ar2Counter = 2;
        }
    }
}

let Ar3Counter = 0;
function DisplayArticle3(button) {
    const Text = document.getElementById('Article3Text');
    const Analysis = document.getElementById('Article3Analysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (Ar3Counter === 1) {
            Text.style.display = 'none';
            Ar3Counter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            Ar3Counter = 1;
        }
    } else if (action === "different") {
        if (Ar3Counter === 2) {
            Analysis.style.display = 'none';
            Ar3Counter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            Ar3Counter = 2;
        }
    }
}

let Ar4Counter = 0;
function DisplayArticle4(button) {
    const Text = document.getElementById('Article4Text');
    const Analysis = document.getElementById('Article4Analysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (Ar4Counter === 1) {
            Text.style.display = 'none';
            Ar4Counter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            Ar4Counter = 1;
        }
    } else if (action === "different") {
        if (Ar4Counter === 2) {
            Analysis.style.display = 'none';
            Ar4Counter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            Ar4Counter = 2;
        }
    }
}

let Ar5Counter = 0;
function DisplayArticle5(button) {
    const Text = document.getElementById('Article5Text');
    const Analysis = document.getElementById('Article5Analysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (Ar5Counter === 1) {
            Text.style.display = 'none';
            Ar5Counter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            Ar5Counter = 1;
        }
    } else if (action === "different") {
        if (Ar5Counter === 2) {
            Analysis.style.display = 'none';
            Ar5Counter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            Ar5Counter = 2;
        }
    }
}

let Ar6Counter = 0;
function DisplayArticle6(button) {
    const Text = document.getElementById('Article6Text');
    const Analysis = document.getElementById('Article6Analysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (Ar6Counter === 1) {
            Text.style.display = 'none';
            Ar6Counter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            Ar6Counter = 1;
        }
    } else if (action === "different") {
        if (Ar6Counter === 2) {
            Analysis.style.display = 'none';
            Ar6Counter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            Ar6Counter = 2;
        }
    }
}

let Ar7Counter = 0;
function DisplayArticle7(button) {
    const Text = document.getElementById('Article7Text');
    const Analysis = document.getElementById('Article7Analysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (Ar7Counter === 1) {
            Text.style.display = 'none';
            Ar7Counter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            Ar7Counter = 1;
        }
    } else if (action === "different") {
        if (Ar7Counter === 2) {
            Analysis.style.display = 'none';
            Ar7Counter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            Ar7Counter = 2;
        }
    }
}

let AmendCounter = 0;
function DisplayAmendments(button) {
    const Text = document.getElementById('AmendmentsText');
    const Analysis = document.getElementById('AmendmentsAnalysis');
    const action = button.getAttribute('data-action');

    if (action === "standard") {
        if (AmendCounter === 1) {
            Text.style.display = 'none';
            AmendCounter = 0;
        } else {
            Analysis.style.display = 'none';
            Text.style.display = 'block';
            AmendCounter = 1;
        }
    } else if (action === "different") {
        if (AmendCounter === 2) {
            Analysis.style.display = 'none';
            AmendCounter = 0;
        } else {
            Text.style.display = 'none';
            Analysis.style.display = 'block';
            AmendCounter = 2;
        }
    }
}