function reorganizeCoinLayout() {
    const width = window.innerWidth;
    if (width <= 768) {
      let $CoinDescTag = $('#coin_desc');
      let $coinChartTag = $('#coinChart');
      if (!$CoinDescTag.parent().is('#coin_stats') || !$coinChartTag.parent().is('#coin_stats')) {
        $CoinDescTag.remove();
        $coinChartTag.remove();
        $('#coin_stats').append($coinChartTag);
        $('#coin_stats').append($CoinDescTag);
      }
    }
}
let resizeTimer;
    $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(reorganizeCoinLayout, 250);
    });
$(window).resize(reorganizeCoinLayout);

// Initial call to set the layout based on the initial window size
$(document).ready(reorganizeCoinLayout);