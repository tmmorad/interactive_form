/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
Tamer Morad
******************************************/

const jobRole = document.getElementById('title');
const otherTitle =  document.getElementById("other-title");
const designTheme =  document.getElementById("design");
const designsColors = document.querySelectorAll("#color option");
const shirtColor = document.getElementById('color');
const jsPuns = ['cornflowerblue', 'darkslategrey', 'gold'];
const heartJS = ['tomato', 'steelblue', 'dimgrey'];


function setFocus(tag){
  const myElement = document.getElementById(tag);
  myElement.focus();
}

setFocus("name");

jobRole.addEventListener('change', () =>{
  if(jobRole.value === "other"){
    otherTitle.removeAttribute('hidden');
  } else {
    otherTitle.setAttribute('hidden','');
  }
});//End jobRole Event

//Creates Default selection for shirtColor "Please Select a Color"
function pleaseSelect(state) {
  let shirtNode = document.getElementById('color').firstElementChild;
  let defaultColor = document.createElement('option');
  let colorText = document.createTextNode('Please Select a Shirt Color');

  if (state === true) {
    defaultColor.setAttribute('selected', '');
    defaultColor.setAttribute('value', 'default');
    defaultColor.appendChild(colorText);
    shirtColor.insertBefore(defaultColor, shirtNode);
  }
}

pleaseSelect(true);

function colorOptions (what, display) {
  for (var i = 0; i < what.length; i++) {
    let whatColor = document.querySelector('[value='+what[i]+']').style.display=display;
  }
}// End colorOptions

designTheme.addEventListener('change', () =>{
  console.log('triggered');

  if (designTheme.value === "js puns") {
    colorOptions.call(this, heartJS, 'none');
    colorOptions.call(this, jsPuns, 'block');
    shirtColor.value = 'default';
  } else if (designTheme.value === "heart js") {
    colorOptions.call(this, jsPuns, 'none');
    colorOptions.call(this, heartJS, 'block');
    shirtColor.value = 'default';
  } else {
    colorOptions.call(this, jsPuns, 'none');
    colorOptions.call(this, heartJS, 'none');
  }
});

// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
// When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
