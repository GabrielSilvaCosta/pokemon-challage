import { render, screen } from "@testing-library/react";
import { LikeIcon, DislikeIcon } from "../components/Icons";

describe("Icons", () => {
  test("renders LikeIcon with correct emoji and aria-label", () => {
    render(<LikeIcon />);
    const likeIcon = screen.getByRole("img", { name: /like/i });
    expect(likeIcon).toBeInTheDocument();
    expect(likeIcon).toHaveTextContent("👍");
  });

  test("renders DislikeIcon with correct emoji and aria-label", () => {
    render(<DislikeIcon />);
    const dislikeIcon = screen.getByRole("img", { name: /dislike/i });
    expect(dislikeIcon).toBeInTheDocument();
    expect(dislikeIcon).toHaveTextContent("👎");
  });
});
