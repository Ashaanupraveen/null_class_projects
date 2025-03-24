function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));
  }
  
  const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const dataSets = [
    {
      label: 'Stocks',
      data: generateRandomData(30, 50, 150),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      label: 'Bonds',
      data: generateRandomData(30, 20, 80),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'Crypto',
      data: generateRandomData(30, 100, 300),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
  ];
  
  const ctx = document.getElementById('multiAssetChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: dataSets,
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Multi-Asset Chart Comparison'
        }
      }
    },
  });
  