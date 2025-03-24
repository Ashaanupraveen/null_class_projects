let currentPrice = 0;
let alertPrice = null;

function generateRandomPrice() {
    currentPrice = (Math.random() * 200).toFixed(2);
    document.getElementById('price').innerText = currentPrice;
    checkPriceAlert();
}

function setPriceAlert() {
    alertPrice = parseFloat(document.getElementById('alertPrice').value);
    if (isNaN(alertPrice) || alertPrice <= 0) {
        alert("Please enter a valid price.");
        return;
    }
    document.getElementById('notification').innerText = `Alert set for $${alertPrice}`;
}

function checkPriceAlert() {
    if (alertPrice !== null && parseFloat(currentPrice) >= alertPrice) {
        document.getElementById('notification').innerText = `🔔 Price Alert: Price hit $${alertPrice}!`;
        alertPrice = null;
    }
}

setInterval(generateRandomPrice, 3000);
