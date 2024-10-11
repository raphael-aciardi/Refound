const amount = document.getElementById("amount")

amount.oninput = () => {
    value = amount.value.replace(/\D/g, "")
    amount.value = value
}