import { render, screen } from "@testing-library/react";
import InputVariant from "../../../components/variants/InputVariant";
import "@testing-library/jest-dom";

describe("InputVariant", () => {
  const questions = [
    { id: 1, question: "What is 2 + 2?", correctAnswer: "4" },
    { id: 2, question: "What is 3 + 3?", correctAnswer: "6" },
    { id: 3, question: "What is 4 + 4?", correctAnswer: "8" },
    { id: 4, question: "What is 5 + 5?", correctAnswer: "10" },
  ];

  const handleButtonClick = () => {};
  const handleInputChange = () => {};
  const selectedValues = {};
  const isCorrect = {};

  beforeEach(() => {
    render(
      <InputVariant
        questions={questions}
        handleButtonClick={handleButtonClick}
        handleInputChange={handleInputChange}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
  });

  it("should render the questions and input fields correctly", () => {
    expect(
      screen.getByText("Skriv inn svaret i feltene under")
    ).toBeInTheDocument();
    questions.forEach((q) => {
      expect(screen.getByText(q.question)).toBeInTheDocument();
      const inputs = screen.getAllByLabelText("Svar her");
      expect(inputs.length).toBe(questions.length);
      const submitButtons = screen.getAllByRole("button", {
        name: /sjekk svar/i,
      });
      expect(submitButtons.length).toBe(questions.length);
    });
  });
});
