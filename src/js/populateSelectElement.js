export const populateSelectElement = (data, selectElement) => {
    data.forEach((language) => {
        const option = document.createElement("option");
        option.value = language.value;
        option.textContent = language.title;
        selectElement.appendChild(option);
    });
};
