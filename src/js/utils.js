export const updateRepositoryStatus = (
    repositoryStatus,
    message,
    display,
    backgroundColor,
) => {
    repositoryStatus.textContent = message;
    repositoryStatus.style.display = display;
    repositoryStatus.style.backgroundColor = backgroundColor;
};

export const updateButtonStyle = (button, display, backgroundColor) => {
    button.style.display = display;
    button.style.backgroundColor = backgroundColor;
};

export const hideRepositoryCard = () => {
    const repoCard = document.querySelector(".display-repository");
    repoCard.style.display = "none";
};
