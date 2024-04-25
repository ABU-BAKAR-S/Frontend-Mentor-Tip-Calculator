let billInput = document.getElementById("bill_amount");
let billField = document.querySelector(".bill_input_field");
let tips = document.querySelectorAll(".tips_field div");
let custom = document.getElementById("custom");
let peopleInput = document.getElementById("people");
let showAmount = document.getElementById("show_amount");
let totalAmount = document.getElementById("show_total_amount");
let resetBtn = document.getElementById("resetBtn");
let peopleErrorfield = document.querySelector(".select_people");
let errorTxt = document.getElementById("error");

tips.forEach((tip) => {
    tip.addEventListener("click", () => {
        tips.forEach((opt) => opt.classList.remove("active"));
        tip.classList.add("active");
        custom.value = "";
        calculation(parseFloat(tip.textContent));
    })
})

billInput.addEventListener("input", calculation)

custom.addEventListener("input", calculation);

peopleInput.addEventListener("input", calculation)

function calculation(tip) {

    let bill = parseFloat(billInput.value);
    let people = parseInt(peopleInput.value);
    let tipValue = parseFloat(tip);
    let customValue = custom.value / 100;
    let tipValues = tipValue / 100;

    if (isNaN(bill) || isNaN(people) || bill <= 0 || people <= 0) {
        showAmount.innerHTML = '$0.00';
        totalAmount.innerHTML = '$0.00';
        return;
    }

    let personAmount = ((bill * tipValues) / people);
    let total = (bill / people) + personAmount;

    if (customValue !== 0) {
        personAmount = ((bill * customValue) / people);
        total = (bill / people) + personAmount
    }

    showAmount.innerHTML = "$" + (personAmount).toFixed(2);
    totalAmount.innerHTML = "$" + (total).toFixed(2);

}

calculation();

billInput.addEventListener('input', resetBtnOpacity);
custom.addEventListener('input', resetBtnOpacity);
peopleInput.addEventListener('input', resetBtnOpacity);

function resetBtnOpacity() {
    if (
        (billInput.value.trim() !== '' && billInput.value !== "0") ||
        (custom.value.trim() !== '' && custom.value !== "0") ||
        (peopleInput.value.trim() !== '' && peopleInput.value !== "0")
    ) {
        resetBtn.style.opacity = '1';
    } else {
        resetBtn.style.opacity = '0.1';
    }
}

resetBtnOpacity()

resetBtn.addEventListener("click", () => {

    billInput.value = "";
    custom.value = "";
    peopleInput.value = "";
    showAmount.innerHTML = '$0.00';
    totalAmount.innerHTML = '$0.00';

    errorTxt.innerHTML = '';
    errorTxt.style.color = '';
    peopleErrorfield.style.border = '2px solid transparent';

})

function noInput() {

    if (peopleInput.value == "0") {
        errorTxt.innerHTML = "Can't be zero";
        errorTxt.style.color = 'red';
        peopleErrorfield.style.border = '2px solid red';
    } else {
        errorTxt.innerHTML = '';
        errorTxt.style.color = '';
        peopleErrorfield.style.border = '2px solid transparent';
    }
}
noInput();

peopleInput.addEventListener("input", noInput)



