export const setupTestDOM = () => {
    document.body.innerHTML = `
        <div class="display-repository" style="display: none;">
            <h5></h5>
            <p></p>
            <div class="repository-information">
                <span id="repo-language"></span>
                <span id="repo-stars"></span>
                <span id="repo-forks"></span>
                <span id="repo-issues"></span>
            </div>
        </div>
        <div id="repositoryStatus"></div>
        <button id="fetchRepoButton"></button>
    `;

    return {
        repositoryStatus: document.querySelector("#repositoryStatus"),
        fetchRepoButton: document.querySelector("#fetchRepoButton"),
        displayRepository: document.querySelector(".display-repository"),
    };
};

export const cleanupDOM = () => {
    document.body.innerHTML = "";
};
