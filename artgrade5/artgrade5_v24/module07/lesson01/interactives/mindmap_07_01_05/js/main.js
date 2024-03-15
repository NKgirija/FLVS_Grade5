/* global
canvas, createjs
*/

// Sets up all the variables we need out of the box
var appData, preload, manifest;
var ratio, scale;
var stage, tutorialCont, loadingCont, activityCont, playScreenCont, windowCont;
var accBut;
var loadingBarCont, loadingBg, loadingText, loadingGrey, loadingBar, loadingBarWidth, lBbl;
var tutButton;
var dialogOverlay, dialogCont;
var speaker;

var font = 'Calibri';
var bscale = 1;

var unmutedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsBJREFUeNrsWTtOw0AQDb4AqamcE+CcgLihxbmB0yNBTuDkBCQSvX0DJy1NzAkwJyAVdbgBM9IkGkbrDbZ3HRf7pJEVvJ95O5+dMYOBg4ODg4NDc1z1VbGb1/sAHgnIEGT5/fhW6MZ7lpWJQHKQYYPpSCICmYDkRKxbIqg4SIoKkDJByyXxIHawpt8ZEdgMT/ADJG651BLkIMjk1omQFV7w5ED8tutBTJTwCAWZAPZYWAt2skKqIRDqgpX8/4VOfQ1jM/YuprU5RjBmb9QihqyQUFAjoRSTBLMMktooxptxLTxFEIyFZwNGPYjfqQjsuRgTy8D3GpJYUEAHhkJsrgjslFkF3Wgt5jw1JsKskJjMdKDoQRHYE+5igExMi5TBTkF1DLg/aRA2WtCYHflyXZyCnVzig/bBv02JCL57Jh2OKOBdyHTMBYExZbc/FkkVJGwgZvtMuOKg1Aoee2EV7r7bKqt4g+4h03BM6ZtfhFUuJLPX3cWIkItlmnRaqSy5ILeYf0mLoEIzhQsNmbIlfyem94dIxckHFcpKlJ2X8Wew1RD51Mz76RuRc7d7LVySyIPG92818677RiTS+L6uAA16Q4S6R1/c4MfbfSiUlfeOr7KidwESE0X3uNRY6p03b70horgXMtF0JZo0XUnS05QGtpCxkyyohB+wolG6XKlJEJtGre4/Wtqz1e+ZdncnClesjDesav7ibgXvRo1ci5QZg6xMfz5SkCiOJFjVXFkZ1I4RzC4gc2qE9oa4yD4IM9iMEfVlRyg7xsbBzqyTGSAi+6CZ+EoiiWZGv6KQdfDkpi1LjCUFfkkkNqJzjTTp2tx3LebnqWLTfwV7jQRwar2t3OxknakB6+hIlCoSVi5EcouRorSoi0SRAKadVr9knZAuu6KqGapZ4ocywK3EiIWarNY/ehwcHBwcHNrgV4ABABmcGUv+j6TkAAAAAElFTkSuQmCC';
var mutedIcon =   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAelJREFUeNrsmUtugzAQhl3EAbLuqr1BcgPYdNvkBIV9F80JGk6QVuoejpB1NnAEblBWXXOEjqup5CACHoNjI80vjZwHxv4yMx7jCMFisVgsFkvc2bz5/dfTFpoXsPTn9dzaHCu0BLCC5giW4EefYNWiQAAigiYHe7hlaIUze+Ed7M1FjoRL9oKqYAYImQulS4hJHgGANXph7cPyGxpCHDAfTH+AI77dw7JcG6yG0vs19N0b1ZEJXohh0Arv8a2EYYvf1ZoQZWdsWZ+KC4/AhQnSrjr3yODiA74+zhBKai79TQ7GHoS5AiHUuarJnvdA2NBHz2RK9DYFQnqzmG3VogrjutCBGYGI1W1P4GKFgQmkYzAaEPWsdcQSTESBcAoyBkOBcA4yACMoEF6AaMBo1RovQDCxJ9WnwBOIcgBksM54AaIBoQ0TeAghc2KjWzSdgugUO52ieQ0k8wWCsgMw3cabPtKq23gJEVGWWOiTKycyFyEIfRpyaOFkNj07WIpIECOeSYxzRO44cQcbgzUGIA212A3AVJOTXfFOQQ0zzMcMQ6MmjClhUuy7+w9Xco4M5M525MEsVgf18jgIf6kTNI9gp8Wea3VyZyddjrG/TJAe71S3BLH9t4I8B37GxGwFi8VisVgsu/oVYAALWu+fsCIWUQAAAABJRU5ErkJggg==';
var bodyHTML = '<div id="actCont"><canvas id="canvas" width="750" height="650"></canvas><div id="controlCont"><div id="muteToggle"><img src="'+unmutedIcon+'"/></div></div></div>';
var focusPlayCnt = 0;
var focusPlayIndicator;

// Defines where createjs is, what the default margin should be, and our indicator as to whether the preloading is done
// We also define the tutorial tooltip and tracker in case we need them
var createjsPath = 'js/createjs-2015.11.26.min.js';
var margin = 30;
var loaded = false;
var finishedActivity = false;
var needTutorial = false;
var hasTutorial = false;
var hasDialog = false;
var windowOpen = false;
var contentModal = false;
var startAudio = false;
var windowID;
var tutTooltip;
var caption;
var focusCnt = 0;
var tutorial = [];
var bubbles = [];

var colourBank = [
   '#f8f8f9', '#fec353', '#faa61a', '#3bbddd', '#faa61a', '#faa61a', '#231f20',
   '#f8f8f9', '#df6343', '#232d3a', '#3bbddd', '#cbcac9', '#d86927', '#ffffff',
   '#63bec8', '#27505e', '#242631', '#f2802e', '#ffffff', '#242631', '#ffffff'
];
var colours = [];

function setupPage(callback) {
   // Adds the createjs library to the interactive page
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.src = createjsPath;
   script.type = 'text/javascript';
   head.appendChild(script);

   $('body').html(bodyHTML);
   window.focus();
   makeMuteButton();

   var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;

   if (isMacLike === true) {
      font = 'Open Sans';
      bscale = 0.8;
   }

   // Calls the callback function, which in this case, is the init function
   $(script).load(callback);
}

function init() {
   // Sets up the stage prior to building the activity
   stage = new createjs.Stage("canvas");
   ratio = 650 / 750;

   // Sets the canvas and stages width and height to be relative to the container size
   canvas.width = stage.width = $('#actCont').width();
   canvas.height = stage.height = canvas.width * ratio;

   // Figures out the scale to be used in position calculations later
   // Multiply any hardcoded position by this number so it displays properly at different sizes
   scale = canvas.width / 750;

   // Enables touch functionality, and an updater which will be used to make sure the canvas always displays what it should, and mouseover functionality (if needed)
   createjs.Touch.enable(stage, true, false);
   createjs.Ticker.addEventListener('tick', updateStage);
   createjs.Ticker.setFPS(24);
   stage.enableMouseOver(24);

   // Establishes the container to put all the activity content in
   // Rather than adding things to the stage, add them here instead
   activityCont = new createjs.Container();
   activityCont.setBounds(0, 0, stage.width, stage.height);
   stage.addChild(activityCont);

   // Establishes the container for any windows
   windowCont = new createjs.Container();
   windowCont.setBounds(0, 0, stage.width, stage.height);
   stage.addChild(windowCont);

   // Establishes the container to put all the loading animation content in
   playScreenCont = new createjs.Container();
   playScreenCont.setBounds(0, 0, stage.width, stage.height);
   stage.addChild(playScreenCont);

   // Establishes the container to put all the loading animation content in
   loadingCont = new createjs.Container();
   loadingCont.setBounds(0, 0, stage.width, stage.height);
   stage.addChild(loadingCont);

   // Starts to build the loading screen and starts to pull the json data for the activity
   buildLoadingScreen();
   loadData(buildManifest);
}

function buildLoadingScreen() {
   // Initializes the width of our loading bar which should start at 0
   loadingBarWidth = 0;

   // Loads the background for the loading screen
   loadingBg = new createjs.Bitmap('img/loading_bg.png');
   loadingBg.scaleX = loadingBg.scaleY = scale;
   loadingCont.addChild(loadingBg);
   loadingBg.image.onload = function() {
      // Builds a container that will hold the bubbles in our loading bar
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

      // Initializes the counter for our bubble maker
      var cnt = 0;

      // Interval that will make bubbles for our loading bar
      lBbl = setInterval(function() {
         // If we haven't made all the bubbles yet
         if (cnt < 1000) {
            // Make a bubble
            loadingBubble();
            // Increase the counter
            cnt++;
         }
         else {
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

function loadingBubble() {
   // Sets a random radius and color to be used for the current bubble
   var radius = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
   var bColours = ['#96c03d', '#8aae3e']
   var c = Math.floor(Math.random() * 2);

   // Builds our current bubble
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
   // If the bubble hasn't reached it's minimum height
   if (bbl.y > (-50 * scale)) {
      // Raise the bubbles position
      bbl.y -= (3 * scale);
   }
   else {
      // Otherwise we remove the bubble
      bbl.removeAllEventListeners();
      loadingBarCont.removeChild(bbl);
   }
}

function startLoadAnimation() {
   // If all the content for the activity is loaded, we can go ahead and build it
   // If it's not, we need to loop the animation and recheck
   if (loaded === true) {
      buildPlayScreen();

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
   }
   else {
      setTimeout(startLoadAnimation, 1000);
   }
}

function buildManifest() {
   // This sets up the manifest of content that we need to load
   // We start with all of the default assets we know we're going to need
   manifest = [{
      src: 'audio/snap.mp3',
      id: 'snapSound',
      type: createjs.AbstractLoader.SOUND,
      crossOrigin: 'Anonymous'
   }, {
      src: 'audio/select.mp3',
      id: 'selectSound',
      type: createjs.AbstractLoader.SOUND,
      crossOrigin: 'Anonymous'
   }, {
      src: 'audio/whoosh.mp3',
      id: 'returnSound',
      type: createjs.AbstractLoader.SOUND,
      crossOrigin: 'Anonymous'
   }, {
      src: randomQuery('img/check.png'),
      id: 'checkImg',
      type: createjs.AbstractLoader.IMAGE,
      crossOrigin: 'Anonymous'
   }, {
      src: randomQuery('img/speechIcon.png'),
      id: 'speechImg',
      type: createjs.AbstractLoader.IMAGE,
      crossOrigin: 'Anonymous'
   }, {
      src: randomQuery('img/placeholder.png'),
      id: 'sampleImg',
      type: createjs.AbstractLoader.IMAGE,
      crossOrigin: 'Anonymous'
   }, {
      src: randomQuery('img/playScreen.png'),
      id: 'playScreenBG',
      type: createjs.AbstractLoader.IMAGE
   }, {
      src: randomQuery('img/playSprites.png'),
      id: 'playSpritesImg',
      type: createjs.AbstractLoader.IMAGE
   }];

   for (var b = 0; b < appData.Bubbles.length; b++) {
      if (appData.Bubbles[b].textVO && appData.Bubbles[b].textVO !== '') {
         appData.Bubbles[b].textVO = randomQuery(appData.Bubbles[b].textVO);

         var tempVO = {};
         tempVO.src = appData.Bubbles[b].textVO;
         tempVO.id = 'textVO' + b;
         tempVO.type = createjs.AbstractLoader.SOUND;
         tempVO.crossOrigin = 'Anonymous';

         manifest.push(tempVO);
      }

      if (appData.Bubbles[b].titleVO && appData.Bubbles[b].titleVO !== '') {
         appData.Bubbles[b].titleVO = randomQuery(appData.Bubbles[b].titleVO);

         var titleVO = {};
         titleVO.src = appData.Bubbles[b].titleVO;
         titleVO.id = 'titleVO' + b;
         titleVO.type = createjs.AbstractLoader.SOUND;
         titleVO.crossOrigin = 'Anonymous';

         manifest.push(titleVO);
      }

      if (appData.Bubbles[b].titleImg) {
         var tempTitleImg = {};
         tempTitleImg.src = randomQuery(appData.Bubbles[b].titleImg);
         tempTitleImg.id = 'titleImg' + b;
         tempTitleImg.type = createjs.AbstractLoader.IMAGE;
         tempTitleImg.crossOrigin = 'Anonymous';

         manifest.push(tempTitleImg);
      }

      if (appData.Bubbles[b].img) {
         var tempImg = {};
         tempImg.src = randomQuery(appData.Bubbles[b].img);
         tempImg.id = 'img' + b;
         tempImg.type = createjs.AbstractLoader.IMAGE;
         tempImg.crossOrigin = 'Anonymous';

         manifest.push(tempImg);
      }
   }

   // If there's instructions audio
   if (appData.Config.CaptionVO && appData.Config.CaptionVO !== '') {
      // Add the instructions audio to the manifest
      appData.Config.CaptionVO = randomQuery(appData.Config.CaptionVO);
      var captVO = {};
      captVO.src = appData.Config.CaptionVO;
      captVO.type = createjs.AbstractLoader.SOUND;
      captVO.id = 'captionVO';
      captVO.crossOrigin = 'Anonymous';

      manifest.push(captVO);
   }

   // If there's instructions text
   if (appData.Config.Instructions && appData.Config.Instructions !== '') {
      // If there's instructions audio
      if (appData.Config.InstructionsVO && appData.Config.InstructionsVO !== '') {
         // Add the instructions audio to the manifest
         appData.Config.InstructionsVO = randomQuery(appData.Config.InstructionsVO);

         var instVO = {};
         instVO.src = appData.Config.InstructionsVO;
         instVO.type = createjs.AbstractLoader.SOUND;
         instVO.id = 'instructionsVO';
         instVO.crossOrigin = 'Anonymous';

         manifest.push(instVO);
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
   // Returns an error that occured while trying to load a file
   console.log('Error!', evt.text);
}

function handleFileProgress() {
   // Returns confirmation the total load percentage of the manifest
   console.log((preload.progress * 100) + '% loaded.');
   // Makes the loading bar coincide with the amount of loading progress that has been made (based on a percentage)
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
   }
   else {
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

function buildActivity() {
   $(document).on('keydown', function(evt) {
      // If it's the left arrow and there's no dialog window
      if (evt.which === 37 && hasDialog === false) {
         // We update the focus counter accordingly, and focus the correct object
         // We also clear focus on anything that doesn't need it now
         if (focusCnt === 0) {
            focusCnt = bubbles.length;
         }
         else {
            focusCnt--;
         }

         clearFocus();

         if (focusCnt !== 0) {
            focusObject();
         }
      }

      // If it's the right arrow and there's no dialog window
      if (evt.which === 39 && hasDialog === false) {
         // We update the focus counter accordingly, and focus the correct object
         // We also clear focus on anything that doesn't need it now
         if (focusCnt === bubbles.length) {
            focusCnt = 0;
         }
         else {
            focusCnt++;
         }

         clearFocus();

         if (focusCnt !== 0) {
            focusObject();
         }
      }
      // If it's the enter key or the space key
      if (evt.which === 13 || evt.which === 32) {
         // If there's a dialog window, this will just make it close
         if (hasDialog === true && windowOpen === true) {
            accBut._listeners.click[0]();
         }
         // Otherwise we use it as our item select button
         else {
            if (hasTutorial === true) {
               if (tutTooltip._listeners !== null) {
                  tutTooltip._listeners.click[0]();
               }
            }
            else {
               // Any functionality in the main activity that needs to be triggered by space or enter goes here
               if (focusCnt !== 0) {
                  if (hasDialog === false) {
                     bubbles[focusCnt - 1]._listeners.click[0]();
                  }
               }
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

      // If it's the i key
      if (evt.which === 73) {
         // If there's a dialog window, this will just make it close
         if (hasDialog === false && windowOpen === false) {
            tutButton._listeners.click[0]();
         }
      }

      // If it's the P key
      if (evt.which === 80) {
         if (hasDialog === false && windowOpen === false) {
            speaker._listeners.click[0]();
         }
      }
   });

   buildColourScheme();

   // This is where you put anything for the activity
   var bg = new createjs.Shape();
   bg.graphics.beginFill(colours[0]).drawRect(0, 0, stage.width, stage.height);
   activityCont.addChild(bg);

   tutButton = new createjs.Container();
   tutButton.setBounds(0, 0, (40 * scale), (40 * scale));
   tutButton.on('click', function() {
      if (hasDialog === false && windowOpen === false) {
         createjs.Sound.play('selectSound');
         // Builds the instructions dialog window
         buildDialog(appData.Config.Instructions, 'full');
         setTimeout(function() {
            createjs.Sound.play('instructionsVO');
         }, 1000);
      }
   });

   var tutButtonBg = new createjs.Shape();
   tutButtonBg.graphics.setStrokeStyle(3).beginFill('#e6d16c').drawCircle(0, 0, (20 * scale));
   tutButton.addChild(tutButtonBg);

   var tutButtonIcon = new createjs.Text('?', 'bold ' + ((30 * bscale) * scale) + 'px ' + font, '#000000');
   tutButtonIcon.regX = tutButtonIcon.getBounds().width / 2;
   tutButtonIcon.textBaseline = 'middle';
   tutButton.x = 20 * scale;
   tutButton.addChild(tutButtonIcon);

   tutButton.x = stage.width - (30 * scale);
   tutButton.y = 30 * scale;

   activityCont.addChild(tutButton);

   var ring = new createjs.Shape();
   ring.graphics.beginStroke(colours[4]).setStrokeStyle(20 * scale).drawCircle(0, 0, (stage.height * 0.35));
   ring.x = stage.width / 2;
   ring.y = stage.height / 2;
   activityCont.addChild(ring);

   var captionBg = new createjs.Shape();
   captionBg.graphics.beginFill(colours[2]).drawCircle(0, 0, (stage.height * 0.175));
   captionBg.x = stage.width / 2;
   captionBg.y = stage.height / 2;
   activityCont.addChild(captionBg);

   caption = new createjs.Text(appData.Config.Caption, 'bold ' + ((28 * bscale) * scale) + 'px ' + font, colours[6]);
   caption.lineWidth = (stage.height * 0.175) - (10 * scale);
   caption.textAlign = 'center';
   caption.regY = caption.getBounds().height / 2;
   caption.x = stage.width / 2;
   caption.y = stage.height / 2;
   activityCont.addChild(caption);

   // Builds the button that plays the search result audio, positions it, and attaches its functionality
   speaker = new createjs.Bitmap(preload.getResult('speechImg'));
   speaker.id = 'speaker';
   speaker.x = stage.width - (35 * scale);
   speaker.y = stage.height - (margin * scale);
   speaker.regX = speaker.regY = 26;
   speaker.scaleX = speaker.scaleY = 0.65 * scale;
   speaker.on('click', function() {
      createjs.Sound.stop();
      createjs.Sound.play('captionVO');
   });
   activityCont.addChild(speaker);

   if (!appData.Config.CaptionVO || appData.Config.CaptionVO === '') {
      speaker.alpha = 0;
   }

   buildBubbles();
   positionBubbles();

   // Builds the pop up dialog at the beginning of the activity with the instructions
   buildDialog(appData.Config.Instructions, 'full');
   setTimeout(function() {
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

      needTutorial = true;
   }
}

function buildColourScheme() {
   var clr;
   var factor = 0;

   if (!appData.Config.ColourScheme && appData.Config.ColourScheme !== '') {
      clr = 'theme1';
   }
   else {
      clr = appData.Config.ColourScheme;
   }

   switch (clr) {
      case 'theme1':
         factor = 0;
         break;

      case 'theme2':
         factor = 1;
         break;

      case 'theme3':
         factor = 2;
         break;
   }

   factor *= 7;

   for (var c = 0; c < 7; c++) {
      colours.push(colourBank[factor + c]);
   }
}

function buildBubbles() {
   var amt;

   if (appData.Bubbles.length > 6) {
      amt = 6;
   }
   else {
      amt = appData.Bubbles.length;
   }

   for (var a = 0; a < amt; a++) {
      var bbl = new createjs.Container();
      bbl.setBounds(0, 0, (stage.height * 0.125), (stage.height * 0.130));
      bbl.x = stage.width / 2;
      bbl.y = stage.height / 2;

      var bblBg = new createjs.Shape();
      bblBg.graphics.beginFill(colours[1]).drawCircle(0, 0, (stage.height * 0.130));
      bbl.addChild(bblBg);

      if (appData.Bubbles[a].type === 'text') {
         var bblText = new createjs.Text();
         bblText = new createjs.Text(appData.Bubbles[a].title, 'bold ' + ((24 * bscale) * scale) + 'px ' + font, colours[6]);
         bblText.lineWidth = (stage.height * 0.130) - (10 * scale);
         bblText.textAlign = 'center';
         bblText.regY = bblText.getBounds().height / 2;
         bbl.addChild(bblText);
      }
      else {
         var bblImg = new createjs.Bitmap(preload.getResult('titleImg' + a));

         if (bblImg.image === undefined) {
            bblImg = new createjs.Bitmap(preload.getResult('sampleImg'));
         }

         bblImg.regX = bblImg.getBounds().width / 2;
         bblImg.regY = bblImg.getBounds().height / 2;

         var downScale = scale;

         if (bblImg.getBounds().width > 128) {
            downScale *= 128 / bblImg.getBounds().width;

            if ((bblImg.getBounds().height * downScale) > 129) {
               downScale *= 128 / bblImg.getBounds().height;
            }
         }
         else {
            if ((bblImg.getBounds().height * downScale) > 129) {
               downScale *= 128 / bblImg.getBounds().height;
            }
         }

         bblImg.scaleX = bblImg.scaleY = downScale;
         bbl.addChild(bblImg);
      }

      var bblHit = new createjs.Shape();
      bblHit.graphics.beginFill('rgba(255, 255, 255, 0.01)').drawCircle(0, 0, (stage.height * 0.130));
      bblHit.idx = a;
      bbl.addChild(bblHit);

      bubbles.push(bbl);
      activityCont.addChild(bbl);
      makeInteractive(bbl);
   }
}

function makeInteractive(obj) {
   obj.on('click', function(evt) {
      contentModal = true;

      var targObj;

      if (evt === undefined) {
         windowID = bubbles[focusCnt - 1].children[2].idx;
         targObj = bubbles[focusCnt - 1].children[0];
      }
      else {
         windowID = evt.target.idx;
         targObj = evt.target.parent.children[0];
      }

      targObj.graphics.clear();
      targObj.graphics.beginFill(colours[5]).drawCircle(0, 0, (stage.height * 0.130));

      createjs.Sound.play('selectSound');
      buildDialog(appData.Bubbles[windowID].text, 'full');

      setTimeout(function() {
         targObj.graphics.clear();
         targObj.graphics.beginFill(colours[1]).drawCircle(0, 0, (stage.height * 0.130));

         focusCnt = 0;
         clearFocus();
      }, 250);

      setTimeout(function() {
         createjs.Sound.play('textVO' + windowID);
      }, 1000);
   });

   obj.on('mouseover', function(evt) {
      if (hasDialog === false && windowOpen === false) {
         createjs.Sound.stop();
         createjs.Sound.play('titleVO' + evt.target.idx);

         evt.target.parent.children[0].graphics.clear();
         evt.target.parent.children[0].graphics.beginFill(colours[5]).drawCircle(0, 0, (stage.height * 0.130));
      }
   });

   obj.on('mouseout', function(evt) {
      if (hasDialog === false && windowOpen === false) {
         if (evt.target.idx !== (focusCnt - 1)) {
            evt.target.parent.children[0].graphics.clear();
            evt.target.parent.children[0].graphics.beginFill(colours[1]).drawCircle(0, 0, (stage.height * 0.130));
         }
      }
   });
}

function positionBubbles() {
   var amt = appData.Bubbles.length;

   bubbles[0].x = stage.width / 2;
   bubbles[0].y = (stage.height / 2) - (stage.height * 0.35);

   switch (amt) {
      case 2:
         bubbles[1].x = stage.width / 2;
         bubbles[1].y = (stage.height / 2) + (stage.height * 0.35);
         break;

      case 3:
         bubbles[1].x = (stage.width / 2) + (stage.height * 0.315);
         bubbles[1].y = (stage.height / 2) + (stage.height * 0.175);

         bubbles[2].x = (stage.width / 2) - (stage.height * 0.315);
         bubbles[2].y = (stage.height / 2) + (stage.height * 0.175);
         break;

      case 4:
         bubbles[1].x = (stage.width / 2) + (stage.height * 0.35);
         bubbles[1].y = stage.height / 2;

         bubbles[2].x = stage.width / 2;
         bubbles[2].y = (stage.height / 2) + (stage.height * 0.35);

         bubbles[3].x = (stage.width / 2) - (stage.height * 0.35);
         bubbles[3].y = stage.height / 2;
         break;

      case 5:
         bubbles[1].x = (stage.width / 2) + (stage.height * 0.335);
         bubbles[1].y = (stage.height / 2) - (stage.height * 0.125);

         bubbles[2].x = (stage.width / 2) + (stage.height * 0.225);
         bubbles[2].y = (stage.height / 2) + (stage.height * 0.275);

         bubbles[3].x = (stage.width / 2) - (stage.height * 0.225);
         bubbles[3].y = (stage.height / 2) + (stage.height * 0.275);

         bubbles[4].x = (stage.width / 2) - (stage.height * 0.335);
         bubbles[4].y = (stage.height / 2) - (stage.height * 0.125);
         break;

      case 6:
         bubbles[1].x = (stage.width / 2) + (stage.height * 0.300);
         bubbles[1].y = (stage.height / 2) - (stage.height * 0.175);

         bubbles[2].x = (stage.width / 2) + (stage.height * 0.300);
         bubbles[2].y = (stage.height / 2) + (stage.height * 0.175);

         bubbles[3].x = stage.width / 2;
         bubbles[3].y = (stage.height / 2) + (stage.height * 0.35);

         bubbles[4].x = (stage.width / 2) - (stage.height * 0.300);
         bubbles[4].y = (stage.height / 2) + (stage.height * 0.175);

         bubbles[5].x = (stage.width / 2) - (stage.height * 0.300);
         bubbles[5].y = (stage.height / 2) - (stage.height * 0.175);
         break;
   }
}

function focusObject() {
   var obj = bubbles[focusCnt - 1].children[2];
   obj.graphics.clear();
   obj.graphics.beginStroke(colours[3]).setStrokeStyle(3 * scale).beginFill('rgba(255, 255, 255, 0.01)').drawCircle(0, 0, (stage.height * 0.130));

   var obj2 = bubbles[focusCnt - 1].children[0];
   obj2.graphics.clear();
   obj2.graphics.beginFill(colours[5]).drawCircle(0, 0, (stage.height * 0.130));

   createjs.Sound.stop();
   createjs.Sound.play('titleVO' + (focusCnt - 1));
}

function clearFocus() {
   for (var c = 0; c < bubbles.length; c++) {
      var obj = bubbles[c].children[2];
      obj.graphics.clear();
      obj.graphics.beginFill('rgba(255, 255, 255, 0.01)').drawCircle(0, 0, (stage.height * 0.130));

      var obj2 = bubbles[c].children[0];
      obj2.graphics.clear();
      obj2.graphics.beginFill(colours[1]).drawCircle(0, 0, (stage.height * 0.130));
   }
}

function resetActivity() {
   // This is where you put anything related to activity completion
   finishedActivity = false;
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
      buildTooltip(num);

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
   else {
      if (startAudio === false) {
         startAudio = true;

         createjs.Sound.play('captionVO');
      }
   }
}

function buildTooltip(num) {
   var tooltipWidth = 250;
   var direction = appData.Config.Tutorial[num].direction;

   // Builds the text for the tooltip based on what's provided in the json data
   var text = new createjs.Text(appData.Config.Tutorial[num].text, 'bold ' + ((23 * bscale) * scale) + 'px ' + font, '#ffffff');
   text.lineWidth = (tooltipWidth * scale) - ((margin * 2) * scale);
   text.textAlign = 'center';

   // Builds the background for the tooltip body
   var bg = new createjs.Shape();
   bg.graphics.beginStroke('#ffffff').setStrokeStyle(5).beginFill('#233b47').drawRoundRect(0, 0, (tooltipWidth * scale), (text.getBounds().height + ((margin * 2) * scale)), 10);

   // Builds the glowing effect for the tooltip body
   var bgGlow = new createjs.Shape();
   bgGlow.graphics.beginStroke('#3BBDDD').setStrokeStyle(15).drawRoundRect(0, 0, (tooltipWidth * scale), (text.getBounds().height + ((margin * 2) * scale)), 10);
   bgGlow.alpha = 0;

   // Pre-calculates the scale of the margin, since we're about to use it a whole bunch
   var amt = margin * scale;

   // Builds the tooltip tail, outline and glowing effect for it
   var tailOut = new createjs.Shape();
   var tailIn = new createjs.Shape();
   var tailGlow = new createjs.Shape();

   tutTooltip.addChild(bgGlow);
   tutTooltip.addChild(tailGlow);

   tutTooltip.addChild(bg);
   tutTooltip.addChild(text);
   tutTooltip.addChild(tailOut);
   tutTooltip.addChild(tailIn);

   // Based on which step of the tutorial we're on determines how we position the tooltip and which side the tail goes on
   switch (direction) {
      case 'left':
         bg.x = bgGlow.x = 0;
         bg.y = bgGlow.y = 0;

         // In this case, the tool tip is beside the second term with the tail on the right
         tailOut.graphics.beginStroke('#ffffff').beginFill('#ffffff').moveTo(0, 0).lineTo((amt * 0.66), (amt / 2)).lineTo(0, amt);
         tailOut.regY = amt / 2;
         tailOut.x = tooltipWidth * scale;
         tailOut.y = (text.getBounds().height / 2) + amt;

         tailIn.graphics.beginStroke('#233b47').beginFill('#233b47').moveTo(0, 0).lineTo((amt * 0.66), (amt / 2)).lineTo(0, amt);
         tailIn.regY = amt / 2;
         tailIn.x = (tooltipWidth - 8) * scale;
         tailIn.y = (text.getBounds().height / 2) + amt;

         tailGlow.graphics.beginStroke('#3BBDDD').beginFill('#3BBDDD').moveTo(0, 0).lineTo((amt * 0.66), (amt / 2)).lineTo(0, amt);
         tailGlow.regY = amt / 2;
         tailGlow.x = (tooltipWidth + 7.25) * scale;
         tailGlow.y = (text.getBounds().height / 2) + amt;
         tailGlow.alpha = 0;

         tutTooltip.regX = (tooltipWidth * scale) + amt;
         tutTooltip.regY = (text.getBounds().height + (amt * 2)) / 2;
         tutTooltip.x = appData.Config.Tutorial[num].x * scale;
         tutTooltip.y = appData.Config.Tutorial[num].y * scale;

         break;

      case 'right':
         bg.x = bgGlow.x = amt - (3 * scale);
         bg.y = bgGlow.y = 0;

         // In this case, the tool tip is beside the second term with the tail on the right
         tailOut.graphics.beginStroke('#ffffff').beginFill('#ffffff').moveTo((amt * 0.66), 0).lineTo(0, (amt / 2)).lineTo((amt * 0.66), amt);
         tailOut.regY = amt / 2;
         tailOut.x = 8 * scale;
         tailOut.y = (text.getBounds().height / 2) + amt;

         tailIn.graphics.beginStroke('#233b47').beginFill('#233b47').moveTo((amt * 0.66), 0).lineTo(0, (amt / 2)).lineTo((amt * 0.66), amt);
         tailIn.regY = amt / 2;
         tailIn.x = 15.5 * scale;
         tailIn.y = (text.getBounds().height / 2) + amt;

         tailGlow.graphics.beginStroke('#3BBDDD').beginFill('#3BBDDD').moveTo((amt * 0.66), 0).lineTo(0, (amt / 2)).lineTo((amt * 0.66), amt);
         tailGlow.regY = amt / 2;
         tailGlow.x = 0;
         tailGlow.y = (text.getBounds().height / 2) + amt;
         tailGlow.alpha = 0;

         tutTooltip.regX = 0;
         tutTooltip.regY = (text.getBounds().height + (amt * 2)) / 2;
         tutTooltip.x = appData.Config.Tutorial[num].x * scale;
         tutTooltip.y = appData.Config.Tutorial[num].y * scale;

         break;

      case 'up':
         bg.x = bgGlow.x = 0;
         bg.y = bgGlow.y = 0;

         // In this case, the tool tip is beside the second term with the tail on the right
         tailOut.graphics.beginStroke('#ffffff').beginFill('#ffffff').moveTo(0, 0).lineTo((amt / 2), (amt * 0.66)).lineTo(amt, 0);
         tailOut.regX = amt / 2;
         tailOut.x = (tooltipWidth / 2) * scale;
         tailOut.y = (text.getBounds().height + (amt * 2));

         tailIn.graphics.beginStroke('#233b47').beginFill('#233b47').moveTo(0, 0).lineTo((amt / 2), (amt * 0.66)).lineTo(amt, 0);
         tailIn.regX = amt / 2;
         tailIn.x = (tooltipWidth / 2) * scale;
         tailIn.y = (text.getBounds().height + (amt * 2)) - (8 * scale);

         tailGlow.graphics.beginStroke('#3BBDDD').beginFill('#3BBDDD').moveTo(0, 0).lineTo((amt / 2), (amt * 0.66)).lineTo(amt, 0);
         tailGlow.regX = amt / 2;
         tailGlow.x = (tooltipWidth / 2) * scale;
         tailGlow.y = (text.getBounds().height + (amt * 2)) + (7.5 * scale);
         tailGlow.alpha = 0;

         tutTooltip.regX = (tooltipWidth / 2) * scale;
         tutTooltip.regY = (text.getBounds().height + (amt * 3));
         tutTooltip.x = appData.Config.Tutorial[num].x * scale;
         tutTooltip.y = appData.Config.Tutorial[num].y * scale;

         break;

      case 'down':
         bg.x = bgGlow.x = 0;
         bg.y = bgGlow.y = amt - (3 * scale);

         // In this case, the tool tip is beside the second term with the tail on the right
         tailOut.graphics.beginStroke('#ffffff').beginFill('#ffffff').moveTo(0, (amt * 0.66)).lineTo((amt / 2), 0).lineTo(amt, (amt * 0.66));
         tailOut.regX = amt / 2;
         tailOut.x = (tooltipWidth / 2) * scale;
         tailOut.y = 8 * scale;

         tailIn.graphics.beginStroke('#233b47').beginFill('#233b47').moveTo(0, (amt * 0.66)).lineTo((amt / 2), 0).lineTo(amt, (amt * 0.66));
         tailIn.regX = amt / 2;
         tailIn.x = (tooltipWidth / 2) * scale;
         tailIn.y = 15.5 * scale;

         tailGlow.graphics.beginStroke('#3BBDDD').beginFill('#3BBDDD').moveTo(0, (amt * 0.66)).lineTo((amt / 2), 0).lineTo(amt, (amt * 0.66));
         tailGlow.regX = amt / 2;
         tailGlow.x = (tooltipWidth / 2) * scale;
         tailGlow.y = 0;
         tailGlow.alpha = 0;

         tutTooltip.regX = (tooltipWidth / 2) * scale;
         tutTooltip.regY = 0;
         tutTooltip.x = appData.Config.Tutorial[num].x * scale;
         tutTooltip.y = appData.Config.Tutorial[num].y * scale;

         break;
   }

   // Now that the tool tip is positioned, we can accurately position the text
   text.x = bg.x + ((margin) * scale) + text.lineWidth / 2;
   text.y = bg.y + amt;

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

function clearTutorial() {
   tutTooltip.removeAllChildren();
}

function buildDialog(text, width) {
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

   var container = new createjs.Container();
   dialogCont.addChild(container);

   // Adds the provided text to the dialog window
   var dialogText = new createjs.Text(text, 'bold ' + ((28 * bscale) * scale) + 'px ' + font, '#FFFFFF');
   dialogText.lineHeight = 28 * scale;
   dialogText.textAlign = 'center';
   container.addChild(dialogText);

   var dialogImg, downScale;

   if (contentModal === true) {
      if (appData.Bubbles[windowID].img && appData.Bubbles[windowID].img !== '') {
         dialogImg = new createjs.Bitmap(preload.getResult('img' + windowID));

         if (dialogImg.image === undefined) {
            dialogImg = new createjs.Bitmap(preload.getResult('sampleImg'));
         }

         dialogImg.regX = dialogImg.getBounds().width / 2;
         dialogImg.regy = dialogImg.getBounds().height / 2;

         downScale = scale;

         console.log(dialogImg.getBounds());

         if (dialogImg.getBounds().width > 400) {
            downScale *= 400 / dialogImg.getBounds().width;

            if ((dialogImg.getBounds().height * downScale) > 301) {
               downScale *= 300 / (dialogImg.getBounds().height * downScale);
            }
         }
         else {
            if ((dialogImg.getBounds().height * downScale) > 301) {
               downScale *= 300 / dialogImg.getBounds().height;
            }
         }

         dialogImg.scaleX = dialogImg.scaleY = downScale;
         container.addChild(dialogImg);
      }
   }

   // Builds the button background
   accBut = new createjs.Container();
   container.addChild(accBut);

   // Builds the button icon and positions it
   var accButBg = new createjs.Shape();
   accButBg.graphics.beginFill('#3bbddd').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));
   accBut.addChild(accButBg);

   // Builds the button icon and positions it
   var accButIcon = new createjs.Bitmap(preload.getResult('checkImg'));
   accBut.addChild(accButIcon);

   accButIcon.regX = accButIcon.regY = accButIcon.getBounds().width / 2;
   accButIcon.scaleX = accButIcon.scaleY = 0.8 * scale;
   accButIcon.x = (accButIcon.regX * scale) + ((margin * 0.75) * scale);
   accButIcon.y = 25 * scale;
   accButIcon.rotation = -20;

   // Adds the default text to the button and positions it
   var accButText = new createjs.Text('Okay', 'bold ' + ((28 * bscale) * scale) + 'px ' + font, '#ffffff');
   accButText.textBaseline = 'middle';
   accBut.addChild(accButText);

   accButText.x = (150 * scale) - (accButText.getBounds().width) - ((margin * 0.75) * scale);
   accButText.y = 25 * scale;

   // If the button is hovered over, we apply it's hover colour and rotate the icon slightly
   accBut.on('mouseover', function() {
      accButIcon.rotation = 20;
      accButBg.graphics.clear().beginFill('#f2802e').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));
   });

   // If we stop hovering, we reset everything
   accBut.on('mouseout', function() {
      accButIcon.rotation = -20;
      accButBg.graphics.clear().beginFill('#3bbddd').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));
   });

   dialogOverlay.on('click', function(evt) {
      evt.stopPropagation();
   });

   // When the button is clicked
   accBut.on('click', function() {
      accButIcon.rotation = 20;
      accButBg.graphics.clear().beginFill('#f2802e').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));

      setTimeout(function() {
         accButIcon.rotation = -20;
         accButBg.graphics.clear().beginFill('#3bbddd').drawRoundRect(0, 0, (150 * scale), (50 * scale), (15 * scale));
      }, 250);

      // We stop all sounds to play our selected object sound
      createjs.Sound.stop();
      createjs.Sound.play('selectSound');

      // If it's the end of an activity, we'll reset it
      if (finishedActivity === true) {
         resetActivity();
      }

      // Then we close the dialog window
      closeDialog();
   });

   var dX, dW;

   // Changes variables used in the dialog's positions based on whether its a half or full width dialog window
   if (width === 'half') {
      dX = stage.width / 4;
      dW = stage.width / 2;
   }
   else {
      dX = 0;
      dW = stage.width;
   }

   // Positions the dialog window accordingly
   dialogText.lineWidth = dW - ((margin * 2) * scale);
   dialogText.x = stage.width / 2;

   accBut.regX = 75 * scale;
   accBut.x = stage.width / 2;

   if (contentModal === true) {
      if (appData.Bubbles[windowID].img) {
         dialogImg.x = stage.width / 2;
         dialogImg.y = dialogText.getBounds().height + (margin * scale);

         accBut.y = dialogImg.y + (dialogImg.getBounds().height * downScale) + (margin * scale);
      }
      else {
         accBut.y = dialogText.getBounds().height + (margin * scale);
      }
   }
   else {
      accBut.y = dialogText.getBounds().height + (margin * scale);
   }

   container.y = stage.height / 2;
   container.regY = container.getBounds().height / 2;

   // Gets the height of the text, and adds some space for padding
   // Enforces a minimum height for the dialog window if the text height is too small
   var dH = container.getBounds().height + ((margin * 2.5) * scale);
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
   }, 1000);
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

   windowOpen = false;
   contentModal = false;

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
      else {
         if (startAudio === false) {
            startAudio = true;

            createjs.Sound.play('captionVO');
         }
      }
   }, 750);
}

function updateStage() {
   // Updates the stage in case anything new has been added or anything has been moved
   stage.update();
}

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

function randomQuery(url) {
   var tempURL = url.replace(/\s/g,'');
   return tempURL + "?_=" + Math.round((new Date().getTime() * Math.random()) / 100);
}

function makeMuteButton() {
   var el = $('#muteToggle');

   el.on('click', function() {
      if (el.hasClass('muted')) {
         el.html('<img src="' + unmutedIcon + '"/>');
         el.removeClass('muted');
         createjs.Sound.volume = 1;
      } else {
         el.html('<img src="' + mutedIcon + '"/>');
         el.addClass('muted');
         createjs.Sound.volume = 0;
      }
   });
}

// Starts the activity after createjs has been loaded
$(document).ready(function() {
   setupPage(init);
});
