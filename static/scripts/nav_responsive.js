function responsiveNavbar() {
  $(document).ready(() => {
    const width = window.innerWidth;
    if (width <= 768) {
      $('#nav-icon').css('display', 'block');
      $('#nav-icon').css('margin-right', '20px');
      $('nav').css('display', 'none');

      $('#nav-icon').click(() => {
        event.preventDefault();
        const givenClass = 'nav-open';
        let imgClass = $('#nav-icon').attr('class');
        if (imgClass === givenClass) {
          $('#nav-icon').attr('src', 'static/images/nav_close.png');
          $('#nav-icon').attr('class', 'nav-close');
          $('header').css('height', 'auto');
          $('header').css('align-items', 'start');
          $('header').css('padding-top', '20px');
          $('nav').css('display', 'flex');
          $('nav').css('flex-direction', 'column');
          $('nav').css('align-items', 'center');
          $('nav').css('justify-content', 'start');
          $('nav').css('margin-top', '30px');
          $('nav').css('margin-bottom', '20px');
          $('#contact').css('margin-left', '0');
          $('#contact').css('margin-right', '0');
          $('#contact').css('background-color', 'white');
          $('#contact').css('color', 'black');
          $('#contact').css('padding-left', '0');
        } else {
          $('#nav-icon').attr('class', 'nav-open');
          $('nav').css('display', 'none');
          $('#nav-icon').attr('src', 'static/images/nav_open.png');
        }
        
      })
    }
  })
}
responsiveNavbar();