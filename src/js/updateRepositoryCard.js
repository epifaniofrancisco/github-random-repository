export const updateRepositoryCard = (repository, selectedLanguage) => {
    const repoCard = document.querySelector(".display-repository");
    repoCard.style.display = "flex";
    repoCard.querySelector("h5").textContent = repository.full_name;
    repoCard.querySelector("p").textContent = repository.description;
    repoCard.querySelector(
        ".repository-information #repo-language",
    ).textContent = selectedLanguage;
    repoCard.querySelector(".repository-information #repo-stars").textContent =
        repository.stargazers_count;
    repoCard.querySelector(".repository-information #repo-forks").textContent =
        repository.forks_count;
    repoCard.querySelector(".repository-information #repo-issues").textContent =
        repository.open_issues_count;
};
