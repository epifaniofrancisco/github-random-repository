import { expect, test, vi } from "vitest";
import {
    displayRepository,
    displayRepositoryError,
} from "../../js/displayRepository.js";

vi.mock("../../js/updateRepositoryCard.js", () => ({
    updateRepositoryCard: vi.fn(),
}));

test("displayRepository handles no language selected correctly", () => {
    const elements = {
        repositoryStatus: {
            textContent: "",
            style: { display: "", backgroundColor: "" },
        },
        fetchRepoButton: { style: { display: "", backgroundColor: "" } },
    };
    displayRepository(null, "Select a Language", elements);
    expect(elements.repositoryStatus.textContent).toBe(
        "Please select a language",
    );
    expect(elements.repositoryStatus.style.display).toBe("flex");
    expect(elements.repositoryStatus.style.backgroundColor).toBe("#e5e7eb");
    expect(elements.fetchRepoButton.style.display).toBe("flex");
    expect(elements.fetchRepoButton.style.backgroundColor).toBe("#000");
});

test("displayRepositoryError handles repository fetch error correctly", () => {
    const displayRepositoryElement = document.createElement("div");
    displayRepositoryElement.className = "display-repository";
    displayRepositoryElement.style.display = "none";
    document.body.appendChild(displayRepositoryElement);

    const elements = {
        repositoryStatus: {
            textContent: "",
            style: { display: "", backgroundColor: "" },
        },
        fetchRepoButton: { style: { display: "", backgroundColor: "" } },
    };

    const errorMessage = "Error fetching repository";

    displayRepositoryError(elements, errorMessage);

    expect(elements.repositoryStatus.textContent).toBe(errorMessage);
    expect(elements.repositoryStatus.style.display).toBe("flex");
    expect(elements.repositoryStatus.style.backgroundColor).toBe("#fecaca");
    expect(elements.fetchRepoButton.style.display).toBe("inline-flex");
    expect(elements.fetchRepoButton.style.backgroundColor).toBe("#ef4444");
    expect(displayRepositoryElement.style.display).toBe("none");

    document.body.removeChild(displayRepositoryElement);
});
