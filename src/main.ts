import "./styles/style.scss";

const calculatorOutput = document.querySelector<HTMLDivElement>(
  ".calculator__output"
);
const calculatorInput =
  document.querySelector<HTMLDivElement>(".calculator__input");

if (!calculatorOutput || !calculatorInput) {
  throw new Error("Issue with the selector");
}

let answer: number = 0;
let expressionToBeCalculated: string = "";

calculatorOutput.textContent = `${answer}`;
calculatorInput.textContent = expressionToBeCalculated;
