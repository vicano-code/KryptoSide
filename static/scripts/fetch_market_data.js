$(document).ready(function () {
  function fetchData() {
    $.get('/api/get_data', function(data) {
      $('tbody').empty(); // Clear existing content
      data.forEach(record => {
        let row_tag = $('<tr></tr>', { id: 'row_tag'});
        let td_rank = $(`<td>${record.market_cap_rank}</td>`);
        let td_id = $(`<td><img src=${record.image} id="coin_img"> ${record.name} <span id="coin_symbol">${record.symbol}</td>`);
        let td_price = $(`<td>${record.current_price}</td>`);
        let td_pecent_change_1h = $(`<td class="highlight">${record.price_change_percent_1h}</td>`);
        let td_pecent_change_24h = $(`<td class="highlight">${record.price_change_percent_24h}</td>`);
        let td_pecent_change_7d = $(`<td class="highlight">${record.price_change_percent_7d}</td>`);
        let td_pecent_change_30d = $(`<td class="highlight">${record.price_change_percent_30d}</td>`);
        let td_pecent_change_1y = $(`<td class="highlight">${record.price_change_percent_1y}</td>`);
        let td_totalVolume = $(`<td>${record.total_volume}</td>`);
        let td_marketCap = $(`<td>${record.market_cap}</td>`);
        row_tag.append(td_rank, td_id, td_price, td_pecent_change_1h, td_pecent_change_24h, td_pecent_change_7d, td_pecent_change_30d, td_pecent_change_1y, td_totalVolume, td_marketCap);
        $('tbody').append(row_tag);

        $('.highlight').each(function() {
          var value = parseFloat($(this).text());
          if (value < 0) {
              $(this).css('color', 'red');
          } else {
              $(this).css('color', 'green');
          }
        });
      });
    })  
  }
  
  // Fetch data immediately and then at regular intervals
  fetchData();
  setInterval(fetchData, 60000); // 60000 ms = 60 seconds
})
