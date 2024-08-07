let cases = [];
let editingCase = null;

async function login() {
    const password = document.getElementById('password').value;
    if (password === '8675309') { // Replace 'yourpassword' with your desired password
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-screen').style.display = 'block';
        await fetchCases();
        displayCases();
    } else {
        alert('Incorrect password');
    }
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

function showCaseDetails(index) {
    editingCase = index;
    const caseLog = cases[index];
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h2>Case Details</h2>
        <p><strong>Title:</strong> ${caseLog.title}</p>
        <p><strong>Number:</strong> ${caseLog.number}</p>
        <p><strong>Members Involved:</strong> ${caseLog.members}</p>
        <p><strong>Description:</strong> ${caseLog.description}</p>
        <button onclick="showEditCase(${index})">Edit Case</button>
    `;

    modal.style.display = "flex";
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

function showEditCase(index) {
    const caseLog = cases[index];
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h2>Edit Case</h2>
        <input type="text" id="case-title" placeholder="Case Title" value="${caseLog.title}">
        <input type="text" id="case-number" placeholder="Case Number" value="${caseLog.number}">
        <input type="text" id="members-involved" placeholder="Members Involved" value="${caseLog.members}">
        <textarea id="case-description" placeholder="Case Description">${caseLog.description}</textarea>
        <button onclick="commitCase()">Commit</button>
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
