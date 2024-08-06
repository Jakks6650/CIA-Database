let cases = [];
let editingCase = null;

async function login() {
    const password = document.getElementById('password').value;
    if (password === 'yourpassword') { // Replace 'yourpassword' with your actual password
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-screen').style.display = 'block';
        await fetchCases();
        displayCases();
    } else {
        alert('Incorrect password');
    }
}

async function fetchCases() {
    const response = await fetch('cases.json');
    cases = await response.json();
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
    const caseLog = cases[index];
    alert(`Title: ${caseLog.title}\nNumber: ${caseLog.number}\nMembers Involved: ${caseLog.members}\nDescription: ${caseLog.description}`);
}

function showAddCase() {
    editingCase = null;
    document.getElementById('case-title').value = '';
    document.getElementById('case-number').value = '';
    document.getElementById('members-involved').value = '';
    document.getElementById('case-description').value = '';
    document.getElementById('add-edit-case').style.display = 'block';
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
    document.getElementById('add-edit-case').style.display = 'none';
}

async function saveCases() {
    await fetch('cases.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cases)
    });
}
