import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header";
import "@testing-library/jest-dom";

/**
 * Tests for Header component
 */
describe("Tests for component Header", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it("should render the header title 'Trygg på nett.no'", () => {
    const title = screen.getByText("Trygg på nett.no");
    expect(title).toBeInTheDocument();
  });

  it("should render the subtitle '(Tilbake til hjem)'", () => {
    const subtitle = screen.getByText("(Tilbake til hjem)");
    expect(subtitle).toBeInTheDocument();
  });

  it("should render the button with 'Min side'", () => {
    const button = screen.getByTestId("points-my-page-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Min side");
  });

  it("should render the OfflineBoltOutlinedIcon and PersonOutlineOutlinedIcon inside the button", () => {
    const boltIcon = screen.getByTestId("OfflineBoltOutlinedIcon");
    const personIcon = screen.getByTestId("PersonOutlineOutlinedIcon");
    expect(boltIcon).toBeInTheDocument();
    expect(personIcon).toBeInTheDocument();
  });
});
