function particles() {

  var options = {
    particleColor: '#4df',
    background: './img/cover.png',
    interactive: false,
    speed: 'low',
    density: 'low'
  }

  var particleCanvas = new ParticleNetwork(document.getElementById('particle-canvas'), options)

}

$(document).ready(function () {
  var s = $(".header")
  var pos = s.position()
  $(window).scroll(function () {
    var windowpos = $(window).scrollTop()

    if (windowpos >= 100) {
      s.addClass("stick")
    } else {
      s.removeClass("stick")
    }
  })

  particles();

  if ($('.menuContainer').css('display') === 'block') {

    $('.menuContainer').addClass('original').clone().insertAfter('.menuContainer').addClass('cloned').css('position', 'fixed').css('top', '0').css('margin-top', '0').css('z-index', '2').removeClass('original').hide();

    scrollIntervalID = setInterval(stickIt, 10)


    function stickIt() {

      var orgElementPos = $('.original').offset();
      orgElementTop = orgElementPos.top;

      if ($(window).scrollTop() >= (orgElementTop)) {
        // scrolled past the original position; now only show the cloned, sticky element.

        // Cloned element should always have same left position and width as original element.
        orgElement = $('.original');
        coordsOrgElement = orgElement.offset();
        leftOrgElement = coordsOrgElement.left;
        widthOrgElement = orgElement.css('width');
        $('.cloned').css('left', leftOrgElement + 'px').css('top', 0).css('width', widthOrgElement).show();
        $('.original').css('visibility', 'hidden');
      } else {
        // not scrolled past the menu; only show the original menu.
        $('.cloned').hide();
        $('.original').css('visibility', 'visible');
      }
    }

  }
})


function goto(where) {

  var o = $('#' + where).offset().top
  $(window).scrollTop(o - 50)

}
