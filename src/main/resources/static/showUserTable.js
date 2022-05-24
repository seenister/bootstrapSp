getUsersFromBD()


async function getUsersFromBD() {
    let promise = await fetch("http://localhost:8080/index-page/getAllUsers")
    promise.json()
        .then(users => {
            let table = document.getElementById("userlist")

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
                    "<a type=\"button\" class=\"btn btn-sm btn-info\"\n " +
                    "id=\"editButton\"\n" +
                    "data-bs-toggle=\"modal\"\n" +
                    "href=\"#editFORM" + users[i]['id'] + "\">\n" +
                    "Edit\n" +
                    "</a>\n" +
                    "</td>\n" +

                    "<td>\n" +
                    "<a type=\"button\"\n" +
                    "class=\"btn btn-sm btn-danger\"\n" +
                    "data-bs-toggle=\"modal\"\n" +
                    "href=\"#deleteFORM" + users[i]['id'] + "\">\n" +
                    "Delete\n" +
                    "</a>\n" +
                    "</td>";
                editUser(users[i]);
                deleteUser(users[i]);
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
        })
}

function editUser(user) {
    let editForm = document.getElementById("editForm");


    let admin_check = "";
    let user_check = "";
    let roles = '';
    for (let j = 0; j < user['authorities'].length; j++) {
        roles += user['authorities'][j].role + " ";
    }

    if (roles.includes("ADMIN")) {

        admin_check = "checked";
    }
    if (roles.includes("USER")) {

        user_check = "checked";
    }

    editForm.innerHTML += "<div class=\"modal fade\" id=\"editFORM" + user['id'] + "\"\n" +
        "                                                             tabindex=\"-1\"\n" +
        "                                                             aria-labelledby=\"editModalLabel\"\n" +
        "                                                             aria-hidden=\"true\">\n" +
        "                                                            <div class=\"modal-dialog\" role=\"document\">\n" +
        "                                                                <div class=\"modal-content\">\n" +
        "                                                                    <div class=\"modal-header\">\n" +
        "                                                                        <h5 class=\"modal-title\"\n" +
        "                                                                            id=\"editModalLabel\">Edit\n" +
        "                                                                            user</h5>\n" +
        "                                                                        <button" +
        "                                                                                type=\"button\" class=\"btn-close\"\n" +
        "                                                                                data-bs-dismiss=\"modal\"\n" +
        "                                                                                aria-label=\"Close\">\n" +
        "                                                                        </button>\n" +
        "                                                                   </div>\n" +
        "                                                                   <form\n" +
        "                                                                            class=\"modal-body col-md text-center\"\n" +
        "                                                                               id = \"newEditForm\"" +
        "                                                                            action=\"http://localhost:8080/index-page/edit/" + user['id'] + "\"" +
        "                                                                            method=\"POST\">\n" +
        "                                                                        <div class=\"modal-body col-md\">\n" +
        "                     <label" +
        "                            for=\"id0\"><b>ID</b></label>\n" +
        "                     <input name=\"id\" type=\"text\"\n" +
        "                            class=\"form-control\"\n" +
        "                            id=\"id0\"\n" +
        "                            value=\"" + user['id'] + "\"\n" +
        "                            readOnly=\"true\"/>" +
        "                     <br>" +
        "                     <label for=\"name0\"><b>First\n" +
        "                            name</b></label>\n" +
        "                     <input name=\"name\"\n" +
        "                            type=\"text\"\n" +
        "                            class=\"form-control\"\n" +
        "                            id=\"name0\"\n" +
        "                            value=\"" + user['name'] + "\"/>" +
        "                     <br>\n" +
        "                     <label for=\"surname0\"><b>Last\n" +
        "                            name</b></label>\n" +
        "                     <input name=\"lastname\"\n" +
        "                            type=\"text\"\n" +
        "                            class=\"form-control\"\n" +
        "                            id=\"surname0\"\n" +
        "                            value=\"" + user['lastname'] + "\"/>" +
        "                     <br>\n" +
        "                     <label" +
        "                            for=\"age0\"><b>Age</b></label>\n" +
        "                     <input name=\"age\"\n" +
        "                            type=\"number\"\n" +
        "                            class=\"form-control\"\n" +
        "                            id=\"age0\"\n" +
        "                            value=\"" + user['age'] + "\"/>" +
        "                     <br>\n" +
        "                     <label" +
        "                            for=\"username0\"><b>E-mail</b></label>\n" +
        "                     <input name=\"email\"\n" +
        "                            type=\"text\"\n" +
        "                            class=\"form-control\"\n" +
        "                            id=\"username0\"\n" +
        "                            value=\"" + user['username'] + "\"/>" +
        "                     <br>\n" +
        "                     <label" +
        "                            for=\"password0\"><b>Password</b></label>\n" +
        "                     <input name=\"password\"\n" +
        "                            type=\"password\"\n" +
        "                            class=\"form-control\"\n" +
        "                            id=\"password0\"\"/>" +
        "                     <br>\n" +
        "                     <label><b>Role</b></label>\n" +
        "                     <label>Admin<input\n" +
        "                            type=\"checkbox\"\n" +
        "                            id=\"2\" " +
        "                            name=\"ADMIN\"\n" +
        "                            value=\"ADMIN\"" +
        admin_check +
        "                           ></label>\n" +
        "                     <label>User<input\n" +
        "                            type=\"checkbox\"\n" +
        "                            id=\"1\" " +
        "                            name=\"USER\"\n" +
        "                            value=\"USER\"\n" +
        user_check +
        "                             ></label>\n" +
        "                     <br><br>" +
        "                   </div>\n" +
        "                  <div class=\"modal-footer\">\n" +
        "                    <button type=\"button\"\n" +
        "                            class=\"btn btn-secondary\"\n" +
        "                            data-bs-dismiss=\"modal\">" +
        "                       Close " +
        "                    </button>\n" +
        "                    <button type=\"submit\"\n" +
        "                            class=\"btn btn-primary\"> " +
        "                       Edit    " +
        "                    </button>\n" +
        "                </div>\n" +
        "             </form>" +
        "                                                              </div>\n" +
        "             </div>\n" +
        "                                                        </div>\n";


}

function deleteUser(user) {
    let deleteForm = document.getElementById("deleteForm");
    let admin_check = "";
    let user_check = "";
    let roles = '';
    for (let j = 0; j < user['authorities'].length; j++) {
        roles += user['authorities'][j].role + " ";
    }

    if (roles.includes("ADMIN")) {

        admin_check = "checked";
    }
    if (roles.includes("USER")) {

        user_check = "checked";
    }

    deleteForm.innerHTML += "<div class=\"modal fade\" id=\"deleteFORM" + user['id'] + "\"\n" +
        "                                                             tabindex=\"-1\"\n" +
        "                                                             aria-labelledby=\"deleteModalLabel\"\n" +
        "                                                             aria-hidden=\"true\">\n" +
        "                                                            <div class=\"modal-dialog\" role=\"document\">\n" +
        "                                                                <div class=\"modal-content\">\n" +
        "                                                                    <div class=\"modal-header\">\n" +
        "                                                                        <h5 class=\"modal-title\"\n" +
        "                                                                            id=\"deleteModalLabel\">\n" +
        "                                                                            Delete\n" +
        "                                                                            user</h5>\n" +
        "                                                                        <button type=\"button\"\n" +
        "                                                                                class=\"btn-close\"\n" +
        "                                                                                data-bs-dismiss=\"modal\"\n" +
        "                                                                                aria-label=\"Close\"></button>\n" +
        "                                                                    </div>\n" +
        "                                                                    <form\n" +
        "                                                                            class=\"modal-body col-md text-center \"\n" + "id=\"deleteForm\"" +
        "                                                                            action=\"http://localhost:8080/index-page/deleteUser/" + user['id'] + "\"" +
        "                                                                            method=\"POST\">\n" +
        "                                                                        <div class=\"modal-body col-md\">\n" +
        "                                                                            <label\n" +
        "                                                                                    for=\"id\"><b>ID</b></label>\n" +
        "                                                                            <input name=\"id\" type=\"text\"\n" +
        "                                                                                   class=\"form-control\"\n" +
        "                                                                                   id=\"id\"\n" +
        "                                                                                   value=\"" + user['id'] + "\"\n" +
        "                                                                                   disabled/>\n" +
        "                                                                            <br>\n" +
        "                                                                            <label for=\"name1\"><b>First\n" +
        "                                                                                name</b></label>\n" +
        "                                                                            <input name=\"name\"\n" +
        "                                                                                   type=\"text\"\n" +
        "                                                                                   class=\"form-control\"\n" +
        "                                                                                   id=\"name1\"\n" +
        "                                                                                   value=\"" + user['name'] + "\"\n" +
        "                                                                                   disabled/>\n" +
        "                                                                            <br>\n" +
        "                                                                            <label for=\"surname1\"><b>Last\n" +
        "                                                                                name</b></label>\n" +
        "                                                                            <input name=\"lastName\"\n" +
        "                                                                                   type=\"text\"\n" +
        "                                                                                   class=\"form-control\"\n" +
        "                                                                                   id=\"surname1\"\n" +
        "                                                                                   value=\"" + user['lastname'] + "\"\n" +
        "                                                                                   disabled/>\n" +
        "                                                                            <br>\n" +
        "                                                                            <label\n" +
        "                                                                                    for=\"age1\"><b>Age</b></label>\n" +
        "                                                                            <input name=\"age\"\n" +
        "                                                                                   type=\"number\"\n" +
        "                                                                                   class=\"form-control\"\n" +
        "                                                                                   id=\"age1\"\n" +
        "                                                                                   value=\"" + user['age'] + "\"\n" +
        "                                                                                   disabled/>\n" +
        "                                                                            <br>\n" +
        "                                                                            <label\n" +
        "                                                                                    for=\"username1\"><b>E-mail</b></label>\n" +
        "                                                                            <input name=\"username\"\n" +
        "                                                                                   type=\"text\"\n" +
        "                                                                                   class=\"form-control\"\n" +
        "                                                                                   id=\"username1\"\n" +
        "                                                                                   value=\"" + user['username'] + "\"\n" +
        "                                                                                   disabled/>\n" +
        "                                                                            <br>\n" +
        "                                                                            <label><b>Role</b></label>\n" +
        "                                                                            <label>Admin<input\n" +
        "                                                                                    type=\"checkbox\"\n" +
        "                                                                                    id=\"3\"\n" +
        "                                                                                    name=\"ADMIN\"\n" +
        "                                                                                    value=\"ADMIN\"\n" + admin_check +
        "                                                                                    disabled\n>" +
        "                                                                                     </label>\n" +
        "                                                                            <label>User<input\n" +
        "                                                                                    type=\"checkbox\"\n" +
        "                                                                                    id=\"4\"\n" +
        "                                                                                    name=\"USER\"\n" +
        "                                                                                    value=\"USER\"\n" + user_check +
        "                                                                                    disabled></label>\n" +
        "                                                                            <br><br>\n" +
        "                                                                        </div>\n" +
        "                                                                        <div class=\"modal-footer\">\n" +
        "                                                                            <button type=\"button\"\n" +
        "                                                                                    class=\"btn btn-secondary\"\n" +
        "                                                                                    data-bs-dismiss=\"modal\">\n" +
        "                                                                                Close\n" +
        "                                                                            </button>\n" +
        "\n" +
        "                                                                            <button type=\"submit\"\n" +
        "                                                                                    class=\"btn btn-danger\">\n" +
        "                                                                                Delete\n" +
        "                                                                            </button>\n" +
        "                                                                        </div>\n" +
        "                                                                    </form>\n" +
        "                                                                </div>\n" +
        "                                                            </div>\n" +
        "                                                        </div>";

}

