import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    test,
} from "vitest";
import { populateSelectElement } from "../../js/populateSelectElement";


describe("populateSelectElement", () => {
    let selectElement;

    const createMockLanguages = (count = 1) =>
        Array.from({ length: count }, (_, i) => ({
            value: `lang${i}`,
            title: `Language ${i}`,
        }));

    beforeEach(() => {
        document.body.innerHTML = '<select id="languages"></select>';
        selectElement = document.getElementById("languages");
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("should populate select element with single option", () => {
        const data = createMockLanguages(1);

        populateSelectElement(data, selectElement);

        expect(selectElement.children.length).toBe(1);
        expect(selectElement.children[0].value).toBe("lang0");
        expect(selectElement.children[0].textContent).toBe("Language 0");
    });

    it("should populate select element with multiple options", () => {
        const data = createMockLanguages(3);

        populateSelectElement(data, selectElement);

        expect(selectElement.children.length).toBe(3);
        expect(selectElement.children[1].value).toBe("lang1");
        expect(selectElement.children[1].textContent).toBe("Language 1");
    });

    it("should handle empty data array", () => {
        populateSelectElement([], selectElement);
        expect(selectElement.children.length).toBe(0);
    });

    it("should handle invalid select element", () => {
        expect(() => populateSelectElement([], null)).toThrow();
    });

    it("should clear existing options before populating", () => {
        selectElement.innerHTML = '<option value="existing">Existing</option>';
        const data = createMockLanguages(1);

        populateSelectElement(data, selectElement);

        expect(selectElement.children.length).toBe(1);
        expect(selectElement.children[0].value).toBe("lang0");
    });
});

test("populateSelectElement populates select element", () => {
    document.body.innerHTML = '<select id="languages"></select>';
    const selectElement = document.getElementById("languages");
    const data = [{ value: "javascript", title: "JavaScript" }];

    populateSelectElement(data, selectElement);

    expect(selectElement.children.length).toBe(1);
    expect(selectElement.children[0].value).toBe("javascript");
    expect(selectElement.children[0].textContent).toBe("JavaScript");
});
