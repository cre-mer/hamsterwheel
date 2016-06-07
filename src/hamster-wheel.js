/*
 * 
 * 
 *
 * Copyright (c) 2016 Polar Notion
 * Licensed under the MIT license.
 */
(function ($) {
  $.fn.hamsterWheel = function(options) {
    'use strict';

    var debounce = function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate){ func.apply(context, args); }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) { func.apply(context, args); }
      };
    };

    //create all the things
    var $div          = $(this),
        $section      = $div.children().first(),
        sectionHeight = $section.height(),
        height        = $div.outerHeight(true),
        offset        = $div.offset(),
        lastScrollTop = 0,
        windowHeight  = window.innerHeight,
        divBottom     = Math.round(height + offset.top - window.innerHeight),
        scrollSpeed   = settings.scrollSpeed,
        settings      = $.extend({}, $.fn.hamsterWheel.defaults, options),
        scrollTimer;

    var updateHamsterNumbers = debounce(function(){
        setHeight();
      }, 300);
  

    function cloneSections(num) {  
      for (var i = 0; i < num; i++) {
        $section.clone().appendTo($div);
      }
    }

    function setHeight() {
      height = $div.outerHeight(true);
      offset = $div.offset();
      divBottom = Math.round(height + offset.top - windowHeight);
    }

    if ( settings.scrollbar === false ) {
      $('body').append('<style>::-webkit-scrollbar{display:none;}</style>');
    }

    if ( settings.autoscroll ) {

      // move timeout call somewhere else maybe? timeout is blowing the stack
      var scrollDown = function() {
        window.scrollBy(0,1);
        scrollTimer = setTimeout(scrollDown, scrollSpeed);
      };

      var scrollUp = function() {
        window.scrollBy(0,-1);
        scrollTimer = setTimeout(scrollUp, scrollSpeed);
      };

    }

    if (settings.infinite) {


      $(window).scroll(function() {


        var st = $(this).scrollTop();

        // skip to top or bottom of the page
        if ( st > lastScrollTop && st >= divBottom) {
          //scrolling down
          $(document).scrollTop(offset.top + sectionHeight - windowHeight );
        } else if ( st < lastScrollTop && st <= offset.top ) {
          //scrolling upgit 
          $(document).scrollTop(divBottom - sectionHeight + windowHeight);
        }

        var delta = settings.scrollDelta;
        // If you scroll fast enough, change scroll direction
        if( Math.abs(lastScrollTop - st) >= delta &&  Math.abs(lastScrollTop - st) < 200 && settings.autoscroll === true ) {  

          if ( st > lastScrollTop ) {
            //scrolling down
            clearTimeout(scrollTimer);
            scrollDown();
          } else if ( st < lastScrollTop ) {
            //scrolling up
            clearTimeout(scrollTimer);
            scrollUp();
          } else {
            return false;
          }
        }

        lastScrollTop = st;
      });
    }

    function init(sectionNumber) {
      cloneSections(sectionNumber);
      if( settings.infinite   ){  setHeight();  }
      if( settings.autoscroll ){  scrollDown(); }
    }

    init(settings.clones);

    window.addEventListener("resize", updateHamsterNumbers, false);

    return this;
  };

  $.fn.hamsterWheel.defaults = {
    autoscroll: true,
    infinite: true,
    scrollSpeed: 20,
    scrollDelta: 30,
    clones: 6,
    scrollbar: false
  };

}(jQuery));
