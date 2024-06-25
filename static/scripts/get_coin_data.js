$(document).ready(() => {
  $('#submitCoinBtn').click(function() {
    event.preventDefault();
    let coinId = $('#crypto').val();
    const url = 'https://api.coingecko.com/api/v3/coins/' + coinId;
    $.get(url, function (data) {
      let xCoinIds = Object.keys(data['market_data'].current_price);
      let yPrices = Object.values(data['market_data'].current_price);
      let minPrice = m

      // Prepare the plotly data
      let trace = {
        x: xCoinIds,
        y: yPrices,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' }
        };

      let layout = {
        title: coinId.toUpperCase() + 'PRICE EXCHANGE',
        xaxis: {
          title: 'Cryptocurrency'
        },
        yaxis: {
          title: 'Price'
        }
      };

      // Plot the graph
      Plotly.newPlot('coinExchangePlot', [trace], layout);

      // get coin description
      $('#coinDescription').html(data.description['en']);
    })
    .fail(function() {
      console.error('Error fetching coin data.');
    })
  });
});