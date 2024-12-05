$(function () {
   let width = $('.carousel-list').outerWidth(true); 
  let length = $('.carousel-list').length; 
  let slideArea = width * length; 
  $('.carousel-area').css('width', slideArea); 

  
  let slideCurrent = 0; 
  let lastCurrent = $('.carousel-list').length - 1;


  
  function changeslide() {
    $('.carousel-area').stop().animate({ 
      left: slideCurrent * -width
    });

   
    let pagiNation = slideCurrent + 1;
    $('.pagination-circle').removeClass('target'); 
    $(".pagination-circle:nth-of-type(" + pagiNation + ")").addClass('target'); 
  };




  function startTimer() {
   
    Timer = setInterval(function () { 
      if (slideCurrent === lastCurrent) {
        slideCurrent = 0;
        changeslide(); 
      } else {
        slideCurrent++;
        changeslide(); 
      };
    }, 3000); 
  }

 
  function stopTimer() {
    clearInterval(Timer); 
  }
 
  startTimer();




  
  $('.js-btn-next').click(function () {
   
    stopTimer();
    startTimer();
    if (slideCurrent === lastCurrent) { 
      slideCurrent = 0;
      changeslide(); 
    } else {
      slideCurrent++;
      changeslide(); 
    };
  });

 
  $('.js-btn-back').click(function () {
    
    stopTimer();
    startTimer();
    if (slideCurrent === 0) {
      slideCurrent = lastCurrent;
      changeslide();
    } else {
      slideCurrent--;
      changeslide(); 
    };
  });
});