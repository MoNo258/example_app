import { render, screen } from "@testing-library/react";
import React from "react";
import ListItem from "./ListItem";

describe("ListItem", () => {
  const HeroTypeExample: HeroType = {
    id: "ckq4zb7mu00an09848dfxhw4u",
    name: "Human"
  };
  const TestedComponent = () => (
    <ListItem
      fullName="Batman"
      description="Sed nec venenatis felis. Aenean efficitur et massa auctor auctor."
      id="ckq4zb7p600c50984ew55i0jg"
      avatarUrl="http://localhost:4000/assets/batman.png"
      type={HeroTypeExample}
    />
  );

  test("renders with hero data", () => {
    render(<TestedComponent />);
    screen.debug();
    expect(screen.getByText(/Batman/i)).toBeInTheDocument();
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
