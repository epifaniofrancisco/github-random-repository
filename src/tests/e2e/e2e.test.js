import { test, expect } from "@playwright/test";

test.describe("Github Random Repository", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:5500");
    });

    test("should populate dropdown with languages", async ({ page }) => {
        await page.waitForFunction(() => {
            const dropdown = document.querySelector("#languages");
            return dropdown && dropdown.options.length > 1;
        });

        const options = await page.evaluate(() => {
            const dropdown = document.querySelector("#languages");
            return Array.from(dropdown.options).map(
                (option) => option.textContent,
            );
        });

        expect(options).toContain("Select a Language");
        expect(options).toContain("JavaScript");
    });

    test("should update result text on language select", async ({ page }) => {
        await page.waitForFunction(() => {
            const dropdown = document.querySelector("#languages");
            return dropdown && dropdown.options.length > 1;
        });

        await page.selectOption("#languages", "JavaScript");

        const resultText = await page.textContent("#repo-result");
        expect(resultText).toBe("Loading, please wait");
    });
});
