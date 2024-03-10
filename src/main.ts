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
//Callback function - Multiplication
const multiply = (ans: string, num: string): string => `${+ans * +num}`;
//Callback function - Division
const divide = (ans: string, num: string): string => `${+ans / +num}`;

const calculateExpression = (): string => {
  /*Calculates the value of the expression:
    1. By changing - to +-, both asition and subtraction get the same priority. Eg: "2-1" => "2+-1" => [2]+[-1] => 1
    2. The expression is split by the operators with the lowest priority first. So that the operation with the highest priority happens first.
    
  */
  const modifiedExpression = expressionToBeCalculated.replace(/-/g, "+-");
  let subExpressions: string[] = modifiedExpression.split("+");
  subExpressions = subExpressions.map((subExpression): string => {
    if (subExpression.includes("*") || subExpression.includes("/"))
      return multiplyExpression(subExpression);
    return subExpression;
  });
  return subExpressions.reduce(add);
};

const multiplyExpression = (expressionToBeMultiplied: string): string => {
  let subExpressions: string[] = expressionToBeMultiplied.split("*");
  subExpressions = subExpressions.map((subExpression): string => {
    if (subExpression.includes("/")) return divideExpression(subExpression);
    return subExpression;
  });
  return subExpressions.reduce(multiply);
};

const divideExpression = (expressionToBeDivided: string): string => {
  let subExpressions: string[] = expressionToBeDivided.split("/");
  console.table(subExpressions);
  subExpressions = subExpressions.map((subExpression): string => {
    if (subExpression.includes("^")) return "";
    return subExpression;
  });
  console.log(subExpressions.reduce(divide));
  return subExpressions.reduce(divide);
};
// sending out display

calculatorOutput.textContent = `${answer}`;
calculatorInput.textContent = expressionToBeCalculated;

//Event listeners

numberButtons.forEach((numberButton) =>
  numberButton.addEventListener("click", addNumberToExpression)
);

operatorButtons.forEach((operatorButton) =>
  operatorButton.addEventListener("click", addOperaterToExpression)
);
