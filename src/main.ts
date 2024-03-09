import "./styles/style.scss";

//DOM ELEMENTS DECLARATION

const calculatorOutput = document.querySelector<HTMLDivElement>(
  ".calculator__output"
);
const calculatorInput =
  document.querySelector<HTMLDivElement>(".calculator__input");
const numberButtons =
  document.querySelectorAll<HTMLButtonElement>(".number-button");
const operatorButtons =
  document.querySelectorAll<HTMLButtonElement>(".operator-button");

//NULL CHECK

if (
  !calculatorOutput ||
  !calculatorInput ||
  !numberButtons ||
  !operatorButtons
) {
  throw new Error("Issue with the selector");
}

// VARIABLE DECLARATIONS
let answer: number = 0;
let expressionToBeCalculated: string = "";
let hasDecimalPoint: boolean = false;
let isLastInputSymbol = true;

//FUNCTION DECLARATIONS

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
  calculatorOutput.textContent = `${calculateExpression()}`;
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

//Callback function - Subtraction and Addition
const add = (ans: string, num: string): string => `${+ans + +num}`;

const calculateExpression = (): string => {
  //Calculates the value of the expression
  const expressionToBeAdded = expressionToBeCalculated.replace(/-/g, "+-");
  let subExpressions: string[] = expressionToBeAdded.split("+");

  console.table(subExpressions);
  subExpressions = subExpressions.map((subExpression): string => {
    if (subExpression.includes("*")) return "m";
    if (subExpression.includes("/")) return "d";
    return subExpression;
  });
  return subExpressions.reduce(add);
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
