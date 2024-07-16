function reorganizeCoinLayout() {
    const width = window.innerWidth;
    if (width <= 768) {
      let $coinDescTag = $('#coin_desc');
      let $coinChartTag = $('#coinChart');
      if (!$coinDescTag.parent().is('#coin_stats') || !$coinChartTag.parent().is('#coin_stats')) {
        $coinDescTag.remove();
        $coinChartTag.remove();
        $('#coin_stats').append($coinChartTag);
        $('#coin_stats').append($coinDescTag);
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