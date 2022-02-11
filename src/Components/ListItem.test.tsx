import { render, screen } from "@testing-library/react";
import ListItem from "./ListItem";

describe("ListItem", () => {
  const TestedComponent = () => (
    <ListItem
      fullName="User Batman"
      description="Sed nec venenatis felis. Aenean efficitur et massa auctor auctor."
      id="ckq4zb7p600c50984ew55i0jg"
      avatarUrl="http://localhost:4000/assets/batman.png"
      type="User"
      showUser={jest.fn()}
    />
  );

  test("renders with user data", () => {
    render(<TestedComponent />);
    // screen.debug();
    expect(screen.getByText(/User Batman/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Sed nec venenatis felis. Aenean efficitur et massa auctor auctor./i
      )
    ).toBeInTheDocument();
  });
  test("match snapshot", () => {
    render(<TestedComponent />);
    expect(screen).toMatchSnapshot();
  });
});
