$(document).ready(function () {	
// BEGIN: toggle
	if ($(".toggle").length) {
		$toggleDuration = 500;
		$(".toggle").each(function () {
			if (typeof $(this).attr("data-duration") != "undefined") {
				if ($.inArray($(this).attr("data-duration"), ["slow", "normal", "fast"]) >= 0) $toggleDuration = $(this).attr("data-duration");
				else $toggleDuration = parseInt($(this).attr("data-duration"));
			}
		});

		$(".toggle-link").click(function () {
			var $toggle = $(this).parents(".toggle").first();

			if ($toggle.hasClass("active")) {
				var toggleHeight = $toggle.outerHeight();

				$(this).siblings(".toggle-main").stop().slideUp($toggleDuration, function () {
					$(this).removeAttr("style");
					$toggle.removeClass("active");
				});
			} else {
				var $main = $toggle.children(".toggle-main"),
					toggleHeight = 0;

				$main.css("display", "block");
				toggleHeight += $toggle.outerHeight(); // update height
				$main.css("display", "");


				$(this).siblings(".toggle-main").stop().slideDown($toggleDuration, function () {
					$(this).removeAttr("style");
					$toggle.addClass("active");
				});

				if ($(this).siblings(".toggle-main").find("[class*=heightLine]").length) heightLine();
			}
		})
	}
	// END: toggle
});



/*--------------------------------------------------------------------------*
 *
 *  heightLine JavaScript Library beta4
 *
 *  MIT-style license.
 *
 *  2007 Kazuma Nishihata
 *  http://www.webcreativepark.net
 *
 *--------------------------------------------------------------------------*/
new function() {

    function heightLine() {


        this.className = "heightLine";
        this.parentClassName = "heightLineParent";
        reg = new RegExp(this.className + "-([a-zA-Z0-9-_]+)", "i");
        objCN = new Array();
        var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
        for (var i = 0; i < objAll.length; i++) {
            var eltClass = objAll[i].className.split(/\s+/);
            for (var j = 0; j < eltClass.length; j++) {
                if (eltClass[j] == this.className) {
                    if (!objCN["main CN"]) objCN["main CN"] = new Array();
                    objCN["main CN"].push(objAll[i]);
                    break;
                } else if (eltClass[j] == this.parentClassName) {
                    if (!objCN["parent CN"]) objCN["parent CN"] = new Array();
                    objCN["parent CN"].push(objAll[i]);
                    break;
                } else if (eltClass[j].match(reg)) {
                    var OCN = eltClass[j].match(reg)
                    if (!objCN[OCN]) objCN[OCN] = new Array();
                    objCN[OCN].push(objAll[i]);
                    break;
                }
            }
        }

        //check font size
        var e = document.createElement("div");
        var s = document.createTextNode("S");
        e.appendChild(s);
        e.style.visibility = "hidden"
        e.style.position = "absolute"
        e.style.top = "0"
        document.body.appendChild(e);
        var defHeight = e.offsetHeight;

        changeBoxSize = function() {
            for (var key in objCN) {
                if (objCN.hasOwnProperty(key)) {
                    //parent type
                    if (key == "parent CN") {
                        for (var i = 0; i < objCN[key].length; i++) {
                            var max_height = 0;
                            var CCN = objCN[key][i].childNodes;
                            for (var j = 0; j < CCN.length; j++) {
                                if (CCN[j] && CCN[j].nodeType == 1) {
                                    CCN[j].style.height = "auto";
                                    max_height = max_height > CCN[j].offsetHeight ? max_height : CCN[j].offsetHeight;
                                }
                            }
                            for (var j = 0; j < CCN.length; j++) {
                                if (CCN[j].style) {
                                    var stylea = CCN[j].currentStyle || document.defaultView.getComputedStyle(CCN[j], '');
                                    var newheight = max_height;
                                    if (stylea.paddingTop) newheight -= stylea.paddingTop.replace("px", "");
                                    if (stylea.paddingBottom) newheight -= stylea.paddingBottom.replace("px", "");
                                    if (stylea.borderTopWidth && stylea.borderTopWidth != "medium") newheight -= stylea.borderTopWidth.replace("px", "");
                                    if (stylea.borderBottomWidth && stylea.borderBottomWidth != "medium") newheight -= stylea.borderBottomWidth.replace("px", "");
                                    CCN[j].style.height = newheight + "px";
                                }
                            }
                        }
                    } else {
                        var max_height = 0;
                        for (var i = 0; i < objCN[key].length; i++) {
                            objCN[key][i].style.height = "auto";
                            max_height = max_height > objCN[key][i].offsetHeight ? max_height : objCN[key][i].offsetHeight;
                        }
                        for (var i = 0; i < objCN[key].length; i++) {
                            if (objCN[key][i].style) {
                                var stylea = objCN[key][i].currentStyle || document.defaultView.getComputedStyle(objCN[key][i], '');
                                var newheight = max_height;
                                if (stylea.paddingTop) newheight -= stylea.paddingTop.replace("px", "");
                                if (stylea.paddingBottom) newheight -= stylea.paddingBottom.replace("px", "");
                                if (stylea.borderTopWidth && stylea.borderTopWidth != "medium") newheight -= stylea.borderTopWidth.replace("px", "")
                                if (stylea.borderBottomWidth && stylea.borderBottomWidth != "medium") newheight -= stylea.borderBottomWidth.replace("px", "");
                                objCN[key][i].style.height = newheight + "px";
                            }
                        }
                    }
                }
            }
        }

        checkBoxSize = function() {
            if (defHeight != e.offsetHeight) {
                changeBoxSize();
                defHeight = e.offsetHeight;
            }
        }
        changeBoxSize();
        setInterval(checkBoxSize, 1000)
        window.onresize = changeBoxSize;
    }

    function addEvent(elm, listener, fn) {
        try {
            elm.addEventListener(listener, fn, false);
        } catch (e) {
            elm.attachEvent("on" + listener, fn);
        }
    }
    addEvent(window, "load", heightLine);
}




/*========================================*
pagetop
*=========================================*/
lastScrollTop = 0;
$(window).scroll(function() {
   var st = $(this).scrollTop();
   if (lastScrollTop != 0) {
      if (st < lastScrollTop) {
         $(".pagetop, header").addClass("visible");
         if (st < 10) {
            $(".pagetop, header").removeClass("visible");
         }
      } else if (st > lastScrollTop) {
         $(".pagetop, header").removeClass("visible");
      }
   }
   lastScrollTop = st;

   if ( $(".nav-target").offset().top < $(window).scrollTop()) {
      $(".takeout-fixed").addClass("fixed");
   } else {
      $(".takeout-fixed").removeClass("fixed");
   }

   if( $(".pagetop-change").length>0 ) {
      var pagetop_ = $(".pagetop-change").offset().top - ($(window).height())+10;
      if (st > pagetop_) {
         $(".pagetop").addClass("change");
      } else {
         $(".pagetop").removeClass("change");
      }
   }
});

$(function() {
	new WOW().init();
   $(window).scroll(function() {
      var content = $(window).height(),
         ScrollPos = $(window).scrollTop();
      if (ScrollPos > content) {
         $('#fixed-sp').addClass('visible');
      } else {
         $('#fixed-sp').removeClass('visible');
      }
   });
});

function preventDefault(e) {
   e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
   if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
   }
}


function toggleChoices() {
	var choices = document.getElementById("choice-selected");
	choices.style.display = (choices.style.display === "none" || choices.style.display === "") ? "block" : "none";
}


// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
   window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function() {
         supportsPassive = true;
      }
   }));
} catch (e) {}

var wheelOpt = supportsPassive ? {
   passive: false
} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
   window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
   window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
   window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
   window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
   window.removeEventListener('DOMMouseScroll', preventDefault, false);
   window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
   window.removeEventListener('touchmove', preventDefault, wheelOpt);
   window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
// 
$(document).ready(function() {
   if ($('.scroll-active').length)
      $(document).on('scroll', onScroll2)
});

function onScroll2() {
   var scroll = $(window).scrollTop()
   var header = 0
   $('.scroll-active a[href^="#"]').each(function() {
      var el = $(this).attr('href')
      var offset = $(el).length ? $(el).offset().top : 0
      if ($(this).find('img').length) {
         var _src_ = $(this).find('img').attr("src");
         _src_ = _src_.replace(/^(.*?)_on\.(.*)$/, "$1.$2");
         $(this).find('img').attr("src", _src_)
      }
      if ((scroll + header + 1) >= offset && ($(el).outerHeight() + offset) > (scroll + header)) {
         $('.scroll-active a').removeClass('active')
         $(this).addClass('active')
      }
   })
}

$(document).ready(function() {
   $(window).scroll(function() {
      var TargetPos = $(window).height();
      var ScrollPos = $(window).scrollTop();
      if (ScrollPos > TargetPos) {
         $("body").addClass('has_nav');
      } else {
         $("body").removeClass('has_nav');
      }

      if (ScrollPos > 0) {
         $("body").addClass('has_scroll');
      } else {
         $("body").removeClass('has_scroll');
      }
   });
   $('.i-search').click(function() {
      $("body").toggleClass('s-show');
   });
});

function triggerScroll(targetObj) {
   var targetName = targetObj.attr("id"); //for console.log
   var targetFlag = false;
   var scrollTop = $(window).scrollTop();
   var scrollBottom = scrollTop + $(window).height();
   var targetTop = targetObj.offset().top;
   var targetBottom = targetTop + targetObj.height();
   // while loading
   if (scrollBottom > targetTop && scrollTop < targetBottom) {
      if (!targetFlag) {
         targetObj.slick('slickPlay');
         targetFlag = true;
      }
   } else {
      targetObj.slick('slickPause');
      targetFlag = false;
   }

   $(window).on('scroll', function() {
      scrollTop = $(window).scrollTop();
      scrollBottom = scrollTop + $(window).height();
      targetTop = targetObj.offset().top;
      targetBottom = targetTop + targetObj.height();
      if (scrollBottom > targetTop && scrollTop < targetBottom) {
         // Start autoplay when entering the viewport
         if (!targetFlag) {
            targetObj.slick('slickPlay');
            targetFlag = true;
         }
      } else {
         // Stop autoplay when you get out of the viewport
         if (targetFlag) {
            targetObj.slick('slickPause');
            targetFlag = false;
         }
      }
   });
}

/* -- -- */
$("#fixed-sp ul li").each(function(){
   var _this = $(this);
});



/* =====================================
	Header Structure EX
===================================== */
$(document).ready(function() {
    var ww = document.body.clientWidth;
    $(".hamburger").click(function(e) {
        e.preventDefault();

        $(this).toggleClass("active");
        $('body').toggleClass("nav-Opened");
    });
    $(".header_menu .g_nav a").click(function(e) {
        $('body').removeClass("nav-Opened");
    });
    $(".g_nav > li > span").each(function() {
        $(this).addClass("parent");
    })
    adjustMenu(ww);
});

function adjustMenu(ww) {
    if (ww <= 767) { //767Ã¤Â»Â¥Ã¤Â¸â€¹=Ã£â€šÂ¹Ã£Æ’Å¾Ã£Æ’â€º
        $(".hamburger img").css("display", "inline-block");
//        if (!$(".hamburger").hasClass("active")) {
//            $(".g_nav").hide();
//        } else {
//            $(".g_nav").css("display", "block");
//        }
        $(".g_nav>li").unbind('mouseenter mouseleave');
        $(".g_nav li span.parent").unbind("click");
        $(".g_nav li span.parent").click(function(e) {
            e.preventDefault();
            $(this).parent("li").toggleClass('hover');
        });

    } else { //768Ã¤Â»Â¥Ã¤Â¸Å =PC,Ã£â€šÂ¿Ã£Æ’â€“Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†
        $(".hamburger img").css("display", "none");
        $(".g_nav").removeAttr("style");
        $(".g_nav>li").unbind("hover");
        $(".g_nav>li").hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
    }
}
$(window).bind('resize orientationchange', function() {
    //ww = document.body.clientWidth;
    ww = window.innerWidth;
    adjustMenu(ww);
});


/*
 =====================================
            Anchor links
===================================== */

jQuery("body").on("click", "a[href*='#']", function(e) {
    var hash = jQuery(this).attr('href');
    if (hash) {
        hash = hash.replace(/^\.\//g, "");
        hash = hash.replace(location.pathname, "");
        hash = hash.replace(location.origin, "");
        hash = hash.replace("//" + location.host, ""); //browSyncÃƒÂ§"Ã‚Â¨
    }
    if (hash.match(/^#/) && jQuery(hash).length > 0) {
        if (hash.match(/^#/) && jQuery(hash).length > 0) {
            e.preventDefault();
            e.stopPropagation();

            var target = jQuery(hash);
            scrollToTarget(target, 100);

            return false;
        }
    }
})


function scrollToTarget(targetElement, overPixels) {

    if (overPixels === undefined) {
        overPixels = 0;
    }

    if (targetElement.length > 0) {
        $target = targetElement;
        jQuery('html, body').animate({
            scrollTop: $target.offset().top - overPixels // Scroll to this location.
        }, {
            duration: 1000,
            step: function(now, fx) {

                var newOffset = $target.offset().top - overPixels;
                if (fx.end !== newOffset)
                    fx.end = newOffset;
            }
        });
    }
}

//$(window).load(function() {
//    var headerHight = $("#header").height();
//    var $path = location.href;
//    var $index = $path.indexOf("#");
//    var $sub = $path.substring($index);
//    if ($index != -1) {
//
//        var target = $($sub);
//        var offsetTop = target.offset().top;
//        if ($(window).width() >= 768) {
//            $('html,body').animate({
//                scrollTop: offsetTop - 100
//            }, 500);
//        } else {
//            $('html,body').animate({
//                scrollTop: offsetTop - 72
//            }, 500);
//        }
//    }
//});

