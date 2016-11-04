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
    legBase = animatingSvg.select('#leg-base'),
    legBottom = animatingSvg.select('#leg-bottom'),
    legBase2 = animatingSvg.select('#leg-base2'),
    legBottom2 = animatingSvg.select('#leg-bottom2'),
    floor = animatingSvg.select('#floor');

  var isLv3 = false,
      isSwinging = false;


  /* ----------------------------

  Status Test

  ---------------------------- */

  var startBtn = document.querySelector('#start');
  var lv1Btn = document.querySelector('#lv1');
  var lv2Btn = document.querySelector('#lv2');
  var lv3Btn = document.querySelector('#lv3');
  var restartBtn = document.querySelector('#restart');
  var updownBtn = document.querySelector('#updown');

  startBtn.addEventListener('click', function() {
    initAnimation();
  });

  lv1Btn.addEventListener('click', function() {
    animateLv1();
  });

  lv2Btn.addEventListener('click', function() {
    animateLv2();
  });

  lv3Btn.addEventListener('click', function() {
    animateLv3();
  });

  restartBtn.addEventListener('click', function() {
    restart();
  });


  /* ----------------------------

  Init Animation Functions

  ---------------------------- */

  function initAnimation() {
    initFloor();
    $('#animated-svg').addClass('lv0');
  }

  function initFloor() {
    setTimeout(function() {
      floor.animate({
        'x2': floor.attr('data-x')
      }, 400, mina.easeinout, initleg);
    }, 400);
  }

  function initleg() {
    setTimeout(function() {
      legBottom.animate({
        'height': legBottom.attr('data-height')
      }, 400, mina.elastic);
      legBottom2.animate({
        'height': legBottom2.attr('data-height')
      }, 400, mina.elastic);
    }, 200);

    setTimeout(function() {
      legBase.animate({
        'height': legBase.attr('data-height')
      }, 400, mina.elastic, initSeat);
      legBase2.animate({
        'height': legBase2.attr('data-height')
      }, 400, mina.elastic, initSeat);
    }, 100);
  }

  function initSeat() {
    seatBase.animate({
      'width': seatBase.attr('data-width')
    }, 300, mina.easeinout);

    seatBottom.animate({
      'x2': seatBottom.attr('data-x')
    }, 300, mina.easeinout, initBack);
  }

  function initBack() {
    backBar.animate({
      'height': backBar.attr('data-height')
    }, 800, mina.elastic);
    setTimeout(function() {
      backBase.animate({
        'height': backBase.attr('data-height')
      }, 800, mina.elastic, initFace);
    }, 200);
  }

  function initFace() {
    rightEye.animate({
      transform: 's1 1'
    }, 400, mina.easeinout);
    leftEye.animate({
      transform: 's1 1'
    }, 400, mina.easeinout);

    setTimeout(function() {
      mouse.animate({
        transform: 's1 1'
      }, 400, mina.easeinout);
    }, 300);
  }

  /* ----------------------------

  Level Animation Functions

  ---------------------------- */

  function animateLv0() {
    closeMouse();
    $('#animated-svg').removeClass('lv3');
    $('#animated-svg').addClass('lv0');
  }

  function animateLv1() {
    lookRight();
    $('#animated-svg').removeClass('lv0');
    $('#animated-svg').addClass('lv1');
  }

  function animateLv2() {
    openMouse();
    $('#animated-svg').removeClass('lv1');
    $('#animated-svg').addClass('lv2');
  }

  function animateLv3() {
    resetFacePosition();
    $('#animated-svg').removeClass('lv2');
    $('#animated-svg').addClass('lv3');
  }

  function openMouse() {
    mouse.animate({
      'height': 15
    }, 600, mina.elastic);
  }

  function closeMouse() {
    mouse.animate({
      'height': 2
    }, 600, mina.elastic);
  }

  function restart() {
    isLv3 = false;
    animateLv0();
  }

  function uplift() {

    isLv3 = true;

    legBase.animate({
      'height': 29
    }, 75, mina.elastic);
    legBase2.animate({
      'height': 29
    }, 75, mina.elastic);
    seatBase.animate({
      transform: 'translate(0, -15)'
    }, 75, mina.elastic);
    seatBottom.animate({
      transform: 'translate(0, -15)'
    }, 75, mina.elastic);
    leftEye.animate({
      transform: 'translate(0, -15)'
    }, 75, mina.elastic);
    rightEye.animate({
      transform: 'translate(0, -15)'
    }, 75, mina.elastic);
    mouse.animate({
      transform: 'translate(0, -15)'
    }, 75, mina.elastic);
    backBase.animate({
      transform: 'rotate(180 99 40) translate(0, 15)'
    }, 75, mina.elastic);
    backBar.animate({
      transform: 'rotate(180 98 80) translate(0, 15)'
    }, 75, mina.elastic, function() {
      downshift();
    });
  }

  function downshift() {
    legBase.animate({
      'height': 24
    }, 75, mina.elastic);
    legBase2.animate({
      'height': 24
    }, 75, mina.elastic);
    seatBase.animate({
      transform: 'translate(0, 0)'
    }, 75, mina.elastic);
    seatBottom.animate({
      transform: 'translate(0, 0)'
    }, 75, mina.elastic);
    leftEye.animate({
      transform: 'translate(0, 0)'
    }, 75, mina.elastic);
    rightEye.animate({
      transform: 'translate(0, 0)'
    }, 75, mina.elastic);
    mouse.animate({
      transform: 'translate(0, 0)'
    }, 75, mina.elastic);
    backBase.animate({
      transform: 'rotate(180 99 40) translate(0, 0)'
    }, 75, mina.elastic);
    backBar.animate({
      transform: 'rotate(180 98 80) translate(0, 0)'
    }, 75, mina.elastic, function() {
      if (isLv3) uplift();
    });

  }

  function lookRight() {

    isSwinging = true;

    mouse.animate({
      transform: 't4 0'
    }, 1200, mina.easeinout);
    rightEye.animate({
      transform: 't4 0'
    }, 1200, mina.easeinout);
    leftEye.animate({
      transform: 't6 0'
    }, 1200, mina.easeinout, function() {
      lookLeft();
    });
  }

  function lookLeft() {

    mouse.animate({
      transform: 't-3 0'
    }, 1200, mina.easeinout);
    rightEye.animate({
      transform: 't-5 0'
    }, 1200, mina.easeinout);
    leftEye.animate({
      transform: 't-3 0'
    }, 1200, mina.easeinout, function() {
      if (isSwinging) lookRight();
    });
  }

  function resetFacePosition() {

    isSwinging = false;

    mouse.animate({
      transform: 't0 0'
    }, 600, mina.easeinout);
    rightEye.animate({
      transform: 't0 0'
    }, 600, mina.easeinout);
    leftEye.animate({
      transform: 't0 0'
    }, 600, mina.easeinout, function() {
      uplift();
    });
  }


}());
