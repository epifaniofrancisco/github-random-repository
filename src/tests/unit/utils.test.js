import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
    updateRepositoryStatus,
    updateButtonStyle,
    hideRepositoryCard,
} from "../../js/utils.js";

describe("Utils", () => {
    describe("updateRepositoryStatus", () => {
        it("should update status element with correct values", () => {
            const statusElement = {
                textContent: "",
                style: { display: "", backgroundColor: "" },
            };

            updateRepositoryStatus(statusElement, "Loading, please wait", "flex", "#e5e7eb");

            expect(statusElement.textContent).toBe("Loading, please wait");
            expect(statusElement.style.display).toBe("flex");
            expect(statusElement.style.backgroundColor).toBe("#e5e7eb");
        });

        it("should handle empty values", () => {
            const statusElement = {
                textContent: "existing",
                style: { display: "block", backgroundColor: "red" },
            };

            updateRepositoryStatus(statusElement, "", "", "");

            expect(statusElement.textContent).toBe("");
            expect(statusElement.style.display).toBe("");
            expect(statusElement.style.backgroundColor).toBe("");
        });

        it("should handle null status element", () => {
            expect(() => updateRepositoryStatus(null, "", "", "")).toThrow(
                "Invalid status element",
            );
        });
    });

    describe("updateButtonStyle", () => {
        it("should update button style correctly", () => {
            const button = { style: { display: "", backgroundColor: "" } };

            updateButtonStyle(button, "inline-flex", "#000");

            expect(button.style.display).toBe("inline-flex");
            expect(button.style.backgroundColor).toBe("#000");
        });

        it("should handle empty values", () => {
            const button = {
                style: { display: "block", backgroundColor: "red" },
            };

            updateButtonStyle(button, "", "");

            expect(button.style.display).toBe("");
            expect(button.style.backgroundColor).toBe("");
        });

        it("should handle null button", () => {
            expect(() => updateButtonStyle(null, "", "")).toThrow(
                "Invalid button element",
            );
        });
    });

    describe("hideRepositoryCard", () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="display-repository" style="display: flex;"></div>
            `;
        });

        afterEach(() => {
            document.body.innerHTML = "";
        });

        it("should hide repository card", () => {
            hideRepositoryCard();
            expect(
                document.querySelector(".display-repository").style.display,
            ).toBe("none");
        });

        it("should handle missing repository card", () => {
            document.body.innerHTML = "";
            expect(() => hideRepositoryCard()).not.toThrow();
        });

        it("should not affect other elements", () => {
            document.body.innerHTML += '<div class="other"></div>';
            hideRepositoryCard();
            expect(document.querySelector(".other").style.display).toBe("");
        });
    });
});
