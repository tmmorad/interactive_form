/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
Tamer Morad
******************************************/

let flags = 0;// used to track how many errors there are in the form
const nameField = document.getElementById('name');
const email = document.getElementById('mail');
const jobRole = document.getElementById('title');
const otherTitle =  document.getElementById("other-title");

/******************************************
Used for T-shirt Theme and Color Selection Section
******************************************/
const designTheme =  document.getElementById("design");
const designsColors = document.querySelectorAll("#color option");
const shirtColor = document.getElementById('color');
const jsPuns = ['cornflowerblue', 'darkslategrey', 'gold'];
const heartJS = ['tomato', 'steelblue', 'dimgrey'];

/******************************************
Used for fn. Boxes
Which checks if there are any checkboxes checked
******************************************/
const activities = document.querySelector('fieldset.activities');
const eventPrices = [
  {name: 'all', price: 200, time: 'all'},
  {name: 'js-frameworks', price: 100, time: 'tu9a'},
  {name: 'js-libs', price: 100, time: 'tu1p'},
  {name: 'express', price: 100, time: 'tu9a'},
  {name: 'node', price: 100, time: 'tu1p'},
  {name: 'build-tools', price: 100, time: 'w9a'},
  {name: 'npm', price: 100, time: 'w1p'}
 ];
let cost= 0;
let totalCost = document.createElement('p');
activities.appendChild(totalCost);
activities.lastChild.setAttribute('id', 'sum');
/*********END****************/


const submitButton = document.querySelector('[type="submit"]');

function setFocus(tag){
  let myElement = document.getElementById(tag);
  myElement.focus();
}

setFocus("name");

jobRole.addEventListener('change', () =>{
  if(jobRole.value === "other"){
    otherTitle.removeAttribute('hidden');
    setFocus("other-title");
  } else {
    otherTitle.setAttribute('hidden','');
  }
});//End jobRole Event

/******************************************
T-shirt Theme and Color Selection Section
******************************************/
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

//Function used for hiding or displaying options
function colorOptions (what, display) {
  for (var i = 0; i < what.length; i++) {
    let whatColor = document.querySelector('[value='+what[i]+']').style.display=display;
  }
}// End colorOptions

designTheme.addEventListener('change', () =>{
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
    shirtColor.value = 'default';
  }
});

/******************************************
Checkboxes for Conference Events Selection
Each events info is stored in eventPrices array
Contains Custom realtime Validation
******************************************/

function boxes (){
  cost = 0;
  for (var reset in eventPrices) {
    let x = document.querySelector('[name='+eventPrices[reset]['name']+']');
    x.removeAttribute('disabled'),
    x.parentNode.removeAttribute('class');
  }

  if (activities.querySelectorAll('input:checked').length==0) {
    console.log("No Events Have Been Selected \(checkboxes\)");//for testing
    flags+=1; //marks that there is an error ie. no activity selected
    let x = document.querySelector(".activities").firstElementChild;
    let theSpan = "<span class=\'line box\'> (Please Select at least one Activity from below)</span>";
    x.innerHTML+= theSpan;
  } else {
    let byeItem = document.querySelector([".box"]);
    if (byeItem !== null) {
      byeItem.remove();
      flags-=1;
    }
  }

  for (var checkbox in eventPrices) {
    let x = document.querySelector('[name='+eventPrices[checkbox]['name']+']');
    if (x.checked) {
      let compare = eventPrices[checkbox]['time'];
      cost+= parseInt(eventPrices[checkbox]['price']);
      for (var times in eventPrices) {
        let other = eventPrices[times]['time'];
        let y = document.querySelector('[name='+eventPrices[times]['name']+']');
        if (y.checked === false) {
          if (compare === other) {
            y.setAttribute('disabled', '');
            y.parentNode.setAttribute('class', 'disabled');// Adds the CSS class disabled for custom styles
          }
        }
      }
    }
  }//End of for loop
  let newTotal = document.getElementById('sum');
  let theSum = document.createTextNode(`Total $ ${cost}`);
  newTotal.appendChild(theSum);
  let message = `Total $ ${cost}`;
  newTotal.innerHTML = message;
}//End Function Boxes

boxes(); //Initial Call to prompt Error No Activities selected

//EventListener for when checkboxes changes
 activities.addEventListener('change', () => {
   boxes();
 });

/******************************************
 Payment Options Section
******************************************/

//Removes the default select method option from Payment
const payment = document.getElementById('payment');
const removeSelect = payment.firstElementChild;
removeSelect.parentNode.removeChild(removeSelect);
//sets Credit Card option as default
document.querySelector('[value="credit card"]').setAttribute('selected', '');
const creditCard = document.getElementById('credit-card');
const payFieldset = document.getElementById('payment').parentNode.querySelectorAll('fieldset>div');

function hideOptions (option, what) {
  for (var i = 0; i < what.length; i++) {
    if (i === option) {
      what[i].style.display='block';
    } else {
      what[i].style.display='none';
    }
  }
}// End hideOptions

hideOptions(0, payFieldset);//Intial Call, 0 = credit card DIV

payment.addEventListener('change', () =>{
  if (payment.value ==="credit card") {
    hideOptions(0, payFieldset);
  } else if (payment.value ==="paypal"){
    hideOptions(1, payFieldset);
  } else {
    hideOptions(2, payFieldset);
  }
});


/******************************************
 Start of Validation Section
 let flags = 0; is declared at top
******************************************/
let message = "Please correct the Following Field";

function setError(id, message){
  id.setAttribute('class', 'error');
  let x = document.querySelector("[for= \'"+id.id+"\']");
  let theSpan = "<span class=\'line\'> ("+message+")</span>";
  x.innerHTML+= theSpan;
}

function validEmail(check){
  return /^\w+@\w+(\.(\w)+)$/i.test(check.value);
}

function validate(num, bottom, top, message){
  let id = document.getElementById(num);
  let testnum = id.value;
  if (testnum==="" || isNaN(testnum)) {
    setError(id, message);
    flags+=1;
  } else if (testnum.length < bottom || testnum.length > top) {
    flags+=1;
    setError(id, message);
  } else {
    console.log("we have a valid "+num+"!");
  }
}

activities.addEventListener('change', ()=>{
  console.log("Checkboxes Changed");
});

submitButton.addEventListener('click', (e)=>{
 console.log(flags);//for testing and tracking
  //for loop Resets all the error and line class
  for (let i = 0; i < flags; i++) {
    let byeItem = document.querySelector([".line"]);
    //Below if(){}...Removes the error class from the parent element ie. Red Border
    if (document.querySelector('[class="error"]')) {
      document.getElementById(document.querySelector('[class="error"]').id).removeAttribute("class");
    }
    byeItem.remove();//Removes the span conatining the error message
  }

  flags = 0;

  if (nameField.value ===""){
    flags+=1;
    message = "You are Missing Your Name!";
    setError(nameField, message);
  }
  //Email section
  if(!validEmail(email)){
    flags+=1;
    message = "Please format email as follows: yourEmail@yourHost.com";
    setError(email, message);
  }
  //Events the checkboxes
  if (activities.querySelectorAll('input:checked').length==0) {
    boxes();

  }
  //Payment form
  if (payment.value ==="credit card") {
    let ccinfo =[
      ["cc-num", "zip", "cvv"],
      [13, 5, 3],
      [16, 5, 3],
      ["Enter 13 to 16 digit number", "5 Digits", "3 Digits"]
    ];
    for (var i = 0; i <= 2; i++) {
      validate(ccinfo[0][i], ccinfo[1][i], ccinfo[2][i], ccinfo[3][i]);
    }
  }

  if (flags>0) {
    e.preventDefault();
    console.log("THE NUMBER OF ERRORS: "+flags);
    alert('Sorry Can\'t Submit your entry at this time; Please correct the following form fields highlighted in red.');
    // Set pagefocus to the first element that has the error class, the red boarder will be hidden due to the focus
    setFocus(document.querySelector('.error').id);
  } else if (flags===0) {
    alert("Thank you for your completed Registration")
  }
});
