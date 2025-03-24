let historicalPrices = [];
let balance = 1000;
let initialBalance = 1000;
let chart;

function generateRandomData() {
  for (let i = 0; i < 100; i++) {
    let price = (Math.random() * 200 + 50).toFixed(2); // Prices between $50 and $250
    historicalPrices.push(parseFloat(price));
  }
}

function startBacktest() {
  if (historicalPrices.length === 0) generateRandomData();
  
  const selectedStrategy = document.getElementById("strategy").value;
  balance = initialBalance;

  if (selectedStrategy === "buyLowSellHigh") {
    buyLowSellHighStrategy();
  } else {
    randomTradeStrategy();
  }

  updateResults();
  plotChart();
}

function buyLowSellHighStrategy() {
  let holding = false;
  let buyPrice = 0;

  historicalPrices.forEach((price, index) => {
    if (!holding && price < 100) {
      // Buy when price is low
      buyPrice = price;
      holding = true;
    } else if (holding && price > 150) {
      // Sell when price is high
      balance += (price - buyPrice);
      holding = false;
    }
  });
}

function randomTradeStrategy() {
  historicalPrices.forEach((price, index) => {
    if (Math.random() > 0.5) {
      // Random buy/sell action
      balance += Math.random() > 0.5 ? price * 0.05 : -price * 0.05;
    }
  });
}

function updateResults() {
  const profitLoss = balance - initialBalance;
  document.getElementById("finalBalance").innerText = balance.toFixed(2);
  document.getElementById("profitLoss").innerText = profitLoss.toFixed(2);
  document.getElementById("profitLoss").style.color = profitLoss >= 0 ? "green" : "red";
}

function plotChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  
  if (chart) {
    chart.destroy();
  }
  
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: historicalPrices.length }, (_, i) => i + 1),
      datasets: [{
        label: 'Price Data',
        data: historicalPrices,
        borderColor: '#007bff',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'Time (Days)' } },
        y: { title: { display: true, text: 'Price ($)' } }
      }
    }
  });
}
