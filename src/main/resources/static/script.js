"use strict"
getCurrentUserForNavaBar()
getUsersFromBD()
infoUserData()





async function infoUserData() {
    let promise = await fetch("http://localhost:8080/index-page/getCurrentUser")
    promise.json()
        .then(user => {
            let table = document.getElementById("infoUser")
            console.log(user)

            for (let i = 0; i < user.length; i++) {
                table.innerHTML += "<tr></tr>"
                let tr = table.getElementsByTagName("tr")[i];

                tr.innerHTML += "<td>" + user['id'] + "</td>";
                tr.innerHTML += "<td>" + user['name'] + "</td>";
                tr.innerHTML += "<td>" + user['lastname'] + "</td>";
                tr.innerHTML += "<td>" + user['age'] + "</td>";
                tr.innerHTML += "<td>" + user['email'] + "</td>";
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
        })


}

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
                    roles += users[i]['authorities'][j].role + " ";
                }
                tr.innerHTML += "<td>" + roles + "</td>";

                tr.innerHTML += "<td>\n" +
                    "<a type=\"button\" class=\"btn btn-sm btn-info\"\n" +
                    "data-bs-toggle=\"modal\"\n" +
                    "data-bs-target=\"#editFORM\">\n" +
                    "Edit\n" +
                    "</a>\n" +
                    "</td>\n" +

                    "<td>\n" +
                    "<a type=\"button\"\n" +
                    "class=\"btn btn-sm btn-danger\"\n" +
                    "data-bs-toggle=\"modal\"\n" +
                    "data-bs-target=\"#deleteFORM\">\n" +
                    "Delete\n" +
                    "</a>\n" +
                    "</td>";
                editUser(users[i])
                /*deleteUser(users[i])*/

            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
        })

}

function editUser(user) {
    let editForm = document.getElementById("formEdit");
    editForm.innerHTML += "<form\n" +
        "    action=\"http://localhost:8080/index-page/edit/" + user['id'] + "\" method=\"POST\">";
    editForm.innerHTML += "<div\n" +
        "        className=\"modal-body col-md text-center\">";
    editForm.innerHTML += "        <label\n" +
        "            htmlFor=\"id0\"><b>ID</b></label>\n" +
        "        <input name=\"id\" type=\"text\"\n" +
        "               className=\"form-control\"\n" +
        "               id=\"id0\"\n" +
        "               value=\"" + user['id'] + "\"\n" +
        "               readOnly=\"true\"/>";
    editForm.innerHTML += "<br>\n" +
        "        <label htmlFor=\"name0\"><b>First\n" +
        "            name</b></label>\n" +
        "        <input name=\"name\"\n" +
        "               type=\"text\"\n" +
        "               className=\"form-control\"\n" +
        "               id=\"name0\"\n" +
        "               value=\"" + user['name'] + "\"/>";
    editForm.innerHTML += "<br>\n" +
        "            <label htmlFor=\"surname0\"><b>Last\n" +
        "                name</b></label>\n" +
        "            <input name=\"lastname\"\n" +
        "                   type=\"text\"\n" +
        "                   className=\"form-control\"\n" +
        "                   id=\"surname0\"\n" +
        "                   value=\"" + user['lastname'] + "\"/>";
    editForm.innerHTML += "<br>\n" +
        "                <label\n" +
        "                    htmlFor=\"age0\"><b>Age</b></label>\n" +
        "                <input name=\"age\"\n" +
        "                       type=\"number\"\n" +
        "                       className=\"form-control\"\n" +
        "                       id=\"age0\"\n" +
        "                       value=\"" + user['age'] + "\"/>";
    editForm.innerHTML += "   <br>\n" +
        "                    <label\n" +
        "                        htmlFor=\"username0\"><b>E-mail</b></label>\n" +
        "                    <input name=\"email\"\n" +
        "                           type=\"text\"\n" +
        "                           className=\"form-control\"\n" +
        "                           id=\"username0\"\n" +
        "                           value=\"" + user['username'] + "\"/>";
    editForm.innerHTML += "<br>\n" +
        "                        <label\n" +
        "                            htmlFor=\"password0\"><b>Password</b></label>\n" +
        "                        <input name=\"password\"\n" +
        "                               type=\"password\"\n" +
        "                               className=\"form-control\"\n" +
        "                               id=\"password0\"\n" +
        "                               value=\"" + user['password'] + "\"/>";
    let roles = '';
    for (let j = 0; j < user['authorities'].length; j++) {
        roles += user['authorities'][j].role + " ";
    }
    editForm.innerHTML += roles;
    editForm.innerHTML += "   <br>\n" +
        "                            <label><b>Role</b></label>\n" +
        "                            <label>Admin<input\n" +
        "                                type=\"checkbox\"\n" +
        "                                id=\"2\" name=\"ADMIN\"\n" +
        "                                value=\"" + roles + "\"></label>\n" +
        "                            <label>User<input\n" +
        "                                type=\"checkbox\"\n" +
        "                                id=\"1\" name=\"USER\"\n" +
        "                                value=\"" + roles + "></label>\n" +
        "                            <br><br>";
    editForm.innerHTML += "</div>\n" +
        "    <div className=\"modal-footer\">\n" +
        "        <button type=\"button\"\n" +
        "                className=\"btn btn-secondary\"\n" +
        "                data-bs-dismiss=\"modal\">\n" +
        "            Close\n" +
        "        </button>\n" +
        "        <button type=\"submit\"\n" +
        "                className=\"btn btn-primary\">\n" +
        "            Edit\n" +
        "        </button>\n" +
        "    </div>\n" +
        "</form>";

}


async function deleteUser(user) {
    let promise = await fetch("http://localhost:8080/index-page/deleteUser/{id}")
    promise.json()
        .then(user => {
            let table = document.getElementById("formDelete")
            console.log(user)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
        })
}

