// ----------------------------------------------------------------------
// -- INDEX SCREEN SPECIFIC JS:
// ----------------------------------------------------------------------
// -- NOTE: This is where you can add anything you need to do specifically to the course homepage, it will load lastly.
// -- ABOUT: THis file will over-ride everything else, if you need to customize
// -- AUTHOR: J. Quincy Richardson - WDS
// ======================================================================

// =====================================================================
//Home
// =====================================================================


function createIndexHome() {

// =====================================================================
// makes the getting started section slow scroll
// =====================================================================
    $(document).on('click', '.scrollButton', function (e) {
        e.preventDefault();

        var position = $("#group2").offset().top;

        $("HTML, BODY").animate({scrollTop: position}, 1000);
        var offset = $("#group2").offset();
    });


    // =====================================================================
    // Create Nav Menu
    // =====================================================================
    createMenuHome();


    // =====================================================================
    // FADE IN CONTENT and position the nav_menu
    // =====================================================================
    $('body').css('visibility', 'visible').hide();
    $('body').fadeIn(800, function () {
    });

    // =====================================================================
    // Event for Showing Menu Lessons
    // =====================================================================

    $('.navBack').click(function () {
        $(this).closest('.nav_menu_lessons').slideToggle('slow');
        $('.link0').hide();
        return false;

    });
    $('.modlink').click(function () {
        $('.nav_menu_lessons').hide();
        $('link0').hide();
        var position = $("#group2").offset().top;
        $("HTML, BODY").animate({scrollTop: position}, 1000);
        $('.navBack').focus();
        $(this).next().stop().slideToggle('slow');
        $('.nav_menu_lessons li:nth-of-type(2) a').focus();
    });

    $('.gettingstarted').click(function () {
        $('.nav_menu_lessons').hide();
        var position = $("#group2").offset().top;
        $("HTML, BODY").animate({scrollTop: position}, 1000);
        $('.link0').show();
        $('.mod0').slideToggle('slow');
    });
}

// =====================================================================
// FOR NAV MENU
// =====================================================================
function createMenuHome() {
    var menu = '<div id="menu">';
    menu += '<ul class="nav_menu_modules">';

    for (var i = 0; i < FLVS.Sitemap.module.length; i++) {
        var moduleNum = FLVS.Sitemap.module[i];

        if (moduleNum.visible == 'true' || getCookie(settings.course_title + ' preview')) {

            // Getting Started
            if (i < 1) {
                menu += '<li class="link' + i + ' gettingStartedHome">';
                var navgslink = moduleNum.lesson[0].page[0].href;
                navgslink = navgslink.replace("../../", "");
                menu += '<a href="javascript:void(0);" class="modlink gst"><span class="nav_title">' + moduleNum.title + '</span></a>';
                var gstitle2 = '<a href="javascript:void(0);" class="modlink gettingstarted"><span class="nav_num"> </span> <span class="nav_title">' + moduleNum.title + '</span></a>';
                '</li>';
                $('#mainLogo').append(gstitle2);
            }

            //Start Segment 1
            if (i == 1) {
                menu += '<li class="link' + i + '">';
                menu += '<a href="javascript:void(0);" tabindex="' + i + '" class="modlink mod' + moduleNum.mID + '">' +
                    // '<img class="navIcon" src="global/images/global/' + moduleNum.num +'_nav.png" alt="Module ' + moduleNum.num +' nav icon" />' +
                    '<span class="nav_num">' + moduleNum.num + ' </span> <span class="nav_title">' + moduleNum.title + '</span></a>';
            }

            //Start Segment 2
            if (i == 9) {
                menu += '<li class="link' + i + '">';
                menu += '<a href="javascript:void(0);" tabindex="' + i + '" class="modlink mod' + moduleNum.mID + '">' +
                    '<span class="nav_num">' + moduleNum.num + ' </span> <span class="nav_title">' + moduleNum.title + '</span></a>';
            }
            //All others
            else if (i > 1 && i < 9 || i > 8) {
                menu += '<li class="link' + i + '">';
                menu += '<a href="javascript:void(0);" tabindex="' + i + '" class="modlink mod' + moduleNum.mID + '">' +
                    '<span class="nav_num">' + moduleNum.num + ' </span> <span class="nav_title">' + moduleNum.title + '</span></a>';
            }

            // Lessons
            menu += '<ul class="nav_menu_lessons homeLessons mod' + (i) + '"><li class="sublink"><div class="moduleButtons"><a href="#" class="navBack roundButton">Back</a></div></li>';

            var submenu = '';

            for (var j = 0; j < moduleNum.lesson.length; j++) {

                var llink = moduleNum.lesson[j].page[0].href;
                var ltitle = moduleNum.lesson[j].title;
                var lnum = moduleNum.lesson[j].num;
                llink = llink.replace("../../", "");

                submenu += '<li>';
                if (i >= 0) {
                    if (j % 2 == 0) {
                        submenu += '<a href="' + llink + '">' +
                            '<span class="lesson_txt">';
                    } else {
                        submenu += '<a href="' + llink + '" class="odd">' +
                            '<span class="lesson_txt">';
                    }

                    submenu += '<span class="lesson_num">' + lnum + '</span> <span class="lesson_title">' + ltitle + '</span></span></a>';
                    submenu += '</li>';
                }

            }

            menu += submenu;
            menu += '</ul>';
            menu += '</li>';
        } // end if visible

    }
    // =====================================================================
    // Remove all modlinks from nav_menu_lessons
    // =====================================================================
    $('#nav_menu.homeNav').append(menu);
    $('.nav_menu_lessons .modlink').remove();
}


$(function () {
    localStorage.leftval = "";
    localStorage.topval = "";

    localStorage.clickOpen = "";

    localStorage.clickDragged = "";
});

// =====================================================================
// need to see if the sitemap is ready, if not lets wait for the ajax to finish
// =====================================================================
if (FLVS.Sitemap) {
    createIndexHome();
} else {
    $(document).ajaxSuccess(function (event, xhr, settings) {
        if (settings.url == "global/xml/sitemap.xml") {
            createIndexHome();
        }
    });
}

//test ed


// =====================================================================
// FADE IN CONTENT and position the nav_menu
// =====================================================================
$('body').css('visibility', 'visible').hide();
$('body').fadeIn(800, function () {


});

// ================================================
// SCROLLING EFFECTS
// ================================================
$(window).scroll(function (e) {
    parallax();
});

function parallax() {
    var scrolled = $(window).scrollTop();
    //  console.log('scroll' + scrolled)
    $('.balloonParent').css({
        // 'top': -(scrolled * 1) + 'px',
        'bottom': -(scrolled * 4.5) + 'px',
        'left': +(scrolled * 2) + 'px',
        '-webkit-transform': 'rotate(-' + (scrolled * .25) + 'deg)',
        '-moz-transform': 'rotate(-' + (scrolled * .25) + 'deg)',
        '-ms-transform': 'rotate(-' + (scrolled * .25) + 'deg)',
        '-o-transform': 'rotate(-' + (scrolled * .25) + 'deg)',
        'transform': 'rotate(-' + (scrolled * .25) + 'deg)'
    });
    $('.cloudParent').css({
            'right': +(scrolled * 2) + 'px',

            'bottom': -(scrolled * 4.5) + 'px',
            '-webkit-transform': 'rotate(' + (scrolled * .25) + 'deg)',
            '-moz-transform': 'rotate(' + (scrolled * .25) + 'deg)',
            '-ms-transform': 'rotate(' + (scrolled * .25) + 'deg)',
            '-o-transform': 'rotate(' + (scrolled * .25) + 'deg)',
            'transform': 'rotate(' + (scrolled * .25) + 'deg)'
        }
    );
    $('.logoParent').css({'top': +(scrolled * 1) + 'px', 'bottom': -(scrolled * 1) + 'px'});
}