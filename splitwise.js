const memberForm = document.getElementById('memberForm');
const memberNameInput = document.getElementById('memberName');
const memberList = document.getElementById('memberList');
const expenseForm = document.getElementById('expenseForm');
const expenseAmountInput = document.getElementById('expenseAmount');
const payerNameSelect = document.getElementById('payerName');
const expenseDescriptionInput = document.getElementById('expenseDescription');
const expenseList = document.getElementById('expenseList');
const summaryButton = document.getElementById('calculateButton');
const summaryBody = document.getElementById('summaryBody');
const resetButton = document.getElementById('resetButton');

let members = [];
let expenses = [];

// Add member to the group
memberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const memberName = memberNameInput.value.trim();
    if (memberName && !members.includes(memberName)) {
        members.push(memberName);
        updateMemberList();
        updatePayerDropdown();
        memberNameInput.value = '';
    }
});

// Update the list of members displayed
function updateMemberList() {
    memberList.innerHTML = '';
    members.forEach(member => {
        const li = document.createElement('li');
        li.textContent = member;
        memberList.appendChild(li);
    });
}

// Update the dropdown for selecting the payer
function updatePayerDropdown() {
    payerNameSelect.innerHTML = '<option value="">Select Payer</option>';
    members.forEach(member => {
        const option = document.createElement('option');
        option.value = member;
        option.textContent = member;
        payerNameSelect.appendChild(option);
    });
}

// Add expense to the list
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmountInput.value);
    const payer = payerNameSelect.value;
    const description = expenseDescriptionInput.value.trim();

    if (amount > 0 && payer) {
        expenses.push({ amount, payer, description });
        updateExpenseList();
        expenseAmountInput.value = '';
        payerNameSelect.value = '';
        expenseDescriptionInput.value = '';
    }
});

// Update the list of expenses displayed
function updateExpenseList() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.payer} paid ₹${expense.amount.toFixed(2)} - ${expense.description}`;
        expenseList.appendChild(li);
    });
}

// Calculate and display balances
summaryButton.addEventListener('click', () => {
    const totalContributions = {};
    expenses.forEach(expense => {
        totalContributions[expense.payer] = (totalContributions[expense.payer] || 0) + expense.amount;
    });

    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const share = totalExpense / members.length;

    summaryBody.innerHTML = '';
    const balances = {}; // Create balances object

    members.forEach(member => {
        const balance = (totalContributions[member] || 0) - share;
        balances[member] = balance; // Add balance to balances object

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member}</td>
            <td>₹${(totalContributions[member] || 0).toFixed(2)}</td>
            <td>₹${share.toFixed(2)}</td>
            <td class="${balance > 0 ? 'owed' : 'owing'}">₹${balance.toFixed(2)}</td>
        `;
        summaryBody.appendChild(row);
    });

    // Calculate who owes how much to whom
    const transactions = calculateTransactions(balances);
    displayTransactions(transactions);
});

// Function to calculate who owes how much to whom
function calculateTransactions(balances) {
    const creditors = [];
    const debtors = [];

    // Separate members into creditors and debtors
    for (const [member, balance] of Object.entries(balances)) {
        if (balance > 0) creditors.push({ member, balance });
        else if (balance < 0) debtors.push({ member, balance: -balance });
    }

    const transactions = [];

    // Match creditors with debtors
    creditors.forEach(creditor => {
        debtors.forEach(debtor => {
            if (creditor.balance > 0 && debtor.balance > 0) {
                const amount = Math.min(creditor.balance, debtor.balance);
                transactions.push(`${debtor.member} owes ₹${amount.toFixed(2)} to ${creditor.member}`);
                creditor.balance -= amount;
                debtor.balance -= amount;
            }
        });
    });

    return transactions;
}




// Function to display transactions in the summary
function displayTransactions(transactions) {
    const transactionSection = document.getElementById('transactionSection');
    transactionSection.innerHTML = '<h3>Payments Needed</h3>';

    transactions.forEach(transaction => {
        const p = document.createElement('p');
        p.textContent = transaction;
        transactionSection.appendChild(p);
    });
}

// Reset all data
resetButton.addEventListener('click', () => {
    members = [];
    expenses = [];
    updateMemberList();
    updatePayerDropdown();
    updateExpenseList();
    summaryBody.innerHTML = '';
    document.getElementById('transactionSection').innerHTML = ''; // Clear transaction section
});
