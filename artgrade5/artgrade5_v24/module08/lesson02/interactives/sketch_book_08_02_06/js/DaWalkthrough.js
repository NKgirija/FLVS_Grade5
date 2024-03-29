// Generated by CoffeeScript 1.10.0

/**
*
* The DaWalkthrough
*
* @class DaWalkthrough
*
* @author C.J. Morrison
*
* @since 03/04/2017
*
 */

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.DaWalkthrough = (function() {

    /**
    *
    * ID associated with object, this is used for searching and selecting, this is required and must be unique
    *
    * @property _id
    *
    * @type {String}
    *
    * @default void 0
    *
     */
    DaWalkthrough.prototype._id = void 0;


    /**
    *
    * Drawing Area Reference, this will reference the Drawing Area this Walkthrough is associated with.
    *
    * @property _daRef
    *
    * @type {DrawingArea}
    *
    * @default void 0
    *
     */

    DaWalkthrough.prototype._daRef = void 0;

    DaWalkthrough.prototype._container = void 0;

    DaWalkthrough.prototype._wtData = void 0;

    DaWalkthrough.prototype._stepIndex = void 0;


    /**
    *
    * Constructor will define the properties for this class and call Build method
    *
    * @method DaWalkthrough
    * 
    * @param daRef - Drawing Area Reference.
    * @return void 0
    *
     */

    function DaWalkthrough(daRef, useData) {
      this.HandleProgClick = bind(this.HandleProgClick, this);
      this.SetStep = bind(this.SetStep, this);
      this.End = bind(this.End, this);
      this.Start = bind(this.Start, this);
      this.BuildWalkthrough = bind(this.BuildWalkthrough, this);
      this._daRef = daRef;
      this._id = useData.ID;
      this._wtData = useData;
      this._stepIndex = 0;
      this.BuildWalkthrough();
      return;
    }

    DaWalkthrough.prototype.BuildWalkthrough = function() {
      this._container = new createjs.Container;
      this._toolTip = new window.DaTooltip(this._daRef, {
        id: this._id + "_tooltip",
        pointDirection: "left"
      });
      this._toolTip.Show();
      this._container.addChild(this._toolTip._container);
    };

    DaWalkthrough.prototype.Start = function() {
      this._daRef._toolTipLock = true;
      this._stepIndex = 0;
      this.SetStep(this._stepIndex);
      this._daRef._displayLayers.walkthrough.addChild(this._container);
      this._daRef._cjsStage.setChildIndex(this._daRef._displayLayers.walkthrough, this._daRef._cjsStage.numChildren - 1);
      return this._daRef._cjsStage.setChildIndex(this._daRef._displayLayers.modals, this._daRef._cjsStage.numChildren - 1);
    };

    DaWalkthrough.prototype.End = function() {
      this._daRef._toolTipLock = false;
      this._daRef.ModalUnlock();
      return this._daRef._displayLayers.walkthrough.removeAllChildren();
    };

    DaWalkthrough.prototype.SetStep = function(index) {
      var dur, f, i, j, len, len1, ref, ref1, results, stepData, t, target;
      this._stepIndex = index;
      this._daRef.ModalLock();
      this._daRef.DeactivateScreenUI(true);
      createjs.Sound.stop();
      stepData = this._wtData.Steps[this._stepIndex];
      this._toolTip.Move(stepData.x, stepData.y);
      if (stepData.direction) {
        this._toolTip._options.pointDirection = stepData.direction;
      } else {
        this._toolTip._options.pointDirection = "left";
      }
      this._toolTip.SetText(stepData.text);
      if (stepData.progress === "click") {
        if (stepData.targets) {
          ref = stepData.targets;
          for (i = 0, len = ref.length; i < len; i++) {
            t = ref[i];
            target = this._daRef.GetDaObjectById(t);
            if (target.Enable) {
              target.Enable();
            }
            if (target.addEventListener) {
              target.addEventListener("click", this.HandleProgClick);
            } else if (target._container.addEventListener) {
              target._container.addEventListener("click", this.HandleProgClick);
            }
          }
        } else {
          this._container.addEventListener("click", this.HandleProgClick);
        }
      } else if (stepData.progress === "time") {
        if (stepData.duration) {
          dur = stepData.duration;
        } else {
          dur = 3000;
        }
        setTimeout(this.HandleProgClick, dur);
      }
      if (stepData.textVO) {
        createjs.Sound.play(this._id + "_sVO" + this._stepIndex, {
          interrupt: createjs.Sound.INTERRUPT_ANY
        });
      }
      if (stepData.onStepStart) {
        ref1 = stepData.onStepStart;
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          f = ref1[j];
          results.push(this._daRef._managerRef.ParseDataText(this._daRef, f));
        }
        return results;
      }
    };

    DaWalkthrough.prototype.HandleProgClick = function(e) {
      var i, len, ref, stepData, t, target;
      stepData = this._wtData.Steps[this._stepIndex];
      if (stepData.targets) {
        ref = stepData.targets;
        for (i = 0, len = ref.length; i < len; i++) {
          t = ref[i];
          target = this._daRef.GetDaObjectById(t);
          if (target.removeEventListener) {
            target.removeEventListener("click", this.HandleProgClick);
          } else if (target._container.removeEventListener) {
            target._container.removeEventListener("click", this.HandleProgClick);
          }
        }
      }
      if (this._stepIndex >= this._wtData.Steps.length - 1) {
        return this.End();
      } else {
        return this.SetStep(this._stepIndex + 1);
      }
    };

    return DaWalkthrough;

  })();

}).call(this);
