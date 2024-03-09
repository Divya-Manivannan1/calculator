import "./styles/style.scss";

//declaring the html elements

const calculatorOutput = document.querySelector<HTMLDivElement>(
  ".calculator__output"
);
const calculatorInput =
  document.querySelector<HTMLDivElement>(".calculator__input");
const numberButtons =
  document.querySelectorAll<HTMLButtonElement>(".number-button");
const operatorButtons =
  document.querySelectorAll<HTMLButtonElement>(".operator-button");

//Null check

if (
  !calculatorOutput ||
  !calculatorInput ||
  !numberButtons ||
  !operatorButtons
) {
  throw new Error("Issue with the selector");
}

// declaring other variables
let answer: number = 0;
let expressionToBeCalculated: string = "";
let hasDecimalPoint: boolean = false;
let isLastInputSymbol = true;

//All the functions are declared

const addNumberToExpression = (event: Event): void => {
  //Checks if the number already has a decimal point on it and adds the number to the expression
  const element = event.currentTarget as HTMLButtonElement;

  if (element.value == ".") {
    if (hasDecimalPoint == true) return;
    else {
      if (isLastInputSymbol) {
        expressionToBeCalculated += "0";
      }
      hasDecimalPoint = true;
    }
  }

  isLastInputSymbol = false;
  expressionToBeCalculated += element.value;

  calculatorInput.textContent = expressionToBeCalculated;
};

const addOperaterToExpression = (event: Event): void => {
  //Checks if the last entered value is a operator and adds the operator to the expression

  const element = event.currentTarget as HTMLButtonElement;

  if (isLastInputSymbol) {
    return;
  } else {
    if (expressionToBeCalculated[expressionToBeCalculated.length - 1] == ".") {
      expressionToBeCalculated += "0";
    }

    isLastInputSymbol = true;
    expressionToBeCalculated += element.value;
    hasDecimalPoint = false;

    calculatorInput.textContent = expressionToBeCalculated;
  }
};

// sending put display

calculatorOutput.textContent = `${answer}`;
calculatorInput.textContent = expressionToBeCalculated;

//Event listeners

numberButtons.forEach((numberButton) =>
  numberButton.addEventListener("click", addNumberToExpression)
);

operatorButtons.forEach((operatorButton) =>
  operatorButton.addEventListener("click", addOperaterToExpression)
);
