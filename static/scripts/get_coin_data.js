$(document).ready(() => {
  //setInterval()
  $('#submitCoinBtn').click(function() {
    event.preventDefault();
    let coinId = $('#crypto').val();
    
    // Get coin description
    const url_coin_desc = 'https://api.coingecko.com/api/v3/coins/' + coinId.toLowerCase() + '?x_cg_demo_api_key=' + apiKey;
    $.get(url_coin_desc, function (data1) {
      $('#coinDescription').html(data1.description['en']);
    });
    
    // Get coin historical data
    const url_history = 'https://api.coingecko.com/api/v3/coins/' + coinId.toLowerCase() + '/market_chart?vs_currency=usd&days=365&x_cg_demo_api_key=' + apiKey;
    $.get(url_history, function (data) {
      
      let xDate = data['prices'].map(val => val[0]);
      let yPrices = data['prices'].map(val => val[1]);
      let yMarketCap = data['market_caps'].map(val => val[1]);
      let yMarketVol = data['total_volumes'].map(val => val[1]);

      // Prepare the plotly data
      let trace1 = {
        x: xDate,
        y: yPrices,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' }
      };
      let trace2 = {
        x: xDate,
        y: yMarketCap,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'blue' }
      };
      let trace3 = {
        x: xDate,
        y: yMarketVol,
        type: 'scatter',
        mode: 'lines',
      };

      let layout1 = {
        title: coinId + ' Price History',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Price (USD)' },
      };
      let layout2 = {
        title: coinId + ' Market Cap History',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Market Cap (USD)' },
      };
      let layout3 = {
        title: coinId + ' Total Volume',
        xaxis: { title: 'Date' },
        yaxis: { title: '24hr Total Volume (USD)' },
      };
      //const trace = [trace1, trace2, trace3];

      // Plot the graph
      Plotly.newPlot('priceHistoryChart', [trace1], layout1);
      Plotly.newPlot('marketCapHistoryChart', [trace2], layout2);
      Plotly.newPlot('marketVolHistoryChart', [trace3], layout3);
    })
    .fail(function() {
      console.error('Error fetching coin data.');
    })
  });
});