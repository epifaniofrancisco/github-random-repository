export const updateRepositoryCard = (repository, selectedLanguage) => {
    if (!repository || typeof repository !== "object") {
        throw new Error("Invalid repository data");
    }

    const repoCard = document.querySelector(".display-repository");

    if (!repoCard) {
        console.error("No repository card found in DOM.");
        return;
    }

    repoCard.style.display = "flex";

    const h5 = repoCard.querySelector("h5");
    const p = repoCard.querySelector("p");
    const language = repoCard.querySelector("#repo-language");
    const stars = repoCard.querySelector("#repo-stars");
    const forks = repoCard.querySelector("#repo-forks");
    const issues = repoCard.querySelector("#repo-issues");

    if (!h5 || !p || !language || !stars || !forks || !issues) {
        console.error("Missing child elements in the repository card.");
        return;
    }

    h5.textContent = repository.full_name || "";
    p.textContent = repository.description || "";
    language.textContent = selectedLanguage || "";
    stars.textContent = repository.stargazers_count?.toString() || "0";
    forks.textContent = repository.forks_count?.toString() || "0";
    issues.textContent = repository.open_issues_count?.toString() || "0";
};
