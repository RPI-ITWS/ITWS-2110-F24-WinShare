let Clicks = 0;

function displayMore(){
    const bar = document.getElementById('DropdownBar');
    const content = document.getElementById('Sponsors');
    if (Clicks === 0){
        Clicks++;
        bar.style.display = 'block';
        content.style.display = 'none';

    }else{
       Clicks--;
        bar.style.display = 'none';
        content.style.display =  'block';
    }
}