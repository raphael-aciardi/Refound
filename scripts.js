const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

amount.oninput = () => {
    value = amount.value.replace(/\D/g, "")

    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
    })
    
    return value
}

form.onsubmit = (event)=> {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

    expenseAdd(newExpense)
    
    console.log(newExpense)
}

function expenseAdd(newExpense){
    try{
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense
        
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name
        
        const expenseAmout = document.createElement("span")
        expenseAmout.classList.add("expense-amount")
        expenseAmout.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        expenseInfo.append(expenseName, expenseCategory)

        expenseItem.append(expenseIcon, expenseInfo, expenseAmout, removeIcon)

        expenseList.appendChild(expenseItem)

        updateTotals()
        formCLear()

    } catch (error){
        alert("Erro ao adicionar despesa")
        console.log(error)
    }


}

function updateTotals() {
    try {
        const items = expenseList.children;
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

        let total = 0;

        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount");
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

            value = parseFloat(value);
            if (isNaN(value)) {
                value = 0;
            }
            total += Number(value);
        }
    
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");  
        
        expensesTotal.innerHTML = `<small>R$</small> ${total}`;

    } catch (error) {
        alert("Erro ao atualizar totais");
        console.log(error);
    }
}

expenseList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-icon")) {
        const item = event.target.closest(".expense")
        item.remove();
    }

    updateTotals()
})

function formCLear(){
    amount.value = ""
    expense.value = ""
    category.value = "" 
    expense.focus()
}