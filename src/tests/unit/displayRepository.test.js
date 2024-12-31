import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
    displayRepository,
    displayRepositoryError,
} from "../../js/displayRepository.js";

const createTestElements = () => ({
    repositoryStatus: {
        textContent: "",
        style: { display: "", backgroundColor: "" },
    },
    fetchRepoButton: {
        style: { display: "", backgroundColor: "" },
    },
});

const createMockRepository = () => ({
    full_name: "openai/gpt",
    description: "A repository for GPT-related projects",
    language: "JavaScript",
    stargazers_count: 1234,
    forks_count: 567,
    open_issues_count: 8,
});

const setupDOMForDisplayRepository = () => {
    document.body.innerHTML = `
        <div class="display-repository" style="display: none;">
            <h5></h5>
            <p></p>
            <span id="repo-language"></span>
            <span id="repo-stars"></span>
            <span id="repo-forks"></span>
            <span id="repo-issues"></span>
        </div>
        <div id="repositoryStatus"></div>
        <button id="fetchRepoButton"></button>
    `;

    return {
        repositoryStatus: document.querySelector("#repositoryStatus"),
        fetchRepoButton: document.querySelector("#fetchRepoButton"),
    };
};

describe("displayRepository", () => {
    let elements;
    let mockRepository;

    beforeEach(() => {
        elements = setupDOMForDisplayRepository();
        mockRepository = createMockRepository();
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("should display error message when no repository is provided", () => {
        elements = createTestElements();

        displayRepository(null, "Select a Language", elements);
        expect(elements.repositoryStatus.textContent).toBe(
            "Please select a language",
        );
        expect(elements.repositoryStatus.style.display).toBe("flex");
        expect(elements.repositoryStatus.style.backgroundColor).toBe("#e5e7eb");
        expect(elements.fetchRepoButton.style.display).toBe("flex");
        expect(elements.fetchRepoButton.style.backgroundColor).toBe("#000");
    });

    it("should display repository details successfully", () => {
        const selectedLanguage = "JavaScript";

        displayRepository(mockRepository, selectedLanguage, elements);

        // Repository card assertions
        const repoCard = document.querySelector(".display-repository");
        expect(repoCard.style.display).toBe("flex");
        expect(repoCard.querySelector("h5").textContent).toBe(
            mockRepository.full_name,
        );
        expect(repoCard.querySelector("p").textContent).toBe(
            mockRepository.description,
        );
        expect(repoCard.querySelector("#repo-language").textContent).toBe(
            mockRepository.language,
        );
        expect(repoCard.querySelector("#repo-stars").textContent).toBe(
            mockRepository.stargazers_count.toString(),
        );
        expect(repoCard.querySelector("#repo-forks").textContent).toBe(
            mockRepository.forks_count.toString(),
        );
        expect(repoCard.querySelector("#repo-issues").textContent).toBe(
            mockRepository.open_issues_count.toString(),
        );

        // Button style assertions
        const fetchRepoButton = elements.fetchRepoButton;
        expect(fetchRepoButton.style.display).toBe("inline-flex");
        expect(fetchRepoButton.style.backgroundColor).toBe("rgb(0, 0, 0)");
    });

    it("should handle repository fetch error correctly", () => {
        const elements = createTestElements();
        const errorMessage = "Error fetching repository";

        displayRepositoryError(elements, errorMessage);

        // Error message assertions
        expect(elements.repositoryStatus.textContent).toBe(errorMessage);
        expect(elements.repositoryStatus.style.display).toBe("flex");
        expect(elements.repositoryStatus.style.backgroundColor).toBe("#fecaca");

        // Button style assertions
        expect(elements.fetchRepoButton.style.display).toBe("inline-flex");
        expect(elements.fetchRepoButton.style.backgroundColor).toBe("#ef4444");

        // Repository card hidden assertion
        const repoCard = document.querySelector(".display-repository");
        expect(repoCard.style.display).toBe("none");
    })

    it("should handle empty error message", () => {
        const elements = createTestElements();

        displayRepositoryError(elements, "");

        expect(elements.repositoryStatus.textContent).toBe(
            "",
        );
        expect(elements.repositoryStatus.style.backgroundColor).toBe("#fecaca");
    });
});
