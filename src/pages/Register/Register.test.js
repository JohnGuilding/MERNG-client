import React from "react";
import { render } from "@testing-library/react";
import Register from "./Register";

describe("Register tests", () => {
  it("should render", () => {
    expect(render(<Register />)).toBeTruthy();
  });
});
