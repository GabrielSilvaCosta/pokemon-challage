import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../components/Button";

describe("Button Component", () => {
  it("must render text Clique Aqui", () => {
    render(<Button onClick={() => {}} text="Clique Aqui" icon={undefined} />);

    expect(screen.getByText("Clique Aqui")).toBeInTheDocument();
  });

  it("must call onClick when clicked", () => {
    const mockOnClick = jest.fn();
    render(
      <Button onClick={mockOnClick} text="Clique Aqui" icon={undefined} />
    );

    const button = screen.getByRole("button", { name: "Clique Aqui" });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
