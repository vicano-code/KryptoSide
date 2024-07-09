// Fetch global crypto data for Market Cap and Trading_Volume from coingecko API
// and display in html template
$(document).ready(function() {
  function getandDisplayGlobalMarketData() {
    const url = 'https://api.coingecko.com/api/v3/global/' + '?x_cg_demo_api_key=' + apiKey;
    $.get(url, function (data) {
      // Display market cap value
      let totalMarketCapValue = data.data.total_market_cap['usd'];
      let formattedMarketCapValue  = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(totalMarketCapValue);
        $('#totalMarketCap h3').text(formattedMarketCapValue );

      // Display 24h volume total
      let totalVolume = data.data.total_volume['usd'];
      let formattedtotalVolume  = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(totalVolume);
        $('#totalMarketVolume h3').text(formattedtotalVolume );
    })
    .catch(err => {
      console.error(err);
      $('#totalMarketVolume h3').text('Error loading data');
    })
  }
// Fetch data initially
getandDisplayGlobalMarketData();
// Update data every 12 mins
setInterval(getandDisplayGlobalMarketData, 720000);
});

