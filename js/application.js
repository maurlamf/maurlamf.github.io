/*// Some general UI pack related JS
// Extend JS String with repeat method
String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
};

(function($) {

  // Add segments to a slider
  $.fn.addSliderSegments = function (amount) {
    return this.each(function () {
      var segmentGap = 100 / (amount - 1) + "%"
        , segment = "<div class='ui-slider-segment' style='margin-left: " + segmentGap + ";'></div>";
      $(this).prepend(segment.repeat(amount - 2));
    });
  };

  $(function() {
  
    // Todo list
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
    });

    // Custom Selects
    $("select[name='huge']").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='herolist']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='info']").selectpicker({style: 'btn-info'});

    // Tooltips
    $("[data-toggle=tooltip]").tooltip("show");

    // Tags Input
    $(".tagsinput").tagsInput();

    // jQuery UI Sliders
    var $slider = $("#slider");
    if ($slider.length) {
      $slider.slider({
        min: 1,
        max: 5,
        value: 2,
        orientation: "horizontal",
        range: "min"
      }).addSliderSegments($slider.slider("option").max);
    }

    // Placeholders for input/textarea
    $("input, textarea").placeholder();

    // Make pagination demo work
    $(".pagination a").on('click', function() {
      $(this).parent().siblings("li").removeClass("active").end().addClass("active");
    });

    $(".btn-group a").on('click', function() {
      $(this).siblings().removeClass("active").end().addClass("active");
    });

    // Disable link clicks to prevent page scrolling
    $('a[href="#fakelink"]').on('click', function (e) {
      e.preventDefault();
    });

    // Switch
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
    
  });
*/
})(jQuery);

$(function(){
  var columns = 5,
      setColumns = function() { columns = $(window).width() > 840 ? 5 : $(window).width() > 640 ? 3 : 2; };

  setColumns();
  $(window).resize(setColumns);

  var $container = $('#posts');

  $container.imagesLoaded( function(){
    $container.masonry({
      itemSelector: '.post',
      columnWidth: function(containerWidth) {
        return containerWidth / columns;
      }
    });
  });

  $container.infinitescroll({
    loading: {
      finished: undefined,
      finishedMsg: "No more films :-(",
      msg: null,
      msgText: "<em>Loading more films...",
      selector: null,
      speed: 'fast',
      start: undefined
    },
    navSelector: '#pagination',    // selector for the paged navigation
    nextSelector: '#older-link a',  // selector for the NEXT link (to page 2)
    itemSelector: '.post',     // selector for all items you'll retrieve
    bufferPx: 225,
    loadingImg: '',
    debug: false,
    errorCallback: function() {
      // fade out the error message after 2 seconds
      $('#infscr-loading').animate({opacity: .8},2000).fadeOut('normal');
    }
  },

  // call Masonry as a callback
  function( newElements ) {
    var $newElems = $(newElements);
    $(newElements).hide();

    // ensure that images load before adding to masonry layout
    $newElems.imagesLoaded(function(){
      $container.masonry('appended', $newElems, true);
    });

    setTimeout(function(){
      $(newElements).fadeIn('slow');
    },500);
  });
});
