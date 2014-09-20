/**
 * Fake Eventted Audio Param
 * Not in a working state yet
 */

(function() {
    "use strict";

    var FakeAudioParam = function(options) {
        this.defaultValue = options.defaultValue || 0;

        var self = this;

        this.defineProperty(this, 'value', {
            get : function() {
                return self.trigger('getValue');
            },
            set : function(value) {
                self.trigger('setValue', [value]);
            }
        });

        this.value = this.defaultValue;
    };

    FakeAudioParam.prototype.defaultValue = null;

    FakeAudioParam.prototype.setValueAtTime = function(value, time) {
        this.trigger('setValueAtTime', [value, time]);
    };

    FakeAudioParam.prototype.linearRampToValueAtTime = function(value, time) {
        this.trigger('exponentialRampToValueAtTime', [value, time]);
    };

    FakeAudioParam.prototype.exponentialRampToValueAtTime = function(value, time) {
        this.trigger('exponentialRampToValueAtTime', [value, time]);
    };

    FakeAudioParam.prototype.setTargetAtTime = function(target, startTime, timeConstant) {
        this.trigger('setTargetAtTime', [target, startTime, timeConstant]);
    };

    FakeAudioParam.prototype.setValueCurveAtTime = function(value, time) {
        this.trigger('setValueCurveAtTime', [value, time]);
    };

    FakeAudioParam.prototype.cancelScheduledValues = function(time) {
        this.trigger('cancelScheduledValues', [time]);
    };

    /**
     * Create an evented fake audioParam
     * @param options
     * @returns {FakeAudioParam}
     */
    App.createAudioParam = function(options) {
        return new FakeAudioParam(options);
    };

}(App || {}));