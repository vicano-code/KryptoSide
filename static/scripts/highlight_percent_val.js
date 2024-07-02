$(document).ready(() => {
  percent_value = parseFloat($(".highlight").text());
  console.log(percent_value);
  for (let i=0; i<30; i++)
  if ( percent_value < 0) {
    $('.highlight').css('color', 'red');
  } else {
    $('.highlight').css('color', 'green');
  }
})