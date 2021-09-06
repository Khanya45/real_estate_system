function calculator(){
    let values = []
   let inputs = document.getElementsByTagName("input")
   for (index=0;index<inputs.length;index++){
       values.push(parseFloat(inputs[index].value))
   }
   let monthlyPayment = values[0] * 0.3
   let affordLoan = values[1] * (1+values[3]/100) ** values[4]
   let affordability = Math.round(affordLoan * 10);
   let maxLoan = document.querySelector("#maximumLoanValue")
   let maxMonthly = document.querySelector("#affordMonthlyPaymentValue")
   maxLoan.textContent = affordability;
   maxMonthly.textContent = monthlyPayment;
}

