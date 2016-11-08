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
    leftLegBase = animatingSvg.select('#left-leg-base'),
    leftLegBottom = animatingSvg.select('#left-leg-bottom'),
    rightLegBase = animatingSvg.select('#right-leg-base'),
    rightLegBottom = animatingSvg.select('#right-leg-bottom'),
    floor = animatingSvg.select('#floor');

  var isLv3 = false,
    isSwinging = false;

  createCommentBox();


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

  // restartBtn.addEventListener('click', function() {
  //   restart();
  // });


  /* ----------------------------

  Date Function

  ---------------------------- */

  document.getElementById("date").innerHTML = getNow();

  function getNow() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth() + 1; //１を足すこと
    var day = now.getDate();

    var s = year + "/" + mon + "/" + day;

    return s;
  }

  /* ----------------------------

  Init Animation Functions

  ---------------------------- */

  function initAnimation() {
    initFloor();
    $('#animated-svg').addClass('lv0');
    $('#start').fadeOut(1000, function() {
      $('#restart').fadeIn(2000).removeClass('hidden').css('display', 'inline-block');
    });
  }

  function initFloor() {
    setTimeout(function() {
      floor.animate({
        'x2': floor.attr('data-x')
      }, 400, mina.easeinout, initLeg);
    }, 400);
  }

  function initLeg() {
    setTimeout(function() {
      leftLegBottom.animate({
        'height': leftLegBottom.attr('data-height')
      }, 400, mina.elastic);
      rightLegBottom.animate({
        'height': rightLegBottom.attr('data-height')
      }, 400, mina.elastic);
    }, 200);

    setTimeout(function() {
      leftLegBase.animate({
        'height': leftLegBase.attr('data-height')
      }, 400, mina.elastic, initSeat);
      rightLegBase.animate({
        'height': rightLegBase.attr('data-height')
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
    tiltRight();
    $('#animated-svg').removeClass('lv1');
    $('#animated-svg').addClass('lv2');
  }

  function animateLv3() {
    resetFacePosition();
    resetSeatPosition();
    console.log(isSwinging);
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

    leftLegBase.animate({
      'height': 29
    }, 75, mina.elastic);
    rightLegBase.animate({
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
    leftLegBase.animate({
      'height': 24
    }, 75, mina.elastic);
    rightLegBase.animate({
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

  function tiltLeft() {

    seatBase.animate({
      transform: 'r-2 98 141'
  }, 400, mina.easeinout);
    seatBottom.animate({
      transform: 'r-2 124 147'
  }, 400, mina.easeinout, tiltRight);
  }

  function tiltRight() {

    seatBase.animate({
      transform: 'r2 98 141'
  }, 400, mina.easeinout);
    seatBottom.animate({
      transform: 'r2 124 147'
  }, 400, mina.easeinout, function() {
      if (isSwinging) tiltLeft();
    });
  }

  function resetSeatPosition() {

    seatBase.animate({
      transform: 'r0 98 141'
    }, 400, mina.easeinout);
    seatBottom.animate({
      transform: 'r0 124 147'
    }, 400, mina.easeinout);
  }


  /* ----------------------------

  Modal Animation Functions

  ---------------------------- */


  //trigger the animation - open modal window
  $('[data-type="modal-trigger"]').on('click', function() {
    var actionBtn = $(this),
      scaleValue = retrieveScale(actionBtn.next('.modal-bg'));

    actionBtn.addClass('to-circle');
    actionBtn.next('.modal-bg').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      animateLayer(actionBtn.next('.modal-bg'), scaleValue, true);
    });

    //if browser doesn't support transitions...
    if (actionBtn.parents('.no-csstransitions').length > 0) animateLayer(actionBtn.next('.modal-bg'), scaleValue, true);
  });

  //trigger the animation - close modal window
  // $('.modal-section .modal-close').on('click', function() {
  //   closeModal();
  // });

  $(window).on('resize', function() {
    //on window resize - update cover layer dimention and position
    if ($('.modal-section.modal-is-visible').length > 0) window.requestAnimationFrame(updateLayer);
  });

  function retrieveScale(btn) {
    var btnRadius = btn.width() / 2,
      left = btn.offset().left + btnRadius,
      top = btn.offset().top + btnRadius - $(window).scrollTop(),
      scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());

    btn.css('position', 'fixed').velocity({
      top: top - btnRadius,
      left: left - btnRadius,
      translateX: 0,
    }, 0);

    return scale;
  }

  function scaleValue(topValue, leftValue, radiusValue, windowW, windowH) {
    var maxDistHor = (leftValue > windowW / 2) ? leftValue : (windowW - leftValue),
      maxDistVert = (topValue > windowH / 2) ? topValue : (windowH - topValue);
    return Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / radiusValue);
  }

  function animateLayer(layer, scaleVal, bool) {
    layer.velocity({
      scale: scaleVal
    }, 400, function() {
      $('body').toggleClass('overflow-hidden', bool);
      (bool) ?
      layer.parents('.modal-section').addClass('modal-is-visible').end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'): layer.removeClass('is-visible').removeAttr('style').siblings('[data-type="modal-trigger"]').removeClass('to-circle');
    });
  }

  function updateLayer() {
    var layer = $('.modal-section.modal-is-visible').find('.modal-bg'),
      layerRadius = layer.width() / 2,
      layerTop = layer.siblings('.btn').offset().top + layerRadius - $(window).scrollTop(),
      layerLeft = layer.siblings('.btn').offset().left + layerRadius,
      scale = scaleValue(layerTop, layerLeft, layerRadius, $(window).height(), $(window).width());

    layer.velocity({
      top: layerTop - layerRadius,
      left: layerLeft - layerRadius,
      scale: scale,
    }, 0);
  }

  function closeModal() {
    var section = $('.modal-section.modal-is-visible');
    section.removeClass('modal-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      animateLayer(section.find('.modal-bg'), 1, false);
    });
    //if browser doesn't support transitions...
    if (section.parents('.no-csstransitions').length > 0) animateLayer(section.find('.modal-bg'), 1, false);
  }

  /* ----------------------------

  Tag & Comment Functions

  ---------------------------- */

  $("#submit").click(
    function() {
      storeComment();
      closeCommentModal();
    });


  function closeCommentModal() {

    //ここでサーバーにイスを下げる命令を投げる

    closeModal();

    setTimeout(function() {
      restart();
    }, 1200);

  }

  function storeComment() {
    var key;
    var time = gettime();
    for (var i = 0, len = localStorage.length; i < len; i++) {
      key = i + 1;
    }
    var text = $("#comment");
    var tag = $("#tag");

    localStorage.setItem(key, tag.val() + ":" + text.val() + time);

    // テキストボックスを空にす
    text.val("");
    tag.val("");
  }

  function createCommentBox() {
    var cb = $("#CB");
    var html = [];
    var key;
    for (var i = 0, len = localStorage.length; i < len; i++) {
      key = localStorage.key(i);
      if (key.match(/[^0-9]+$/)) {
        value = localStorage.getItem(key);
        console.log(value + key);
        html.push($('<p><input type="checkbox" id="tag" name="tag" value="' + value + '">' + value + '</p>'));
      }
    }
    cb.append(html);
  }

  function gettime() {
    var hiduke = new Date();
    var month = hiduke.getMonth() + 1;
    var day = hiduke.getDate();
    return (month + "月" + day + "日");
  }

  /* ----------------------------

  for iOS Safari Full Screen Mode

  ---------------------------- */

  var anchor = $('a');
  anchor.each(function() {
    var url = $(this).attr('href');
    $(this).removeAttr('href');
    $(this).click(function(e) {
      e.preventDefault();
      location.href = url;
    });
  });

}());
