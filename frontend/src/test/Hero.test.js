import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../landing_page/home/Hero";

describe("Hero Component", () => {
  test("render hero image", () => {
    render(<Hero />);

    // Use getByAltText if there is only one image
    const heroImage = screen.getByAltText("Hero Image");

    // Assertion
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "media/images/homeHero.png");
  });
});
