import { updateRepositoryCard } from "../../js/updateRepositoryCard.js";

import {expect, test} from "vitest"

test("updateRepositoryCard updates the repository card with the correct information", () => {
    document.body.innerHTML = `
        <div class="display-repository">
            <h5></h5>
            <p></p>
            <div class="repository-information">
                <span id="repo-language"></span>
                <span id="repo-stars"></span>
                <span id="repo-forks"></span>
                <span id="repo-issues"></span>
            </div>
        </div>
    `;

    const repository = {
        full_name: "repo/js",
        description: "JS repo",
        stargazers_count: 100,
        forks_count: 50,
        open_issues_count: 10,
    };
    updateRepositoryCard(repository, "JavaScript");

    expect(document.querySelector(".display-repository h5").textContent).toBe(
        "repo/js",
    );
    expect(document.querySelector(".display-repository p").textContent).toBe(
        "JS repo",
    );
    expect(document.querySelector("#repo-language").textContent).toBe(
        "JavaScript",
    );
    expect(document.querySelector("#repo-stars").textContent).toBe("100");
    expect(document.querySelector("#repo-forks").textContent).toBe("50");
    expect(document.querySelector("#repo-issues").textContent).toBe("10");
});
