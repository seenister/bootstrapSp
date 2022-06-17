async function sendFetchForm({url, formData, method}) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: method,
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
        alert("Форма успешно отправленна!");
        let event = new Event("update-info");
        document.dispatchEvent(event);
    }
    return response.json();
}


async function handleFormSubmit(event) {
    event.preventDefault();

    console.log(event);
    const form = event.currentTarget;
    console.log(form);

    const url = form.action;
    console.log(url);

    try {
        const formData = new FormData(form);
        const method = formData.get("_method");
        const responseData = await sendFetchForm({url, formData, method});

        console.log({responseData});
    } catch (error) {
        console.error(error);
    }
}