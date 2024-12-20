import { populateSelectElement } from "../../js/populateSelectElement";
import { expect, test } from "vitest";

test("populateSelectElement populates select element", () => {
    document.body.innerHTML = '<select id="languages"></select>';
    const selectElement = document.getElementById("languages");
    const data = [{ value: "javascript", title: "JavaScript" }];

    populateSelectElement(data, selectElement);

    expect(selectElement.children.length).toBe(1);
    expect(selectElement.children[0].value).toBe("javascript");
    expect(selectElement.children[0].textContent).toBe("JavaScript");
});
