$(function () {
  // クローンを作成と追加
  const $lastSlide = $(".carousel-list:last").clone(true);
  const $firstSlide = $(".carousel-list:first").clone(true);

  $(".carousel-area").prepend($lastSlide);
  $(".carousel-area").append($firstSlide);

  let width = $('.carousel-list').outerWidth(true);
  let slideArea = width * $('.carousel-list').length;

  // スライドエリアの幅を設定
  $('.carousel-area').css({
    'width': slideArea,
    'left': -width  // クローンライオンの分をずらしてハムスターをセンターに
  });

  let slideCurrent = 1;
  let isAnimating = false;

  function changeslide() {
    if (isAnimating) return;
    isAnimating = true;

    $('.carousel-area').stop().animate({
      left: -(slideCurrent * width)
    }, 400, function () {
      // アニメーション完了後の処理
      if (slideCurrent === $('.carousel-list').length - 1) {
        // 最後のクローン（ハムスター）に到達したら
        $('.carousel-area').css('left', -width);
        slideCurrent = 1;
      } else if (slideCurrent === 0) {
        // 最初のクローン（ライオン）に到達したら
        $('.carousel-area').css('left', -(($('.carousel-list').length - 2) * width));
        slideCurrent = $('.carousel-list').length - 2;
      }
      isAnimating = false;
      updatePagination();
    });
  }

  function updatePagination() {
    let currentPage = slideCurrent - 1;
    if (currentPage === -1) currentPage = $('.carousel-list').length - 3;
    if (currentPage === $('.carousel-list').length - 2) currentPage = 0;

    $('.pagination-circle').removeClass('target');
    $(".pagination-circle:nth-of-type(" + (currentPage + 1) + ")").addClass('target');
  }

  let Timer;
  function startTimer() {
    Timer = setInterval(function () {
      // 次のスライドへ
      if (slideCurrent === $('.carousel-list').length - 2) {
        // 最後のライオンの次は最後のクローン（ハムスター）へ
        slideCurrent++;
      } else if (slideCurrent === $('.carousel-list').length - 1) {
        // 最後のクローンの後は最初のハムスターへ
        slideCurrent = 1;
      } else {
        slideCurrent++;
      }
      changeslide();
    }, 3000);
  }

  function stopTimer() {
    clearInterval(Timer);
  }

  startTimer();

  $('.js-btn-next').click(function () {
    if (isAnimating) return;
    stopTimer();
    if (slideCurrent === $('.carousel-list').length - 2) {
      // 最後のライオンの次は最後のクローン（ハムスター）へ
      slideCurrent++;
    } else if (slideCurrent === $('.carousel-list').length - 1) {
      // 最後のクローンの後は最初のハムスターへ
      slideCurrent = 1;
    } else {
      slideCurrent++;
    }
    changeslide();
    startTimer();
  });

  $('.js-btn-back').click(function () {
    if (isAnimating) return;
    stopTimer();
    slideCurrent--;
    changeslide();
    startTimer();
  });

  $('.carousel').hover(
    function () {
      stopTimer();
    },
    function () {
      startTimer();
    }
  );

  // 初期状態のページネーションを設定
  updatePagination();
});
