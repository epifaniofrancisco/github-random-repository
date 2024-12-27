import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { handleSelectChange, handleButtonClick } from "../../js/handleEvents.js";
import { fetchRepository } from "../../js/fetchRepository.js";
import { displayRepository } from "../../js/displayRepository.js";

vi.mock("../../js/fetchRepository.js");
vi.mock("../../js/displayRepository.js");

beforeEach(() => {
    // Add the .display-repository element to the DOM
    const displayRepositoryElement = document.createElement("div");
    displayRepositoryElement.className = "display-repository";
    displayRepositoryElement.style.display = ""; // Default display style
    document.body.appendChild(displayRepositoryElement);
});

test("handleSelectChange updates the status and hides the repository card", async () => {
    // Arrange
    const elements = {
        repositoryStatus: {
            textContent: "",
            style: { display: "", backgroundColor: "" },
        },
        selectElement: { value: "JavaScript" },
    };

    // Mock fetchRepository to resolve a repository object
    fetchRepository.mockResolvedValueOnce({
        full_name: "repo/js",
        description: "JS repo",
        stargazers_count: 100,
        forks_count: 50,
        open_issues_count: 10,
    });

    // Act
    await handleSelectChange(elements);

    // Assert
    expect(elements.repositoryStatus.textContent).toBe("Loading, please wait");
    expect(elements.repositoryStatus.style.display).toBe("flex");
    expect(elements.repositoryStatus.style.backgroundColor).toBe("#e5e7eb");
    expect(document.querySelector(".display-repository").style.display).toBe(
        "none",
    );
    expect(displayRepository).toHaveBeenCalledWith(
        {
            full_name: "repo/js",
            description: "JS repo",
            stargazers_count: 100,
            forks_count: 50,
            open_issues_count: 10,
        },
        "JavaScript",
        elements,
    );
});

afterEach(() => {
    // Clean up DOM after each test
    const displayRepositoryElement = document.querySelector(
        ".display-repository",
    );
    if (displayRepositoryElement) {
        displayRepositoryElement.remove();
    }
});


test("handleButtonClick updates the status and hides the repository card", async () => {
    const event = { preventDefault: vi.fn() };
    const elements = {
        repositoryStatus: {
            textContent: "",
            style: { display: "", backgroundColor: "" },
        },
        selectElement: { value: "JavaScript" },
    };
    fetchRepository.mockResolvedValue({
        full_name: "repo/js",
        description: "JS repo",
        stargazers_count: 100,
        forks_count: 50,
        open_issues_count: 10,
    });
    await handleButtonClick(event, elements);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(elements.repositoryStatus.textContent).toBe("Loading, please wait");
    expect(elements.repositoryStatus.style.display).toBe("flex");
    expect(elements.repositoryStatus.style.backgroundColor).toBe("#e5e7eb");
    expect(document.querySelector(".display-repository").style.display).toBe(
        "none",
    );
    expect(displayRepository).toHaveBeenCalledWith(
        {
            full_name: "repo/js",
            description: "JS repo",
            stargazers_count: 100,
            forks_count: 50,
            open_issues_count: 10,
        },
        "JavaScript",
        elements,
    );
});
