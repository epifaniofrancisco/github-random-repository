import { expect, test, vi } from "vitest";
import {
    displayRepository,
    displayRepositoryError,
} from "../../js/displayRepository.js";

vi.mock("./updateRepositoryCard");

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
    displayRepositoryElement.style.display = "";
    document.body.appendChild(displayRepositoryElement);

    const elements = {
        repositoryStatus: {
            textContent: "",
            style: { display: "", backgroundColor: "" },
        },
        fetchRepoButton: { style: { display: "", backgroundColor: "" } },
    };

    displayRepositoryError(elements);
    expect(elements.repositoryStatus.textContent).toBe(
        "Error fetching repository",
    );
    expect(elements.repositoryStatus.style.display).toBe("flex");
    expect(elements.repositoryStatus.style.backgroundColor).toBe("#fecaca");
    expect(elements.fetchRepoButton.style.display).toBe("inline-flex");
    expect(elements.fetchRepoButton.style.backgroundColor).toBe("#ef4444");
    expect(displayRepositoryElement.style.display).toBe("none");

    document.body.removeChild(displayRepositoryElement);
});

test("displayRepository handles repository fetch success correctly", () => {
    const displayRepositoryElement = document.createElement("div");
    displayRepositoryElement.className = "display-repository";
    displayRepositoryElement.style.display = "";

    displayRepositoryElement.innerHTML = `
        <h5></h5>
        <p></p>
        <div class="repository-information">
            <span id="repo-language"></span>
            <span id="repo-stars"></span>
            <span id="repo-forks"></span>
            <span id="repo-issues"></span>
        </div>
    `;
    document.body.appendChild(displayRepositoryElement);

    const elements = {
        repositoryStatus: {
            textContent: "",
            style: { display: "", backgroundColor: "" },
        },
        fetchRepoButton: { style: { display: "", backgroundColor: "" } },
    };

    const repository = {
        full_name: "repo/js",
        description: "JS repo",
        stargazers_count: 100,
        forks_count: 50,
        open_issues_count: 10,
    };

    displayRepository(repository, "JavaScript", elements);

    expect(elements.repositoryStatus.textContent).toBe("");
    expect(elements.repositoryStatus.style.display).toBe("none");
    expect(elements.repositoryStatus.style.backgroundColor).toBe("#e5e7eb");
    expect(elements.fetchRepoButton.style.display).toBe("inline-flex");
    expect(elements.fetchRepoButton.style.backgroundColor).toBe("#000");

    const h5 = displayRepositoryElement.querySelector("h5");
    const p = displayRepositoryElement.querySelector("p");
    const language = displayRepositoryElement.querySelector("#repo-language");
    const stars = displayRepositoryElement.querySelector("#repo-stars");
    const forks = displayRepositoryElement.querySelector("#repo-forks");
    const issues = displayRepositoryElement.querySelector("#repo-issues");

    expect(h5.textContent).toBe(repository.full_name);
    expect(p.textContent).toBe(repository.description);
    expect(language.textContent).toBe("JavaScript");
    expect(stars.textContent).toBe(repository.stargazers_count.toString());
    expect(forks.textContent).toBe(repository.forks_count.toString());
    expect(issues.textContent).toBe(repository.open_issues_count.toString());

    document.body.removeChild(displayRepositoryElement);
});
