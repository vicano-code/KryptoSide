$(document).ready(() => {
  function plotCharts(event) {
    if (event) {
      event.preventDefault();
    }
    let coinId = $('#crypto').val();
    // Get coin description
    const url_coin_desc = 'https://api.coingecko.com/api/v3/coins/' + coinId.toLowerCase() + '?x_cg_demo_api_key=' + apiKey;
    $.get(url_coin_desc, function (data1) {
      let formatInt = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        })
    
      $('#coin_logo').attr('src', data1.image['thumb']);
      $('#coin_name').text(data1.name);
      $('#coin_abbrev').text(data1.symbol.toUpperCase());
      $('#coin_rank').text('Rank #' + data1.market_cap_rank);
      $('#coin_price').text(formatInt.format(data1.market_data.current_price['usd']));
      $('#market_cap_val').text(formatInt.format(data1.market_data.market_cap['usd']));
      $('#trading_vol').text(formatInt.format(data1.market_data.total_volume['usd']));
      $('#circ_supply').text(data1.market_data.circulating_supply.toLocaleString('en-US'));
      $('#tot_supply').text(data1.market_data.total_supply.toLocaleString('en-US'));
      $('#max_supply').text(data1.market_data.max_supply.toLocaleString('en-US'));
      $('#website').text(data1.links.homepage[0]);
      $('#coinDescription').html(data1.description["en"]);
    });
    

    // Function to convert Unix timestamp to ISO date string
    function convertTimestampToISO(timestamp) {
      return new Date(timestamp).toISOString();
    }

    // Get and plot OHLC data
    const url_ohlc = 'https://api.coingecko.com/api/v3/coins/' + coinId.toLowerCase() + '/ohlc?days=365&vs_currency=usd&x_cg_demo_api_key=' + apiKey;
    $.get(url_ohlc, function (data2) {
      let xDate = data2.map(val => convertTimestampToISO(val[0]));
      let yOpen = data2.map(val => val[1]);
      let yHigh = data2.map(val => val[2]);
      let yLow = data2.map(val => val[3]);
      let yClose = data2.map(val => val[4]);

      let trace = {
        x: xDate,
        open: yOpen,
        high: yHigh,
        low: yLow,
        close: yClose,
        // cutomise colors
        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }; 

      var data = [trace];
      
      var layout = {
        dragmode: 'zoom',
        showlegend: false,
        title: coinId.charAt(0).toUpperCase() + coinId.slice(1) + ' Price History',
        xaxis: {
          title: 'Date',
          rangeslider: {
           visible: false
         }
        },
        yaxis: {
          title: 'Price(USD)'
        },        
        margin: {l: 60, r: 30, t: 70, b: 60},
        plot_bgcolor: '#FFFFF0',
        paper_bgcolor: '#FFFFF0',
      };
      
      Plotly.newPlot('candlestickChart', data, layout);
      
    })

    // Get coin historical data
    const url_history = 'https://api.coingecko.com/api/v3/coins/' + coinId.toLowerCase() + '/market_chart?vs_currency=usd&days=365&x_cg_demo_api_key=' + apiKey;
    $.get(url_history, function (data) {
      let xDate = data['prices'].map(val => convertTimestampToISO(val[0]));
      let yPrices = data['prices'].map(val => val[1]);
      let yMarketCap = data['market_caps'].map(val => val[1]);
      let yMarketVol = data['total_volumes'].map(val => val[1]);

      // Prepare the plotly data
      let trace1 = {
        x: xDate,
        y: yPrices,
        type: 'scatter',
        mode: 'lines',
        line: {
          color: '#d63031',
          width: 2
        },
      };
      let trace2 = {
        x: xDate,
        y: yMarketCap,
        type: 'scatter',
        mode: 'lines',
        line: {
          color: 'blue',
          width: 2
        },
      };
      let trace3 = {
        x: xDate,
        y: yMarketVol,
        type: 'scatter',
        mode: 'lines',
        line: {
          color: 'green',
          width: 2
        },
      };

      let layout1 = {
        title: {
          text: coinId.charAt(0).toUpperCase() + coinId.slice(1) + ' Price History',
        },
        xaxis: { 
          title: {
            text: 'Date'
          },
        },
        yaxis: { 
          title: {
            text: 'Price (USD)',
          },
        },
        plot_bgcolor: '#FFFFF0',
        paper_bgcolor: '#FFFFF0',
        margin: {l: 60, r: 30, t: 70, b: 60}
      };

      let layout2 = {
        title: {
          text: coinId.charAt(0).toUpperCase() + coinId.slice(1) + ' Market Cap History',
        },
        xaxis: { 
          title: {
            text: 'Date',
          },
        },
        yaxis: { 
          title: {
            text: 'Market Cap (USD)',
          },
        },
        plot_bgcolor: '#FFFFF0',
        paper_bgcolor: '#FFFFF0',
        margin: {l: 60, r: 30, t: 70, b: 60}
      };

      let layout3 = {
        title: {
          text: coinId.charAt(0).toUpperCase() + coinId.slice(1) + ' Total Volume',
        },
        xaxis: { 
          title: {
            text: 'Date',
          },
        },
        yaxis: { 
          title: {
            text: '24hr Total Volume (USD)',
          },
        },
        plot_bgcolor: '#FFFFF0',
        paper_bgcolor: '#FFFFF0',
        margin: {l: 60, r: 30, t: 70, b: 60}
      };

      // Plot the graph
      Plotly.newPlot('priceHistoryChart', [trace1], layout1);
      Plotly.newPlot('marketCapHistoryChart', [trace2], layout2);
      Plotly.newPlot('marketVolHistoryChart', [trace3], layout3);
    })
    .fail(function() {
      console.error('Error fetching coin data.');
    })
  };
  plotCharts();
  $('#submitCoinBtn').click(plotCharts);
  //setInterval(plotCharts, 120000)
});
