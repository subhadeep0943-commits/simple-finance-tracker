const reasonInput = document.getElementById('reason');
const amountInput = document.getElementById('amount');
const addBtn = document.getElementById('add-btn');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateTotal() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += parseFloat(expenses[i].amount);
    }
    totalAmountDisplay.textContent = total.toFixed(2);
}

// UPDATED FUNCTION: Now adds a delete button next to each item
function renderExpenses() {
    expenseList.innerHTML = '';
    
    // We add 'index' here to know exactly which item we want to delete
    expenses.forEach((item, index) => {
        const li = document.createElement('li');
        
        // This creates the text AND a small red delete button
        li.innerHTML = `
            <span>${item.reason} - $${item.amount}</span>
            <button onclick="deleteExpense(${index})" style="width:auto; margin:0; padding:2px 8px; background-color:#dc3545;">X</button>
        `;
        expenseList.appendChild(li);
    });
    updateTotal();
}

// NEW FUNCTION: Removes the item when the 'X' button is clicked
window.deleteExpense = function(index) {
    // Remove 1 item at the specific index position
    expenses.splice(index, 1); 
    
    // Save the new shortened list back to the browser storage
    localStorage.setItem('expenses', JSON.stringify(expenses)); 
    
    // Refresh the screen
    renderExpenses(); 
}

addBtn.addEventListener('click', function() {
    const reasonText = reasonInput.value.trim();
    const amountText = amountInput.value.trim();

    if (reasonText === '' || amountText === '') {
        alert('Please fill out both fields!');
        return;
    }

    const newExpense = {
        reason: reasonText,
        amount: amountText
    };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    reasonInput.value = '';
    amountInput.value = '';
});

renderExpenses();