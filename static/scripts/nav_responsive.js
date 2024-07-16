function responsiveNavbar() {
  $(document).ready(() => {
    const width = window.innerWidth;
    if (width <= 768) {
      $('#nav-icon').css({
        'display': 'block',
        'margin-right': '20px'
      });
      $('nav').hide();

      $('#nav-icon').click(() => {
        const navOpenClass = 'nav-open';
        const navCloseClass = 'nav-close';
        const navIcon = $('#nav-icon');
        const nav = $('nav');
        const isOpen = navIcon.hasClass(navOpenClass);

        navIcon.attr('src', isOpen ? '../static/images/nav_close.png' : '../static/images/nav_open.png')
          .toggleClass(navOpenClass, !isOpen)
          .toggleClass(navCloseClass, isOpen);

        $('header').css({
          'height': isOpen ? 'auto' : '',
          'align-items': isOpen ? 'start' : '',
          'padding-top': isOpen ? '20px' : ''
        });

        nav.css({
          'display': isOpen ? 'flex' : 'none',
          'flex-direction': 'column',
          'align-items': 'center',
          'justify-content': 'start',
          'margin-top': '30px',
          'margin-bottom': '20px'
        });

        $('#contact').css({
          'margin-left': '0',
          'margin-right': '0',
          'background-color': 'white',
          'color': 'black',
          'padding-left': '0'
        });
      });
    }
  });
}
responsiveNavbar();