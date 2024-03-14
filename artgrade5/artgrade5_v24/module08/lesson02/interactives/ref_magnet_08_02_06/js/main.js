   // Sets up all the variables we need out of the box
   var appData, preload, manifest;
   var ratio, scale;
   var stage, tutorialCont, loadingCont, activityCont, windowCont;
   var accBut;
   var loadingBarCont, loadingBg, loadingText, loadingGrey, loadingBar, loadingBarWidth, lBbl;
   var dialogCont, dialogOverlay;

   var font = 'Calibri';
   var bscale = 1;
   var bgTilesToUse = 40;

   // Defines where createjs is, what the default margin should be, and our indicator as to whether the preloading is done
   // We also define the tutorial tooltip and tracker in case we need them
   var createjsPath = 'lib/createjs-2015.11.26.min.js';
   //var particlePath = 'js/particle.js';


   var _bg = undefined
   var _initialized
   var _mouseDragTarget = undefined;
   var margin = 30;
   var loaded = false;
   var needTutorial = false;
   var hasTutorial = false;
   var hasDialog = false
   var windowOpen = false;
   var finishedActivity = false;
   var tutTooltip;
   var tutorial = [];
   var imageSizeLimit = 100
   var capMan = undefined

   var _bottomBar = undefined;
   var _wordTray = undefined;
   var _trayStatus = "down";
   var _wordObjects = []
   var _dropZoneRect = {
      x: 95,
      y: 45,
      width: 572,
      height: 600
   }
   var _showDZ = false

   var _currentAccessNumber = -1
   var _currentDiagAccessNumber = -1
   var _maxAccessNumber = 0

   var _accessDraggingMode = false
   var _accessDragSpeed = 4
      //var _wtLockToggle = undefined
   var _wtDownButton = undefined
   var _wtLocked = false
   var firstRun = true

   var useWordTilts = true

   var unmutedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsBJREFUeNrsWTtOw0AQDb4AqamcE+CcgLihxbmB0yNBTuDkBCQSvX0DJy1NzAkwJyAVdbgBM9IkGkbrDbZ3HRf7pJEVvJ95O5+dMYOBg4ODg4NDc1z1VbGb1/sAHgnIEGT5/fhW6MZ7lpWJQHKQYYPpSCICmYDkRKxbIqg4SIoKkDJByyXxIHawpt8ZEdgMT/ADJG651BLkIMjk1omQFV7w5ED8tutBTJTwCAWZAPZYWAt2skKqIRDqgpX8/4VOfQ1jM/YuprU5RjBmb9QihqyQUFAjoRSTBLMMktooxptxLTxFEIyFZwNGPYjfqQjsuRgTy8D3GpJYUEAHhkJsrgjslFkF3Wgt5jw1JsKskJjMdKDoQRHYE+5igExMi5TBTkF1DLg/aRA2WtCYHflyXZyCnVzig/bBv02JCL57Jh2OKOBdyHTMBYExZbc/FkkVJGwgZvtMuOKg1Aoee2EV7r7bKqt4g+4h03BM6ZtfhFUuJLPX3cWIkItlmnRaqSy5ILeYf0mLoEIzhQsNmbIlfyem94dIxckHFcpKlJ2X8Wew1RD51Mz76RuRc7d7LVySyIPG92818677RiTS+L6uAA16Q4S6R1/c4MfbfSiUlfeOr7KidwESE0X3uNRY6p03b70horgXMtF0JZo0XUnS05QGtpCxkyyohB+wolG6XKlJEJtGre4/Wtqz1e+ZdncnClesjDesav7ibgXvRo1ci5QZg6xMfz5SkCiOJFjVXFkZ1I4RzC4gc2qE9oa4yD4IM9iMEfVlRyg7xsbBzqyTGSAi+6CZ+EoiiWZGv6KQdfDkpi1LjCUFfkkkNqJzjTTp2tx3LebnqWLTfwV7jQRwar2t3OxknakB6+hIlCoSVi5EcouRorSoi0SRAKadVr9knZAuu6KqGapZ4ocywK3EiIWarNY/ehwcHBwcHNrgV4ABABmcGUv+j6TkAAAAAElFTkSuQmCC';
   var mutedIcon =   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAelJREFUeNrsmUtugzAQhl3EAbLuqr1BcgPYdNvkBIV9F80JGk6QVuoejpB1NnAEblBWXXOEjqup5CACHoNjI80vjZwHxv4yMx7jCMFisVgsFkvc2bz5/dfTFpoXsPTn9dzaHCu0BLCC5giW4EefYNWiQAAigiYHe7hlaIUze+Ed7M1FjoRL9oKqYAYImQulS4hJHgGANXph7cPyGxpCHDAfTH+AI77dw7JcG6yG0vs19N0b1ZEJXohh0Arv8a2EYYvf1ZoQZWdsWZ+KC4/AhQnSrjr3yODiA74+zhBKai79TQ7GHoS5AiHUuarJnvdA2NBHz2RK9DYFQnqzmG3VogrjutCBGYGI1W1P4GKFgQmkYzAaEPWsdcQSTESBcAoyBkOBcA4yACMoEF6AaMBo1RovQDCxJ9WnwBOIcgBksM54AaIBoQ0TeAghc2KjWzSdgugUO52ieQ0k8wWCsgMw3cabPtKq23gJEVGWWOiTKycyFyEIfRpyaOFkNj07WIpIECOeSYxzRO44cQcbgzUGIA212A3AVJOTXfFOQQ0zzMcMQ6MmjClhUuy7+w9Xco4M5M525MEsVgf18jgIf6kTNI9gp8Wea3VyZyddjrG/TJAe71S3BLH9t4I8B37GxGwFi8VisVgsu/oVYAALWu+fsCIWUQAAAABJRU5ErkJggg==';
   var focusPlayCnt = 0;
   var focusPlayIndicator;



   function setupPage(callback) {

      preScriptsToLoad = [
         createjsPath,
         //particlePath,
         "js/button.js",
         "js/toggle.js",
         "js/magnetWord.js",
         "js/captureManager.js",
         "lib/FileSaver/FileSaver.min.js",
         "lib/canvas-toBlob/canvas-toBlob.js",
         "lib/jspdf.min.js"
      ]
      atPreloadScript = 0

      head = document.getElementsByTagName('head')[0];

      RequestLoadScript = function(path) {
         var scriptElm = document.createElement('script');
         scriptElm.src = path;
         scriptElm.type = 'text/javascript';
         head.appendChild(scriptElm);
         scriptElm.onload = HandlePreScriptLoaded;
      }

      HandlePreScriptLoaded = function(e) {
         atPreloadScript++;

         if (atPreloadScript == preScriptsToLoad.length) {
            if (callback) {
               callback()
            }
         } else {
            RequestLoadScript(preScriptsToLoad[atPreloadScript])
         }
      }

      RequestLoadScript(preScriptsToLoad[atPreloadScript])


      $('body').html('<div id="actCont"><canvas id="canvas" width="750" height="650"></canvas><div id="controllCont"><div id="muteToggle"><img src="'+unmutedIcon+'"/></div></div></div>');
      window.focus();
      makeMuteButton();

   }

   function makeMuteButton() {
      var el = $('#muteToggle');

      el.on('click', function() {
         if (el.hasClass('muted')) {
            el.html('<img src="'+unmutedIcon+'"/>');
            el.removeClass('muted');
            createjs.Sound.volume = 1;
         } else {
            el.html('<img src="'+mutedIcon+'"/>');
            el.addClass('muted');
            createjs.Sound.volume = 0;
         }
      });
   }



   function buildPlayScreen() {

      // Loads the background for the play screen
      playScreen = new createjs.Bitmap(preload.getResult('playScreenBG'));
      playScreen.scaleX = playScreen.scaleY = scale;
      playScreenCont.addChild(playScreen);

      $(document).on('keydown', function(evt) {
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

      });

      // Loads the background for the play screen
      goPlay = function() {
         focusPlayCnt = 0;
         focusPlayScreen();
         $(document).off('keydown');

         buildActivity();

         // Makes the play screen slide off screen
         createjs.Tween.get(playScreenCont, {
            loop: false
         }).to({
            y: -750
         }, 500, createjs.Ease.getPowInOut(3));

         setTimeout(function() {
            playScreenCont.removeAllChildren();
            stage.removeChild(playScreenCont);
         }, 500);
      }

      var spriteData = {
         images: [preload.getResult('playSpritesImg')],
         frames: [[2,2,233,233,0,0,0],[237,2,233,233,0,0,0]],
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

      mainPlayButton.on("mouseover", function(e){
         mainPlayButtonSprite.gotoAndStop("over")
      })
      mainPlayButton.on("mouseout", function(e){
         mainPlayButtonSprite.gotoAndStop("normal")
      })
      mainPlayButton.on("click", function(){
         var el = $('#muteToggle');
         if(el){
            el.html("<img src='"+unmutedIcon+"'/>");
            el.removeClass('muted');
            createjs.Sound.volume = 1;
         }
         goPlay()
      })
      playScreenCont.addChild(mainPlayButton);

      var spriteData2 = {
         images: [preload.getResult('playSpritesImg')],
         frames: [[2,237,67,66,0,0,0],[71,237,66,66,0,0,0]],
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

      secondaryPlayButton.on("mouseover", function(e){
         secondaryPlayButtonSprite.gotoAndStop("over")
      })
      secondaryPlayButton.on("mouseout", function(e){
         secondaryPlayButtonSprite.gotoAndStop("normal")
      })
      secondaryPlayButton.on("click", function(){
         var el = $('#muteToggle');
         if(el){
            el.html("<img src='"+mutedIcon+"'/>");
            el.addClass('muted');
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
   function init() {
      var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;

      if (isMacLike === true) {
         font = 'Open Sans';
         bscale = 0.8;
      }


      // Sets up the stage prior to building the activity
      stage = new createjs.Stage("canvas");
      ratio = 650 / 750;

      capMan = new CaptureManager()

      // Sets the canvas and stages width and height to be relative to the container size
      canvas.width = stage.width = $('#actCont').width();
      canvas.height = stage.height = canvas.width * ratio;

      // Figures out the scale to be used in position calculations later
      // Multiply any hardcoded position by this number so it displays properly at different sizes
      scale = canvas.width / 750;

      // Enables touch functionality, and an updater which will be used to make sure the canvas always displays what it should, and mouseover functionality (if needed)
      createjs.Touch.enable(stage, true, false);
      createjs.Ticker.addEventListener('tick', updateStage);
      createjs.Ticker.setInterval(10);
      createjs.Ticker.setFPS(24);
      stage.enableMouseOver(24);

      stage.addEventListener("stagemousemove", function(e) {
         if (!_accessDraggingMode) {
            HandleMouseMove(e)
         }
      })

      stage.addEventListener("click", function(e) {
         if (!_accessDraggingMode) {
            removeAllHighlights()
         }
      })

      // Establishes the container to put all the activity content in
      // Rather than adding things to the stage, add them here instead
      activityCont = new createjs.Container();
      activityCont._id = "activityCont"
      activityCont.setBounds(0, 0, stage.width, stage.height);
      stage.addChild(activityCont);


      // Establishes the container for any windows
      windowCont = new createjs.Container();
      windowCont._id = "windowCont"
      windowCont.setBounds(0, 0, stage.width, stage.height);
      stage.addChild(windowCont);

      // Establishes the container to put all the loading animation content in
      playScreenCont = new createjs.Container();
      playScreenCont.setBounds(0, 0, stage.width, stage.height);
      stage.addChild(playScreenCont);

      // Establishes the container to put all the loading animation content in
      loadingCont = new createjs.Container();
      loadingCont._id = "loadingCont"
      loadingCont.setBounds(0, 0, stage.width, stage.height);
      stage.addChild(loadingCont);

      window.focus();

      // Starts to build the loading screen and starts to pull the json data for the activity
      buildLoadingScreen();

      loadData(buildManifest);

   }

   function buildLoadingScreen() {
      loadingBarWidth = 0;

      // Loads the background for the loading screen

      loadingBg = new createjs.Bitmap('img/loading_bg.png');
      loadingBg.scaleX = loadingBg.scaleY = scale;
      loadingCont.addChild(loadingBg);

      loadingBg.image.onload = function() {
         loadingBarCont = new createjs.Container();
         loadingBarCont.setBounds(0, 0, (517 * scale), (84 * scale));
         loadingBarCont.x = 116 * scale;
         loadingBarCont.y = 292 * scale;
         loadingCont.addChildAt(loadingBarCont, 0);

         // Builds a shape for the loading bar, positions it, and adds it to the loading container
         loadingBar = new createjs.Shape();
         loadingBar.graphics.beginFill('#a5ce3b').drawRect(0, 0, loadingBarWidth, 84);
         loadingBar.x = 110 * scale;
         loadingBar.y = 335 * scale;
         loadingBar.regY = 83 / 2;
         loadingBar.scaleX = loadingBar.scaleY = scale;
         loadingCont.addChildAt(loadingBar, 0);

         loadingBar.addEventListener('tick', function() {
            loadingBar.graphics.clear();
            loadingBar.graphics.beginFill('#a5ce3b').drawRect(0, 0, loadingBarWidth, 84);
         });

         // Adds a grey background to appear behind the loading bar
         loadingGrey = new createjs.Shape();
         loadingGrey.graphics.beginFill('#d8d8d8').drawRect(0, 0, 530, 84);
         loadingGrey.x = 110 * scale;
         loadingGrey.y = 335 * scale;
         loadingGrey.regY = 83 / 2;
         loadingGrey.scaleX = loadingGrey.scaleY = scale;
         loadingCont.addChildAt(loadingGrey, 0);

         var cnt = 0;

         lBbl = setInterval(function() {
            // If we haven't made all the bubbles yet
            if (cnt < 1000) {
               // Make a bubble based on the next one in the tracker
               loadingBubble();
               // Increase the counter
               cnt++;
            } else {
               // Otherwise, stop the interval bubble generator
               clearInterval(lBbl);
            }
         }, 250);
      };

      loadingText = new createjs.Text('Loading...', ((65 * bscale) * scale) + 'px ' + font, '#ffffff');
      loadingText.x = stage.width / 2;
      loadingText.y = 225 * scale;
      loadingText.textBaseline = 'middle';
      loadingText.textAlign = 'center';
      loadingCont.addChild(loadingText);

      // Starts the animation
      startLoadAnimation();
   }

   function loadingBubble() {
      var radius = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
      var bColours = ['#96c03d', '#8aae3e']
      var c = Math.floor(Math.random() * 2);

      var tempBbl = new createjs.Shape();
      tempBbl.graphics.beginFill(bColours[c]).drawCircle(0, 0, radius);
      tempBbl.x = Math.floor(Math.random() * (loadingBarWidth - 30));
      tempBbl.y = 100 * scale;
      loadingBarCont.addChild(tempBbl);

      // Adds an event listener to the bubble which will be used to animate it
      tempBbl.addEventListener('tick', function(evt) {
         animateLoadingBubble(evt.target)
      });
   }

   function animateLoadingBubble(bbl) {
      // If the bubble hasn't reached it's idle height
      if (bbl.y > (-50 * scale)) {
         // Raise the bubbles position
         bbl.y -= (3 * scale);
      } else {
         bbl.removeAllEventListeners();
         loadingBarCont.removeChild(bbl);
      }
   }


   function startLoadAnimation() {
      // If all the content for the activity is loaded, we can go ahead and build it
      // If it's not, we need to loop the animation and recheck
      if (loaded === true) {

         var isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;

         if (isIOS === false) {
            buildPlayScreen()

            // Makes the loading screen slide off screen
            createjs.Tween.get(loadingCont, {
               loop: false
            }).to({
               y: -750
            }, 500, createjs.Ease.getPowInOut(3));

            setTimeout(function() {
               loadingBarCont.removeAllChildren();
               loadingCont.removeAllChildren();
               stage.removeChild(loadingCont);
            }, 500);
         } else {
            loadingText.text = 'Tap to Continue';

            var clickContinue = new createjs.Shape();
            clickContinue.graphics.beginFill('rgba(0, 0, 0, 0.01);').drawRect(0, 0, stage.width, stage.height);
            loadingCont.addChild(clickContinue);

            clickContinue.on('click', function() {
               buildPlayScreen()

               // Makes the loading screen slide off screen
               createjs.Tween.get(loadingCont, {
                  loop: false
               }).to({
                  y: -750
               }, 500, createjs.Ease.getPowInOut(3));

               setTimeout(function() {
                  loadingBarCont.removeAllChildren();
                  loadingCont.removeAllChildren();
                  stage.removeChild(loadingCont);
               }, 500);
            });
         }
      } else {
         setTimeout(startLoadAnimation, 1000);
      }
   }

   function buildManifest() {
      // This sets up the manifest of content that we need to load
      // We start with all of the default assets we know we're going to need
      manifest = [{
            src: 'audio/snap.mp3',
            id: 'snapSound',
            type: createjs.AbstractLoader.SOUND
         }, {
            src: 'audio/select.mp3',
            id: 'selectSound',
            type: createjs.AbstractLoader.SOUND
         }, {
            src: 'audio/hover.mp3',
            id: 'hoverSound',
            type: createjs.AbstractLoader.SOUND
         }, {
            src: 'audio/whoosh.mp3',
            id: 'whoosh',
            type: createjs.AbstractLoader.SOUND
         }, {
            src: 'img/wordTray.png',
            id: 'wordTray',
            type: createjs.AbstractLoader.IMAGE
         },{
            src: 'img/playScreen.png',
            id: 'playScreenBG',
            type: createjs.AbstractLoader.IMAGE
         }, {
            src: 'img/playSprites.png',
            id: 'playSpritesImg',
            type: createjs.AbstractLoader.IMAGE
         },
         //// things in default template ^^^ things for interactive \/\/\/
         {
            src: 'img/background.png',
            id: 'background',
            type: createjs.AbstractLoader.IMAGE
         }, {
            src: "img/windowIcons.png",
            id: "flvsWindowIcons",
            type: createjs.AbstractLoader.IMAGE,
            dataset: {
               frameData: [
                  [2, 2, 45, 46, 0, 0, 0],
                  [49, 2, 45, 46, 0, 0, 0],
                  [143, 2, 45, 45, 0, 0, 0],
                  [96, 2, 45, 45, 0, 0, 0],
                  [190, 2, 45, 45, 0, 0, 0],
                  [237, 2, 45, 45, 0, 0, 0]
               ]

            }
         }, {
            src: 'img/upArrowAni.png',
            id: 'upArrowAni',
            type: createjs.AbstractLoader.IMAGE,
            dataset: {
               "frameData": [
                  [2, 2, 31, 28, 0, 1, 1],
                  [35, 2, 31, 28, 0, 1, 1],
                  [68, 2, 31, 28, 0, 1, 1],
                  [101, 2, 31, 28, 0, 1, 1],
                  [134, 2, 31, 28, 0, 1, 1],
                  [167, 2, 31, 28, 0, 1, 1],
                  [200, 2, 31, 28, 0, 1, 1],
                  [233, 2, 31, 28, 0, 1, 1],
                  [2, 32, 31, 28, 0, 1, 1],
                  [35, 32, 31, 28, 0, 1, 1],
                  [68, 32, 31, 28, 0, 1, 1],
                  [101, 32, 31, 28, 0, 1, 1],
                  [134, 32, 31, 28, 0, 1, 1],
                  [167, 32, 31, 28, 0, 1, 1],
                  [200, 32, 31, 28, 0, 1, 1],
                  [233, 32, 31, 28, 0, 1, 1],
                  [2, 62, 31, 28, 0, 1, 1],
                  [35, 62, 31, 28, 0, 1, 1],
                  [68, 62, 31, 28, 0, 1, 1],
                  [101, 62, 31, 28, 0, 1, 1],
                  [134, 62, 31, 28, 0, 1, 1],
                  [167, 62, 31, 28, 0, 1, 1],
                  [200, 62, 31, 28, 0, 1, 1],
                  [233, 62, 31, 28, 0, 1, 1],
                  [2, 92, 31, 28, 0, 1, 1],
                  [35, 92, 31, 28, 0, 1, 1],
                  [68, 92, 31, 28, 0, 1, 1],
                  [101, 92, 31, 28, 0, 1, 1],
                  [134, 92, 31, 28, 0, 1, 1],
                  [167, 92, 31, 28, 0, 1, 1],
                  [200, 92, 31, 28, 0, 1, 1],
                  [233, 92, 31, 28, 0, 1, 1],
                  [2, 122, 31, 28, 0, 1, 1],
                  [35, 122, 31, 28, 0, 1, 1],
                  [68, 122, 31, 28, 0, 1, 1],
                  [101, 122, 31, 28, 0, 1, 1],
                  [134, 122, 31, 28, 0, 1, 1],
                  [167, 122, 31, 28, 0, 1, 1],
                  [200, 122, 31, 28, 0, 1, 1],
                  [233, 122, 31, 28, 0, 1, 1]
               ]

            }
         }, {
            src: "img/helpButton.png",
            id: "HelpButtonImg",
            type: createjs.AbstractLoader.IMAGE,
            dataset: {
               "frameData": [
                  [2, 2, 29, 29, 0, 0, 0],
                  [33, 2, 29, 29, 0, 0, 0],
                  [2, 33, 29, 29, 0, 0, 0]
               ]
            }
         }, {
            src: "img/iconSet.png",
            id: "iconSet",
            type: createjs.AbstractLoader.IMAGE,
            dataset: {
               "frameData": [
                  [1, 0, 22, 24, 0, 0, 0],
                  [23, 0, 22, 24, 0, 0, 0],
                  [46, 0, 28, 30, 0, 0, 0],
                  [74, 0, 28, 30, 0, 0, 0],
                  [104, 0, 28, 30, 0, 0, 0],
                  [134, 0, 28, 30, 0, 0, 0]
               ]
            }
         },
         /*
         {
            src: "img/lockToggle.png",
            id: "lockToggleImg",
            type: createjs.AbstractLoader.IMAGE,
            dataset: {
               "frameData": [
                  [2,2,51,50,0,0,0],
                  [55,2,51,50,0,0,0],
                  [2,54,51,50,0,0,0],
                  [55,54,51,50,0,0,0]
               ]
            }
         }
         */
         {
            src: "img/downButton.png",
            id: "downButtonImg",
            type: createjs.AbstractLoader.IMAGE,
            dataset: {
               "frameData": [
                  [2, 2, 51, 50, 0, 0, 0],
                  [55, 2, 51, 50, 0, 0, 0]
               ]
            }
         }
      ];

      if (appData.Config.Background && appData.Config.Background !== '') {
         var tempBg = {};
         tempBg.src = appData.Config.Background;
         tempBg.type = createjs.AbstractLoader.IMAGE;
         tempBg.id = 'bgImg';
         manifest.push(tempBg);
      }

      for (var wr = 0; wr < appData.Config.WordList.length; wr++) {
         wDat = appData.Config.WordList[wr]
         if (wDat.src) {
            manifest.push({
               src: randomQuery(wDat.src),
               id: 'imageMag_' + wr,
               type: createjs.AbstractLoader.IMAGE
            });
         }
         if (wDat.hoverAudioSrc) {
            manifest.push({
               src: wDat.hoverAudioSrc,
               id: 'hovAudMag_' + wr,
               type: createjs.AbstractLoader.SOUND
            });
         }
      }


      // If there's instructions text
      if (appData.Config.Instructions && appData.Config.Instructions !== '') {
         // If there's instructions audio
         if (appData.Config.InstructionsVO && appData.Config.InstructionsVO !== '') {
            // Add the instructions audio to the manifest
            var instVO = {};
            instVO.src = appData.Config.InstructionsVO;
            instVO.type = createjs.AbstractLoader.SOUND;
            instVO.id = 'instructionsVO';

            manifest.push(instVO);
         }
      }

      // If there's completion text
      if (appData.Config.CompletionMessage && appData.Config.CompletionMessage !== '') {
         // If there's completion audio
         if (appData.Config.CompletionMessageVO && appData.Config.CompletionMessageVO !== '') {
            // Add the completion audio to the manifest
            var compVO = {};
            compVO.src = appData.Config.CompletionMessageVO;
            compVO.type = createjs.AbstractLoader.SOUND;
            compVO.id = 'completionMessageVO';

            manifest.push(compVO);
         }
      }

      // Initializes the preload sequence
      startPreload();
   }

   function startPreload() {
      // Builds the loading queue, with all of the necessary handlers for different loading progress
      preload = new createjs.LoadQueue();
      // Allows us to use sound
      preload.installPlugin(createjs.Sound);
      preload.on('fileload', handleFileLoad);
      preload.on('progress', handleFileProgress);
      preload.on('complete', loadComplete);
      preload.on('error', loadError);
      preload.loadManifest(manifest);
   }

   function handleFileLoad(evt) {
      // Returns confirmation that a particular file was loaded
      console.log('File: ' + evt.item.id + '(' + evt.item.type + ') successfully loaded.');
   }

   function loadError(evt) {
      // Returns an error that occurred while trying to load a file
      console.log('Error!', evt.text);
   }

   function handleFileProgress() {
      // Returns confirmation the total load percentage of the manifest
      console.log((preload.progress * 100) + '% loaded.');
      loadingBarWidth = (526 / 100) * (preload.progress * 100);
   }

   function loadComplete() {
      // Returns confirmation that a everything in the manifest loaded
      console.log('Finished loading assets.');

      // Indicates that all the loading is done
      loaded = true;
   }

   function loadData(callback) {
      var instance_json = parseFromGET('instance_json');
      if (typeof instance_json === 'string' && instance_json.length > 0) {
         //instance_json was provided in url, use that to acquire instance json
      } else {
         //instance_json was not un url, default to 'data/data.json'
         instance_json = 'data/data.json';
      }

      // Makes an ajax request to get our json data and stores it to be used later
      var jqxhr = $.getJSON(instance_json, function(data) {
         appData = data;
         callback();
      });

      // If the json data fails, we inform the user and give some data to developers using the debug console
      jqxhr.fail(function(e) {
         console.log('ERROR: Failed to load data from specified file. Ensure that the file path is correct and that JSON the JSON data is valid. (Use a validator like: http://jsonformatter.curiousconcept.com/ )');
         console.log(e);
      });
   }

   /*
   function HandleLockTogglePress() {
      _wtLocked = _wtLockToggle._Active
      return
   }
   */

   function buildActivity() {
      $(document).on('keydown', function(evt) {
         // If it's the enter key or the space key
         if (evt.which === 13 || evt.which === 32) {
            if (hasTutorial === true && tutTooltip) {
               if (tutTooltip._listeners !== null) {
                  tutTooltip._listeners.click[0]();
               }
            }
         }

         // If it's the escape key
         if (evt.which === 27) {
            // If there's a dialog window, this will just make it close
            if (hasDialog === true && windowOpen === true) {
               accBut._listeners.click[0]();
            }
         }

         if (evt.which === 32 || evt.which === 13) { // space or enter
            // If there's a dialog window, this will just make it close
            if (hasDialog === true && windowOpen === true) {
               accBut._listeners.click[0]();
            } else if (!_accessDraggingMode) {
               RequestAccessButtonActivate()
            } else {
               _admTarg.EndAccessDrag()
               _accessDraggingMode = false
               RequestAccessButton("Next")
            }
         }

         if (evt.which === 39) { // ->
            if (!_accessDraggingMode) {
               RequestAccessButton("Next")
            } else {
               _admTarg.Move(_admTarg.x + _accessDragSpeed, _admTarg.y)
            }
         } else if (evt.keyCode == 37) { // <-
            if (!_accessDraggingMode) {
               RequestAccessButton("Previous")
            } else {
               _admTarg.Move(_admTarg.x - _accessDragSpeed, _admTarg.y)
            }
         } else if (evt.keyCode == 38) { // up
            if (_accessDraggingMode) {
               _admTarg.Move(_admTarg.x, _admTarg.y - _accessDragSpeed)
               HandleMouseMove({
                  stageX: _admTarg.x,
                  stageY: _admTarg.y
               })
            }
         } else if (evt.keyCode == 40) { // down
            if (_accessDraggingMode) {
               _admTarg.Move(_admTarg.x, _admTarg.y + _accessDragSpeed)
               HandleMouseMove({
                  stageX: _admTarg.x,
                  stageY: _admTarg.y
               })
            }
         }
      });

      $(document).on('keyup', function(evt) {
         if (evt.which === 32 || evt.which === 13) { // space or enter
            RequestAccessButtonDeactivate()
         }
      })

      if (appData.Config.useWordTilts){
         useWordTilts = true
      } else {
         useWordTilts = false
      }

      // This is where you put anything for the activity
      if (appData.Config.Background && appData.Config.Background !== '') {
         _bg = new createjs.Bitmap(preload.getResult('bgImg'))
         limitBitmapSize(_bg, stage.width, stage.height);
         if (appData.Config.dropZoneRectangle && appData.Config.dropZoneRectangle != '') {
            _dropZoneRect = appData.Config.dropZoneRectangle
         } else {
            _dropZoneRect = {
               x: 0,
               y: 0,
               width: _bg.image.width * _bg.scaleX,
               height: _bg.image.height * _bg.scaleY
            }
         }

         _dropZoneRect = {
            x: _dropZoneRect.x * scale,
            y: _dropZoneRect.y * scale,
            width: _dropZoneRect.width * scale,
            height: _dropZoneRect.height * scale
         }


      } else {

         _dropZoneRect = {
            x: _dropZoneRect.x * scale,
            y: _dropZoneRect.y * scale,
            width: _dropZoneRect.width * scale,
            height: _dropZoneRect.height * scale
         }
         _bg = new createjs.Bitmap(preload.getResult('background'))
         _bg.scaleX = _bg.scaleY = scale
      }

      _bg._id = "background"
      stage.addChildAt(_bg, 0);

      if (_showDZ) {
         dz = new createjs.Shape
         dz.graphics.beginFill("rgba(50, 50, 255, .5)")
         dz.graphics.drawRect(_dropZoneRect.x, _dropZoneRect.y, _dropZoneRect.width, _dropZoneRect.height)
         stage.addChild(dz);
      }
      _bottomBar = new createjs.Container()
      _bottomBar._id = "bottomBar"
      _bottomBar.y = stage.height - (50 * scale)
      _bottomBar.alpha = .8

      bbFadeSpace = new createjs.Shape()
      bbFadeSpace._id = "bbFadeSpace"
      bbFadeSpace.graphics.beginLinearGradientFill(["rgba(250, 250, 250, 1)", "rgba(180, 180, 180, 1)"], [.6, 1], 0, (100 * scale), 0, 0)
      bbFadeSpace.graphics.drawRect(0, 0, stage.width, (50 * scale))
      _bottomBar.addChild(bbFadeSpace)



      imgRes = preload.getResult('upArrowAni')
      frmDat = preload.getItem('upArrowAni').dataset.frameData
      bbIconSheet = new createjs.SpriteSheet({
         "images": [imgRes],
         "frames": frmDat,
         "animations": {
            "animate": [0, 39, "animate"]
         }
      })

      bbIcon = new createjs.Sprite(bbIconSheet, "animate")
      bbIcon._id = "bbIcon"
      bbIcon.x = (stage.width / 2) - ((15 * scale) / 2)
      bbIcon.y = 15 * scale
      bbIcon.scaleX = bbIcon.scaleY = scale
      _bottomBar.addChild(bbIcon)
      stage.addChild(_bottomBar);

      _bottomBar.addEventListener('mouseout', function() {
         _bottomBar.alpha = .7
      })

      //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

      _bottomBar.addEventListener('mouseover', function() {
         _bottomBar.alpha = 1
      })

      _bottomBar.addEventListener('click', RaiseWordTray)

      _wordTray = new createjs.Container()
      _wordTray._id = "wordTray"
      stage.addChild(_wordTray)

      trayBG = new createjs.Bitmap(preload.getResult('wordTray'))
      _wordTray.addChild(trayBG)
      _wordTray.width = trayBG.image.naturalWidth * scale
      _wordTray.height = trayBG.image.naturalHeight * scale
      _wordTray.x = ((stage.width / 2) - (_wordTray.width / 2))
      _wordTray.y = 800 * scale
      _wordTray.scaleX = _wordTray.scaleY = scale

      _uiLayer = new createjs.Container()
      stage.addChild(_uiLayer);


      CaptureButton = new button(canvas, {
         ID: "captureButton",
         label: "Capture",
         labelOptions: {
            size: 16 * scale,
            font: font,
            padding: 6 * scale
         },
         useIcon: {
            resource: "iconSet",
            normalFrameLoc: 2,
            overFrameLoc: 3,
            downFrameLoc: 3,
            position: "left",
            scale: scale
         },
         useBackground: {
            width: 120 * scale,
            height: 35 * scale,
            normalFillColor: "#FFFFFF",
            normalStrokeColor: "#000000",
            normalStrokeWidth: 2 * scale,
            radius: 10
         },
         onActivate: capMan.DownloadImage,
         accessPos: _maxAccessNumber
      })
      CaptureButton.x = 20 * scale
      CaptureButton.y = 3 * scale
      _maxAccessNumber++;
      _uiLayer.addChild(CaptureButton)


      PrintButton = new button(canvas, {
         ID: "printButton",
         label: "Print",
         labelOptions: {
            size: 16 * scale,
            font: font,
            padding: 6 * scale
         },
         useIcon: {
            resource: "iconSet",
            normalFrameLoc: 4,
            overFrameLoc: 5,
            downFrameLoc: 5,
            position: "left",
            scale: scale
         },
         useBackground: {
            width: 120 * scale,
            height: 35 * scale,
            normalFillColor: "#FFFFFF",
            normalStrokeColor: "#000000",
            normalStrokeWidth: 2 * scale,
            radius: 10
         },
         onActivate: capMan.PrintImage,
         accessPos: _maxAccessNumber
      })
      PrintButton.x = 150 * scale
      PrintButton.y = 3 * scale
      _maxAccessNumber++;
      _uiLayer.addChild(PrintButton)


      ResetButton = new button(canvas, {
         ID: "resetButton",
         label: "Reset",
         labelOptions: {
            size: 16 * scale,
            font: font,
            padding: 6 * scale
         },
         useIcon: {
            resource: "iconSet",
            normalFrameLoc: 0,
            overFrameLoc: 1,
            downFrameLoc: 1,
            position: "left",
            scale: scale
         },
         useBackground: {
            width: 120 * scale,
            height: 35 * scale,
            normalFillColor: "#FFFFFF",
            normalStrokeColor: "#000000",
            normalStrokeWidth: 2 * scale,
            radius: 10
         },
         onActivate: resetActivity,
         accessPos: _maxAccessNumber
      })
      ResetButton.x = 580 * scale
      ResetButton.y = 3 * scale
      _maxAccessNumber++;
      _uiLayer.addChild(ResetButton)





      _helpButton = new button(canvas, {
         id: "HelpButton",
         useIcon: {
            resource: "HelpButtonImg",
            normalFrameLoc: 0,
            overFrameLoc: 1,
            downFrameLoc: 1,
            disabledFrameLoc: 2
         },
         onActivate: HandleHelpButtonPress,
         accessPos: _maxAccessNumber
      })
      _maxAccessNumber++
      _helpButton.Move((canvas.width - (40 * scale)), 5 * scale)
      _uiLayer.addChild(_helpButton);

      buildWordMagnets();


      /*

      _wtLockToggle = new toggle(canvas, {
         id: "lockToggle",
         useIcon: {
            resource: "lockToggleImg",
            inactiveNormalFrameLoc: 2,
            inactiveOverFrameLoc: 3,
            activeNormalFrameLoc: 0,
            activeOverFrameLoc: 1,
            disabledFrameLoc: 2
         },
         onActivate: HandleLockTogglePress,
         onDeactivate: HandleLockTogglePress,
         accessPos: _maxAccessNumber
      })
      _maxAccessNumber++
      _wtLockToggle.Move( _wordTray.width - 60, 10)
      _wordTray.addChild(_wtLockToggle);
      */

      _wtDownButton = new button(canvas, {
         id: "downButton",
         useIcon: {
            resource: "downButtonImg",
            normalFrameLoc: 0,
            overFrameLoc: 1,
            downFrameLoc: 1,
            disabledFrameLoc: 1
         },
         onActivate: HandleDownButtonPress,
         accessPos: _maxAccessNumber
      })
      _maxAccessNumber++
      _wtDownButton.Move(_wordTray.width - 60, 10)
      _wordTray.addChild(_wtDownButton);


      _maxAccessNumber++;

      // Builds the instructions dialog window
      buildDialog(appData.Config.Instructions, 'full');
      setTimeout(function() {
         createjs.Sound.stop()
         createjs.Sound.play('instructionsVO');
      }, 1000);

      // If we provided a tutorial, go ahead and set up the tracker and start to build it
      if (appData.Config.Tutorial) {
         for (var x = 0; x < appData.Config.Tutorial.length; x++) {
            tutorial.push(false);
         }

         // Establishes the container to put all the tooltip instructions in
         tutorialCont = new createjs.Container();
         tutorialCont.setBounds(0, 0, stage.width, stage.height);
         stage.addChildAt(tutorialCont, 1);
         hasTutorial = true
            //needTutorial = true;
      }

      _initialized = true;

   }

   function buildWordMagnets() {

      if (!appData.Config.WordList || appData.Config.WordList.length == 0) {
         return alert("ERROR, word list was empty")
      }

      for (var wrd = 0; wrd < appData.Config.WordList.length; wrd++) {
         wrdData = appData.Config.WordList[wrd]
         numOf = 0

         if (!wrdData.numberOf) {
            wrdData.numberOf = 1
         }

         for (var nf = 0; nf < wrdData.numberOf; nf++) {

            if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
               if (preload.getResult("hovAudMag_" + wrd)) {
                  useOverSnd = "hovAudMag_" + wrd
               } else {
                  useOverSnd = undefined
               }
               useActivateSound = undefined
            } else {
               useOverSnd = undefined
               if (preload.getResult("hovAudMag_" + wrd)) {
                  useActivateSound = "hovAudMag_" + wrd
               } else {
                  useActivateSound = undefined
               }


            }

            if (wrdData.magType == "image") {
               imgBitmap = new createjs.Bitmap(preload.getResult("imageMag_" + wrd))

               limitBitmapSize(imgBitmap, imageSizeLimit * scale, imageSizeLimit * scale)

               tempWrd = new magnetWord(canvas, {
                  ID: "word_" + wrd + "_" + nf,
                  useIcon: {
                     resource: imgBitmap,
                     position: "center"
                  },
                  overSound: useOverSnd,
                  activateSound: useActivateSound,
                  useBackground: {
                     width: (imgBitmap.image.width * imgBitmap.scaleX) + 6,
                     height: (imgBitmap.image.height * imgBitmap.scaleY) + 6,
                     normalFillColor: "#FFFFFF00",
                     normalStrokeColor: "#00000000",
                     normalStrokeWidth: 2 * scale
                  },
                  onFocus: HandleMagnetFocus,
                  dragBounds: _dropZoneRect,
                  accessPos: _maxAccessNumber
               })

               _maxAccessNumber++

            } else {

               predictedDims = PredictCjsTextDimention(wrdData.word, {
                  size: 20,
                  bold: true,
                  lineWidth: 120,
                  padding: 6, // 4 padding + 2 Stroke width
                  asButton: true // accounts for default button padding
               })

               tempWrd = new magnetWord(canvas, {
                  ID: "word_" + wrd + "_" + nf,
                  label: wrdData.word,
                  labelOptions: {
                     size: 20 * scale,
                     font: font,
                     padding: 4,
                     lineWidth: 120
                  },
                  overSound: useOverSnd,
                  activateSound: useActivateSound,
                  useBackground: {
                     width: Math.round(predictedDims.width),
                     height: Math.round(predictedDims.height),
                     normalFillColor: "#FFFFFF",
                     normalStrokeColor: "#000000",
                     normalStrokeWidth: 2 * scale
                  },
                  onFocus: HandleMagnetFocus,
                  dragBounds: _dropZoneRect,
                  accessPos: _maxAccessNumber,
                  useWordTilts: useWordTilts
               })

               _maxAccessNumber++
            }


            tempWrd.rotation = Math.round(Math.random() * 90) - 45;
      

            minXpos = 50 * scale + tempWrd._width
            maxXpos = (_wordTray.width / scale) - (150 * scale) - tempWrd._width
            minYpos = 50 * scale + tempWrd._height
            maxYpos = 150 * scale - tempWrd._height

            tempWrd.x = (Math.round(Math.random() * maxXpos) + minXpos);
            tempWrd.y = (Math.round(Math.random() * maxYpos) + minYpos);
            _wordTray.addChild(tempWrd)
            _wordObjects.push(tempWrd)
         }
      }
   }

   function HandleHelpButtonPress() {
      buildDialog(appData.Config.Instructions, 'full');
   }

   function HandleMagnetFocus() {
      RaiseWordTray()
   }

   function RaiseWordTray() {
      if (_trayStatus == "down") {
         _bottomBar.visible = false
         if (_mouseDragTarget != undefined) {
            stage.setChildIndex(_wordTray, stage.numChildren - 2)
         } else {
            stage.setChildIndex(_wordTray, stage.numChildren - 1)
         }
         _trayStatus = "moving"
         createjs.Tween.get(_wordTray).to({ y: 400 * scale }, 500).call(function() {
            //unlockMagnets()
            _trayStatus = "up"
         });
      }
   }

   function resetActivity() {
      // This is where you put anything related to activity completion
      finishedActivity = false;

      for (var i = _wordObjects.length - 1; i >= 0; i--) {
         _wordObjects[i].parent.removeChild(_wordObjects[i])
         _wordObjects[i].removeAllChildren()
         _wordObjects[i].removeAllEventListeners()
         _maxAccessNumber--;
      }

      _wordObjects = []
      buildWordMagnets();


   }

   function HandleMouseMove(e) {
      if (!hasDialog && _initialized) {
         for (var i = 0; i < _wordObjects.length; i++) {
            _wordObjects[i].HandleMouseMove(e)
         }

         /*
         if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            if (!_wtLocked){
               if(_trayStatus == "up" && e.stageY < _wordTray.y) {
                  _trayStatus = "moving"
                  createjs.Tween.get(_wordTray).to({ y: 800 * scale }, 700).call(function() {
                     //unlockMagnets()
                     _trayStatus = "down"
                     _bottomBar.visible = true
                  });
               } else if (_trayStatus == "down" && e.stageY > stage.height - (75 * scale)) {
                  RaiseWordTray()
               }
            }
         }
         */
      }
   }


   function HandleDownButtonPress() {
      if (_trayStatus == "up"){
         _trayStatus = "moving"
         createjs.Tween.get(_wordTray).to({ y: 800 * scale }, 700).call(function() {
            //unlockMagnets()
            _trayStatus = "down"
            _bottomBar.visible = true
         });
      }
   }



   function buildTutorial() {
      // Stops any sounds that might be playing
      createjs.Sound.stop();

      // Finds out which step of the tutorial we're on based on what's been completed
      var num = tutorial.indexOf(false);

      // If we need a tooltip, we build it and attach some functionality
      if (num !== -1) {
         // Creates and builds the tooltip
         tutTooltip = new createjs.Container();
         buildTooltip(tutTooltip, appData.Config.Tutorial[num]);

         // Scales the tooltip and adds it to the tutorial container
         tutTooltip.scaleX = tutTooltip.scaleY = scale;
         tutorialCont.addChild(tutTooltip);

         switch (appData.Config.Tutorial[num].progress) {
            case 'time':
               setTimeout(function() {
                  tutorial[num] = true;
                  clearTutorial();
                  buildTutorial();
               }, appData.Config.Tutorial[num].duration);
               break;

            case 'click':
               tutTooltip.on('click', function() {
                  tutorial[num] = true;
                  clearTutorial();
                  buildTutorial();
               });
               break;

            case 'custom':
               // Here's where you can put in custom tutorial functionality as needed
         }
      }
   }

   function buildTooltip(owner, usingData) {
      var direction = usingData.direction;

      if (!usingData.width) {
         usingData.width = 250;
      }

      if (!usingData.textSize) {
         usingData.textSize = 23
      }

      if (usingData.textBold == true || usingData.textBold == undefined || usingData.textBold == '') {
         usingData.textBold = "bold"
      } else {
         usingData.textBold = ''
      }

      if (!usingData.margin) {
         usingData.margin = 30
      }

      if (!usingData.strokeWidth) {
         usingData.strokeWidth = 5
      }

      if (!usingData.strokeColor) {
         usingData.strokeColor = '#ffffff'
      }

      if (!usingData.textColor) {
         usingData.textColor = '#ffffff'
      }

      if (!usingData.bgColor) {
         usingData.bgColor = '#233b47'
      }


      // Builds the text for the tooltip based on what's provided in the json data
      var text = new createjs.Text(usingData.text, usingData.textBold + " " + ((usingData.textSize * bscale) * scale) + 'px ' + font, usingData.textColor);
      text.lineWidth = (usingData.width * scale) - ((usingData.margin * 2) * scale);
      text.textAlign = 'center';

      // Builds the background for the tooltip body
      var bg = new createjs.Shape();
      bg.graphics.beginStroke(usingData.strokeColor)
      bg.graphics.setStrokeStyle(usingData.strokeWidth)
      bg.graphics.beginFill(usingData.bgColor)
      bg.graphics.drawRoundRect(0, 0, (usingData.width * scale), (text.getBounds().height + ((usingData.margin * 2) * scale)), 10);

      if (usingData.useGlow == true || usingData.useGlow == undefined) {
         // Builds the glowing effect for the tooltip body
         var bgGlow = new createjs.Shape();
         bgGlow.graphics.beginStroke('#3BBDDD').setStrokeStyle(15).drawRoundRect(0, 0, (usingData.width * scale), (text.getBounds().height + ((usingData.margin * 2) * scale)), 10);
         bgGlow.alpha = 0;
      }

      // Pre-calculates the scale of the margin, since we're about to use it a whole bunch
      var amt = usingData.margin * scale;

      // Builds the tooltip tail, outline and glowing effect for it
      var tailOut = new createjs.Shape();
      var tailIn = new createjs.Shape();

      if (usingData.useGlow == true || usingData.useGlow == undefined) {
         var tailGlow = new createjs.Shape();
         owner.addChild(bgGlow);
         owner.addChild(tailGlow);
      }

      owner.addChild(bg);
      owner.addChild(text);
      owner.addChild(tailOut);
      owner.addChild(tailIn);

      // Based on which step of the tutorial we're on determines how we position the tooltip and which side the tail goes on
      switch (direction) {
         case 'left':
            bg.x = 0;
            bg.y = 0;

            // In this case, the tool tip is beside the second term with the tail on the right
            tailOut.graphics.beginStroke(usingData.strokeColor)
            tailOut.graphics.beginFill(usingData.strokeColor)
            tailOut.graphics.moveTo(0, 0)
            tailOut.graphics.lineTo((amt * 0.66), (amt / 2))
            tailOut.graphics.lineTo(0, amt);

            tailOut.regY = amt / 2;
            tailOut.x = usingData.width * scale;
            tailOut.y = (text.getBounds().height / 2) + amt;

            tailIn.graphics.beginStroke(usingData.bgColor).beginFill(usingData.bgColor).moveTo(0, 0).lineTo((amt * 0.66), (amt / 2)).lineTo(0, amt);
            tailIn.regY = amt / 2;
            tailIn.x = (usingData.width - 8) * scale;
            tailIn.y = (text.getBounds().height / 2) + amt;

            if (usingData.useGlow == true || usingData.useGlow == undefined) {
               bgGlow.x = 0;
               bgGlow.y = 0;
               tailGlow.graphics.beginStroke('#3BBDDD').beginFill('#3BBDDD').moveTo(0, 0).lineTo((amt * 0.66), (amt / 2)).lineTo(0, amt);
               tailGlow.regY = amt / 2;
               tailGlow.x = (usingData.width + 7.25) * scale;
               tailGlow.y = (text.getBounds().height / 2) + amt;
               tailGlow.alpha = 0;
            }

            owner.regX = (usingData.width * scale) + amt;
            owner.regY = (text.getBounds().height + (amt * 2)) / 2;
            owner.x = usingData.x * scale;
            owner.y = usingData.y * scale;

            break;

         case 'right':
            bg.x = (amt - (3 * scale)) - usingData.strokeWidth;
            bg.y = 0;

            // In this case, the tool tip is beside the second term with the tail on the right
            tailOut.graphics.beginStroke(usingData.strokeColor)
            tailOut.graphics.beginFill(usingData.strokeColor)
            tailOut.graphics.moveTo((amt * 0.66), 0)
            tailOut.graphics.lineTo(0, (amt / 2))
            tailOut.graphics.lineTo((amt * 0.66), amt);
            tailOut.regY = amt / 2;
            tailOut.x = 0;
            tailOut.y = (text.getBounds().height / 2) + amt;

            tailIn.graphics.beginStroke(usingData.bgColor)
            tailIn.graphics.beginFill(usingData.bgColor)
            tailIn.graphics.moveTo((amt * 0.66), 0)
            tailIn.graphics.lineTo(0, (amt / 2))
            tailIn.graphics.lineTo((amt * 0.66), amt);
            tailIn.regY = amt / 2;
            tailIn.x = usingData.strokeWidth;
            tailIn.y = (text.getBounds().height / 2) + amt;

            if (usingData.useGlow == true || usingData.useGlow == undefined) {
               bgGlow.x = amt - (3 * scale);
               bgGlow.y = 0;

               tailGlow.graphics.beginStroke('#3BBDDD');
               tailGlow.graphics.beginFill('#3BBDDD');
               tailGlow.graphics.moveTo((amt * 0.66), 0);
               tailGlow.graphics.lineTo(0, (amt / 2));
               tailGlow.graphics.lineTo((amt * 0.66), amt);

               tailOut.x = usingData.strokeWidth;
               tailIn.x += usingData.strokeWidth;
               bg.x += usingData.strokeWidth;

               tailGlow.regY = amt / 2;
               tailGlow.x = 0;
               tailGlow.y = (text.getBounds().height / 2) + amt;
               tailGlow.alpha = 0;
            }

            owner.regX = 0;
            owner.regY = (text.getBounds().height + (amt * 2)) / 2;
            owner.x = usingData.x * scale;
            owner.y = usingData.y * scale;

            break;

         case 'up':
            bg.x = 0;
            bg.y = 0;

            // In this case, the tool tip is beside the second term with the tail on the right
            tailOut.graphics.beginStroke(usingData.strokeColor).beginFill(usingData.strokeColor).moveTo(0, 0).lineTo((amt / 2), (amt * 0.66)).lineTo(amt, 0);
            tailOut.regX = amt / 2;
            tailOut.x = (usingData.width / 2) * scale;
            tailOut.y = (text.getBounds().height + (amt * 2));

            tailIn.graphics.beginStroke(usingData.bgColor).beginFill(usingData.bgColor).moveTo(0, 0).lineTo((amt / 2), (amt * 0.66)).lineTo(amt, 0);
            tailIn.regX = amt / 2;
            tailIn.x = (usingData.width / 2) * scale;
            tailIn.y = (text.getBounds().height + (amt * 2)) - (8 * scale);

            if (usingData.useGlow == true || usingData.useGlow == undefined) {
               bgGlow.x = 0;
               bgGlow.y = 0;
               tailGlow.graphics.beginStroke('#3BBDDD').beginFill('#3BBDDD').moveTo(0, 0).lineTo((amt / 2), (amt * 0.66)).lineTo(amt, 0);
               tailGlow.regX = amt / 2;
               tailGlow.x = (usingData.width / 2) * scale;
               tailGlow.y = (text.getBounds().height + (amt * 2)) + (7.5 * scale);
               tailGlow.alpha = 0;
            }

            owner.regX = (usingData.width / 2) * scale;
            owner.regY = (text.getBounds().height + (amt * 3));
            owner.x = usingData.x * scale;
            owner.y = usingData.y * scale;

            break;

         case 'down':
            bg.x = 0;
            bg.y = amt - (3 * scale);

            // In this case, the tool tip is beside the second term with the tail on the right
            tailOut.graphics.beginStroke(usingData.strokeColor).beginFill(usingData.strokeColor).moveTo(0, (amt * 0.66)).lineTo((amt / 2), 0).lineTo(amt, (amt * 0.66));
            tailOut.regX = amt / 2;
            tailOut.x = (usingData.width / 2) * scale;
            tailOut.y = 8 * scale;

            tailIn.graphics.beginStroke(usingData.bgColor).beginFill(usingData.bgColor).moveTo(0, (amt * 0.66)).lineTo((amt / 2), 0).lineTo(amt, (amt * 0.66));
            tailIn.regX = amt / 2;
            tailIn.x = (usingData.width / 2) * scale;
            tailIn.y = 15.5 * scale;

            if (usingData.useGlow == true || usingData.useGlow == undefined) {
               bgGlow.x = 0;
               bgGlow.y = amt - (3 * scale);
               tailGlow.graphics.beginStroke('#3BBDDD').beginFill('#3BBDDD').moveTo(0, (amt * 0.66)).lineTo((amt / 2), 0).lineTo(amt, (amt * 0.66));
               tailGlow.regX = amt / 2;
               tailGlow.x = (usingData.width / 2) * scale;
               tailGlow.y = 0;
               tailGlow.alpha = 0;
            }

            owner.regX = (usingData.width / 2) * scale;
            owner.regY = 0;
            owner.x = usingData.x * scale;
            owner.y = usingData.y * scale;

            break;
      }

      // Now that the tool tip is positioned, we can accurately position the text
      text.x = bg.x + ((usingData.margin) * scale) + text.lineWidth / 2;
      text.y = bg.y + amt;

      if (usingData.useGlow == true || usingData.useGlow == undefined) {
         // Controls the glowing background of the tooltip
         createjs.Tween.get(bgGlow, {
            loop: true
         }).to({
            alpha: 0.75
         }, 1500).to({
            alpha: 0
         }, 1500);
         createjs.Tween.get(tailGlow, {
            loop: true
         }).to({
            alpha: 0.75
         }, 1500).to({
            alpha: 0
         }, 1500);
      }
   }

   function clearTutorial() {
      tutTooltip.removeAllChildren();
   }

   function buildDialog(text, width) {
      stage.setChildIndex(windowCont, stage.numChildren - 1)

      // Let's the activity now has an alert
      hasDialog = true;

      // Builds the semi-transparent overlay for the dialog background
      dialogOverlay = new createjs.Shape();
      dialogOverlay.graphics.beginFill('#000000').drawRect(0, 0, stage.width, stage.height);
      dialogOverlay.alpha = 0;
      windowCont.addChild(dialogOverlay);

      // Builds a container for the dialog window
      dialogCont = new createjs.Container();
      dialogCont.setBounds(0, 0, stage.width, stage.height);
      windowCont.addChild(dialogCont);


      // Sets the dialog window off stage
      dialogCont.x = -750;

      // Adds the provided text to the dialog window
      var dialogText = new createjs.Text(text, 'bold ' + ((28 * bscale) * scale) + 'px ' + font, '#FFFFFF');
      dialogText.lineHeight = 28 * scale;
      dialogText.textAlign = 'center';
      dialogCont.addChild(dialogText);

      // Builds the button background
      accBut = new createjs.Container();
      accBut._id = "accBut"
      accBut._accessPos = 0
      dialogCont.addChild(accBut);

      // Builds the button icon and positions it
      var accButBg = new createjs.Shape();
      accButBg.graphics.beginFill('#3bbddd').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));
      accBut.addChild(accButBg);
      _maxDaigAccessNumber = 1

      // Builds the button accessOutline
      var accButtonOutline = new createjs.Shape();
      accButtonOutline.graphics.setStrokeStyle(4);
      accButtonOutline.graphics.beginStroke("#FFFF00");
      accButtonOutline.graphics.drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));
      accButtonOutline.visible = false
      accBut._AccessHighlight = accButtonOutline
      accBut.addChild(accButtonOutline);



      // Builds the button icon and positions it
      var accButtData = {
         images: [preload.getResult('flvsWindowIcons')],
         frames: preload.getItem('flvsWindowIcons').dataset.frameData,
         animations: {
            "normal": [2, 2, "normal"],
            "over": [3, 3, "over"]
         }
      };
      accButIcon = new createjs.Sprite(new createjs.SpriteSheet(accButtData));
      accButIcon._id = "accButIcon"
      accButIcon.gotoAndPlay("normal")
      accButIcon.regX = accButtData.frames[0][2] / 2;
      accButIcon.regY = accButtData.frames[0][3] / 2;
      accButIcon.scaleX = accButIcon.scaleY = 0.8 * scale;
      accButIcon.x = (accButIcon.regX * scale) + ((margin * 0.25) * scale);
      accButIcon.y = (accButIcon.regY * scale) + ((margin * 0.1) * scale);

      accBut.addChild(accButIcon);

      // Adds the default text to the button and positions it
      var accButText = new createjs.Text('Okay', 'bold ' + ((28 * bscale) * scale) + 'px ' + font, '#ffffff');
      accButText.textBaseline = 'middle';
      accBut.addChild(accButText);

      accButText.x = (150 * scale) - (accButText.getBounds().width) - ((margin * 0.75) * scale);
      accButText.y = 25 * scale;

      // If the button is hovered over, we apply it's hover colour and rotate the icon slightly
      accBut.on('mouseover', function() {
         accButIcon.gotoAndPlay("over")
         accButBg.graphics.clear()
         accButBg.graphics.beginFill('#f3802eff').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));
      });

      // If we stop hovering, we reset everything
      accBut.on('mouseout', function() {
         accButIcon.gotoAndPlay("normal")
         accButBg.graphics.clear()
         accButBg.graphics.beginFill('#3bbddd').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));
      });

      dialogOverlay.on('click', function(evt) {
         evt.stopPropagation();
      });

      // When the button is clicked
      accBut.on('click', function() {
         accButIcon.gotoAndPlay("over")

         accButBg.graphics.clear()
         accButBg.graphics.beginFill('#f3802e').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));

         // We stop all sounds to play our selected object sound
         createjs.Sound.stop();
         createjs.Sound.play('selectSound');

         // If it's the end of an activity, we'll reset it
         if (finishedActivity === true) {
            resetActivity();
         }

         if(firstRun == true){
            firstRun = false
            RaiseWordTray()

         }

         // Then we close the dialog window
         closeDialog();
      });

      // Builds the button background
      tutButton = new createjs.Container();
      tutButton._id = "tutButton"
      tutButton._accessPos = 1
      dialogCont.addChild(tutButton);

      // Builds the button icon and positions it
      var tutButtonBg = new createjs.Shape();
      tutButtonBg.graphics.beginFill('#3bbddd').drawRoundRect(0, 0, (170 * scale), (50 * scale), (15 * scale));
      tutButton.addChild(tutButtonBg);

      // Builds the button accessOutline
      var tutButtonOutline = new createjs.Shape();
      tutButtonOutline.graphics.setStrokeStyle(4);
      tutButtonOutline.graphics.beginStroke("#FFFF00");
      tutButtonOutline.graphics.drawRoundRect(0, 0, (170 * scale), (50 * scale), (15 * scale));
      tutButtonOutline.visible = false
      tutButton._AccessHighlight = tutButtonOutline
      tutButton.addChild(tutButtonOutline);



      // Builds the button icon and positions it
      var data = {
         images: [preload.getResult('flvsWindowIcons')],
         frames: preload.getItem('flvsWindowIcons').dataset.frameData,
         animations: {
            "normal": [4, 4, "normal"],
            "over": [5, 5, "over"]
         }
      };
      tutButtonIcon = new createjs.Sprite(new createjs.SpriteSheet(data));
      tutButtonIcon._id = "tutButtonIcon"
      tutButtonIcon.gotoAndPlay("normal")
      tutButtonIcon.regX = data.frames[0][2] / 2;
      tutButtonIcon.regY = data.frames[0][3] / 2;
      tutButtonIcon.scaleX = tutButtonIcon.scaleY = 0.8 * scale;
      tutButtonIcon.x = (accButIcon.regX * scale) + ((margin * 0.25) * scale);
      tutButtonIcon.y = (accButIcon.regY * scale) + ((margin * 0.1) * scale);

      tutButton.addChild(tutButtonIcon);

      // Adds the default text to the button and positions it
      var tutButtonText = new createjs.Text('Tutorial', 'bold ' + ((28 * bscale) * scale) + 'px ' + font, '#ffffff');
      tutButtonText.textBaseline = 'middle';
      tutButton.addChild(tutButtonText);

      tutButtonText.x = (170 * scale) - (tutButtonText.getBounds().width) - ((margin * 0.75) * scale);
      tutButtonText.y = 25 * scale;

      // If the button is hovered over, we apply it's hover colour and rotate the icon slightly
      tutButton.on('mouseover', function() {
         tutButtonIcon.gotoAndPlay("over")
         tutButtonBg.graphics.clear()
         tutButtonBg.graphics.beginFill('#f3802e').drawRoundRect(0, 0, (170 * scale), (50 * scale), (15 * scale));

      });

      // If we stop hovering, we reset everything
      tutButton.on('mouseout', function() {
         tutButtonIcon.gotoAndPlay("normal")
         tutButtonBg.graphics.clear()
         tutButtonBg.graphics.beginFill('#3bbddd').drawRoundRect(0, 0, (170 * scale), (50 * scale), (15 * scale));

      });


      // When the button is clicked
      tutButton.on('click', function() {

         // We stop all sounds to play our selected object sound
         createjs.Sound.stop();
         createjs.Sound.play('selectSound');

         tutButtonBg.graphics.clear()
         tutButtonBg.graphics.beginFill('#f3802e').drawRoundRect(0, 0, (170 * scale), (50 * scale), (15 * scale));


         tutorial = []
         for (var x = 0; x < appData.Config.Tutorial.length; x++) {
            tutorial.push(false);
         }


         needTutorial = true

         // Then we close the dialog window
         closeDialog();
      });


      var dX, dW;

      // Changes variables used in the dialog's positions based on whether its a half or full width dialog window
      if (width === 'half') {
         dX = stage.width / 4;
         dW = stage.width / 2;
      } else {
         dX = 0;
         dW = stage.width;
      }

      // Positions the dialog window accordingly
      dialogText.lineWidth = dW - ((margin * 2) * scale);
      dialogText.y = (stage.height / 2) - (dialogText.getBounds().height / 2) - ((margin * 1.5) * scale);
      dialogText.x = stage.width / 2;

      accBut.regX = 75 * scale;
      accBut.regY = 25 * scale;
      if (appData.Config.Tutorial && appData.Config.Tutorial.length != 0) {
         accBut.x = stage.width / 2 - 100
      } else {
         accBut.x = stage.width / 2;
      }

      accBut.y = (stage.height / 2) + (dialogText.getBounds().height / 2) + ((margin / 2) * scale);

      tutButton.regX = 75 * scale;
      tutButton.regY = 25 * scale;
      tutButton.x = stage.width / 2 + 100;
      tutButton.y = (stage.height / 2) + (dialogText.getBounds().height / 2) + ((margin / 2) * scale);
      if (!(appData.Config.Tutorial && appData.Config.Tutorial.length != 0)) {
         tutButton.visible = false
         _maxDaigAccessNumber = 1;
      }

      // Gets the height of the text, and adds some space for padding
      // Enforces a minimum height for the dialog window if the text height is too small
      var dH = dialogText.getBounds().height + (50 * scale) + ((margin * 3) * scale);
      if (dH < 150) {
         dH = 150;
      }

      // Centers the text in the dialog window
      var dY = (stage.height / 2) - (dH / 2);

      // Builds the background for the dialog window
      var dialogBg = new createjs.Shape();
      dialogBg.graphics.beginFill('#3194ad').drawRect(dX, dY, dW, dH);
      dialogCont.addChildAt(dialogBg, 0);

      if (finishedActivity === true) {
         accButText.text = 'Reset';
         accButText.font = 'bold ' + ((26 * bscale) * scale) + 'px ' + font;
         accButText.x -= (margin / 6) * scale;
         accButText.y = 24 * scale;
      }

      // Animates the window sliding in, and the overlay fading in
      createjs.Tween.get(dialogOverlay, {
         loop: false
      }).to({
         alpha: 0.8
      }, 750, createjs.Ease.getPowInOut(3));
      createjs.Tween.get(dialogCont, {
         loop: false
      }).to({
         x: 0
      }, 750, createjs.Ease.getPowInOut(3));

      setTimeout(function() {
         // Indicates the dialog window is now open
         windowOpen = true;
      }, 750);
   }

   function closeDialog() {
      // Animates the window sliding out, and the overlay fading out
      createjs.Tween.get(dialogOverlay, {
         loop: false
      }).to({
         alpha: 0
      }, 750, createjs.Ease.getPowInOut(3));
      createjs.Tween.get(dialogCont, {
         loop: false
      }).to({
         x: -750
      }, 750, createjs.Ease.getPowInOut(3));

      // Indicates the dialog window is closed
      windowOpen = false;

      // We remove the unneeded dialog elements after we're done with them, and let the activity know there's not an alert anymore
      // This needs to be in a timeout so it happens after the animations finish
      setTimeout(function() {
         windowCont.removeChild(dialogCont);
         windowCont.removeChild(dialogOverlay);

         hasDialog = false;
         if (needTutorial === true) {
            needTutorial = false;
            buildTutorial();
         }
      }, 750);
   }

   function updateStage(e) {

      // Updates the stage in case anything new has been added or anything has been moved
      stage.update(e);
   }

   function RequestAccessButton(dir) {
      if (hasDialog === true && windowOpen === true) {
         targ = GetDialogCompByAccessIndex(_currentDiagAccessNumber)
         if (targ) {
            targ._AccessHighlight.visible = false
         }
      } else {
         targ = GetCompByAccessIndex(_currentAccessNumber)
         if (targ) {
            targ.HandleAccessDeselect()
         }
      }

      if (hasDialog === true && windowOpen === true) {
         if (dir == "Next") {
            _currentDiagAccessNumber++
         } else {
            _currentDiagAccessNumber--
         }

         if (_currentDiagAccessNumber >= _maxDaigAccessNumber) {
            _currentDiagAccessNumber = -1
            return
         } else if (_currentDiagAccessNumber <= -1) {
            _currentDiagAccessNumber = _maxDaigAccessNumber
            return
         }

      } else {
         if (dir == "Next") {
            _currentAccessNumber++
         } else {
            _currentAccessNumber--
         }

         if (_currentAccessNumber >= _maxAccessNumber) {
            _currentAccessNumber = -1
            return
         } else if (_currentAccessNumber <= -1) {
            _currentAccessNumber = _maxAccessNumber
            return
         }
      }

      if (hasDialog === true && windowOpen === true) {
         newTarg = GetDialogCompByAccessIndex(_currentDiagAccessNumber)
         if (newTarg) {
            newTarg._AccessHighlight.visible = true
         }
      } else {
         newTarg = GetCompByAccessIndex(_currentAccessNumber)
         if (newTarg) {
            newTarg.HandleAccessSelect()
         }
      }
   }

   function RequestAccessButtonActivate() {
      if (hasDialog === true && windowOpen === true) {
         newTarg = GetDialogCompByAccessIndex(_currentDiagAccessNumber)
         if (newTarg) {
            newTarg._AccessHighlight.visible = false
            newTarg._listeners.click[0]();
         }
      } else {
         targ = GetCompByAccessIndex(_currentAccessNumber)
         if (targ) {
            if (targ.constructor == magnetWord) {
               _accessDraggingMode = true
               _admTarg = targ
               targ.BeginAccessDrag()
            } else if (targ.HandleClick) {
               targ.HandleClick()
            } else {
               targ.HandlePress()
            }
         }
      }
   }

   function RequestAccessButtonDeactivate() {
      if (hasDialog === false && windowOpen === false) {
         targ = GetCompByAccessIndex(_currentAccessNumber)
         if (targ) {
            if (targ.HandlePressup) {
               targ.HandlePressup()
            }
         }
      }
   }

   function GetCompByAccessIndex(objIndx) {
      var res, searchObj;
      searchObj = function(idx, prnt) {
         var ch, i, len, ref, subSrch;
         ref = prnt.children;
         for (i = 0, len = ref.length; i < len; i++) {
            ch = ref[i];
            if (ch._accessPos === idx || (ch.classRef && ch.classRef._accessPos == idx)) {
               return ch;
            } else if (ch.children && ch.children.length !== 0) {
               subSrch = searchObj(idx, ch);
               if (subSrch !== false) {
                  return subSrch;
               }
            }
         }
         return false;
      };
      res = searchObj(objIndx, stage);
      return res;
   }

   function GetDialogCompByAccessIndex(objIndx) {
      searchObj = function(idx, prnt) {
         for (var dCh = 0; dCh < prnt.children.length; dCh++) {
            if (prnt.children[dCh]._accessPos == objIndx) {
               return prnt.children[dCh]
            } else if (dCh.children && dCh.children.length !== 0) {
               subSrch = searchObj(idx, dCh);
               if (subSrch !== false) {
                  return subSrch;
               }
            }
         }
         return false;
      }

      res = searchObj(objIndx, dialogCont);
      return res;
   }

   /**
    *
    * @method GetObjectById
    *
    * Retrieves an object such as a button, or FomToggle
    *
    * @param objID:String the id value of the object to retrieve
    * @return Object | false - false if not found
    *
    */
   function GetObjectById(objID) {
      var res, searchObj;
      searchObj = function(id, prnt) {
         var ch, i, len, ref, subSrch;
         ref = prnt.children;
         for (i = 0, len = ref.length; i < len; i++) {
            ch = ref[i];
            if (ch._id === id || (ch.classRef && ch.classRef._id == id)) {
               return ch;
            } else if (ch.children && ch.children.length !== 0) {
               subSrch = searchObj(id, ch);
               if (subSrch !== false) {
                  return subSrch;
               }
            }
         }
         return false;
      };
      res = searchObj(objID, stage);
      return res;
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

   function PredictCjsTextDimention(text, options) {

      if (!options.size) {
         options.size = 14
      }

      if (!options.bold) {
         useBold = ''
      } else {
         useBold = "bold"
      }

      tempText = new createjs.Text(text, useBold + " " + (options.size * scale) + 'px ' + font, '#ff0000');

      if (options.lineWidth) {
         tempText.lineWidth = options.lineWidth
      }

      bnds = tempText.getBounds().clone();

      if (options.padding) {
         bnds.width += options.padding * 2
         bnds.height += options.padding * 2
      }

      if (options.asButton) {
         bnds.width += 7
         bnds.height += 2
      }

      return bnds

   }

   function removeAllHighlights() {
      for (var i = _wordObjects.length - 1; i >= 0; i--) {
         _wordObjects[i].HandleAccessDeselect()
      }

      resetButton = GetObjectById("resetButton")
      if (resetButton) {
         resetButton.HandleAccessDeselect()
      }
      captureButton = GetObjectById("captureButton")
      if (captureButton) {
         captureButton.HandleAccessDeselect()
      }
      printButton = GetObjectById("printButton")
      if (printButton) {
         printButton.HandleAccessDeselect()
      }
      HelpButton = GetObjectById("HelpButton")
      if (HelpButton) {
         HelpButton.HandleAccessDeselect()
      }

   }


   function randomQuery(url) {
      var tempURL;
      tempURL = url.replace(/\s/g, '');
      return tempURL + "?_=" + Math.round((new Date().getTime() * Math.random()) / 100);
   };

   function limitBitmapSize(bitmapToScale, widthLimit, heightLimit) {
      emergeBreaks = 1000

      while (1) {
         if ((bitmapToScale.image.width * bitmapToScale.scaleX) > widthLimit || (bitmapToScale.image.height * bitmapToScale.scaleY) > heightLimit) {
            bitmapToScale.scaleX -= .001
            bitmapToScale.scaleY -= .001
         } else {
            break
         }

         // prevention of endlesslooping death
         emergeBreaks--
         if (emergeBreaks == 0) {
            console.log("ERROR:limitBitmapSize loop emergeBreak")
            break;
         }
      }

   }

   // Starts the activity after createjs has been loaded
   $(document).ready(function() {
      setupPage(init);
   });
