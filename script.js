const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const cryptoTableBody = document.getElementById('crypto-data');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('theme-toggle');

let cryptoData = [];

// Fetch Crypto Data from API
async function fetchCryptoData() {
  const response = await fetch(apiURL);
  const data = await response.json();
  cryptoData = data;
  displayCryptoData(data);
}

// Display Crypto Data in the Table
function displayCryptoData(data) {
  cryptoTableBody.innerHTML = '';
  data.forEach((crypto, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${crypto.name}</td>
      <td>${crypto.symbol.toUpperCase()}</td>
      <td>$${crypto.current_price.toFixed(2)}</td>
      <td style="color: ${crypto.price_change_percentage_24h < 0 ? 'red' : 'green'}">
        ${crypto.price_change_percentage_24h.toFixed(2)}%
      </td>
    `;
    cryptoTableBody.appendChild(row);
  });
}

// Search for a specific cryptocurrency
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm) || 
    crypto.symbol.toLowerCase().includes(searchTerm)
  );
  displayCryptoData(filteredData);
});

// Dark/Light Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Initial Fetch
fetchCryptoData();
