// http://danielfone.github.com/2degrees-facebook/degrees-of-separation.js
(function(){

  function collectFriends(){
    var $friends = $("#pagelet_friends_tab .fbProfileBrowserListItem").not('.mutual-done');
    console.log('Found ' + $friends.size() + ' friends');
    
    if ( $friends.size() == 0 ) alert("No friends found. Please make sure you're a person's friends page.")

    $friends.each(function(){
      var $friend = $(this);
      var url = $friend.find('a').attr('href');
      var name = $friend.find('.fwb').text();
      $friend.find('.fsl').append('<br><span class="loading" style="font-size: 90%; font-weight: normal; font-color: #aaa;">searching…</span>');
      $.get(url+'&_fb_noscript=1', function(data){
        var mutual = $(data).find('#pagelet_mutual .inCommonSectionList .visible');
        if ( mutual.size() > 0 ){
            console.log('! Connections found for '+name);
            $friend.find('.fsl .loading').html(mutual.get(0));
            $friend.addClass('mutual-done');
        } else {
          $friend.remove();
        }
      });
    });
    $.get(this.location.href)
  }
  
  function waitForjQuery(){
    if ( typeof jQuery == 'undefined' ){
      setTimeout(waitForjQuery, 100);
    } else {
      jQuery.noConflict();
      $ = jQuery;
      console.log('Running script…');
      $('#separation-loading').remove();
      collectFriends();
    }
  }

  //----------

  var $ = null;

  // Probably a bad way to include a script
  if ( typeof jQuery == 'undefined' ){
    console.log('Loading jQuery…');
    i('https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js');
  }

  waitForjQuery();

})();
