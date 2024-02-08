import { TextContext } from "../../src/TextContext.ts";
import { Text } from "../../src/Text.tsx";
import { createRef } from "react";
import { render, screen } from "@hopper-ui/test-utils";

describe("Text", () => {
    it("should render with default class", () => {
        render(<Text>Test</Text>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Text");
    });

    it("should support custom class", () => {
        render(<Text className="test">Test</Text>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Text");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Text marginTop="stack-sm" style={{ marginBottom: "13px" }} >Test</Text>);

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Text data-foo="bar">Test</Text>);

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <TextContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Text slot="test">Test</Text>
            </TextContext.Provider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<Text ref={ref}>Test</Text>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLSpanElement).toBeTruthy();
    });
});
