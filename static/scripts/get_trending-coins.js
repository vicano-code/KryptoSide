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
        
        // format percent_change_24h to percent
        let formatChangePercent  = new Intl.NumberFormat('en-US', {
          style: 'percent',
          maximumFractionDigits: 2,
        }).format(percent_change_24h/100);

        // use condition to get the right arrow image src
        let loc = "";
        if (percent_change_24h > 0) {
          loc = '../static/images/increase.png';
        } else {
          loc = '../static/images/decrease.png';
        }
        let rowTag = $('<tr></tr>', { id: 'rowTag'});
        let nameTag = $(`<td><img src=${logo} class='trendCoinLogo'> ${name}<td>`);
        let priceTag = $(`<td>${formatPriceCurrency} <img src=${loc} class='arrow'> ${formatChangePercent}<td>`);
        let sparkLinetag = $(`<td><img src=${sparkLine}> ${name}<td>`);
        rowTag.append(nameTag);
        rowTag.append(priceTag);
        rowTag.append(sparkLinetag);
        $('#trendingCoinTable').append(rowTag);
        $('#trendingCoinTable td').css('border', 'none');
        $('.trendCoinLogo').css('width', '15px');
        $('.arrow').css('width', '10px');
        $('#trendingCoinTable').css('height', '40vh');
        $('#trendingCoinTable').css('overflow-y', 'auto');
      })
    });
  }
  // Fetch data initially
  getandDisplaytrendingData();
  // Update data every 12 mins
  setInterval(getandDisplaytrendingData, 720000);
})
