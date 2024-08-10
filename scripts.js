let loginPassword = "123456"; // Default password
let overseerPassword = "234567"; // Default overseer password

function login() {
    const password = document.getElementById('password').value;
    if (password === loginPassword) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-screen').style.display = 'block';
        document.getElementById('top-bar').style.display = 'flex';
        loadCases();
    } else {
        alert("Invalid password!");
    }
}

function overseerLogin() {
    const password = document.getElementById('overseer-password').value;
    if (password === overseerPassword) {
        document.getElementById('overseer-login').style.display = 'none';
        document.getElementById('overseer-controls').style.display = 'block';
    } else {
        alert("Invalid overseer password!");
    }
}

function loadCases() {
    // Load case data from storage
}

function showAddCase() {
    // Logic to show Add Case form
}

function showEditCase() {
    // Logic to show Edit Case form
}

function viewPersonnel() {
    // Logic to show personnel details
}

function showOverseerControls() {
    window.location.href = "overseer.html"; // Redirect to overseer controls page
}

function changeLoginCode() {
    const newLoginCode = prompt("Enter new login code:");
    if (newLoginCode) {
        loginPassword = newLoginCode;
        alert("Login code updated successfully!");
    }
}

function addPersonnel() {
    // Logic to add personnel
}

function removePersonnel() {
    // Logic to remove personnel
}

function deleteCase() {
    // Logic to delete a case
}
