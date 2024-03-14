var sel_marker = "null"
var ele_art = {
    pagecheckbox: function () {
        function _thisinit() {
            $(document).find(".checkbox-animated").each(function () {
                var input = $(this).find('input[type=checkbox]');
                var label = $(this).find('label');
                var boxcheck = $(this).find('label .check');
                var atag = $(this).find('a');
                if ($(label).length && $(input).length && $(boxcheck).length) {
                    $(label).attr("tabindex", "0").off("keypress", onlabelKeydown).on("keypress", onlabelKeydown);
                    if ($(atag).length || $(this).text().trim() == "") {
                        $(this).addClass("fev_disTable");
                        $(label).addClass("fev_unfocus")
                        $(label).off("focus", onlabelfocus).on("focus", onlabelfocus);;
                        $(label).off("blur", onlabelblur).on("blur", onlabelblur);
                    }

                    if ($(atag).length) {
                        //$(atag).attr("tabindex", "-1")
                        var txt = $(atag).text().trim();
                        $(label).attr("aria-label", txt);
                        $(label).attr("alt", txt);
                    }

                    if ($(this).text().trim() == "") {
                        $(label).addClass("fev_emptylabel")
                    }
                }
            })
        }

        function onlabelfocus() {
            $(this).closest(".checkbox-animated").addClass("fev_addfocus")
        }

        function onlabelblur() {
            $(this).closest(".checkbox-animated").removeClass("fev_addfocus")
        }

        function onlabelKeydown(e) {
            if (e.which == 13 && $(e.currentTarget).is(":focus")) {
                $(e.currentTarget).click();
            }
        }

        _thisinit();
    },

    addTabindex: function () {
        $(document).find(".nav-tabs li a").each(function () {
            var _this = $(this)
            _this.attr("tabindex", "0")//.off("blur", addIndexToTabs).on("blur", addIndexToTabs);
            //_this.attr("tabindex", "0").off("focus", addIndexToTabs).on("focus", addIndexToTabs);           
            $(_this).on("click", ontabpanelclick);
        })
        $(document).find(".panel-heading a").each(function () {
            var _this = $(this)
            // $(_this).attr("tabindex", "0").off("keypress", onpanelKeydown).on("keypress", onpanelKeydown);    
            $(_this).off("focus", onpanelfocus).on("focus", onpanelfocus);;
            $(_this).off("blur", onpanelblur).on("blur", onpanelblur);

        })
        $(document).find("a").each(function () {
            var _this = $(this)
            $(_this).attr("tabindex", "0").off("keypress", onpanelKeydown).on("keypress", onpanelKeydown);

        })
        function addIndexToTabs() {
            setTimeout(function () {
                $(document).find(".nav-tabs li a").each(function () {
                    var _this = $(this)
                    _this.attr("tabindex", "0")

                })
            }, 100)
        }
        function ontabpanelclick() {
            addIndexToTabs()
        }
        function onpanelfocus() {
            $(this).closest(".panel-heading").addClass("focusOutline")
        }

        function onpanelblur() {
            $(this).closest(".panel-heading").removeClass("focusOutline")
        }

        function onpanelKeydown(e) {
            if (e.which == 13 && $(e.currentTarget).is(":focus")) {
                $(e.currentTarget).click();
            }
        }

    },
    click2revealTV: function () {
        $('.ng_il').on('quizmoReady', function () {
            var _this = $(this);
            setTimeout(function () {
                if ($(_this).hasClass("greenangles")) {
                    fev_greenangles(_this, 1);
                }
                if ($(_this).hasClass("fev_imagemarker")) {
                    fev_imagemarker_fun(_this, 1);
                }
                if ($(_this).hasClass("fev_imagemarker_1")) {
                    fev_imagemarker_fun_1(_this, 1);
                }

                if ($(_this).hasClass("fev_c2ractivty")) {
                    fev_c2ractivty_fun(_this, 1);
                }
            }, 100)

        });

        function fev_c2ractivty_fun(_this, count) {

            setTimeout(function () {
                if ($(_this).hasClass("fev_c2ractivty")) {
                    var _thisdata = $(_this).attr("data-json")
                    $.getJSON(_thisdata, function (data) {

                        data.body.forEach(function (obj, i) {
                            if (obj.fev_citation != undefined) {
                                var currentSlide = $(_this).find(".details").eq(i);
                                var image = $(currentSlide).find("img");
                                var caption = "<div class='fev_citation'><span class='caption'>" + obj.fev_citation + "</span></div>"
                                image.before(caption);
                                var captionHolder = $(currentSlide).find(".fev_citation");
                                $(captionHolder).prepend($(image));
                            }
                        })


                        var firstPage = $(_this).find("#details #instructions");
                        var fevhome_img = $(firstPage).find("img");
                        var fevhome_h4 = $(firstPage).find("h4");
                        if ($(fevhome_img).length) {
                            var twocol = "<div class='row fev_home_row'><div class='fev_home_ins col-sm-6'></div><div class='fev_home_img col-sm-6'></div></div>";
                            $(firstPage).append($(twocol));
                            var homerow = $(_this).find(".fev_home_row");
                            $(homerow).find(".fev_home_img").append($(fevhome_img))
                            $(homerow).find(".fev_home_ins").append($(fevhome_h4));
                        }

                    })

                } else {
                    if (count < 4) {
                        fev_c2ractivty_fun(_this, ++count);
                    }
                }
            }, 300)


        }

        function fev_greenangles(_this, count) {
            setTimeout(function () {
                if ($(_this).hasClass("greenangles")) {
                    $(_this).find("#click2RevealApp #vocab #details p a").each(function () {
                        var _thisref = $(this)
                        _thisref.attr("tabindex", "0").off("keypress", ontooltipClick).on("keypress", ontooltipClick);
                    })
                    var getimg = $(_this).find("#click2RevealApp #vocab #details #instructions h4 img");
                    var imgalt = "";
                    var tv = $(_this).find("#click2RevealApp .il_textversion");
                    var tvHeader = $(tv).find("h2.il_int_title");

                    if ($(getimg).length) {
                        imgalt = $(getimg).attr("alt");
                        if (imgalt != undefined) {
                            imgalt = imgalt.trim();
                            if (imgalt != "" && $(tv).find(".fevimg_alt").length == 0) {
                                imgalt = "<p class='fevimg_alt'>Image of: " + imgalt + "</p>";
                                $(tv).find(".il_wrapper").prepend(imgalt);
                            }
                        }
                    }

                    if ($(tvHeader).length) {
                        var tvHeadertxt = $(tvHeader).text().split("—")[0].trim();
                        $(tvHeader).text(tvHeadertxt);
                    }
                } else {
                    if (count < 4) {
                        fev_greenangles(_this, ++count);
                    }
                }
            }, 300)

        }
        function ontooltipClick(e) {
            if (e.which == 13) {
                $(e.currentTarget).click();
            }
        }
        function fev_imagemarker_fun(_this, count) {
            setTimeout(function () {
                if ($(_this).hasClass("fev_imagemarker")) {
                    check_marker_pointer(_this)

                } else {
                    if (count < 4) {
                        fev_imagemarker_fun(_this, ++count);
                    }
                }
            }, 300)

        }
        function fev_imagemarker_fun_1(_this, count) {
            setTimeout(function () {
                if ($(_this).hasClass("fev_imagemarker_1")) {
                    check_marker_pointer_1(_this)

                } else {
                    if (count < 4) {
                        fev_imagemarker_fun_1(_this, ++count);
                    }
                }
            }, 300)
        }
        function check_marker_pointer_1(_this) {
            $(_this).find(".imageMarker .imageMarkerHolder .markerWrap .marker .marker").each(function () {
                var _thisref = $(this)
                _thisref.on("click", getcurrentpoint);
                _thisref.off("keyup", onpointdown).on("keyup", onpointdown);
            })
        }
        function check_marker_pointer(_this) {
            $(_this).find(".imageMarker .imageMarkerHolder .markerWrap .marker .point").each(function () {
                var _thisref = $(this)
                _thisref.on("click", getcurrentpoint);
                _thisref.off("keyup", onpointdown).on("keyup", onpointdown);
            })
        }
        function getcurrentpoint() {
            sel_marker = this;
            $(document).find(".imageMarker .imageMarkerHolder .markerPopup .markerPopupClose").each(function () {
                var _thisref = $(this)
                _thisref.on("click", onpopupclose);

            })
        }
        function onpointdown(e) {
            if (e.which == 13) {
                $(this).click()
            }
        }
        /* function oncloseKeydown(e) { 
          //  alert("close")                  
            if (e.which == 13) {                       
                $(this).click()             
            }
        } */

        function onpopupclose() {
            if (sel_marker != "null") {
                setTimeout(function () {
                    focusback_onpointer()
                    //console.log(sel_marker +" focus back to prev button")
                }, 200)
            }
        }
        function focusback_onpointer() {
            sel_marker.focus();
            sel_marker = "null"
        }

    },
    carouselNavigation: function () {
        if ($(document).find(".carousel")) {
            ele_art.check_carouselNavigation()
        }
    },
    check_carouselNavigation: function () {
        $(".left").attr("tabindex", "-1")
        $(".carousel a.carousel-control").each(function () {
            var sronly = $(this).find("span.sr-only");
            if ($(sronly).length > 1) {
                var clone = $(sronly).eq(0).clone();
                $(sronly).remove()
                $(this).append($(clone))
            }
        })
        $('#imageSlider1').on('slid.bs.carousel', function (e) {
            setTimeout(function () {
                checkNav()
            }, 100)
        })
        function checkNav() {
            var Prev = $(".left")
            var next = $(".right")
            $(".left").attr("tabindex", "0")
            $(".right").attr("tabindex", "0")
            if ($(Prev).hasClass('disabled')) {
                $(".left").attr("tabindex", "-1")
                $(next).focus()
            }
            else if ($(next).hasClass('disabled')) {
                $(".right").attr("tabindex", "-1")
                $(Prev).focus()
            }

        }

    },

    addCharacterLabel: function () {
        function _thisinit() {
            // Module 1 Characters
            $(document).find(".dialog-item-lauraline").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Laura Line" });
                // $(this).find(".dialog-head").attr("alt", "Laura Line");
            })
            $(document).find(".layout-character-lauraline").each(function () {
                $(this).find(".character-image").attr({ "role": "img", "aria-label": "Laura Line" });
                //$(this).find(".character-image").attr("alt", "Laura Line");
            })
            $(document).find(".dialog-item-banksy").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Banksy" });
            })
            $(document).find(".dialog-item-mondrian").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Piet Mondrian" });
            })
            
            // Module 2 Characters
            $(document).find(".layout-character-stellashape").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Sam Shape" });
                // $(this).find(".dialog-head").attr("alt", "Sam Shape");
            })
            $(document).find(".dialog-item-stellashape").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Sam Shape" });
                // $(this).find(".dialog-head").attr("alt", "Sam Shape");
            })

            $(document).find(".dialog-item-hilma-af-klint").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Hilma af Klint" });
            })

            
            // Module 3 Characters
            $(document).find(".layout-character-cassat").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Cassatt Color" });
                // $(this).find(".dialog-head").attr("alt", "Cassatt Color");
            })
            $(document).find(".dialog-item-cassat").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Cassatt Color" });
                // $(this).find(".dialog-head").attr("alt", "Cassatt Color");
            })
            $(document).find(".dialog-item-mary-cassatt").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Mary Cassatt" });
            })
            $(document).find(".dialog-item-seurat").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Seurat" });
            })

            // Module 4 Characters
            $(document).find(".layout-character-vincent").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Vincent Value" });

            })
            $(document).find(".dialog-item-vincent").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Vincent Value" });
            })
            $(document).find(".dialog-item-hiroshige").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Utagawa Hiroshige" });
            })
            $(document).find(".dialog-item-picasso").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Picasso" });
            })

            
            // Module 5 Characters
            $(document).find(".layout-character-salvadorspace").each(function () {
                $(this).find(".character-image").attr({ "role": "img", "aria-label": "Salvador Space" });

            })
            $(document).find(".dialog-item-salvadorspace").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Salvador Space" });
            })
            $(document).find(".dialog-item-dali").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Salvador Dalí" });
            })
            $(document).find(".dialog-item-wright").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Frank Lloyd Wright" });
            })

           
            // Module 6 Characters
            $(document).find(".layout-character-frankform").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Frank Form" });

            })
            $(document).find(".dialog-item-frankform").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Frank Form" });
            })
            $(document).find(".dialog-item-lewis").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Mary Edmonia Lewis" });
            })


             
            // Module 7 Characters
            $(document).find(".layout-character-tamaratexture").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Tamara Texture" });

            })
            $(document).find(".dialog-item-tamaratexture").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Tamara Texture" });
            })
            $(document).find(".dialog-item-anatsui").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "El Anatsui" });
            })

            // Module 8 Characters
            $(document).find(".dialog-item-frida").each(function () {
                $(this).find(".dialog-head").attr({ "role": "img", "aria-label": "Frida Kahlo" });
            })

        }

        _thisinit();
    },

    init: function () {
        ele_art.click2revealTV();
        ele_art.addTabindex()
        ele_art.pagecheckbox();
        ele_art.addCharacterLabel();
        ele_art.carouselNavigation()

    }
}

$(document).ready(function () {
    setTimeout(ele_art.init, 300);
})
