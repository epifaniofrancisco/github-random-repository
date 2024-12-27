import { beforeEach, describe, it, expect, vi } from "vitest";
import { fetchAndDisplayRepository } from "../../js/fetchRepository";
import { getRandomRepository } from "../../js/getRandomRepository";

vi.mock("../../js/getRandomRepository");

describe("fetchAndDisplayRepository", () => {
    let repositoryStatus;
    let fetchRepoButton;

    beforeEach(() => {
        repositoryStatus = { textContent: "", style: { backgroundColor: "" } };
        fetchRepoButton = { style: { backgroundColor: "" } };
    });

    it("should display a message when no language is selected", async () => {
        await fetchAndDisplayRepository(
            "selectalanguage",
            repositoryStatus,
            fetchRepoButton,
        );
        expect(repositoryStatus.textContent).toBe("Please select a language");
    });

    it("should display repository details when a language is selected", async () => {
        const mockRepository = {
            full_name: "mock/repo",
            description: "Mock repository description",
            html_url: "https://github.com/mock/repo",
        };
        getRandomRepository.mockResolvedValue(mockRepository);

        await fetchAndDisplayRepository(
            "javascript",
            repositoryStatus,
            fetchRepoButton,
        );

        expect(repositoryStatus.textContent).toBe(
            `Repository: ${mockRepository.full_name}\nDescription: ${mockRepository.description}\nURL: ${mockRepository.html_url}`,
        );
        expect(repositoryStatus.style.backgroundColor).toBe("#e5e7eb");
        expect(fetchRepoButton.style.backgroundColor).toBe("#000");
    });

    it("should display an error message when fetching repository fails", async () => {
        getRandomRepository.mockRejectedValue(new Error("Network error"));

        await fetchAndDisplayRepository(
            "javascript",
            repositoryStatus,
            fetchRepoButton,
        );

        expect(repositoryStatus.textContent).toBe("Error fetching repository");
        expect(repositoryStatus.style.backgroundColor).toBe("#fecaca");
        expect(fetchRepoButton.style.backgroundColor).toBe("#ef4444");
    });
});
