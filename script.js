// Get references to the form and expense list elements
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

// Initialize an array to store expense objects and a variable to keep track of the index of the expense being edited
let expenses = [];
let editIndex = -1;

// Add an event listener to the form to handle the form submission
expenseForm.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the form fields
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const amount = document.getElementById("amount").value;

  // Check if the form fields are valid
  if (description && category && !isNaN(amount)) {
    // Create a new expense object
    const expense = { description, category, amount };

    // If no expense is being edited, add the new expense to the array
    // Otherwise, update the existing expense at the specified index
    if (editIndex === -1) {
      expenses.push(expense);
    } else {
      expenses[editIndex] = expense;
      editIndex = -1; // Reset the edit index
    }

    // Render the updated list of expenses
    renderExpenses();
    // Clear the form fields
    clearForm();
  } else {
    // Show an alert if the form fields are not valid
    alert("Please fill out all fields with valid data");
  }
});

// Function to render the list of expenses
function renderExpenses() {
  // Clear the current list of expenses
  expenseList.innerHTML = "";
  // Loop through the array of expenses and create a table row for each expense
  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>
                <button onclick="editExpense(${index})">🖍</button>
                <button onclick="deleteExpense(${index})">❌</button>
            </td>
        `;
    // Add the row to the expense list
    expenseList.appendChild(row);
  });
}

// Function to edit an expense
function editExpense(index) {
  // Get the expense object at the specified index
  const expense = expenses[index];
  // Populate the form fields with the expense data
  document.getElementById("description").value = expense.description;
  document.getElementById("category").value = expense.category;
  document.getElementById("amount").value = expense.amount;
  // Set the edit index to the specified index
  editIndex = index;
}

// Function to delete an expense
function deleteExpense(index) {
  // Remove the expense at the specified index from the array
  expenses.splice(index, 1);
  // Render the updated list of expenses
  renderExpenses();
}

// Function to clear the form fields
function clearForm() {
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  // Reset the edit index
  editIndex = -1;
}
