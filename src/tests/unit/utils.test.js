import {
    updateRepositoryStatus,
    updateButtonStyle,
    hideRepositoryCard,
} from "../../js/utils.js";

import { expect, test } from "vitest";

test("updateRepositoryStatus updates the status element correctly", () => {
    const statusElement = {
        textContent: "",
        style: { display: "", backgroundColor: "" },
    };
    updateRepositoryStatus(statusElement, "Loading", "flex", "#e5e7eb");
    expect(statusElement.textContent).toBe("Loading");
    expect(statusElement.style.display).toBe("flex");
    expect(statusElement.style.backgroundColor).toBe("#e5e7eb");
});

test("updateButtonStyle updates the button style correctly", () => {
    const button = { style: { display: "", backgroundColor: "" } };
    updateButtonStyle(button, "inline-flex", "#000");
    expect(button.style.display).toBe("inline-flex");
    expect(button.style.backgroundColor).toBe("#000");
});

test("hideRepositoryCard hides the repository card", () => {
    document.body.innerHTML =
        '<div class="display-repository" style="display: flex;"></div>';
    hideRepositoryCard();
    expect(document.querySelector(".display-repository").style.display).toBe(
        "none",
    );
});
