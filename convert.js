// Hardcoded exchange rates relative to USD
const exchangeRates = {
    USD: 1,         // Base currency
    EUR: 0.9159,      // 1 USD = 0.91 EUR
    INR: 74.50,     // 1 USD = 74.50 INR
    GBP: 0.7693,      // 1 USD = 0.76 GBP
    AUD: 1.5726       // 1 USD = 1.57 AUD
    // Add more currencies and their rates here as needed
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    // Check for valid input
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    // Convert amount to USD, then from USD to the target currency
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];

    // Display the result
    document.getElementById("result").textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
}
