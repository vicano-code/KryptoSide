// Fetch global crypto data from coingecko API and display in html template
$(document).ready(function() {
  function getandDisplaytrendingData() {
    const url = 'https://api.coingecko.com/api/v3/search/trending/' + '?x_cg_demo_api_key=' + apiKey;
    $.get(url, function (data) {
      $('#trendingCoinTable').empty(); // Clear previous data
      data.coins.map(i => {
        let logo = i.item.thumb;
        let name = i.item.name;
        let price = i.item.data.price;
        let percent_change_24h = i.item.data.price_change_percentage_24h['usd'];
        let sparkLine = i.item.data.sparkline;        

        // format price value to currency
        let formatPriceCurrency  = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 4,
        }).format(price);
        
        // use condition to get the correct arrow image src 
        let loc = percent_change_24h > 0 ? '../static/images/increase.png': '../static/images/decrease.png';

        // first remove any negative sign
        percent_change_24h = percent_change_24h < 0 ? Math.abs(percent_change_24h): percent_change_24h

        let rowTag = $('<tr></tr>', { id: 'rowTag'});
        let nameTag = $(`<td><img src=${logo} class='trendCoinLogo'> ${name}<td>`);
        let priceTag = $(`<td>${formatPriceCurrency} <img src=${loc} class='arrow'> ${percent_change_24h.toFixed(2)}%<td>`);
        let sparkLinetag = $(`<td><img src=${sparkLine} id='sparkLine'> ${name}<td>`);

        rowTag.append(nameTag, priceTag, sparkLinetag);
        $('#trendingCoinTable').append(rowTag);

        // format styles
        $('#trendingCoinTable td').css('border', 'none');
        $('.trendCoinLogo').css('width', '15px');
        $('.arrow').css('width', '10px');
        $('#trendingCoinTable').css('height', '40vh');
        $('#trendingCoinTable').css('overflow-y', 'auto');
      })
    }).fail(function() {
      console.error('Error fetching data from the API.');
    });
  }
  // Fetch data initially
  getandDisplaytrendingData();
  // Update data every 12 mins
  setInterval(getandDisplaytrendingData, 720000);
})
