let expensesArray = [];

function addExpense() {
  const expenseList = document.getElementById('expense-list');
  const expenseInput = document.createElement('div');
  expenseInput.className = 'expense-input';
  expenseInput.innerHTML = `
    <input type="text" class="expense-name" placeholder="Expense name">
    <input type="number" class="expense-amount" placeholder="Amount">
  `;
  expenseList.appendChild(expenseInput);
}

function calculateBudget() {
  const incomeInput = document.getElementById('income');
  const income = parseFloat(incomeInput.value) || 0;
  let totalExpenses = 0;

  expensesArray = [];
  document.querySelectorAll('.expense-input').forEach((expenseInput) => {
    const expenseName = expenseInput.querySelector('.expense-name').value;
    const expenseAmount = parseFloat(expenseInput.querySelector('.expense-amount').value) || 0;

    if (expenseName && expenseAmount) {
      expensesArray.push({ date: new Date().toLocaleDateString('en-US'), name: expenseName, amount: expenseAmount });
      totalExpenses += expenseAmount;
    }
  });

  const budget = income - totalExpenses;
  displayBudgetBreakdown(budget);

  // Clear input fields
  incomeInput.value = '';
  document.querySelectorAll('.expense-input').forEach((expenseInput) => {
    expenseInput.querySelector('.expense-name').value = '';
    expenseInput.querySelector('.expense-amount').value = '';
  });
}

function displayBudgetBreakdown(budget) {
  const budgetBreakdown = document.getElementById('budget-breakdown');

  if (budget >= 0) {
    budgetBreakdown.innerHTML += `<li>Remaining Budget: ₱${budget.toFixed(2)}</li>`;
  } else {
    budgetBreakdown.innerHTML += `<li>Over Budget: ₱${Math.abs(budget).toFixed(2)}</li>`;
  }

  if (expensesArray.length > 0) {
    budgetBreakdown.innerHTML += '<li>Expense Breakdown:</li>';
    expensesArray.forEach((expense) => {
      budgetBreakdown.innerHTML += `<li>Date: ${expense.date}, ${expense.name}: ₱${expense.amount.toFixed(2)}</li>`;
    });
  }

  // Clear input fields
  document.getElementById('income').value = '';
  document.querySelectorAll('.expense-input').forEach((expenseInput) => {
    expenseInput.querySelector('.expense-name').value = '';
    expenseInput.querySelector('.expense-amount').value = '';
  });
}

// Additional functions for storing and clearing budget breakdowns

function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toLocaleDateString('en-US');
}

function addBudgetBreakdown() {
  const income = parseFloat(document.getElementById('income').value) || 0;
  let totalExpenses = 0;
  const expenses = [];

  document.querySelectorAll('.expense-input').forEach((expenseInput) => {
    const expenseName = expenseInput.querySelector('.expense-name').value;
    const expenseAmount = parseFloat(expenseInput.querySelector('.expense-amount').value) || 0;

    if (expenseName && expenseAmount) {
      expenses.push({ name: expenseName, amount: expenseAmount });
      totalExpenses += expenseAmount;
    }
  });

  const budget = income - totalExpenses;

  // Save the budget breakdown with the current date
  expensesArray.unshift({ date: getCurrentDate(), budget, expenses });

  // Display all budget breakdowns
  displayAllBudgetBreakdowns();
}

function displayAllBudgetBreakdowns() {
  const budgetBreakdown = document.getElementById('budget-breakdown');
  budgetBreakdown.innerHTML = '';

  expensesArray.forEach((budgetEntry) => {
    budgetBreakdown.innerHTML += `<li>Date: ${budgetEntry.date}</li>`;
    if (budgetEntry.budget >= 0) {
      budgetBreakdown.innerHTML += `<li>Remaining Budget: ₱${budgetEntry.budget.toFixed(2)}</li>`;
    } else {
      budgetBreakdown.innerHTML += `<li>Over Budget: ₱${Math.abs(budgetEntry.budget).toFixed(2)}</li>`;
    }

    if (budgetEntry.expenses.length > 0) {
      budgetBreakdown.innerHTML += '<li>Expense Breakdown:</li>';
      budgetEntry.expenses.forEach((expense) => {
        budgetBreakdown.innerHTML += `<li>${expense.name}: ₱${expense.amount.toFixed(2)}</li>`;
      });
    }
  });
}

// Clear local storage and reset the displayed budget breakdowns
function clearBudgetBreakdowns() {
  localStorage.removeItem('expensesArray');
  expensesArray = [];
  displayAllBudgetBreakdowns();
}
