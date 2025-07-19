const tbody = document.querySelector('tbody');
const attendedInput = document.querySelector('.box input[type="number"]:nth-of-type(1)');
const absentedInput = document.querySelector('.box input[type="number"]:nth-of-type(2)');
const submitButton = document.getElementById('submit'); // Modified: Correctly reference submit button
const lastbtn = document.getElementById('lastsubmit');

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
            cell3.innerHTML = `<input type="checkbox" ${item.status ? 'checked' : ''}>`;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Update database on submit for attended/absented inputs
submitButton.addEventListener('click', async () => { // Modified: Moved attended/absented logic to submitButton
    const attendedNumber = attendedInput.value.trim();
    const absentedNumber = absentedInput.value.trim();

    if (!attendedNumber && !absentedNumber) {
        console.error('Please enter at least one ID in Attended or Absented');
        return;
    }

    try {
        // Fetch current data
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();

        // Collect current checkbox states from table
        const rows = tbody.getElementsByTagName('tr');
        const checkboxStates = Array.from(rows).map(row => {
            const id = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            const status = row.cells[2].querySelector('input').checked;
            return { id, name, status };
        });

        // Update status based on input
        const updatedData = checkboxStates.map(item => {
            const idStr = item.id.toString();
            if (attendedNumber && idStr.slice(-attendedNumber.length) === attendedNumber) {
                return { ...item, status: true };
            }
            if (absentedNumber && idStr.slice(-absentedNumber.length) === absentedNumber) {
                return { ...item, status: false };
            }
            return item;
        });

        // Save updated data to database
        const saveResponse = await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (saveResponse.ok) {
            console.log('Attended Number:', attendedNumber);
            console.log('Absented Number:', absentedNumber);
            console.log('Updated Data:', updatedData);
            location.reload();
        } else {
            console.error('Error saving data:', saveResponse.statusText);
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
});

// Added: Update checklist status in database based on checkbox states
lastbtn.addEventListener('click', async () => {
    const rows = tbody.getElementsByTagName('tr');
    const data = Array.from(rows).map(row => {
        const id = row.cells[0].textContent;
        const name = row.cells[1].textContent;
        const status = row.cells[2].querySelector('input').checked; // Get checkbox state
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

//Supabase
// script.js

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
