const table = document.getElementById('table');
const add = document.getElementById('add');
const edit = document.getElementById('edit');
const save = document.getElementById('save');
const lastbtn = document.getElementById('lastsubmit');
const tbody = document.querySelector('tbody');
let isEditing = false;

// Add row
add.addEventListener("click", function() {
    if (isEditing) return;
    const rowCount = tbody.getElementsByTagName('tr').length;
    if (rowCount >= 60) {
        alert('Maximum row reached');
        return;
    }
    const newRow = tbody.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.innerHTML = `<input type="number" placeholder="Enter ID" required>`;
    cell2.innerHTML = `<input type="text" placeholder="Enter Name" required>`;
});

// Edit rows
edit.addEventListener("click", function() {
    if (isEditing) return;
    isEditing = true;
    add.disabled = true;
    edit.disabled = true;
    const rows = tbody.getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const id = row.cells[0].textContent;
        const name = row.cells[1].textContent;
        const status = row.cells[2].querySelector('input') ? row.cells[2].querySelector('input').checked : false;
        // Modified: Store original ID as a data attribute to track during save
        row.dataset.originalId = id;
        row.cells[0].innerHTML = `<input type="number" value="${id}" placeholder="Enter ID" required>`;
        row.cells[1].innerHTML = `<input type="text" value="${name}" placeholder="Enter Name" required>`;
        //row.cells[2].innerHTML = `<input type="checkbox" ${status ? 'checked' : ''}>`;
    });
});

// Save data to console log and database
save.addEventListener("click", async function() {
    const rows = tbody.getElementsByTagName('tr');
    const data = Array.from(rows)
        .map(row => {
            const idInput = row.cells[0].querySelector('input');
            const nameInput = row.cells[1].querySelector('input');
            //const statusCheckbox = row.cells[2].querySelector('input');
            // Modified: Include original ID for database update
            return {
                originalId: row.dataset.originalId || null, // Track original ID
                id: idInput ? idInput.value : row.cells[0].textContent,
                name: nameInput ? nameInput.value : row.cells[1].textContent,
                //status: statusCheckbox ? statusCheckbox.checked : false
            };
        })
        .filter(item => item.id !== '' && item.name !== '');

    Array.from(rows).forEach(row => {
        const idInput = row.cells[0].querySelector('input');
        const nameInput = row.cells[1].querySelector('input');
        if (idInput && nameInput && (idInput.value === '' || nameInput.value === '')) {
            row.remove();
        }
    });

    if (data.length === 0) {
        console.log('No valid data to save');
        isEditing = false;
        add.disabled = false;
        edit.disabled = false;
        return;
    }

    console.log('Saving data:', data);
    try {
        const response = await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            isEditing = false;
            add.disabled = false;
            edit.disabled = false;
            location.reload();
        } else {
            console.error('Error saving data:', response.statusText);
            isEditing = false;
            add.disabled = false;
            edit.disabled = false;
        }
    } catch (error) {
        console.error('Error saving data:', error);
        isEditing = false;
        add.disabled = false;
        edit.disabled = false;
    }
});

// Fetch data from database on page load
window.addEventListener('load', async () => {
    try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        data.forEach(item => {
            const newRow = tbody.insertRow(-1);
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            cell1.textContent = item.id;
            cell2.textContent = item.name;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Update checklist status in database
lastbtn.addEventListener('click', async () => {
    const rows = tbody.getElementsByTagName('tr');
    const data = Array.from(rows).map(row => {
        const id = row.cells[0].textContent;
        const name = row.cells[1].textContent;
        const status = row.cells[2].querySelector('input').checked;
        return { id, name, status };
    });

    try {
        const response = await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('Checklist status updated:', data);
            location.reload();
        } else {
            console.error('Error updating checklist:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating checklist:', error);
    }
});
//Problem
// Load Supabase SDK from CDN
(async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm')

  const supabase = createClient(
    'https://xlkqbzboihjluglxxech.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsa3FiemJvaWhqbHVnbHh4ZWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NjM3NjIsImV4cCI6MjA2ODQzOTc2Mn0.lkqWSoBUztCg75cUsKnh5XWV7evpPdfy1v82eUSFfRU'
  )

  // Example: Fetch data from your Supabase table (change 'users' to your actual table name)
  const { data, error } = await supabase.from('data').select('*')
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Data from Supabase:', data)
  }
})()



