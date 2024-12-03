let activeButton = null;

function loadContent(endpoint) {
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const responseContainer = document.getElementById('responseContainer');
            responseContainer.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
        })
        .catch(error => {
            const responseContainer = document.getElementById('responseContainer');
            responseContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
            console.error('Error fetching data:', error);
        });
}

function searchVulnerabilities() {
    if (activeButton) {
        activeButton.classList.remove("active");
        activeButton = null;
    }

    const existingContainer = document.querySelector(".limit-input-container");
    if (existingContainer) {
        existingContainer.remove();
    }

    const key = document.getElementById('searchKey').value;
    if (key) {
        fetch(`/get?query=${encodeURIComponent(key)}`)
            .then(response => response.json())
            .then(data => {
                const responseContainer = document.getElementById('responseContainer');
                responseContainer.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
                if (responseContainer.scrollHeight > 500) {
                    responseContainer.style.height = "500px";
                }
            })
            .catch(error => {
                const responseContainer = document.getElementById('responseContainer');
                responseContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
                console.error('Error fetching data:', error);
            });
    }
}

function createLimitInput(buttonElement, endpoint) {
    const existingContainer = document.querySelector(".limit-input-container");
    if (existingContainer) {
        existingContainer.remove();
    }

    if (activeButton) {
        activeButton.classList.remove("active");
    }
    buttonElement.classList.add("active");
    activeButton = buttonElement;

    const container = document.createElement("div");
    container.classList.add("limit-input-container");

    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Loading default...";

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const defaultLimit = data.limit || 10;
            input.placeholder = `Default: ${defaultLimit}`;
        });

    container.appendChild(input);

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.onclick = () => {
        const limit = input.value && input.value > 0 ? input.value : null;
        const url = limit ? `${endpoint}?limit=${encodeURIComponent(limit)}` : endpoint;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const responseContainer = document.getElementById("responseContainer");
                responseContainer.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
                if (responseContainer.scrollHeight > 500) {
                    responseContainer.style.height = "500px";
                }
            })
            .catch(error => {
                const responseContainer = document.getElementById("responseContainer");
                responseContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
                console.error("Error fetching data:", error);
            });
    };

    container.appendChild(confirmButton);
    buttonElement.parentNode.appendChild(container);
}

function displayInfo() {
    if (activeButton) {
        activeButton.classList.remove("active");
        activeButton = null;
    }

    const existingContainer = document.querySelector(".limit-input-container");
    if (existingContainer) {
        existingContainer.remove();
    }

    fetch('/info')
        .then(response => response.json())
        .then(data => {
            const responseContainer = document.getElementById('responseContainer');
            responseContainer.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
            if (responseContainer.scrollHeight > 500) {
                responseContainer.style.height = "500px";
            }
        })
        .catch(error => {
            const responseContainer = document.getElementById('responseContainer');
            responseContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
            console.error('Error fetching data:', error);
        });
}
