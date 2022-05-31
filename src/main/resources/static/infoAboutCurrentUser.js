getCurrentUser()

async function getCurrentUser() {
    let promise = await fetch("http://localhost:8080/index-page/getCurrentUser")
    let user = await promise.json();

    let roles = "";
    for (let i = 0; i < user.authorities.length; i++) {
        roles += user.authorities[i].role + " ";
    }
    var nava = document.querySelector('.navigation-bar');


    nava.innerHTML = "<b><span>" + `${user.email}` + "</span></b> with roles:<span>" + `${roles}` + "</span>";
    document.querySelector('.navigation-bar').onchange = function () {
        var navaupdate = nava.value;
        updateDisplay(nav)
    }
    let table = document.getElementById("infoUser")
    table.innerHTML += "<tr>" +
        "<td>" + user['id'] + "</td>" +
        "<td>" + user['name'] + "</td>" +
        "<td>" + user['lastname'] + "</td>" +
        "<td>" + user['age'] + "</td>" +
        "<td>" + user['email'] + "</td>" +
        "<td>" + roles + "</td>" +
        "</tr>";

}
