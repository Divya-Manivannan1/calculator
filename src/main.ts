import "./styles/style.scss";

//declaring the html elements

const calculatorOutput = document.querySelector<HTMLDivElement>(
  ".calculator__output"
);
const calculatorInput =
  document.querySelector<HTMLDivElement>(".calculator__input");
const numberButtons =
  document.querySelectorAll<HTMLButtonElement>(".number-button");

//Null check

if (!calculatorOutput || !calculatorInput || !numberButtons) {
  throw new Error("Issue with the selector");
}

// declaring other variables
let answer: number = 0;
let expressionToBeCalculated: string = "";
let hasDecimalPoint: boolean = false;

//All the functions are declared

const addNumberToExpression = (event: Event): void => {
  const element = event.currentTarget as HTMLButtonElement;

  if (element.value == ".") {
    if (hasDecimalPoint == true) return;
    hasDecimalPoint = true;
  }

  expressionToBeCalculated += element.value;
  calculatorInput.textContent = expressionToBeCalculated;
};

// sending put display

calculatorOutput.textContent = `${answer}`;
calculatorInput.textContent = expressionToBeCalculated;

//Event listeners

numberButtons.forEach((numberButton) =>
  numberButton.addEventListener("click", addNumberToExpression)
);
