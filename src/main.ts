import "./styles/style.scss";

const calculatorOutput = document.querySelector<HTMLTextAreaElement>(
  ".calculator__output"
);

if (!calculatorOutput) {
  throw new Error("Issue with the selector");
}

let answer: number = 0;

calculatorOutput.innerText = `${answer}`;
