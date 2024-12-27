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

        const resultText = await page.textContent("#fetch-status");
        expect(resultText).toBe("Loading, please wait");
    });

    test("Language selection updates status and hides repository card", async ({
        page,
    }) => {
        await page.selectOption("#languages", "JavaScript");
        await expect(page.locator("#fetch-status")).toHaveText(
            "Loading, please wait",
        );
        await expect(page.locator(".display-repository")).toBeHidden();
        await page.waitForSelector(".display-repository");
        await expect(page.locator(".display-repository")).toBeVisible();
    });

    test("Button click updates status and hides repository card", async ({
        page,
    }) => {
        await page.selectOption("#languages", "JavaScript");
        await page.click("#fetch-repository");
        await expect(page.locator("#fetch-status")).toHaveText(
            "Loading, please wait",
        );
        await expect(page.locator(".display-repository")).toBeHidden();
        await page.waitForSelector(".display-repository");
        await expect(page.locator(".display-repository")).toBeVisible();
    });

    test("Handles errors correctly", async ({ page }) => {
        await page.selectOption("#languages", "");
        await page.click("#fetch-repository");
        await expect(page.locator("#fetch-status")).toHaveText(
            "Error fetching repository",
        );
        await expect(page.locator(".display-repository")).toBeHidden();
    });

    test("should show loading message when changing language", async ({
        page,
    }) => {
        await page.selectOption("#languages", "JavaScript");
        await expect(page.locator("#fetch-status")).toHaveText(
            "Loading, please wait",
        );

        await page.selectOption("#languages", "Python");
        await expect(page.locator("#fetch-status")).toHaveText(
            "Loading, please wait",
        );
    });

});
