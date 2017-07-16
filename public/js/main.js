$(document).ready(function() {
  function makeScrolling() {
    var scrollClass = 'top-bar--state-scrolling';
    var topBar = $("#top-bar");
    if (!topBar.hasClass(scrollClass)) {
      topBar.addClass(scrollClass);
    }
  }

  function makeNonScrolling() {
    var scrollClass = 'top-bar--state-scrolling';
    var topBar = $("#top-bar");
    if (topBar.hasClass(scrollClass)) {
      topBar.removeClass(scrollClass);
    }
  }

  function positionSlates() {
    var mapElement = document.getElementById("peteris-overlay");
    /*mapElement.style.top = - mapElement.style.height / 2;*/
    console.log(mapElement.clientHeight);
    mapElement.style.top = -mapElement.clientHeight / 2;
  }

  window.onload = function() {
    positionSlates();
  }

  function resizeTriangles() {
    var size = $("div#pt").width();
    $("div#pt")
      .height(2 * size)
      .css("top", "-" + (2 * size) + "px")
      .css("margin-bottom", "-" + (2 * size) + "px");

    $("div.upper-triangle").each(function(index, element) {
      $(this).css("border-width", size + "px " + size + "px 0 0")
    });
    $("div.lower-triangle").each(function(index, element) {
      $(this).css("border-width", "0 0 " + size + "px " + size + "px");
             //.css("top", "-" + size + "px");
    });
  }

  window.addEventListener("resize", function(e) {
    positionSlates();
    resizeTriangles();
    setUpSpace();
  })

  function openMenu() {
      var menu = $("#navigation-menu");
      var logo = $("#logo-container");
      var menuIcon = $("#menu-icon-container");
      var closeIcon = $("#close-icon-container");

      makeNonScrolling();

      menuIcon.hide();
      closeIcon.show();
      menu.show();
      logo.hide();

      $("#main-content").css("visibility", "hidden");
  }

  function closeMenu() {
      var menu = $("#navigation-menu");
      var logo = $("#logo-container");
      var menuIcon = $("#menu-icon-container");
      var closeIcon = $("#close-icon-container");

      makeScrolling();

      menuIcon.show();
      closeIcon.hide();
      menu.hide();
      logo.show();

      $("#main-content").css("visibility", "visible");
  }

  $("#menu-icon-container").click(openMenu);
  $("#close-icon-container").click(closeMenu);

  var menuLinks = document.getElementsByClassName("menu-link");
  for (var i = 0; i < menuLinks.length; ++i) {
    menuLinks[i].onclick = closeMenu;
  }

  function updateFooter() {
    /*
    var date = new Date(0);
    var londonDate = date.toLocaleString('de-DE', {hour: '2-digit',   hour12: false, timeZone: 'Europe/London' });
    var hongKongLocale = date.toLocaleString('de-DE', {hour: '2-digit',   hour12: false, timeZone: 'Asia/Hongkong' });
    */

    var londonTime = moment().tz("Europe/London").format("HH:mm");
    var hongKongTime = moment().tz("Asia/Hong_Kong").format("HH:mm");

    $("#london-time").text(londonTime);
    $("#hong-kong-time").text(hongKongTime);
  }

  updateFooter();
  setInterval(updateFooter, 10000);


  //// Scrolling animations

  var controller = new ScrollMagic.Controller();

  var ids = ["peteris-pic", "mike-pic", "product-pic", "analytics-pic", "workflows-pic", "space", "adviser-company-logos"];
  for (var i = 0; i < ids.length; ++i) {
    var picTween = TweenMax.fromTo("#" + ids[i], 0.5, { "opacity": 0 }, { "opacity": 1 });
    var picScene = new ScrollMagic.Scene({triggerElement: "#" + ids[i], duration: "30%"})
      .setTween(picTween)
      //.addIndicators()
      .addTo(controller);
  }

  var bgTween = TweenMax.fromTo("#background", 0.5, { "opacity": 1 }, { "opacity": 0 })
  var bgScene = new ScrollMagic.Scene({triggerElement: "#quote-section", duration: "25%"})
    .setTween(bgTween)
    //.addIndicators()
    .addTo(controller);

  var ids = ["lead-text", "quote-section"];
  for (var i = 0; i < ids.length; ++i) {
    var leadTween = TweenMax.fromTo("#" + ids[i], 0.5, { "color": "rgb(255, 255, 255)" }, { "color": "rgb(0,0,0)" })
    var leadScene = new ScrollMagic.Scene({triggerElement: "#quote-section", duration: "25%"})
      .setTween(leadTween)
      //.addIndicators()
      .addTo(controller);
  }

  // Scroll smoothly
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ){
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
         scrollTop: Math.max(0, target.offset().top - 44)
        }, 500, function() {
           // Callback after animation
           // Must change focus!
           /*
           var $target = $(target);
           $target.focus();
           if ($target.is(":focus")) { // Checking if the target was focused
             return false;
           } else {
             $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
             $target.focus(); // Set focus again
           };
           */
         });
       }
     }
  });

  //// 1. Define Space and Form
  var colors = {
    a1: "#ff2d5d", a2: "#42dc8e", a3: "#2e43eb", a4: "#ffe359",
    b1: "#96bfed", b2: "#f5ead6", b3: "#f1f3f7", b4: "#e2e6ef"
  };
  var space = new CanvasSpace("pt").setup( {bgcolor: "#222"} );
  var form = new Form( space );

  var c = document.getElementById("pt_canvas");
  var ctx = c.getContext("2d");
  // Clip a rectangular area
  /*
  ctx.rect(50,20,200,120);
  ctx.stroke();
  ctx.clip();
  // Draw red rectangle after clip()
  */

  var center, pairs, mouse;

  //// 2. Create Elements
  //var r = Math.min( space.size.x, space.size.y ) * 0.4;
  function setUpSpace() {
    pairs = [];
    center = space.size.$divide(2);
    center.x = center.x * 0.4;
    center.y = center.y * 0.3;
    mouse = center.clone();

    console.log(center);

    var steps = 200;
    //var r = Math.min( space.size.x, space.size.y ) * 0.8;
    var r = Math.min( space.size.x, space.size.y ) * 2;
    var dr = Math.min( space.size.x, space.size.y ) * 0.4 / steps;

    // create pairs
    for (var i=0; i<steps; i++) {
      var p = new Pair( Math.random()*r, Math.random()*r ).to( Math.random()*-r, Math.random()*-r );
      p.moveBy( center ).rotate2D( i*Math.PI/steps, center );
      pairs.push( p );
    }
  }

  setUpSpace();

  //// 3. Visualize, Animate, Interact
  space.add({
    animate: function(time, fps, context) {
      for (var i=0; i<pairs.length; i++) {

        // rotate each pair by 0.1 degree
        var pr = pairs[i];
        //pr.rotate2D( Const.one_degree/10, center );
        pr.rotate2D( Const.one_degree/5/10, center );

        // check collinearity with mouse, and draw a line with different color
        var col = pr.collinear(mouse);

        // Exact collinearity with return 0, but here we just check for a generous threshold
        if ( Math.abs( col ) < 200 ) {
          form.stroke("#fff");
        } else {
          //form.stroke( ( (col<0) ? "rgba(255,255,0,.1)" : "rgba(0,255,255,.1)") ).line( pr );
          form.stroke(false ).fill("#fff").points( pr.toArray(), 0.5) ;
        }
      }
    }
  });

  // 4. Start playing
  space.bindMouse();
  space.bindTouch();
  space.play();

  resizeTriangles();
})
