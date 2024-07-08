// Fetch global crypto data from coingecko API and display in html template
$(document).ready(function() {
  function getandDisplaytrendingData() {
    const url = 'https://api.coingecko.com/api/v3/search/trending/' + '?x_cg_demo_api_key=' + apiKey;
    $.get(url, function (data) {
      const trendingCoinContainer = $('#trending_coin');
      trendingCoinContainer.empty();  // Clear previous data
      console.log(data.coins);
      data.coins.map(i => {
        let name = i.item.name;
        console.log(name);
        let price = i.item.data.price;
        console.log(price);
        let divTag = $('<div></div>')
        let nameTag = $(`<h5>${name}<h5>`);
        let priceTag = $(`<h5>${price}<h5>`);
        divTag.append(nameTag);
        divTag.append(priceTag);
        $(divTag).css('display', 'flex');
        $(divTag).css('flex-direction', 'row');
        $(divTag).css('gap', '40px')
        $(divTag).css('align-items', 'center')
        $(divTag).css('justify-content', 'start');
        trendingCoinContainer.append(divTag);
        trendingCoinContainer.append(divTag);
      })
    });
  }
  // Fetch data initially
  getandDisplaytrendingData();
  // Update data every 12 mins
  setInterval(getandDisplaytrendingData, 720000);
})
