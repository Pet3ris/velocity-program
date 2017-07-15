$(document).ready(function() {
  function makeScrolling() {
    let scrollClass = 'top-bar--state-scrolling';
    let topBar = document.getElementById("top-bar");
    if (!topBar.classList.contains(scrollClass)) {
      topBar.classList.add(scrollClass);
    }
  }

  function makeNonScrolling() {
    let scrollClass = 'top-bar--state-scrolling';
    let topBar = document.getElementById("top-bar");
    if (topBar.classList.contains(scrollClass)) {
      topBar.classList.remove(scrollClass);
    }
  }

  function verifyScrolling() {
    if (!document.getElementById("menu-icon-container").classList.contains("hamburger-icon--invisible")) {
      let thresholdPosition = 100;
      let topBar = document.getElementById("top-bar");
      let scrollClass = 'top-bar--state-scrolling';
      if (document.body.scrollTop < thresholdPosition) {
        makeNonScrolling();
      } else {
        makeScrolling();
      }
    }
  }

  // Header scrolling effect
  window.onscroll = verifyScrolling;

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
    let size = $("div#pt").width();
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
      var menu = document.getElementById("navigation-menu");
      var logo = document.getElementById("logo-container");
      var menuIcon = document.getElementById("menu-icon-container");
      var closeIcon = document.getElementById("close-icon-container");

      menuIcon.classList.add("hamburger-icon--invisible");
      closeIcon.classList.remove("close-icon--invisible");
      menu.classList.remove("navigation-menu--invisible");
      logo.classList.add("logo-container--invisible");

      makeNonScrolling();

      $("#main-content").css("visibility", "hidden");
  }

  function closeMenu() {
      var menu = document.getElementById("navigation-menu");
      var logo = document.getElementById("logo-container");
      var menuIcon = document.getElementById("menu-icon-container");
      var closeIcon = document.getElementById("close-icon-container");

      menuIcon.classList.remove("hamburger-icon--invisible");
      closeIcon.classList.add("close-icon--invisible");
      menu.classList.add("navigation-menu--invisible");
      logo.classList.remove("logo-container--invisible");

      verifyScrolling();
      $("#main-content").css("visibility", "visible")
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

  /*
  var ids = ["process-header", "product-header", "analytics-header", "workflows-header", "story-header", "peteris-header", "mike-header", "advisers-header"];
  for (var i = 0; i < ids.length; ++i) {
    //let titleTween = TweenMax.fromTo("#" + ids[i], 0.5, { "padding-left": 50 }, { "padding-left": 0 });
    let titleTween = TweenMax.fromTo("#" + ids[i], 0.5, { "opacity": 0.3 }, { "opacity": 1 });
    let titleScene = new ScrollMagic.Scene({triggerElement: "#" + ids[i], duration: "30%"})
      .setTween(titleTween)
      .addIndicators()
      .addTo(controller);
  }
  */

  var ids = ["peteris-pic", "mike-pic", "product-pic", "analytics-pic", "workflows-pic", "space", "adviser-company-logos"];
  for (var i = 0; i < ids.length; ++i) {
    let picTween = TweenMax.fromTo("#" + ids[i], 0.5, { "opacity": 0 }, { "opacity": 1 });
    let picScene = new ScrollMagic.Scene({triggerElement: "#" + ids[i], duration: "30%"})
      .setTween(picTween)
      .addIndicators()
      .addTo(controller);
  }

  let bgTween = TweenMax.fromTo("#background", 0.5, { "opacity": 1 }, { "opacity": 0 })
  let bgScene = new ScrollMagic.Scene({triggerElement: "#process-section", duration: "50%"})
    .setTween(bgTween)
    .addIndicators()
    .addTo(controller);

  var ids = ["lead-text", "process-section"];
  for (var i = 0; i < ids.length; ++i) {
    let leadTween = TweenMax.fromTo("#" + ids[i], 0.5, { "color": "rgb(255, 255, 255)" }, { "color": "rgb(0,0,0)" })
    let leadScene = new ScrollMagic.Scene({triggerElement: "#process-section", duration: "50%"})
      .setTween(leadTween)
      .addIndicators()
      .addTo(controller);
  }



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
