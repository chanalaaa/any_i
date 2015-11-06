$(document).ready(function() {
    $window = $(window);
    $slide = $('.section');
    winH = $window.height();
    winW = $window.width();
    //$slide.height(winH);
    var browser = get_browser_info();

    //console.log(browser);
    $('html').addClass(browser.toLowerCase());

    /* owlCarousel ***********************/
    $("#owl-desk,#owl-res").owlCarousel({

        dots: true,
        loop: true,
        //nav: true,
        items: 1,
        center: true,
        autoplay: true,
        autoplaySpeed: 1000,


    });

    $("#owl-desk-s4,#owl-adv").owlCarousel({

        dots: true,
        loop: true,
        items: 1,
        center: true,
        nav: true,
        autoplay: true,
        autoplaySpeed: 1000,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
    });


    /*End owlCarousel ***********************/


    /* Fullpage  ***********************/
    if (winW >= 1000) {
        $('#fullpage').fullpage({
            css3: true,
            autoScrolling: false,
            fitToSection: false,
            //normalScrollElements: '.s5',
        });
    }
    /*End Fullpage  ***********************/
    /* Detect iOS version  ***********************/
    var vers = iOSversion();
    if (typeof vers != 'undefined') {
        if (typeof vers[0] != 'undefined') {
            if (vers[0] < 8) {
                $('html').addClass('ios7');
                //alert(vers[0]);
            }
        }
    }
    /*End Detect iOS version  ***********************/
    /* Fix navbar  ***********************/
    if (winW < 550) {
        var scn = 680;
    }if (winW < 1080) {
        var scn = 1100;
    } else {
        var scn = 720;
    }
    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > scn) {
            //Detect Scroll Stop
            $(".nav-desk-scroll").slideUp(100);
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                //console.log("hey");
                $(".nav-desk-scroll").slideDown(260);
                //$(".nav-desk-scroll").css("display","block");
            }, 450));
        } else {
            $(".nav-desk-scroll").slideUp(100);
            $(".nav-desk-scroll").css("display", "none");
            //console.log("ohh");
        }
    });
    /*End Fix navbar  ***********************/

});
/*End Onload  ********************************************************************/

/* Nav ***********************/
$(function() {
    var flag = 1;
    $('.toggle').on('click', function() {
        $('.main-nav').toggleClass('open');
        /* disable scrolling *************/
        if (flag < 1) {
            $("body,html").css("overflow", "visible");
            $('body').unbind('touchmove');
            flag = 1;
        } else {
            //Detect viewport orientation
            if (window.innerHeight > window.innerWidth) {
                $('body,html').css("overflow", "hidden");
                $('body').bind('touchmove', function(e) {
                    e.preventDefault()
                });
            }

            flag = 0;
        }
    });

});

/* Detect iOS version ***********************/
function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}

/*
if (navigator.userAgent.match(/iPad|iPhone;.*os 7_\d/i)) {
    
}
 */


/* Detect browser ***********************/
function get_browser_info() {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'msie';
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) {
            return 'opera'
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[0];
}
