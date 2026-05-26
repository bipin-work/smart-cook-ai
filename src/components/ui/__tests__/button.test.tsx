import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  it("renders the children as its label", () => {
    render(<Button>Save recipe</Button>);

    // `getByRole` is the gold-standard query — it's how a screen reader (and
    // therefore a user) would find the button. If the element ever stops
    // being a real button (e.g. someone replaces it with a clickable div),
    // this test fails immediately.
    expect(screen.getByRole("button", { name: "Save recipe" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    // userEvent.setup() returns a fresh user instance per test. The newer v14
    // API is async — every interaction returns a Promise. Always `await` it.
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );
    await user.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies the destructive variant class", () => {
    // I'd usually avoid asserting on classes (it couples tests to styling),
    // BUT the Button uses `data-variant` as a stable contract. Assert on
    // the data attribute, not the class string. This is a useful pattern:
    // expose intent through data-* and your tests stay decoupled from CSS.
    render(<Button variant="destructive">Delete</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "destructive");
  });

  it("renders as a different element when asChild is true", () => {
    // The Radix Slot pattern: when asChild=true, the Button merges its props
    // onto its child. This is a common pitfall to test because it's a subtle
    // pattern that's easy to break in refactors.
    render(
      <Button asChild>
        <a href="/recipes">Browse recipes</a>
      </Button>,
    );

    // It should now be a link, not a button.
    const link = screen.getByRole("link", { name: "Browse recipes" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/recipes");
    // And no button role should exist.
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
