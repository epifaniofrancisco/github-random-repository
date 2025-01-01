import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { updateRepositoryCard } from "../../js/updateRepositoryCard.js";
import { createMockRepository } from "../utils/mockData.js";
import { setupTestDOM } from "../utils/domSetup.js";

describe("updateRepositoryCard", () => {
    let repository;

    beforeEach(() => {
        setupTestDOM();
        repository = createMockRepository();
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("should update repository card with correct information", () => {
        updateRepositoryCard(repository, "JavaScript");

        expect(
            document.querySelector(".display-repository").style.display,
        ).toBe("flex");
        expect(document.querySelector("h5").textContent).toBe(
            repository.full_name,
        );
        expect(document.querySelector("p").textContent).toBe(
            repository.description,
        );
        expect(document.querySelector("#repo-language").textContent).toBe(
            "JavaScript",
        );
        expect(document.querySelector("#repo-stars").textContent).toBe(
            repository.stargazers_count.toString(),
        );
        expect(document.querySelector("#repo-forks").textContent).toBe(
            repository.forks_count.toString(),
        );
        expect(document.querySelector("#repo-issues").textContent).toBe(
            repository.open_issues_count.toString(),
        );
    });

    it("should handle missing repository information", () => {
        const incompleteRepo = { full_name: "repo/js" };

        updateRepositoryCard(incompleteRepo, "JavaScript");

        expect(document.querySelector("h5").textContent).toBe("repo/js");
        expect(document.querySelector("p").textContent).toBe("");
        expect(document.querySelector("#repo-stars").textContent).toBe("0");
        expect(document.querySelector("#repo-forks").textContent).toBe("0");
        expect(document.querySelector("#repo-issues").textContent).toBe("0");
    });

    it("should handle null repository", () => {
        expect(() => updateRepositoryCard(null, "JavaScript")).toThrow(
            "Invalid repository data",
        );
    });

    it("should handle empty language", () => {
        updateRepositoryCard(repository, "");
        expect(document.querySelector("#repo-language").textContent).toBe("");
    });

    it("should sanitize HTML in repository data", () => {
        const maliciousRepo = {
            full_name: "<script>alert('xss')</script>",
            description: "<img onerror='alert(1)'>",
            stargazers_count: 100,
            forks_count: 50,
            open_issues_count: 10,
        };

        updateRepositoryCard(maliciousRepo, "JavaScript");

        expect(document.querySelector("h5").textContent).toBe(
            "<script>alert('xss')</script>",
        );
        expect(document.querySelector("h5").innerHTML).not.toContain(
            "<script>",
        );
    });
});
