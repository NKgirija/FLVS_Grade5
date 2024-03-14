function closex() {
    $("#instructions").toggleClass("hidden");
    $("#closex2").toggleClass("hidden");
}

function closex2() {
    $("#instructions").toggleClass("hidden");
    $("#closex2").toggleClass("hidden");
}
$( document ).ready(function() {

    document.getElementById("1l").innerHTML = document.getElementById("1").value + "x";
    document.getElementById("2l").innerHTML = document.getElementById("2").value + "x";
    document.getElementById("3l").innerHTML = document.getElementById("3").value + "x";
    document.getElementById("4l").innerHTML = document.getElementById("4").value + "x";
    document.getElementById("5l").innerHTML = document.getElementById("5").value + "x";

    var slidervalue = document.querySelector('input[name="magvalue"]:checked').value;

    $('input[name="magvalue"]').change(function () {
        /* Check radio button states:*/
        for (let i = 1; i < 6; i++) {
            /* Clear radio button states:*/
            document.getElementById(i).classList.remove("ischecked");
            /* Add 'ischecked' class to active radio button:*/
            if (document.getElementById('1').checked) {
                this.classList.add("ischecked");
            } else if (document.getElementById('2').checked) {
                this.classList.add("ischecked");
            } else if (document.getElementById('3').checked) {
                this.classList.add("ischecked");
            } else if (document.getElementById('4').checked) {
                this.classList.add("ischecked");
            } else if (document.getElementById('5').checked) {
                this.classList.add("ischecked");
            }
        }
        slidervalue = document.querySelector('input[name="magvalue"]:checked').value;
        magnify("myimage");
        console.log('I ran', slidervalue);
    });

    $("#minus").click(function(){
        document.getElementById(slidervalue).classList.remove("ischecked");
        if (slidervalue > 1) {
            $('#' + slidervalue).prop("checked", false);
            slidervalue--;
            $('#' + slidervalue).prop("checked", true);
        }
        document.getElementById(slidervalue).classList.add("ischecked");
        magnify("myimage", slidervalue);
    });

    $("#plus").click(function(){
        document.getElementById(slidervalue).classList.remove("ischecked");
        if (slidervalue < 5) {
            $('#' + slidervalue).prop("checked", false);
            slidervalue++;
            $('#' + slidervalue).prop("checked", true);
        }
        document.getElementById(slidervalue).classList.add("ischecked");
        magnify("myimage", slidervalue);
    });

    magnify("myimage");

    function magnify(imgID) {
        console.log('magnify function value is ', slidervalue)

        $('.img-magnifier-glass').remove();

        var img, glass, w, h, bw;
        img = document.getElementById(imgID);
        /* Create magnifier glass:*/
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");
        glass.setAttribute("id", "img-magnifier-check");

        /* Insert magnifier glass:*/
        img.parentElement.insertBefore(glass, img);

        /* Set background properties for the magnifier glass:*/
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * slidervalue) + "px " + (img.height * slidervalue) + "px";


        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;

        /* Execute a function when someone moves the magnifier glass over the image: */
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);

        /*and also for touch screens:*/
        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);

        function moveMagnifier(e) {
            var pos, x, y;
            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault();
            /* Get the cursor's x and y positions: */
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;

            /* Prevent the magnifier glass from being positioned outside the image: */
            if (x > img.width - (w / slidervalue)) {
                x = img.width - (w / slidervalue);
            }
            if (x < w / slidervalue) {
                x = w / slidervalue;
            }
            if (y > img.height - (h / slidervalue)) {
                y = img.height - (h / slidervalue);
            }
            if (y < h / slidervalue) {
                y = h / slidervalue;
            }
            /* Set the position of the magnifier glass: */
            glass.style.left = (x - w) + "px";
            glass.style.top = (y - h) + "px";
            /* Display what the magnifier glass "sees": */
            glass.style.backgroundPosition = "-" + ((x * slidervalue) - w + bw) + "px -" + ((y * slidervalue) - h + bw) + "px";
        }

        function getCursorPos(e) {
            var a, x = 0, y = 0;
            e = e || window.event;
            /* Get the x and y positions of the image: */
            a = img.getBoundingClientRect();
            /* Calculate the cursor's x and y coordinates, relative to the image: */
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return {x: x, y: y};
        }
    }
});