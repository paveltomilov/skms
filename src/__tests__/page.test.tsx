import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../app/page";
import StoreProvider from "@/app/StoreProvider";

//test to check if the <Home /> component successfully renders a heading

describe("Home", () => {
  it("renders a heading", () => {
    render(
      <StoreProvider>
        <Home />
      </StoreProvider>
    );

    const heading = screen.getByText(/home/i);

    expect(heading).toBeInTheDocument();
    expect(heading).toMatchInlineSnapshot(`
<h1>
  Home
</h1>
`);
  });

  it("toggle loading", () => {
    render(
      <StoreProvider>
        <Home />
      </StoreProvider>
    );

    const button = screen.getByRole("button", { name: /toggle loading/i });

    expect(screen.queryByTestId("loading")).toBeNull();

    fireEvent.click(button);

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByTestId("loading")).toBeNull();
  });
});
