let cases = [];
let personnel = [];
let loginCode = '8675309'; // Default login code
let overseerCode = '8675309'; // Default overseer code
let editingCase = null;
let isOverseer = false;

async function login() {
    const password = document.getElementById('password').value;

    if (password === loginCode) {
        isOverseer = false;
        showAdminScreen();
    } else if (password === overseerCode) {
        isOverseer = true;
        showAdminScreen();
    } else {
        alert('Incorrect password');
    }
}

function showAdminScreen() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-screen').style.display = 'block';
    document.getElementById('top-bar').style.display = 'flex';

    if (isOverseer) {
        document.getElementById('overseer-controls').style.display = 'block';
    }

    fetchCases();
    displayCases();
}

async function fetchCases() {
    try {
        const response = await fetch('cases.json');
        cases = await response.json();
    } catch (error) {
        console.error('Error fetching cases:', error);
        cases = [];
    }
}

function displayCases() {
    const caseList = document.getElementById('case-list');
    caseList.innerHTML = '';
    cases.forEach((caseLog, index) => {
        const caseItem = document.createElement('div');
        caseItem.className = 'case-item';
        caseItem.innerText = `Case #${caseLog.number}: ${caseLog.title}`;
        caseItem.onclick = () => showCaseDetails(index);
        caseList.appendChild(caseItem);
    });
}

function filterCases() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredCases = cases.filter(caseLog => caseLog.title.toLowerCase().includes(searchTerm));
    const caseList = document.getElementById('case-list');
    caseList.innerHTML = '';
    filteredCases.forEach((caseLog, index) => {
        const caseItem = document.createElement('div');
        caseItem.className = 'case-item';
        caseItem.innerText = `Case #${caseLog.number}: ${caseLog.title}`;
        caseItem.onclick = () => showCaseDetails(index);
        caseList.appendChild(caseItem);
    });
}

function showAddCase() {
    editingCase = null;
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2>Add Case</h2>
        <input type="text" id="case-title" placeholder="Case Title">
        <input type="text" id="case-number" placeholder="Case Number">
        <input type="text" id="members-involved" placeholder="Members Involved">
        <textarea id="case-description" placeholder="Case Description"></textarea>
        <button onclick="commitCase()">Commit</button>
    `;
    
    modal.style.display = "flex";
}

function showEditCase() {
    editingCase = null;
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2>Edit Case</h2>
        <input type="text" id="case-title" placeholder="Case Title">
        <input type="text" id="case-number" placeholder="Case Number">
        <input type="text" id="members-involved" placeholder="Members Involved">
        <textarea id="case-description" placeholder="Case Description"></textarea>
        <button onclick="commitCase()">Commit</button>
    `;
    
    modal.style.display = "flex";
}

function showCaseDetails(index) {
    const caseLog = cases[index];
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2>Case Details</h2>
        <p><strong>Case Title:</strong> ${caseLog.title}</p>
        <p><strong>Case Number:</strong> ${caseLog.number}</p>
        <p><strong>Members Involved:</strong> ${caseLog.members}</p>
        <p><strong>Case Description:</strong> ${caseLog.description}</p>
        <button onclick="closeModal()">Close</button>
        ${isOverseer ? `<button onclick="deleteCase(${index})">Delete</button>` : ''}
    `;
    
    modal.style.display = "flex";
}

function commitCase() {
    const title = document.getElementById('case-title').value;
    const number = document.getElementById('case-number').value;
    const members = document.getElementById('members-involved').value;
    const description = document.getElementById('case-description').value;
    
    if (editingCase !== null) {
        cases[editingCase] = { title, number, members, description };
    } else {
        cases.push({ title, number, members, description });
    }
    
    saveCases();
    displayCases();
    closeModal();
}

async function saveCases() {
    try {
        await fetch('cases.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cases)
        });
    } catch (error) {
        console.error('Error saving cases:', error);
    }
}

function closeModal() {
    document.getElementById('caseModal').style.display = 'none';
}

function deleteCase(index) {
    cases.splice(index, 1);
    saveCases();
    displayCases();
    closeModal();
}

function viewPersonnel() {
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2>Personnel List</h2>
        ${personnel.map(person => `<p>${person}</p>`).join('')}
        ${isOverseer ? `
            <input type="text" id="personnel-name" placeholder="New Personnel Name">
            <button onclick="addPersonnel()">Add Personnel</button>
            <button onclick="removePersonnel()">Remove Personnel</button>
        ` : ''}
        <button onclick="closeModal()">Close</button>
    `;
    
    modal.style.display = "flex";
}

function addPersonnel() {
    const name = document.getElementById('personnel-name').value;
    if (name) {
        personnel.push(name);
        viewPersonnel();
    }
}

function removePersonnel() {
    const name = document.getElementById('personnel-name').value;
    if (name) {
        personnel = personnel.filter(person => person !== name);
        viewPersonnel();
    }
}

function showChangeLoginCode() {
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h2>Change Login Code</h2>
        <input type="password" id="new-login-code" placeholder="New Login Code">
        <button onclick="changeLoginCode()">Change Code</button>
        <button onclick="closeModal()">Cancel</button>
    `;

    modal.style.display = "flex";
}

function changeLoginCode() {
    const newCode = document.getElementById('new-login-code').value;
    if (newCode) {
        loginCode = newCode;
        closeModal();
        alert('Login code changed successfully.');
    }
}
