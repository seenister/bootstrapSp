"use strict"
getCurrentUserForNavaBar()
getUsersFromBD()

async function getCurrentUserForNavaBar() {
    let promise = await fetch("http://localhost:8080/index-page/getCurrentUser")
    let user = await promise.json();

    console.log(user.authorities[0].role);
    let roles = "";
    for (let i = 0; i < user.authorities.length; i++) {
        roles += user.authorities[i].role + " ";
    }

    document.querySelector('.navigation-bar').innerHTML = "<b><span>" + `${user.email}` + "</span></b> with roles:<span>" + `${roles}` + "</span>";
}

async function getUsersFromBD() {
    let promise = await fetch("http://localhost:8080/index-page/getAllUsers")
    promise.json()
        .then(users => {
            let table = document.getElementById("userlist")
            console.log(users)

            for (let i = 0; i < users.length; i++) {
                table.innerHTML += "<tr></tr>"
                let tr = table.getElementsByTagName("tr")[i];

                tr.innerHTML += "<td>" + users[i]['id'] + "</td>";
                tr.innerHTML += "<td>" + users[i]['name'] + "</td>";
                tr.innerHTML += "<td>" + users[i]['lastname'] + "</td>";
                tr.innerHTML += "<td>" + users[i]['age'] + "</td>";
                tr.innerHTML += "<td>" + users[i]['email'] + "</td>";

                let roles = '';
                for (let j = 0; j < users[i]['authorities'].length; j++) {
                    roles +=  users[i]['authorities'][j].role + " ";
                }
                tr.innerHTML += "<td>" + roles + "</td>";

                tr.innerHTML += "<td>\n" +
                    "<a type=\"button\" class=\"btn btn-sm btn-info\"\n" +
                    "data-bs-toggle=\"modal\"\n" +
                    "data-bs-target=\"#editModal\"\n" +
                    "data-bs-target=\"${'#editModal'+user.id}\">\n" +
                    "Edit\n" +
                    "</a>\n" +
                    "</td>\n" +
                    "<td>\n" +
                    "<a type=\"button\"\n" +
                    "class=\"btn btn-sm btn-danger\"\n" +
                    "data-bs-toggle=\"modal\"\n" +
                    "data-bs-target=\"${'#DELETE'+user.id}\">\n" +
                    "Delete\n" +
                    "</a>\n" +
                    "</td>";
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            console.log("LEHA PIDOR")
        })

}


//код

//функции
