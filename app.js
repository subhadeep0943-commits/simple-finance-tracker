const reasonInput = document.getElementById('reason');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category'); 
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

function renderExpenses() {
    expenseList.innerHTML = '';
    
    expenses.forEach((item, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <div>
                <span style="font-weight:600;">${item.reason}</span>
                <small style="display:block; color:#6b7280; font-size:12px;">${item.category}</small>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-weight:700;">$${item.amount}</span>
                <button class="delete-btn" onclick="deleteExpense(${index})">🗑️</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
    updateTotal();
}

window.deleteExpense = function(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

addBtn.addEventListener('click', function() {
    const reasonText = reasonInput.value.trim();
    const amountText = amountInput.value.trim();
    const categoryText = categoryInput.value; 

    if (reasonText === '' || amountText === '') {
        alert('Please fill out both fields!');
        return;
    }

    const newExpense = {
        reason: reasonText,
        amount: amountText,
        category: categoryText 
    };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    reasonInput.value = '';
    amountInput.value = '';
});

renderExpenses();