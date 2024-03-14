/**
 * Holds the default config values 
 *
 */
var config = {}
var appData = undefined;


var unmutedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsBJREFUeNrsWTtOw0AQDb4AqamcE+CcgLihxbmB0yNBTuDkBCQSvX0DJy1NzAkwJyAVdbgBM9IkGkbrDbZ3HRf7pJEVvJ95O5+dMYOBg4ODg4NDc1z1VbGb1/sAHgnIEGT5/fhW6MZ7lpWJQHKQYYPpSCICmYDkRKxbIqg4SIoKkDJByyXxIHawpt8ZEdgMT/ADJG651BLkIMjk1omQFV7w5ED8tutBTJTwCAWZAPZYWAt2skKqIRDqgpX8/4VOfQ1jM/YuprU5RjBmb9QihqyQUFAjoRSTBLMMktooxptxLTxFEIyFZwNGPYjfqQjsuRgTy8D3GpJYUEAHhkJsrgjslFkF3Wgt5jw1JsKskJjMdKDoQRHYE+5igExMi5TBTkF1DLg/aRA2WtCYHflyXZyCnVzig/bBv02JCL57Jh2OKOBdyHTMBYExZbc/FkkVJGwgZvtMuOKg1Aoee2EV7r7bKqt4g+4h03BM6ZtfhFUuJLPX3cWIkItlmnRaqSy5ILeYf0mLoEIzhQsNmbIlfyem94dIxckHFcpKlJ2X8Wew1RD51Mz76RuRc7d7LVySyIPG92818677RiTS+L6uAA16Q4S6R1/c4MfbfSiUlfeOr7KidwESE0X3uNRY6p03b70horgXMtF0JZo0XUnS05QGtpCxkyyohB+wolG6XKlJEJtGre4/Wtqz1e+ZdncnClesjDesav7ibgXvRo1ci5QZg6xMfz5SkCiOJFjVXFkZ1I4RzC4gc2qE9oa4yD4IM9iMEfVlRyg7xsbBzqyTGSAi+6CZ+EoiiWZGv6KQdfDkpi1LjCUFfkkkNqJzjTTp2tx3LebnqWLTfwV7jQRwar2t3OxknakB6+hIlCoSVi5EcouRorSoi0SRAKadVr9knZAuu6KqGapZ4ocywK3EiIWarNY/ehwcHBwcHNrgV4ABABmcGUv+j6TkAAAAAElFTkSuQmCC';
var mutedIcon =   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAelJREFUeNrsmUtugzAQhl3EAbLuqr1BcgPYdNvkBIV9F80JGk6QVuoejpB1NnAEblBWXXOEjqup5CACHoNjI80vjZwHxv4yMx7jCMFisVgsFkvc2bz5/dfTFpoXsPTn9dzaHCu0BLCC5giW4EefYNWiQAAigiYHe7hlaIUze+Ed7M1FjoRL9oKqYAYImQulS4hJHgGANXph7cPyGxpCHDAfTH+AI77dw7JcG6yG0vs19N0b1ZEJXohh0Arv8a2EYYvf1ZoQZWdsWZ+KC4/AhQnSrjr3yODiA74+zhBKai79TQ7GHoS5AiHUuarJnvdA2NBHz2RK9DYFQnqzmG3VogrjutCBGYGI1W1P4GKFgQmkYzAaEPWsdcQSTESBcAoyBkOBcA4yACMoEF6AaMBo1RovQDCxJ9WnwBOIcgBksM54AaIBoQ0TeAghc2KjWzSdgugUO52ieQ0k8wWCsgMw3cabPtKq23gJEVGWWOiTKycyFyEIfRpyaOFkNj07WIpIECOeSYxzRO44cQcbgzUGIA212A3AVJOTXfFOQQ0zzMcMQ6MmjClhUuy7+w9Xco4M5M525MEsVgf18jgIf6kTNI9gp8Wea3VyZyddjrG/TJAe71S3BLH9t4I8B37GxGwFi8VisVgsu/oVYAALWu+fsCIWUQAAAABJRU5ErkJggg==';
//var bodyHTML = '<div id="actCont"><canvas id="canvas" width="750" height="650"></canvas></div>';
var focusPlayCnt = 0;
var focusPlayIndicator;


document.addEventListener("DOMContentLoaded", function() { // the page must be loaded before starting
   /**
    *
    * This triggers the entire init process, once the data from config is 
    * retrieved the html will be built and the drawing area will initialized
    *
    **/


   var instance_json = parseFromGET('instance_json');
   if (typeof instance_json === 'string' && instance_json.length > 0) {
      //instance_json was provided in url, use that to acquire instance json
   }
   else {
      //instance_json was not un url, default to 'data/data.json'
      instance_json = 'data/data.json';
   }

   getJSON(instance_json, function(e) {
      // success
      appData = e
      if(e.Config){
         config = e.Config
      } else {
         config = e
      }   
      BuildPage(BuildInteracitve);
   }, function(e) {
      // on fail try anyway
      console.log(e)
      BuildPage(BuildInteracitve);
   });


});



/**
 *
 * @function BuildPage
 *
 * This will load in the Scripts, canvas element, its wrapper, instruction elements, and the title
 *
 * @param callback:function - after the scripts are loaded this will be called.
 * @return Void 0
 *
 */
window.BuildPage = function(callback) {

   document.title = config.InteractiveTitle

   // Generating HTML content
   var drawToolScript = document.createElement("script");
   drawToolScript.type = "text/javascript";
   drawToolScript.src = "js/DrawingAreaManager.js";
   drawToolScript.onload = callback
   document.head.appendChild(drawToolScript)

   var activeStyle = document.createElement("link");
   activeStyle.type = "text/css";
   activeStyle.rel = "stylesheet"
   activeStyle.href = "css/drawToolExample.css";
   document.head.appendChild(activeStyle)

   wrapperDiv = document.createElement("div");
   wrapperDiv.setAttribute("class", "daContainer")
   wrapperDiv.setAttribute("id", "actCont")

   interactiveCanvas = document.createElement("canvas");
   interactiveCanvas.setAttribute("id", "MyDrawing")
   interactiveCanvas.setAttribute("width", "750")
   interactiveCanvas.setAttribute("height", "580")
   interactiveCanvas.setAttribute("aria-hidden", "true")
   interactiveCanvas.setAttribute("draggable", "false")
   wrapperDiv.appendChild(interactiveCanvas)

   controlCont = document.createElement("div");
   controlCont.setAttribute("id", "controlCont")
   muteToggle = document.createElement("div");
   muteToggle.setAttribute("id", "muteToggle")
   muteToggle.innerHTML = "<img src='" + unmutedIcon + "'/>"
   controlCont.appendChild(muteToggle)
   wrapperDiv.appendChild(controlCont)

   document.body.appendChild(wrapperDiv) 
   window.focus();
   makeMuteButton();
}

/**
 *
 * @function BuildInteracitve
 *
 * After the page is built this will call the initialization of the Drawing Area interactive from th Drawing Area Manager.
 * all of the drawing area options and json links are here
 *
 * @param Void 0
 * @return Void 0
 *
 */
window.BuildInteracitve = function() {
   // manages your Drawing Areas gets all the resources needed to use them
   window.daMan = new DrawingAreaManager()
   window.daMan.RequestDrawingArea('MyDrawing', {
      backgroundImage: config.Background,
      overlayImage: "img/mainMask.png",
      SlideData: config.SlideData,
      cropRect: [92, 60, 635, 466],
      adaptive: true,
      useWalkthroughs: [
        "data/flvsWalkthroughData.txt"
      ],
      useToolbars: [
        "data/flvsToolbarMain.txt"
      ],
      useModals: [
        "data/flvsModalIntro.txt",
        "data/flvsModalClearConfirm.txt",
        "data/flvsModalSlideInstruction.txt"
      ],
      events: {
         onPreInit: window.buildPlayScreen,
         onSlideOpen: window.HandleSlideOpen,
         onReady: window.HandleReady,
         onSaveReq: window.HandleSaveFrame,
         onSaveEnd: window.HandleSaveResetFrame,
         onDaca_DrawColor: window.HandleColorChange,
         onDaca_CloseModal: window.HandleWindowClose,
         onUndoStart: window.HandleUndoRequest,
         onUndoEnd: window.HandleUndoEnd
      }
   });


}

/**
 *
 * @function HandleReady
 *
 * This custom event is triggered by the Drawing area being fully loaded and ready.
 * this function will open the introduction modal.
 *
 * @param e:DrawingAreaEvent
 * @return Void 0
 *
 */
window.HandleReady = function(e) {
   //buildPlayScreen()

   if(config.IntroWindowText && config.IntroWindowText != ""){
      slidesNotPopulated = true

      if(config.SlideData){
         for (var sld = config.SlideData.length - 1; sld >= 0; sld--) {
            if(config.SlideData[sld].SlideInstruction && config.SlideData[sld].SlideInstruction !== ""){
               slidesNotPopulated = false
            } 
         }


         if(slidesNotPopulated){
            for (var sld = config.SlideData.length - 1; sld >= 0; sld--) {
               config.SlideData[sld].SlideInstruction = config.IntroWindowText
               if(sld != 0){
                  config.SlideData[sld].instructSeen = true
               } else {
                  config.SlideData[sld].instructSeen = false
               }
            }
            
            e.targDa.OpenSlideInstructions(config.SlideData[(e.targDa._currentSlideIndex)].SlideInstruction)
         } else if(config.SlideData[0].SlideInstruction == undefined || config.SlideData[0].SlideInstruction == ""){
            config.SlideData[0].SlideInstruction = config.IntroWindowText
         } else {
            config.IntroWindowText = undefined
            e.targDa.OpenSlideInstructions(config.SlideData[(e.targDa._currentSlideIndex)].SlideInstruction)
         }
      } else {
         e.targDa.OpenSlideInstructions("intro")
      }



   } else {
      if( config.SlideData[0].SlideInstruction && config.SlideData[0].SlideInstruction !== ""){
         e.targDa.OpenSlideInstructions(config.SlideData[(e.targDa._currentSlideIndex)].SlideInstruction)
      } 
   }

}

/**
 *
 * @function HandleSlideOpen
 *
 * This custom event is triggered by the Drawing area is opening a slide it will provide instructions to the user via a window.
 *
 * @param e:DrawingAreaEvent
 * @return Void 0
 *
 */
window.HandleSlideOpen = function(e) {
   if(e.targDa._currentSlideIndex == 0){
      e.targDa.GetDaObjectById("Previous").Hide()
   } else {
      e.targDa.GetDaObjectById("Previous").Show()
   }

   if(e.targDa._usingSlidesData == false || e.targDa._currentSlideIndex  == e.targDa._usingSlidesData.length - 1){
      e.targDa.GetDaObjectById("Next").Hide()
   } else {
      e.targDa.GetDaObjectById("Next").Show()
   }

   e.targDa._cjsStage.update()

}

/**
 *
 * @function HandleSaveFrame
 *
 * This custom event is triggered by the Drawing area calling a capture or print request.
 * this function will define an alternate overlay image (the frame) and move the drawing area to fit into it.
 *
 * @param e:DrawingAreaEvent
 * @return Void 0
 *
 */
window.HandleSaveFrame = function(e, callback) {
   e.targDa._displayLayers.overlay.image.src = "img/saveMask.png"
   e.targDa._displayLayers.histLayer.x = -33
   e.targDa._displayLayers.histLayer.y = 12

   if (e.targDa._displayLayers.bgMask) {
      e.targDa._displayLayers.bgMask.x = 59
      e.targDa._displayLayers.bgMask.y = 72
   }

   if(e.data){
      if(e.targDa._displayLayers.overlay.image.complete){
         e.data()
      } else {
         e.targDa._displayLayers.overlay.image.onload = function(){
            e.targDa._displayLayers.overlay.image.onload = undefined
            e.data()
         } 
      }
   }
}


/**
 *
 * @function HandleSaveResetFrame
 *
 * This custom event is triggered by the Drawing area calling a capture or print request, after the request has completed.
 * this function will define an alternate overlay back it its default and put the drawing area back to its original position.
 *
 * @param e:DrawingAreaEvent
 * @return Void 0
 *
 */
window.HandleSaveResetFrame = function(e) {
   e.targDa._displayLayers.overlay.image.src = "img/mainMask.png"
   e.targDa._displayLayers.histLayer.x = 0
   e.targDa._displayLayers.histLayer.y = 0

   if (e.targDa._displayLayers.bgMask) {
      e.targDa._displayLayers.bgMask.x = 92
      e.targDa._displayLayers.bgMask.y = 60
   }

}

/**
 *
 * @function HandleColorChange
 *
 * This custom event is triggered by a request to change the primary drawing color,  this will set all toggles and subtiggled with alternate color options to
 * change.
 *
 * @param e:DrawingAreaEvent
 * @return Void 0
 *
 */
window.HandleColorChange = function(e) {
   baseToggles = e.targDa._toolbarManagerRef._toolbars[0]._toggles

   for (var i = baseToggles.length - 1; i >= 0; i--) {
      if (baseToggles[i]._options.altFrameLocs && baseToggles[i]._options.altFrameLocs[e.caller._id]) {
         baseToggles[i].UseAltFrames(e.caller._id)
      }

      if (baseToggles[i]._flyoutRef.subToggles) {
         for (var st = 0; st < baseToggles[i]._flyoutRef.subToggles.length; st++) {
            subTog = baseToggles[i]._flyoutRef.subToggles[st]
            if (subTog._options.altFrameLocs) {
               subTog.UseAltFrames(e.caller._id)
            }
         }
      }
   }
}

window.HandleWindowClose = function(e) {
   if(e.data[0].data == 'intro'){
      if(config.SlideData && e.targDa._currentSlideIndex == 0){

         if( config.SlideData[0].SlideInstruction && config.SlideData[0].SlideInstruction !== ""){
            e.targDa.OpenSlideInstructions(config.SlideData[(e.targDa._currentSlideIndex)].SlideInstruction)
         }

      } 
   }
      
   return
}

/**
 *
 * @function HandleUndoRequest
 *
 * Disables undo button, thus preventing over-clicking
 *
 * @param e:DrawingAreaEvent
 * @return Void 0
 *
 */
window.HandleUndoRequest = function(e) {
   button = e.targDa.GetDaObjectById("undo")
   button.Disable()
   return
}

/**
 *
 * @function HandleUndoEnd
 *
 * Returns undo button to normal state
 *
 * @param e:DrawingAreaEvent
 * @return Void 0
 *
 */
window.HandleUndoEnd = function(e) {
   button = e.targDa.GetDaObjectById("undo")
   button.Enable()
   return
}


/**
 *
 * @function getJSON
 *
 * originally from //youmightnotneedjquery.com/ (heavily modified, also used in the D2l Adventure Engine) as an alternative to $getJSON
 *
 * This function will grab json data from external sources for use in this script (config.txt)
 *
 * @param source:String - the external location of the JSON or TXT file
 * @param onDone:Function - callback for successful load
 * @param onFail:Function - callback for unSucessful load
 * @return Void 0
 *
 */
window.getJSON = function(source, onDone, onFail) {
   var request;
   request = new XMLHttpRequest;
   request.open('GET', source, true);
   request.onload = function(e) {
      var data;
      if (request.status >= 200 && request.status < 400) {
         try {
            data = JSON.parse(request.responseText);
            if (onDone) {
               onDone(data);
            }
         } catch (_error) {
            e = _error;
            if (onFail) {
               onFail(e);
            }
         }
      } else {
         if (onFail) {
            onFail(e);
         }
      }
   };
   request.onerror = function(e) {
      if (onFail) {
         onFail(e);
      }
   };
   request.send();
};


// parseFromGET parses the location's GET string for a key (val)
function parseFromGET(val) {
   var result = null,
      tmp = [];
   location.search
      .substr(1)
      .split("&")
      .forEach(function(item) {
         tmp = item.split("=");
         if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
      });
   return result;
}

function HandlePlayscreenKeyEvent(evt) {
   // If it's the enter key or the space key
   if (evt.which === 13 || evt.which === 32) {
      if (focusPlayCnt !== 0) {
         playScreenCont.children[focusPlayCnt]._listeners.click[0]();
      }
   }

   // If it's the left arrow
   if (evt.which === 37) {
      focusPlayCnt--;

      if (focusPlayCnt < 0) {
         focusPlayCnt = 2;
      }

      focusPlayScreen();
   }

   // If it's the right arrow
   if (evt.which === 39) {

      focusPlayCnt++;

      if (focusPlayCnt > 2) {
         focusPlayCnt = 0;
      }

      focusPlayScreen();
   }

}

function buildPlayScreen() {
   scale = window.daMan._DrawAreas[0]._globalScale
   playScreenCont = window.daMan._DrawAreas[0]._playScreenCont

   bscale = window.daMan._fontScaleAdjust 
   font = window.daMan._defaultFont

   // Loads the background for the play screen
   playScreen = new createjs.Bitmap(window.daMan._loadedAssets.getResult('playScreenBG'));

   playScreen.scaleX = playScreen.scaleY = scale;
   playScreenCont.addChild(playScreen);

   document.addEventListener('keydown', HandlePlayscreenKeyEvent);

   // Loads the background for the play screen
   goPlay = function() {
      focusPlayCnt = 0;
      focusPlayScreen();
      document.removeEventListener('keydown', HandlePlayscreenKeyEvent);

      //window.daMan.RequestInitDas();
      //buildActivity();

      // Makes the play screen slide off screen
      createjs.Tween.get(playScreenCont, {
         loop: false
      }).to({
         y: -750
      }, 500, createjs.Ease.getPowInOut(3));

      setTimeout(function() {
         playScreenCont.removeAllChildren();
         window.daMan._DrawAreas[0]._cjsStage.removeChild(playScreenCont);
      }, 500);
   }

   var spriteData = {
      images: [window.daMan._loadedAssets.getResult('playSpritesImg')],
      frames: [
         [2, 2, 233, 233, 0, 0, 0],
         [237, 2, 233, 233, 0, 0, 0]
      ],
      animations: {
         normal: [0, 0, "normal"],
         over: [1, 1, "over"]
      }
   };

   mainPlayButton = new createjs.Container()
   mainPlayButtonSprite = new createjs.Sprite(new createjs.SpriteSheet(spriteData));
   mainPlayButtonSprite.x = 30 * scale
   mainPlayButtonSprite.y = 50 * scale
   mainPlayButtonSprite.scaleX = mainPlayButtonSprite.scaleY = scale;
   mainPlayButtonSprite.gotoAndStop("normal")
   mainPlayButton.addChild(mainPlayButtonSprite);

   mainPlayButton.on("mouseover", function(e) {
      mainPlayButtonSprite.gotoAndStop("over")
   })
   mainPlayButton.on("mouseout", function(e) {
      mainPlayButtonSprite.gotoAndStop("normal")
   })
   mainPlayButton.on("click", function() {
      var el = document.getElementById('muteToggle');
      if (el) {
         el.innerHTML = "<img src='" + unmutedIcon + "'/>";
         el.classList.remove('muted');
         createjs.Sound.volume = 1;
      }
      goPlay()
   })
   playScreenCont.addChild(mainPlayButton);

   var spriteData2 = {
      images: [window.daMan._loadedAssets.getResult('playSpritesImg')],
      frames: [
         [2, 237, 67, 66, 0, 0, 0],
         [71, 237, 66, 66, 0, 0, 0]
      ],
      animations: {
         normal: [0, 0, "normal"],
         over: [1, 1, "over"]
      }
   };

   secondaryPlayButton = new createjs.Container()

   secondaryPlayButtonSprite = new createjs.Sprite(new createjs.SpriteSheet(spriteData2));
   secondaryPlayButtonSprite.scaleX = secondaryPlayButtonSprite.scaleY = scale;
   secondaryPlayButtonSprite.gotoAndStop("normal")
   secondaryPlayButtonSprite.x = 529 * scale
   secondaryPlayButtonSprite.y = 365 * scale
   secondaryPlayButton.addChild(secondaryPlayButtonSprite)

   secondaryPlayButton.on("mouseover", function(e) {
      secondaryPlayButtonSprite.gotoAndStop("over")
   })
   secondaryPlayButton.on("mouseout", function(e) {
      secondaryPlayButtonSprite.gotoAndStop("normal")
   })
   secondaryPlayButton.on("click", function() {
      var el = document.getElementById('muteToggle');
      if (el) {
         el.innerHTML = "<img src='" + mutedIcon + "'/>";
         el.classList.add('muted');
         createjs.Sound.volume = 0;
      }
      goPlay()
   })

   playScreenCont.addChild(secondaryPlayButton);

   var titleLineOne, titleLineTwo, titleLineThree, titleLineFour;

   titleLineOne = new createjs.Text("Select the Play button to start with audio.", 'bold ' + ((25 * bscale) * scale) + 'px ' + font, '#ffffff');
   titleLineOne.lineWidth = 500;
   titleLineOne.textAlign = "center";
   titleLineOne.x = (248 + (titleLineOne.lineWidth / 2)) * scale;
   titleLineOne.y = 137 * scale;
   playScreenCont.addChild(titleLineOne);

   titleLineTwo = new createjs.Text("Audio includes sound effects.", ((15 * bscale) * scale) + 'px ' + font, '#ffffff');
   titleLineTwo.lineWidth = 386;
   titleLineTwo.textAlign = "center";
   titleLineTwo.x = (248 + (titleLineOne.lineWidth / 2)) * scale;
   titleLineTwo.y = 173 * scale;
   playScreenCont.addChild(titleLineTwo);

   titleLineThree = new createjs.Text("Select the Speaker button to start without audio.", 'bold ' + ((23 * bscale) * scale) + 'px ' + font, '#ffffff');
   titleLineThree.lineWidth = 500;
   titleLineThree.textAlign = "center";
   titleLineThree.x = (530 - (titleLineThree.lineWidth / 2)) * scale;
   titleLineThree.y = 368 * scale;
   playScreenCont.addChild(titleLineThree);

   titleLineFour = new createjs.Text("You can turn the audio back on with the same speaker icon once you begin.", ((15 * bscale) * scale) + 'px ' + font, '#ffffff');
   titleLineFour.lineWidth = 500;
   titleLineFour.textAlign = "center";
   titleLineFour.x = (530 - (titleLineThree.lineWidth / 2)) * scale;
   titleLineFour.y = 404 * scale;
   playScreenCont.addChild(titleLineFour);

   focusPlayIndicator = new createjs.Shape();
   focusPlayIndicator.graphics.beginStroke('#f2802e').setStrokeStyle(3 * scale).drawRect(0, 0, 0, 0);
   playScreenCont.addChild(focusPlayIndicator);
}

function focusPlayScreen() {
   focusPlayIndicator.graphics.clear();

   if (focusPlayCnt !== 0) {
      var playObj = playScreenCont.children[focusPlayCnt].getBounds();

      focusPlayIndicator.graphics.beginStroke('#f2802e').setStrokeStyle(8 * scale).drawRect(playObj.x, playObj.y, playObj.width, playObj.height);
      playScreenCont.addChild(focusPlayIndicator);
   }
}

function makeMuteButton() { 
   document.getElementById('muteToggle').addEventListener('click', function() { 
      el = document.getElementById('muteToggle')
      if ( (" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(" muted ") > -1 ){
         el.innerHTML = '<img src="' + unmutedIcon + '"/>'; 
         el.classList.remove('muted'); 
         createjs.Sound.volume = 1; 
      } else { 
         el.innerHTML = '<img src="' + mutedIcon + '"/>'; 
         el.classList.add('muted'); 
         createjs.Sound.volume = 0; 
      } 
   }); 
} 