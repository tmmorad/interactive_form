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
  console.log('triggered design select');//REMOVE just for testing

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

 //Parse all checkboxs
function boxs (){
  cost = 0;
  for (var reset in eventPrices) {
    let x = document.querySelector('[name='+eventPrices[reset]['name']+']');
    x.removeAttribute('disabled'),
    x.parentNode.removeAttribute('class');
  }
  for (var checkbox in eventPrices) {
    let x = document.querySelector('[name='+eventPrices[checkbox]['name']+']');
    if (x.checked) {
      let compare = eventPrices[checkbox]['time'];
      cost+= parseInt(eventPrices[checkbox]['price']);
      for (var times in eventPrices) {
        let other = eventPrices[times]['time'];
        let y = document.querySelector('[name='+eventPrices[times]['name']+']');
        console.log(cost);//For testing
        if (y.checked === false) {
          if (compare === other) {
            y.setAttribute('disabled', '');
            y.parentNode.setAttribute('class', 'disabled');
          }
        }
      }
    }
  }
  let newTotal = document.getElementById('sum');
  let theSum = document.createTextNode(`Total $ ${cost}`);
  newTotal.appendChild(theSum);
  let message = `Total $ ${cost}`;
  newTotal.innerHTML = message;
}//End Function Boxs

 activities.addEventListener('change', () => {
   console.log('checkbox change');//Remove just for Testing
   boxs();
 });

//Removes the default select method option from Payment
const payment = document.getElementById('payment');
const removeSelect = payment.firstElementChild;
removeSelect.parentNode.removeChild(removeSelect);
const defaultPayment = document.querySelector('[value="credit card"]').setAttribute('selected', '');
const creditCard = document.getElementById('credit-card');


const payFieldset = document.getElementById('payment').parentNode.querySelectorAll('fieldset>div');
console.log(payFieldset);

function hideOptions (option, what) {
  for (var i = 0; i < what.length; i++) {
    if (i === option) {
      what[i].style.display='block';
    } else {
      what[i].style.display='none';
    }
  }
}// End hideOptions
hideOptions(0, payFieldset);

payment.addEventListener('change', () =>{
  console.log('triggered payment select');//REMOVE just for testing
  if (payment.value ==="credit card") {
    hideOptions(0, payFieldset);
  } else if (payment.value ==="paypal"){
    hideOptions(1, payFieldset);
  } else {
    hideOptions(2, payFieldset);
  }
});
