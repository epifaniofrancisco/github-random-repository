import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    handleSelectChange,
    handleButtonClick,
} from "../../js/handleEvents.js";
import { fetchRepository } from "../../js/fetchRepository.js";
import {
    displayRepository,
    displayRepositoryError,
} from "../../js/displayRepository.js";
import { createMockRepository } from "../utils/mockData.js";
import { setupTestDOM, cleanupDOM } from "../utils/domSetup.js";

vi.mock("../../js/fetchRepository.js");
vi.mock("../../js/displayRepository.js");

describe("handleEvents", () => {
    let elements;
    let mockRepository;

    beforeEach(() => {
        elements = {
            repositoryStatus: {
                textContent: "",
                style: { display: "", backgroundColor: "" },
            },
            selectElement: { value: "JavaScript" },
            fetchRepoButton: {
                style: { display: "", backgroundColor: "" },
            },
        };
        mockRepository = createMockRepository();
        setupTestDOM();
    });

    afterEach(() => {
        vi.clearAllMocks();
        cleanupDOM();
    });

    describe("handleSelectChange", () => {
        it("should update status and hide repository card on language change", async () => {
            fetchRepository.mockResolvedValueOnce(mockRepository);

            await handleSelectChange(elements);

            expect(elements.repositoryStatus.textContent).toBe("Loading, please wait",);
            expect(elements.repositoryStatus.style.display).toBe("flex");
            expect(elements.repositoryStatus.style.backgroundColor).toBe("#e5e7eb",);

            const repoCard = document.querySelector(".display-repository");
            expect(repoCard.style.display).toBe("none");

            expect(fetchRepository).toHaveBeenCalledWith("JavaScript");
            expect(displayRepository).toHaveBeenCalledWith(mockRepository, "JavaScript", elements);
        });

        it("should handle fetchRepository error", async () => {
            fetchRepository.mockRejectedValueOnce(
                new Error("Error fetching repository"),
            );

            await handleSelectChange(elements);

            expect(elements.repositoryStatus.textContent).toBe(
                "Loading, please wait",
            );
            expect(elements.repositoryStatus.style.display).toBe("flex");
            expect(elements.repositoryStatus.style.backgroundColor).toBe(
                "#e5e7eb",
            );

            const repoCard = document.querySelector(".display-repository");
            expect(repoCard.style.display).toBe("none");

            expect(fetchRepository).toHaveBeenCalledWith("JavaScript");
            expect(displayRepositoryError).toHaveBeenCalledWith(
                elements,
                "Error fetching repository",
            );
        });
    });

    describe("handleButtonClick", () => {
        it("should update status and hide repository card on button click", async () => {
            const event = { preventDefault: vi.fn() };
            fetchRepository.mockResolvedValueOnce(mockRepository);

            await handleButtonClick(event, elements);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(elements.repositoryStatus.textContent).toBe(
                "Loading, please wait",
            );
            expect(elements.repositoryStatus.style.display).toBe("flex");
            expect(elements.repositoryStatus.style.backgroundColor).toBe(
                "#e5e7eb",
            );

            const repoCard = document.querySelector(".display-repository");
            expect(repoCard.style.display).toBe("none");

            expect(fetchRepository).toHaveBeenCalledWith("JavaScript");
            expect(displayRepository).toHaveBeenCalledWith(
                mockRepository,
                "JavaScript",
                elements,
            );
        });

        it("should handle fetchRepository error on button click", async () => {
            const event = { preventDefault: vi.fn() };
            fetchRepository.mockRejectedValueOnce(
                new Error("Error fetching repository"),
            );

            await handleButtonClick(event, elements);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(elements.repositoryStatus.textContent).toBe(
                "Loading, please wait",
            );
            expect(elements.repositoryStatus.style.display).toBe("flex");
            expect(elements.repositoryStatus.style.backgroundColor).toBe(
                "#e5e7eb",
            );

            const repoCard = document.querySelector(".display-repository");
            expect(repoCard.style.display).toBe("none");

            expect(fetchRepository).toHaveBeenCalledWith("JavaScript");
            expect(displayRepositoryError).toHaveBeenCalledWith(
                elements,
                "Error fetching repository",
            );
        });
    });
});
