let loginPassword = "admin123"; // Default password
let overseerPassword = "overseer456"; // Default overseer password

// Simulated Data Storage
let cases = [];  // Array to hold case data
let personnel = ["Agent Smith", "Agent Johnson"];  // Array to hold personnel data

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
    const caseList = document.getElementById('case-list');
    caseList.innerHTML = '';  // Clear the list before loading
    cases.forEach((caseItem, index) => {
        let caseButton = document.createElement('div');
        caseButton.className = 'case-item';
        caseButton.textContent = `Case #${index + 1}: ${caseItem.title}`;
        caseButton.onclick = () => viewCase(index);
        caseList.appendChild(caseButton);
    });
}

function showAddCase() {
    const title = prompt("Enter Case Title:");
    const members = prompt("Enter Members involved:");
    const description = prompt("Enter Case Description:");
    if (title && members && description) {
        cases.push({ title, members, description });
        alert("Case added successfully!");
        loadCases();
    } else {
        alert("All fields are required!");
    }
}

function showEditCase() {
    const caseNumber = prompt("Enter Case Number to Edit:");
    const index = parseInt(caseNumber) - 1;
    if (cases[index]) {
        const title = prompt("Edit Case Title:", cases[index].title);
        const members = prompt("Edit Members involved:", cases[index].members);
        const description = prompt("Edit Case Description:", cases[index].description);
        if (title && members && description) {
            cases[index] = { title, members, description };
            alert("Case updated successfully!");
            loadCases();
        } else {
            alert("All fields are required!");
        }
    } else {
        alert("Invalid Case Number!");
    }
}

function viewPersonnel() {
    alert("Personnel: " + personnel.join(", "));
}

function changeLoginCode() {
    const newLoginCode = prompt("Enter new login code:");
    if (newLoginCode) {
        loginPassword = newLoginCode;
        alert("Login code updated successfully!");
    }
}

function addPersonnel() {
    const newPersonnel = prompt("Enter name of new personnel:");
    if (newPersonnel) {
        personnel.push(newPersonnel);
        alert("Personnel added successfully!");
    }
}

function removePersonnel() {
    const name = prompt("Enter name of personnel to remove:");
    const index = personnel.indexOf(name);
    if (index > -1) {
        personnel.splice(index, 1);
        alert("Personnel removed successfully!");
    } else {
        alert("Personnel not found!");
    }
}

function deleteCase() {
    const caseNumber = prompt("Enter Case Number to Delete:");
    const index = parseInt(caseNumber) - 1;
    if (cases[index]) {
        cases.splice(index, 1);
        alert("Case deleted successfully!");
        loadCases();
    } else {
        alert("Invalid Case Number!");
    }
}

function viewCase(index) {
    const caseItem = cases[index];
    let modal = document.getElementById('caseModal');
    let modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>${caseItem.title}</h2>
        <p><strong>Case Number:</strong> #${index + 1}</p>
        <p><strong>Members Involved:</strong> ${caseItem.members}</p>
        <p><strong>Description:</strong> ${caseItem.description}</p>
        <button class="close-modal" onclick="closeModal()">Close</button>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('caseModal').style.display = 'none';
}

function filterCases() {
    const search = document.getElementById('search').value.toLowerCase();
    const caseItems = document.querySelectorAll('.case-item');
    caseItems.forEach(item => {
        const caseText = item.textContent.toLowerCase();
        if (caseText.includes(search)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
