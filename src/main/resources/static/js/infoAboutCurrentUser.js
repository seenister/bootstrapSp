getCurrentUser();
document.addEventListener("update-info", getCurrentUser);

async function getCurrentUser() {
    let promise = await fetch("http://localhost:8080/index-page/getCurrentUser");
    let user = await promise.json();

    let roles = "";
    for (let i = 0; i < user.authorities.length; i++) {
        roles += user.authorities[i].role + " ";
    }
    if (!roles.includes("ADMIN")){
        document.getElementById('list-admin-list').hidden = true;
        document.getElementById('list-admin').hidden = true;
        document.getElementById('list-user').className +=" show active"
    }
    var nava = document.querySelector('.navigation-bar');
    nava.innerHTML = "";
    nava.insertAdjacentHTML('beforeend', `<b><span>${user.email}</span></b> with roles:<span>${roles}</span>`);


    let table = document.getElementById("infoUser")
    table.innerHTML = "";
    table.insertAdjacentHTML('afterbegin', `
        <tr>
            <td> ${user['id']} </td>
            <td> ${user['name']} </td>
            <td> ${user['lastname']} </td>
            <td> ${user['age']} </td>
            <td> ${user['email']} </td>
            <td> ${roles} </td>
        </tr>
        `);

}