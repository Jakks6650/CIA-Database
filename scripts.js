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
