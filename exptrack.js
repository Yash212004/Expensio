let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let budget = JSON.parse(localStorage.getItem('budget')) || { income: 0, limit: 0 };
let expenseChart;

function setBudget() {
  const incomeInput = document.getElementById("income-input").value;
  const limitInput = document.getElementById("limit-input").value;

  budget.income = parseInt(incomeInput) || 0;
  budget.limit = parseInt(limitInput) || 0;

  localStorage.setItem('budget', JSON.stringify(budget));
  updateOverview();
}

function addExpense() {
  const name = document.getElementById("expense-name-input").value;
  const amount = parseInt(document.getElementById("expense-amount-input").value);
  const category = document.getElementById("expense-category-input").value;
  const date = new Date().toLocaleDateString();

  if (!name || isNaN(amount) || !category) return alert("Please enter all fields");

  transactions.push({ name, amount, category, date });
  localStorage.setItem('transactions', JSON.stringify(transactions));

  updateTransactionTable();
  updateOverview();
}

function updateTransactionTable() {
  const tbody = document.getElementById("transaction-table-body");
  tbody.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${transaction.date}</td>
      <td>${transaction.name}</td>
      <td>${transaction.category}</td>
      <td>₹${transaction.amount}</td>
      <td><button onclick="editExpense(${index})">Edit</button></td>
      <td><button onclick="deleteExpense(${index})">Delete</button></td>
    `;

    tbody.appendChild(row);
  });
}

function editExpense(index) {
  const expense = transactions[index];
  document.getElementById("expense-name-input").value = expense.name;
  document.getElementById("expense-amount-input").value = expense.amount;
  document.getElementById("expense-category-input").value = expense.category;

  deleteExpense(index);  // Remove the old expense before adding the edited one
}

function deleteExpense(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateTransactionTable();
  updateOverview();
}

function clearAllExpenses() {
  transactions = [];
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateTransactionTable();
  updateOverview();
}

function updateOverview() {
  const totalIncome = budget.income;
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const remainingBalance = totalIncome - totalExpenses;

  document.getElementById("total-income").textContent = `Total Budget: ₹${totalIncome}`;
  document.getElementById("total-expenses").textContent = `Total Expenses: ₹${totalExpenses}`;
  document.getElementById("remaining-balance").textContent = `Remaining Balance: ₹${remainingBalance}`;

  if (totalExpenses > budget.limit) {
    document.getElementById("budget-alert").style.display = "block";
  } else {
    document.getElementById("budget-alert").style.display = "none";
  }

  updateChart();
}

function updateChart() {
  const categories = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  if (expenseChart) {
    expenseChart.destroy();
  }

  const ctx = document.getElementById("expense-chart").getContext("2d");
  expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", "#ff4444"]
      }]
    }
  });
}

window.onload = updateTransactionTable;
