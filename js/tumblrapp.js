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
