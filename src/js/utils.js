export const updateRepositoryStatus = (
    repositoryStatus,
    message,
    display,
    backgroundColor,
) => {
    if (!repositoryStatus) {
        throw new Error("Invalid status element");
    }

    repositoryStatus.textContent = message;
    repositoryStatus.style.display = display;
    repositoryStatus.style.backgroundColor = backgroundColor;
};

export const updateButtonStyle = (button, display, backgroundColor) => {
    if (!button) {
        throw new Error("Invalid button element");
    }

    button.style.display = display;
    button.style.backgroundColor = backgroundColor;
};

export const hideRepositoryCard = () => {
    const repoCard = document.querySelector(".display-repository");
    if (!repoCard) return;
    repoCard.style.display = "none";
};
