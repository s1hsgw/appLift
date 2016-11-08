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

  init();

  function init() {
    createCommentBox();
    document.getElementById("date").innerHTML = getNow();
  }


  /* ----------------------------

  Status Test

  ---------------------------- */

  var startBtn = document.querySelector('#start');
  var lv1Btn = document.querySelector('#lv1');
  var lv2Btn = document.querySelector('#lv2');
  var lv3Btn = document.querySelector('#lv3');

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


  /* ----------------------------

  Date Function

  ---------------------------- */

  //今日の日付を取得
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
    $('#start').fadeOut(1000);
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

  function animateReset() {
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
    resetFacePosition();
    tiltRight();
    $('#animated-svg').removeClass('lv1');
    $('#animated-svg').addClass('lv2');
  }

  function animateLv3() {
    resetSeatPosition();
    $('#animated-svg').removeClass('lv2');
    $('#animated-svg').addClass('lv3');
    $('#restart').fadeIn(2000).removeClass('hidden').css('display', 'inline-block');
  }

  function restart() {
    isLv3 = false;
    animateReset();
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

    mouse.animate({
      transform: 't0 0'
    }, 600, mina.easeinout);
    rightEye.animate({
      transform: 't0 0'
    }, 600, mina.easeinout);
    leftEye.animate({
      transform: 't0 0'
    }, 600, mina.easeinout, function() {
      openMouse();
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

    isSwinging = false;

    seatBase.animate({
      transform: 'r0 98 141'
    }, 400, mina.easeinout);
    seatBottom.animate({
      transform: 'r0 124 147'
    }, 400, mina.easeinout, uplift);
  }


  /* ----------------------------

  Modal Animation

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
  $('.modal-section .modal-close').on('click', function() {
    closeModal();
  });

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

  Tag & Comment

  ---------------------------- */

  $("#save").click(
    function() {
      storeComment();
      closeCommentModal();
    });

  //タグをひとつしか選択できないようにする
  $('.tag').on('click', function() {
    if ($(this).prop('checked')) {
      // 一旦全てをクリアして再チェックする
      $('.tag').prop('checked', false);
      $(this).prop('checked', true);
    }
  });

  function createCommentBox() {
    var cb = $("#CB");
    var html = [];
    var key;
    for (var i = 0, len = localStorage.length; i < len; i++) {
      key = localStorage.key(i);
      if (key.match(/[^0-9]+$/)) {
        value = localStorage.getItem(key);
        console.log(value + key);
        html.push($('<p><input type="checkbox" class="tag" value="' + value + '">' + value + '</p>'));
      }
    }
    cb.append(html);
  }

  function storeComment() {
    var key;
    var time = getTime();
    for (var i = 0, len = localStorage.length; i < len; i++) {
      key = i + 1;
    }
    var tag;
    var text = $("#comment");

    //チェックされているタグを取得
    $('.tag').each(function() {
      if ($(this).prop('checked')) {
        tag = $(this);
      }
    });

    console.log('tag', tag.val());
    console.log('text', text.val());

    localStorage.setItem(key, tag.val() + ":" + text.val() + time);

    // テキストボックスを空にす
    text.val("");
    tag.val("");
  }

  function closeCommentModal() {

    //ここでサーバーにイスを下げる命令を投げる

    //モーダルが閉じてからイスが落ち着く
    closeModal();

    setTimeout(function() {
      restart();
    }, 1200);

  }

  function getTime() {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    return (month + "月" + day + "日");
  }

  /* ----------------------------

  prevent links opening Safari in iOS

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
