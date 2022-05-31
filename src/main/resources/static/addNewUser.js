const newUserForm = document.getElementById("newUserForm");
newUserForm.addEventLstener("submit", handleFormSubmit);


async function addNewUser({url, formData}) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    if (response.ok) {
        alert("Пользователь успешно добавлен");
        getUsersFromBD();
    }
    return response.json();
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await addNewUser({url, formData});

        console.log({responseData});
    } catch (error) {
        console.error(error);
    }
}
