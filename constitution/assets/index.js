
function GodBlessAmerica(){
    const soundeffect = new Audio('./assets/sounds/eagle-screech.mp3')
    soundeffect.play()
}

let PreambleCounter = 1;

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


let Ar1Counter = 1;
function DisplayArticle1(button) {
    const Text = document.getElementById('Article1Text');
    const Analysis = document.getElementById('Article1Analysis');
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

//"With the establishment of the United States, we as a nation strive for the best country we can create. This nation is a place peace, safety, justice and you're well being can be promoted through your liberty. The Preamble is establishing the country's govenrment will be outlined in this document while keeping the American people safe and free. This is clear considering the founding fathers and our great nation just finsihed a bloddy fight for independence from a crown that ddn't allow us the represent ourselves in the government."