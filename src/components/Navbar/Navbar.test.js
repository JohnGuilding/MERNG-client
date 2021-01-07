import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar tests", () => {
  it("should render", () => {
    expect(render(<Navbar />)).toBeTruthy();
  });
});
