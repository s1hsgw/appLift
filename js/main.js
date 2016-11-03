(function() {

  var animatingSvg = Snap('#animated-svg'),
    applift = animatingSvg.select('#applift'),
    leftEye = animatingSvg.select('#left-eye'),
    rightEye = animatingSvg.select('#right-eye'),
    mouse = animatingSvg.select('#mouse'),
    backBase = animatingSvg.select('#back-base'),
    backBar = animatingSvg.select('#back-bar'),
    seatBase = animatingSvg.select('#seat-base'),
    seatBottom = animatingSvg.select('#seat-bottom'),
    cylinderBase = animatingSvg.select('#cylinder-base'),
    cylinderBottom = animatingSvg.select('#cylinder-bottom'),
    floor = animatingSvg.select('#floor');

  var startBtn = document.querySelector('#start');
  var upliftBtn = document.querySelector('#uplift');
  var downshiftBtn = document.querySelector('#downshift');
  var updownBtn = document.querySelector('#updown');

  startBtn.addEventListener('click', function() {
    animateFloor();
    $('#animated-svg').addClass('lv0');
  });

  upliftBtn.addEventListener('click', function() {
    uplift();
    $('#animated-svg').removeClass('lv0');
    $('#animated-svg').addClass('lv3');
  });

  downshiftBtn.addEventListener('click', function() {
    downshift();
    $('#animated-svg').removeClass('lv3');
    $('#animated-svg').addClass('lv0');
  });


  function animateFloor() {
    setTimeout(function() {
      floor.animate({
        'x2': floor.attr('data-x')
      }, 400, mina.easeinout, animateCylinder);
    }, 400);
  }

  function animateCylinder() {
    setTimeout(function() {
      cylinderBottom.animate({
        'height': cylinderBottom.attr('data-height')
      }, 400, mina.elastic);
    }, 200);

    setTimeout(function() {
      cylinderBase.animate({
        'height': cylinderBase.attr('data-height')
      }, 400, mina.elastic, animateSeat);
    }, 100);
  }

  function animateSeat() {
    seatBase.animate({
      'width': seatBase.attr('data-width')
    }, 300, mina.easeinout);

    seatBottom.animate({
      'x2': seatBottom.attr('data-x')
    }, 300, mina.easeinout, animateBack);
  }

  function animateBack() {
    backBar.animate({
      'height': backBar.attr('data-height')
    }, 800, mina.elastic);
    setTimeout(function() {
      backBase.animate({
        'height': backBase.attr('data-height')
      }, 800, mina.elastic, animateFace);
    }, 200);
  }


  function animateFace() {
    rightEye.animate({
      transform: 's1 1'
    }, 400, mina.easeinout);
    leftEye.animate({
      transform: 's1 1'
    }, 400, mina.easeinout);

    setTimeout(function() {
      mouse.animate({
        transform: 's1 1'
      }, 400, mina.easeinout, function() {
        // $('#animated-svg').addClass('lv1');
      });
    }, 300);
  }



  function uplift() {
    cylinderBase.animate({
      'height': 44
    }, 600, mina.elastic);
    seatBase.animate({
      transform: 'translate(0, -20)'
    }, 600, mina.elastic);
    seatBottom.animate({
      transform: 'translate(0, -20)'
    }, 600, mina.elastic);
    leftEye.animate({
      transform: 'translate(0, -20)'
    }, 600, mina.elastic);
    rightEye.animate({
      transform: 'translate(0, -20)'
    }, 600, mina.elastic);
    mouse.animate({
      transform: 'translate(0, -20)'
    }, 600, mina.elastic);
    backBase.animate({
      transform: 'rotate(180 99 40) translate(0, 20)'
    }, 600, mina.elastic);
    backBar.animate({
      transform: 'rotate(180 98 80) translate(0, 20)'
    }, 600, mina.elastic);
  }

  function downshift() {
    cylinderBase.animate({
      'height': 24
    }, 400, mina.elastic);
    seatBase.animate({
      transform: 'translate(0, 0)'
    }, 600, mina.elastic);
    seatBottom.animate({
      transform: 'translate(0, 0)'
    }, 600, mina.elastic);
    leftEye.animate({
      transform: 'translate(0, 0)'
    }, 600, mina.elastic);
    rightEye.animate({
      transform: 'translate(0, 0)'
    }, 600, mina.elastic);
    mouse.animate({
      transform: 'translate(0, 0)'
    }, 600, mina.elastic);
    backBase.animate({
      transform: 'rotate(180 99 40) translate(0, 0)'
    }, 600, mina.elastic);
    backBar.animate({
      transform: 'rotate(180 98 80) translate(0, 0)'
    }, 600, mina.elastic);

  }


  function showClouds() {
    clouds1.animate({
      transform: 't210 0'
    }, 12000);
    clouds2.animate({
      transform: 't-210 0'
    }, 12000, function() {
      hideClouds();
    });
  }

  function hideClouds() {
    clouds1.animate({
      transform: 't-80 0'
    }, 12000);
    clouds2.animate({
      transform: 't70 0'
    }, 12000, function() {
      showClouds();
    });
  }

}());
