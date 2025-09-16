// Mina Arrayer för inkomste och utgifter 

let incomes = [];
let expenses = [];

//Ref till element 

const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("balance");
// const transactionList = document.getElementById("transactionList");


// === Function to add transaction ===== //
function addTransaction(type) {
    const description = descInput.value.trim();
    const amount = Number(amountInput.value);

    if (!description || isNaN(amount) || amount <= 0){
        alert("Fyll i beskrivning och ett giltligt belopp");
        return;
    }

    const transaction = { description, amount, type };

    if(type === "income"){
        incomes.push(transaction);
        renderTransaction(transaction, incomeList, "income");
    } else {
        expenses.push(transaction);
        renderTransaction(transaction, expenseList,"expense");
    }

    updateTotal();
    descInput.value = "";
    amountInput.value = "";
    descInput.focus();

}

// render function

function renderTransaction(transaction, listElement, cssClass) {
    const li = document.createElement("li");
    li.classList.add(cssClass);

    let typeLabel = transaction.type === "income" ? " (Inkomst)" : " (Utgift)";
    li.textContent = `${transaction.description}: ${transaction.amount} kr${typeLabel}`;

    listElement.appendChild(li);
}


// function to update total

function updateTotal(){
    const incomeSum = incomes.reduce((sum, t) => sum + t.amount, 0);
    const expenseSum = expenses.reduce((sum, t) => sum + t.amount, 0);
    const total = incomeSum - expenseSum;

    totalDisplay.textContent = total;
}

// save and load data from localStorage

// function saveData(){
//     localStorage.setItem("incomes", JSON.stringify(incomes));
//     localStorage.setItem("expenses",JSON.stringify(expenses));
// }

// function loadData() {
//     incomes = JSON.parse(localStorage.getItem("incomes")) || [];
//     expenses = JSON.parse(localStorage.getItem("expenses")) || [];

//     incomes.forEach(t => {
//         renderTransaction(t, incomeList, "income");
//         renderTransaction(t, transactionList, "income");
//     });

//     expenses.forEach(t => {
//         renderTransaction(t, expenseList, "expense");
//         renderTransaction(t, transactionList, "expense");
//     });

//     updateTotal();
// }

// diffrent types of listeners

document.getElementById("incomeBtn").addEventListener("click",()=> addTransaction("income"));
document.getElementById("expenseBtn").addEventListener("click", () => addTransaction("expense"));

// // load former data/inputs

// loadData();