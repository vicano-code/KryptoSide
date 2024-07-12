// Reorganize home html layout for responsive view
function reorganizeHomeLayout() {
  $(document).ready(() => {
    const width = window.innerWidth;
    if (width <= 768) {
      $('#market_info').css('flex-direction', 'column');
      $('#market_info').css('gap', '20px');
      $('#market_info').append($('#market_info div h2'));
      $('#market_info').append($('#market_info img'));
      $('#market_info').append($('#market_info div'));
      $('#features').css('padding-left','10px');
      $('#features').css('padding-right','10px');

      $('#coin_info').css('flex-direction', 'column');
      $('#coin_info').append($('#coin_info div h2'));
      $('#coin_info').append($('#coin_info img'));
      $('#coin_info').append($('#coin_info div'));
      $('#features').css('padding-left','10px');
      $('#features').css('padding-right','10px');

      $('#general_info').css('flex-direction', 'column');
      $('#general_info').append($('#general_info div h2'));
      $('#general_info').append($('#general_info img'));
      $('#general_info').append($('#general_info div'));
      $('#features').css('padding-left','20px');
      $('#features').css('padding-right','20px');
      // resize feature images
      $('.feature img').css('max-width', '100%');
      $('.feature img').css('max-height', '35em');
      $('.feature img').css('margin-top', '20px');
      $('.feature img').css('margin-bottom', '10px');
      // format about section
      $('#about').css('padding-left','20px');
      $('#about').css('padding-right','20px');
    }
  });
}

$(window).resize(reorganizeHomeLayout);

// Initial call to set the layout based on the initial window size
reorganizeHomeLayout();