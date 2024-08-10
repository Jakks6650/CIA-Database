let loginPassword = "admin123"; // Default password
let overseerPassword = "overseer456"; // Default overseer password

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
    // Populate the case list from stored data
}

function showAddCase() {
    // Display the add case form
}

function showEditCase() {
    // Display the edit case form
}

function viewPersonnel() {
    // Display personnel information
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
