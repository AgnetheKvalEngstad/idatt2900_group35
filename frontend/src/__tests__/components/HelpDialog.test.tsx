import { render, screen, cleanup } from "@testing-library/react";
import HelpDialog from "../../components/HelpDialog";
import "@testing-library/jest-dom";

describe("HelpDialog Component", () => {
  beforeEach(() => {
    render(<HelpDialog open={true} onClose={() => {}} />);
  });

  it("should render the dialog content correctly when open is true", () => {
    expect(
      screen.getByText(
        "Her kan du lære om nettsikkerhet på en morsom måte. Du kan velge hvilke temaer du ønsker å lære mer om ved å trykke på en av temaboksene."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Inne i disse boksene vil du lære om et tema tilknyttet nettsikkerhet. Etter det kan du prøve å vinne premier gjennom å teste hvor mye du har lært."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Dersom noe er utydelig kan du alltid få mer informasjon om siden du er på ved å trykke på “Hjelp” knappen i nedre venstre hjørne."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Lykke til og ha det gøy!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lukk/i })).toBeInTheDocument();
  });

  it("should not render the dialog when open is false", () => {
    cleanup();
    render(<HelpDialog open={false} onClose={() => {}} />);
    expect(screen.queryByText("Hjelp")).not.toBeInTheDocument();
  });

  it("should trigger onClose when the close icon button is clicked", () => {
    const closeIconButton = screen.getByRole("button", { name: /close/i });
    closeIconButton.click();
    expect(closeIconButton).toBeInTheDocument();
  });

  it("should trigger onClose when the 'Lukk' button is clicked", () => {
    const closeButton = screen.getByRole("button", { name: /lukk/i });
    closeButton.click();
    expect(closeButton).toBeInTheDocument();
  });
});
