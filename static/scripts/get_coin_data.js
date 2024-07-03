//$(document).ready(() => {
  //setInterval()
  function plotCharts() {
    event.preventDefault();
    let coinId = $('#crypto').val();
    
    // Get coin description
    const url_coin_desc = 'https://api.coingecko.com/api/v3/coins/' + coinId.toLowerCase() + '?x_cg_demo_api_key=' + apiKey;
    $.get(url_coin_desc, function (data1) {
      let formatInt = 
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
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
      $('#website').html(data1.links.homepage[0]);
      $('#coinDescription').html(data1.description['en']);
    });
    
    // Get and plot OHLC data
    const url_ohlc = 'https://api.coingecko.com/api/v3/coins/' + coinId.toLowerCase() + '/ohlc?days=365&vs_currency=usd&x_cg_demo_api_key=' + apiKey;
    $.get(url_ohlc, function (data2) {
      let xDate = data2.map(val => {
        let myDate = new Date(val[0])
        let month = ('0' + (myDate.getMonth() + 1)).slice(-2);
        let day = ('0' + myDate.getDate()).slice(-2);
        return (day + ',' + month)
      });
      let yOpen = data2.map(val => val[1]);
      let yHigh = data2.map(val => val[2]);
      let yLow = data2.map(val => val[3]);
      let yClose = data2.map(val => val[4]);

      let fig = PlotlyFinance.createCandlestick({
        open: yOpen,
        high: yHigh,
        low: yLow,
        close: yClose,
        dates: xDate
      }); 
      fig.layout.plot_bgcolor = '#ADA996';
      fig.layout.paper_bgcolor = '#243B55';

      // Plot the candlestick chart
      Plotly.newPlot('candlestickChart', fig.data, fig.layout);
    })
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
          text: coinId + ' Price History',
          font: {
            color: 'white',
          }
        },
        xaxis: { 
          title: {
            text: 'Date',
            font: { color: 'white' }
          },
          tickfont: { color: 'white'}
        },
        yaxis: { 
          title: {
            text: 'Price (USD)',
            font: { color: 'white' }
          },
          tickfont: { color: 'white'}
        },
        plot_bgcolor: '#ADA996',
        paper_bgcolor: '#243B55',
      };

      let layout2 = {
        title: {
          text: coinId + ' Market Cap History',
          font: {
            color: 'white',
          }
        },
        xaxis: { 
          title: {
            text: 'Date',
            font: { color: 'white' }
          },
          tickfont: { color: 'white'}
        },
        yaxis: { 
          title: {
            text: 'Market Cap (USD)',
            font: { color: 'white' }
          },
          tickfont: { color: 'white'}
        },
        plot_bgcolor: '#ADA996',
        paper_bgcolor: '#243B55',
      };

      let layout3 = {
        title: {
          text: coinId + ' Total Volume',
          font: {
            color: 'white',
          }
        },
        xaxis: { 
          title: {
            text: 'Date',
            font: { color: 'white' }
          },
          tickfont: { color: 'white'}
        },
        yaxis: { 
          title: {
            text: '24hr Total Volume (USD)',
            font: { color: 'white' }
          },
          tickfont: { color: 'white'}
        },
        plot_bgcolor: '#ADA996',
        paper_bgcolor: '#243B55',
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
//});
$(document).ready(plotCharts);
$('#submitCoinBtn').click(plotCharts);