import { describe, expect, test } from "bun:test";
import { buttonVariants, buttonTextVariants } from "@/components/ui/button";

// Note: Full component rendering tests are handled by Maestro E2E tests
// These tests focus on the button variant logic

describe("Button variants", () => {
	test("generates default variant classes", () => {
		const classes = buttonVariants({ variant: "default", size: "default" });
		expect(classes).toContain("bg-primary");
		expect(classes).toContain("h-10");
	});

	test("generates destructive variant classes", () => {
		const classes = buttonVariants({ variant: "destructive" });
		expect(classes).toContain("bg-destructive");
	});

	test("generates outline variant classes", () => {
		const classes = buttonVariants({ variant: "outline" });
		expect(classes).toContain("border");
		expect(classes).toContain("bg-background");
	});

	test("generates secondary variant classes", () => {
		const classes = buttonVariants({ variant: "secondary" });
		expect(classes).toContain("bg-secondary");
	});

	test("generates ghost variant classes", () => {
		const classes = buttonVariants({ variant: "ghost" });
		expect(classes).toContain("active:bg-accent");
	});

	test("generates small size classes", () => {
		const classes = buttonVariants({ size: "sm" });
		expect(classes).toContain("h-9");
		expect(classes).toContain("px-3");
	});

	test("generates large size classes", () => {
		const classes = buttonVariants({ size: "lg" });
		expect(classes).toContain("h-11");
		expect(classes).toContain("px-6");
	});

	test("generates icon size classes", () => {
		const classes = buttonVariants({ size: "icon" });
		expect(classes).toContain("h-10");
		expect(classes).toContain("w-10");
	});
});

describe("Button text variants", () => {
	test("generates default text variant classes", () => {
		const classes = buttonTextVariants({ variant: "default" });
		expect(classes).toContain("text-primary-foreground");
	});

	test("generates destructive text variant classes", () => {
		const classes = buttonTextVariants({ variant: "destructive" });
		expect(classes).toContain("text-white");
	});

	test("generates link text variant classes", () => {
		const classes = buttonTextVariants({ variant: "link" });
		expect(classes).toContain("text-primary");
	});
});
