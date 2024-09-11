let PreambleCounter = 1;

function GodBlessAmerica(){
    const soundeffect = new Audio('./assets/sounds/eagle-screech.mp3')
    soundeffect.play()
}

function DisplayPreamble(button){
    const Text = document.getElementById('PreambleText');
    const action = button.getAttribute('data-action');

    if (action == "standard"){
        if (PreambleCounter == 1){
            Text.style.display = 'none';
            PreambleCounter = 0;
        }else{
            Text.style.display = 'block';
            Text.textContent = "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defense, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America."
            PreambleCounter = 1;
        }
    }else if(action == "different"){
        if (PreambleCounter == 2){
            Text.style.display = 'none';
            PreambleCounter = 0;
        }else{
            Text.style.display = 'block';
            Text.textContent = "With the establishment of the United States, we as a nation strive for the best country we can create. This nation is a place peace, safety, justice and you're well being can be promoted through your liberty. The Preamble is establishing the country's govenrment will be outlined in this document while keeping the American people safe and free. This is clear considering the founding fathers and our great nation just finsihed a bloddy fight for independence from a crown that ddn't allow us the represent ourselves in the government."
            PreambleCounter = 2;
        }
    }

}

