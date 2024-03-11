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
const bracketButton =
  document.querySelectorAll<HTMLButtonElement>(".bracket-button");
const deleteButton =
  document.querySelector<HTMLButtonElement>(".delete-button");

//NULL CHECK

if (
  !calculatorOutput ||
  !calculatorInput ||
  !numberButtons ||
  !operatorButtons ||
  !deleteButton
) {
  throw new Error("Issue with the selector");
}

// VARIABLE DECLARATIONS
let expressionToBeDisplayed: string = "";
let hasDecimalPoint: boolean = false;
let isLastInputSymbol: boolean = true;
let amountOfOpenBrackets = 0;

//FUNCTION DECLARATIONS

const addNumberToExpression = (event: Event): void => {
  //Checks if the number already has a decimal point on it and adds the number to the expression
  const element = event.currentTarget as HTMLButtonElement;
  if (expressionToBeDisplayed[expressionToBeDisplayed.length - 1] == ")")
    expressionToBeDisplayed += "*";
  if (element.value == ".") {
    if (hasDecimalPoint == true) return;
    else {
      if (isLastInputSymbol) {
        expressionToBeDisplayed += "0";
      }
      hasDecimalPoint = true;
    }
  }
  isLastInputSymbol = false;
  expressionToBeDisplayed += element.value;
  calculatorInput.textContent = expressionToBeDisplayed;
  calculatorOutput.textContent = `${calculateExpression(
    expressionToBeDisplayed
  )}`;
};

const addOperaterToExpression = (event: Event): void => {
  //Checks if the last entered value is a operator and adds the operator to the expression
  const element = event.currentTarget as HTMLButtonElement;
  if (isLastInputSymbol) {
    return;
  } else {
    if (expressionToBeDisplayed[expressionToBeDisplayed.length - 1] == ".") {
      expressionToBeDisplayed += "0";
    }
    isLastInputSymbol = true;
    expressionToBeDisplayed += element.value;
    hasDecimalPoint = false;

    calculatorInput.textContent = expressionToBeDisplayed;
  }
};

const addOpenBracketToExpression = (): void => {
  if (!isLastInputSymbol) {
    expressionToBeDisplayed += "*";
  }
  expressionToBeDisplayed += "(";
  isLastInputSymbol = true;
  amountOfOpenBrackets++;
  calculatorInput.textContent = expressionToBeDisplayed;
};

const addCloseBracketToExpression = (): void => {
  if (!isLastInputSymbol && amountOfOpenBrackets > 0) {
    expressionToBeDisplayed += ")";
    amountOfOpenBrackets--;
    calculatorInput.textContent = expressionToBeDisplayed;
  }
};

//Callback function - Subtraction and Addition
const add = (ans: string, num: string): string => `${+ans + +num}`;
//Callback function - Multiplication
const multiply = (ans: string, num: string): string => `${+ans * +num}`;
//Callback function - Division
const divide = (ans: string, num: string): string => `${+ans / +num}`;
//Callback function - Exponentiation
const power = (ans: string, num: string): string => `${Math.pow(+ans, +num)}`;
//Callback function - check if the parameter is even
const isEven = (element: string) => {
  return +element % 2 == 0;
};

const calculateExpression = (expressionToBeCalculated: string): string => {
  /*Calculates the value of the expression:
    1. By changing - to +-, both asition and subtraction get the same priority. Eg: "2-1" => "2+-1" => [2]+[-1] => 1
    2. The expression is split by the operators with the lowest priority first. So that the operation with the highest priority happens first.

    <-- TODO: change the .includes "" inside map into regex -->
    
  */
  let modifiedExpression = expressionToBeCalculated.replace(/-/g, "+-");
  modifiedExpression = modifiedExpression.concat(
    ")".repeat(amountOfOpenBrackets)
  );
  while (modifiedExpression.includes("(")) {
    let string1: string = modifiedExpression.slice(
      0,
      modifiedExpression.lastIndexOf("(")
    );
    let string2: string = modifiedExpression.slice(
      modifiedExpression.lastIndexOf("(") + 1
    );
    let string3: string = string2.slice(string2.indexOf(")") + 1);
    string2 = string2.slice(0, string2.indexOf(")"));
    string2 = addExpression(string2);
    modifiedExpression = string1.concat(string2, string3);
  }
  return addExpression(modifiedExpression);
};

const addExpression = (expressionToBeAdded: string): string => {
  let subExpressions: string[] = expressionToBeAdded.split("+");
  subExpressions = subExpressions.map((subExpression): string => {
    return multiplyExpression(subExpression);
  });
  return subExpressions.reduce(add);
};

const multiplyExpression = (expressionToBeMultiplied: string): string => {
  let subExpressions: string[] = expressionToBeMultiplied.split("*");
  subExpressions = subExpressions.map((subExpression): string => {
    return divideExpression(subExpression);
  });
  return subExpressions.reduce(multiply);
};

const divideExpression = (expressionToBeDivided: string): string => {
  let subExpressions: string[] = expressionToBeDivided.split("/");
  subExpressions = subExpressions.map((subExpression): string => {
    return exponentiationExpression(subExpression);
  });
  return subExpressions.reduce(divide);
};

const exponentiationExpression = (
  expressionToBeExponentiated: string
): string => {
  /*If the exponent is even then the - sign will be lost. To solve that:
  1. check if the base value is negative
  2. check if any of the values (apart from the first one) is even
  3. if both 1 and 2 are true, add a "-" to the start of the answer string
  */
  const subExpressions: string[] = expressionToBeExponentiated.split("^");
  let ans: string = subExpressions.reduce(power);
  if (subExpressions[0][0] == "-") {
    subExpressions.shift();
    if (subExpressions.some(isEven)) {
      ans = "-" + ans;
    }
  }
  return ans;
};

const handleDeleteButton = (): void => {
  expressionToBeDisplayed = expressionToBeDisplayed.slice(
    0,
    expressionToBeDisplayed.length - 1
  );
  calculatorInput.textContent = expressionToBeDisplayed;
};

// sending out display

calculatorOutput.textContent = "";
calculatorInput.textContent = expressionToBeDisplayed;

//Event listeners

numberButtons.forEach((numberButton) =>
  numberButton.addEventListener("click", addNumberToExpression)
);

operatorButtons.forEach((operatorButton) =>
  operatorButton.addEventListener("click", addOperaterToExpression)
);

bracketButton[0].addEventListener("click", addOpenBracketToExpression);
bracketButton[1].addEventListener("click", addCloseBracketToExpression);
deleteButton.addEventListener("click", handleDeleteButton);
