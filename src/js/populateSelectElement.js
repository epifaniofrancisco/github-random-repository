export const populateSelectElement = (data, selectElement) => {
    if (!selectElement || !(selectElement instanceof HTMLSelectElement)) {
        throw new Error("Invalid select element provided");
    }
    
    selectElement.innerHTML = "";

    data.forEach((language) => {
        const option = document.createElement("option");
        option.value = language.value;
        option.textContent = language.title;
        selectElement.appendChild(option);
    });
};
