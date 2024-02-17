const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>;
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />;
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>`;
  
  /*
Step 53

The insertAdjacentHtml method takes two arguments. The first argument is a string that specifies the position of the inserted element. The second argument is a string containing the HTML to be inserted.

For the first argument, pass the string beforeend to insert the new element as the last child of targetInputContainer.

For the second argument, pass your HTMLString variable.
*/

targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

/**
 * Step 50

In the Role Playing Game project, you learned how to set a button's behavior by editing its onclick property. You can also edit an element's behavior by adding an event listener.

The following example uses the addEventListener method to add a click event to a button. When the button is clicked, the printName function is called.

<button class="btn">Print name</button>
const button = document.querySelector('.btn');
function printName() {
  console.log("Jessica");
}
button.addEventListener('click', printName);
The addEventListener method takes two arguments. The first is the event to listen to. (Ex. 'click') The second is the callback function, or the function that runs when the event is triggered.

Call the .addEventListener() method on the addEntryButton. Pass in the string click for the first argument and the addEntry function for the second argument.

Note that you should not call addEntry, but pass the variable (or function reference) directly.
 */

addEntryButton.addEventListener("click", addEntry);

/*
Step 56

The list parameter is going to be the result of a query selector, which will return a NodeList. A NodeList is a list of elements like an array.
It contains the elements that match the query selector. You will need to loop through these elements in the list.

In previous steps, you learned how to loop through an array using a for loop. You can also use a for...of loop to loop through an array and a NodeList.

A for...of loop is used to iterate over elements in an iterable object like an array. The variable declared in the loop represents the current element being iterated over.

for (const element of elementArray) {
  console.log(element);
}
Create a for...of loop that loops through the list. For the loop's variable name, use const to declare a variable called item.
*/

function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {

    /*

    Step 57

The NodeList values you will pass to list will consist of input elements. So you will want to look at the value attribute of each element.

Assign item.value to a const variable called currVal.

    */
    const currVal = item.value;    
  }

}


function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

/*
Step 73

You also need to get the value of your #budget input. You already queried this at the top of your code, and set it to the budgetNumberInput variable. However, you used getElementById, which returns an Element, not a NodeList.

A NodeList is an array-like, which means you can iterate through it and it shares some common methods with an array. For your getCaloriesFromInputs function, an array will work for the argument just as well as a NodeList does.

Declare a budgetCalories variable and set it to the result of calling getCaloriesFromInputs – pass an array containing your budgetNumberInput as the argument.

*/

const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

if (isError) {
  return;
}

const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
output.innerHTML = `
<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
<hr>
<p>${budgetCalories} Calories Budgeted</p>
<p>${consumedCalories} Calories Consumed</p>
<p>${exerciseCalories} Calories Burned</p>
`;


/*
Step 85

Finally, you need to make the #output element visible so the user can see your text. Your output variable is an Element, which has a classList property. This property has a .remove() method, which accepts a string representing the class to remove from the element.

const paragraphElement = document.getElementById('paragraph');
paragraphElement.classList.remove('hide');
Use the .remove() method of the output variable's classList property to remove the hide class. Don't forget to place the word hide inside quotes.
*/

output.classList.remove('hide');

}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

/*
Remember that document.querySelectorAll returns a NodeList, which is array-like but is not an array. However, the Array object has a .from() method that accepts an array-like and returns an array. This is helpful when you want access to more robust array methods, which you will learn about in a future project.

The following example takes a NodeList of li elements and converts it to an array of li elements:

<ul>
  <li>List 1</li>
  <li>List 2</li>
  <li>List 3</li>
</ul>
const listItemsArray = Array.from(document.querySelectorAll('li'));

console.log(listItemsArray); //Output: (3) [li, li, li]
Wrap your inputContainers query selector in Array.from(). Do this on the same line as your declaration.
*/

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));
  for (const container of inputContainers) {
    container.innerHTML = '';
  }  // This will clear all of the contents of that input container.

  budgetNumberInput.value = '';
  output.innerText=''; // The difference between innerText and innerHTML is that innerText will not render HTML elements, but will display the tags and content as raw text.
  output.classList.add('hide'); //restore the hide class to the output element


}

//add 2 more event listeres and how they behave
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener('click', clearForm);