// For Module and Lesson Number removal by unLOck

if (typeof gsVars !== 'undefined') {
    var tpl = gsVars.custom_tpl;
}
if (typeof tpl !== 'undefined' && tpl.indexOf('maln_false') >= 0) {
    var selectors = ['lesson_number', 'lesson_num', 'breadcrumbs_lesson_num', 'breadcrumbs_module_num', ];
    selectors.forEach(function (value) {
        var selector = '.' + value;
        $(document).ready(function () {
            $(selector).addClass('unlock').removeClass(value);
        });
    });
}


// ================================================
// initialize QUIZMO
// ================================================
var ngLibraryLocation = "https://cdn.flvs.net/cdn/il/ng_il/";
$.getScript('https://cdn.flvs.net/cdn/il/ng_il/launcher.js', function (data, textStatus, jqxhr) {});


// ================================================
// removes duplicate menu - uhg
// ================================================
$('div #menu').remove();


var elem = {
    // =======================================================
    // MAIN FUNCTION
    // =======================================================
    init: function () {


        // =======================================================
        // popover fixes
        // =======================================================
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1;
        if (!isAndroid) {
            //console.log('not Android');
        } else {
            //console.log('it is Android');
            $('.cboxElement').each(function (index, element) {
                $(this).removeClass('modal-pop').addClass('pop');
                $(this).removeClass('cboxElement');
                $(this).removeAttr('data-mwidth');
                $(this).removeAttr('data-mheight');
            });
        }


        // ====================================================
        // make tab panels min height of left aligned tabs
        // ====================================================
        if ($('.tabs').length) {
            setTimeout(function () {
                $('.tabs').each(function () {
                    if ($(this).attr('data-position') == 'left') {
                        var myTab = $(this).children('.tabs-block');
                        var myPanel = $(this).children('.panel-block');
                        var tabHeight = myTab.height();

                        myPanel.css({
                            minHeight: tabHeight + 'px'
                        });
                        $(myPanel).children('.panel-block .panel').css({
                            minHeight: tabHeight + 'px'
                        });
                    }
                });
            }, 1000);
        }


        // ================================================
        // compress text version width
        // ================================================
        $('.htmltext_version').each(function () {
            var mywidth = $(this).attr('data-width');
            $(this).css('width', mywidth + 'px');
        });

    }
};
// =====================================================================
// Update status to say My Progress
// =====================================================================
//$('.pagenum').html('My Progress');





// =====================================================================
// need to see if the sitemap is ready, if not lets wait for the ajax to finish
// =====================================================================
if (FLVS.Sitemap) {
    //console.log('SUCCESS: already loaded');

    $.getScript( courseAssets+'global/js/custom.js' )
        .done(function( script, textStatus ) {
            createLessons();
            navFix();
        })
        .fail(function( jqxhr, settings, exception ) {
            console.log( "Triggered ajaxError handler." );
        });

    //createLessons();

} else {
    $(document).ajaxSuccess(function (event, xhr, settings) {
        if (settings.url == 'global/xml/sitemap.xml') {
            //console.log('SUCCESS: new load');
            createLessons();
            navFix();
        }
    });
}



//======================================================================================================
$(document).ready(elem.init);



// =====================================================================
// Animation
// =====================================================================


!function(a){a.fn.onScreen=function(b){var c={container:window,direction:"vertical",toggleClass:null,doIn:null,doOut:null,tolerance:0,throttle:null,lazyAttr:null,lazyPlaceholder:"data:image/gif;base64,R0lGODlhEAAFAIAAAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQAAACwAAAAAEAAFAAACCIyPqcvtD00BACH5BAkJAAIALAAAAAAQAAUAgfT29Pz6/P///wAAAAIQTGCiywKPmjxUNhjtMlWrAgAh+QQJCQAFACwAAAAAEAAFAIK8urzc2tzEwsS8vrzc3tz///8AAAAAAAADFEiyUf6wCEBHvLPemIHdTzCMDegkACH5BAkJAAYALAAAAAAQAAUAgoSChLS2tIyKjLy+vIyOjMTCxP///wAAAAMUWCQ09jAaAiqQmFosdeXRUAkBCCUAIfkECQkACAAsAAAAABAABQCDvLq83N7c3Nrc9Pb0xMLE/P78vL68/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCEwkCnKGbegvQn4RjGMx8F1HxBi5Il4oEiap2DcVYlpZwQAIfkECQkACAAsAAAAABAABQCDvLq85OLkxMLE9Pb0vL685ObkxMbE/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCDwnCGHEcIMxPn4VAGMQNBx0zQEZHkiYNiap5RaBKG9EQAh+QQJCQAJACwAAAAAEAAFAIOEgoTMysyMjozs6uyUlpSMiozMzsyUkpTs7uz///8AAAAAAAAAAAAAAAAAAAAAAAAEGTBJiYgoBM09DfhAwHEeKI4dGKLTIHzCwEUAIfkECQkACAAsAAAAABAABQCDvLq85OLkxMLE9Pb0vL685ObkxMbE/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCAQSTmMEGaco8+UBSACwWBqHxKOJYd+q1iaXFoRRMbtEQAh+QQJCQAIACwAAAAAEAAFAIO8urzc3tzc2tz09vTEwsT8/vy8vrz8+vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAEIhBJWc6wJZAtJh3gcRBAaXiIZV2kiRbgNZbA6VXiUAhGL0QAIfkECQkABgAsAAAAABAABQCChIKEtLa0jIqMvL68jI6MxMLE////AAAAAxRoumxFgoxGCbiANos145e3DJcQJAAh+QQJCQAFACwAAAAAEAAFAIK8urzc2tzEwsS8vrzc3tz///8AAAAAAAADFFi6XCQwtCmAHbPVm9kGWKcEQxkkACH5BAkJAAIALAAAAAAQAAUAgfT29Pz6/P///wAAAAIRlI8SAZsPYnuJMUCRnNksWwAAOw==",debug:!1};return"remove"!==b&&a.extend(c,b),"check"!==b&&a.extend(c,b),this.each(function(){function d(){a(l).off("scroll.onScreen resize.onScreen"),a(window).off("resize.onScreen")}function e(){return z?v<r-c.tolerance&&m<v+t-c.tolerance:v<p-c.tolerance&&v>-t+c.tolerance}function f(){return z?v+(t-c.tolerance)<m||v>r-c.tolerance:v>p-c.tolerance||-t+c.tolerance>v}function g(){return z?w<s-c.tolerance&&n<w+u-c.tolerance:w<q-c.tolerance&&w>-u+c.tolerance}function h(){return z?w+(u-c.tolerance)<n||w>s-c.tolerance:w>q-c.tolerance||-u+c.tolerance>w}function i(){return x?!1:"horizontal"===c.direction?g():e()}function j(){return x?"horizontal"===c.direction?h():f():!1}function k(a,b,c){var d,e,f;return function(){e=arguments,f=!0,c=c||this,d||!function(){f?(a.apply(c,e),f=!1,d=setTimeout(arguments.callee,b)):d=null}()}}var l=this;if("remove"===b)return void d();var m,n,o,p,q,r,s,t,u,v,w,x=!1,y=a(this),z=a.isWindow(c.container),A=function(){if(z||"static"!==a(c.container).css("position")||a(c.container).css("position","relative"),o=a(c.container),p=o.height(),q=o.width(),r=o.scrollTop()+p,s=o.scrollLeft()+q,t=y.outerHeight(!0),u=y.outerWidth(!0),z){var d=y.offset();v=d.top,w=d.left}else{var e=y.position();v=e.top,w=e.left}if(m=o.scrollTop(),n=o.scrollLeft(),c.debug,i()){if(c.toggleClass&&y.addClass(c.toggleClass),a.isFunction(c.doIn)&&c.doIn.call(y[0]),c.lazyAttr&&"IMG"===y.prop("tagName")){var f=y.attr(c.lazyAttr);f!==y.prop("src")&&(y.css({background:"url("+c.lazyPlaceholder+") 50% 50% no-repeat",minHeight:"5px",minWidth:"16px"}),y.prop("src",f).load(function(){a(this).css({background:"none"})}))}x=!0}else j()&&(c.toggleClass&&y.removeClass(c.toggleClass),a.isFunction(c.doOut)&&c.doOut.call(y[0]),x=!1);return"check"===b?x:void 0};window.location.hash?k(A,50):A(),c.throttle&&(A=k(A,c.throttle)),a(c.container).on("scroll.onScreen resize.onScreen",A),z||a(window).on("resize.onScreen",A),"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=jQuery:"function"==typeof define&&define.amd&&define("jquery-onscreen",[],function(){return jQuery})})}}(jQuery);
//# sourceMappingURL=jquery.onscreen.min.js.map


/*
$('.well-assignment').onScreen({

    doIn: function() {
        $(this).addClass('animated fadeIn')
        // Do something to the matched elements as they come in
    },
    doOut: function() {
        // Do something to the matched elements as they get off scren
    },
    tolerance: 150,
    throttle: 50,
    toggleClass: 'animated fadeIn'
});*/
$(document).ready(function(){
    $('[data-title="Copyright"]').popover();
});

$(document).ready(function(){
    var scrollTop = 0;
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        $('.counter').html(scrollTop);

        if (scrollTop >= 100) {
            $('nav').addClass('smaller');
            $('#menu_inner').addClass('smaller');
            $('#toolbox_menu').addClass('smaller');
        } else if (scrollTop < 100) {
            $('nav').removeClass('smaller');
            $('#menu_inner').removeClass('smaller');
            $('#toolbox_menu').removeClass('smaller');
        }

    });

});
/*$(document).ready(function () {
    var info = {
        book: courseFolder,
        page: current_module + '_' + current_lesson + '_' + current_page
    };

    //$.getScript( "//flvstoolbar.speechstream.net/flvs/standardconfigdemo.js", function( data, textStatus, jqxhr ) {
    $.getScript("//flvstoolbar.speechstream.net/flvs/speechstreamtoolbardemo.js", function (data, textStatus, jqxhr) {
        TexthelpSpeechStream.addToolbar(info.book, info.page);
    });


});*/

// $(function() {
//   var loc = window.location.href; // returns the full URL
//   console.log(loc)
//   if(/welcome_/.test(loc)) {
//     $('nav').css('display', 'none');
//   }
// });

var courseFolder = 'educator_elemart4_v17';
settings['course_folder'] = 'educator_elemart4_v17';
settings['course_title'] = 'Elementary Art Grade 4';

//Take out the div around angular interactives
$('.ng_il').each(function() {
    $(this).parent('div').removeClass('interactive-container');
});

function navFix() {
    $('.modlink').click(function() {
        $('.module_li a.modlink').hide();
    });
    $('.navBack').click(function() {
        $('.module_li a.modlink').show();
    });
    $('.navClose').click(function() {
        $('.module_li a.modlink').show();
    });
};