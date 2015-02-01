/*jslint browser: true, sloppy: true, white: true, nomen: true, plusplus:true, maxerr: 50, indent: 2 */
/*global jQuery:false, iScroll:false */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
undef:true, curly:true, browser:true, jquery:true, indent:2, maxerr:50,
white:false, nomen:false */

//-------------------------------------------------------
// Pull-Up and Pull-Down callbacks for "Pull" page
//-------------------------------------------------------
(function pullPagePullImplementation($) {
  "use strict";
  var pullDownGeneratedCount = 0,
  pullUpGeneratedCount = 0,
  listSelector = "div.hrwapper div.blog-data ul.ui-listview",
  lastItemSelector = listSelector + " > li:last-child";
  var page=2;
  /* For this example, I prepend three rows to the list with the pull-down, and append
  * 3 rows to the list with the pull-up. This is only to make a clear illustration that the
  * action has been performed. A pull-down or pull-up might prepend, append, replace or modify
  * the list in some other way, modify some other page content, or may not change the page
  * at all. It just performs whatever action you'd like to perform when the gesture has been
  * completed by the user.
  */
  function gotPullDownData(event, data) {
    var i, newContent = "";
    pullDownGeneratedCount++;
    // for (i=0; i<3; i+=1) {
    if (page > 1){
    newContent = app.blog(--page);
    // for (i=0; i<12; i+=1) {  // Generate some fake new content
    //   newContent = "<li>" + newContent + "</li>";
    // }

  }
  $(listSelector).prepend(newContent).listview("refresh");  // Prepend new content and refresh listview
       
        $('#all-posts').listview('refresh');
            
      $("ul:jqmData(role='listview')").listview("refresh");
  data.iscrollview.refresh();    // Refresh the iscrollview
  }

  function gotPullUpData(event, data) {
       $('#all-posts').listview('refresh');
           $("ul:jqmData(role='listview')").listview("refresh");
      // localStorage.removeItem('postData');
    var i,
    iscrollview = data.iscrollview, newContent="";
    if (pullDownGeneratedCount === 0) app.blog(1);
    else {
    newContent = app.blog(++page);
    }
    // for (i=0; i<3; i+=1) {
    //   newContent += "<li>Pullup-generated row " + (++pullUpGeneratedCount) + "</li>";
    // }
   // $(listSelector).append(newContent).listview("refresh");
  }
       
    // The refresh is a bit different for the pull-up, because I want to demonstrate the use
    // of refresh() callbacks. The refresh() function has optional pre and post-refresh callbacks.
    // Here, I use a post-refresh callback to do a timed scroll to the bottom of the list
    // after the new elements are added. The scroller will smoothly scroll to the bottom over
    // a 400mSec period. It's important to use the refresh() callback to insure that the scroll
    // isn't started until the scroller has first been refreshed.
//    iscrollview.refresh(null, null,
//      $.proxy(function afterRefreshCallback(iscrollview) {
//        this.scrollToElement(lastItemSelector, 100);
//      }, iscrollview) );
//    }

    // This is the callback that is called when the user has completed the pull-down gesture.
    // Your code should initiate retrieving data from a server, local database, etc.
    // Typically, you will call some function like jQuery.ajax() that will make a callback
    // once data has been retrieved.
    //
    // For demo, we just use timeout to simulate the time required to complete the operation.
    function onPullDown (event, data) {
      setTimeout(function fakeRetrieveDataTimeout() {
        gotPullDownData(event, data);
      },
      500);
    }

    // Called when the user completes the pull-up gesture.
    function onPullUp (event, data) {
      setTimeout(function fakeRetrieveDataTimeout() {
        gotPullUpData(event, data);
      },
      500);
    }

    // Set-up jQuery event callbacks
    $(document).delegate("div.hwrapper", "pageinit",
    function bindPullPagePullCallbacks(event) {
      $(".iscroll-wrapper", this).bind( {
        iscroll_onpulldown : onPullDown,
        iscroll_onpullup   : onPullUp
      } );
    } );

  }(jQuery));
