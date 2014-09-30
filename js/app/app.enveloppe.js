(function(App) {
    "use strict";

    // TODO make DAHDSR instead of ADSR (add delay and hold)

    var safeExponentialRampToValue = function(audioParam, value, time) {
        if(value <= 0) {
            audioParam.exponentialRampToValueAtTime(0.000001, time);
            audioParam.linearRampToValueAtTime(0, time + 0.001);
        } else {
            audioParam.exponentialRampToValueAtTime(value, time);
        }
    };

    var Enveloppe = function() {
        this.attack = 0;
        this.decay = 0;
        this.sustain = 1;
        this.release = 0;
    };

    Enveloppe.prototype.attack = null;
    Enveloppe.prototype.decay = null;
    Enveloppe.prototype.sustain = null;
    Enveloppe.prototype.release = null;

    Enveloppe.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('attack')) {
            this.setAttack(properties.attack);
        }
        if(properties.hasOwnProperty('decay')) {
            this.setDecay(properties.decay);
        }
        if(properties.hasOwnProperty('sustain')) {
            this.setSustain(properties.sustain);
        }
        if(properties.hasOwnProperty('release')) {
            this.setRelease(properties.release);
        }
    };

    Enveloppe.prototype.setAttack = function(attack) {
        this.attack = attack;
    };

    Enveloppe.prototype.setDecay = function(decay) {
        this.decay = decay;
    };

    Enveloppe.prototype.setSustain = function(sustain) {
        this.sustain = Math.min(1, Math.max(0, sustain));
    };

    Enveloppe.prototype.setRelease = function(release) {
        this.release = release;
    };

    Enveloppe.prototype.applyToAudioParam = function(context, audioParam, min, max, released) {
        if(!released) {
            this.applyFirstPartToAudioParam(context, audioParam, min, max);
        } else {
            this.applyReleaseToAudioParam(context, audioParam, min);
        }
    };

    Enveloppe.prototype.applyFirstPartToAudioParam = function(context, audioParam, min, max) {
        var currentTime = context.currentTime;

        audioParam.value = max;
        //audioParam.setValueAtTime(min, currentTime);

        //TODO somehow the attack is ignored
        //safeExponentialRampToValue(audioParam, max, currentTime + this.attack);
        //safeExponentialRampToValue(audioParam, this.sustain * max, currentTime + this.attack + this.decay);
        //audioParam.linearRampToValueAtTime(max, currentTime + this.attack);
        //audioParam.linearRampToValueAtTime(this.sustain * max, currentTime + this.attack + this.decay);
    };

    Enveloppe.prototype.applyReleaseToAudioParam = function(context, audioParam, min) {
        var currentValue = audioParam.value,
            currentTime = context.currentTime;

        //TODO doesnt work as expected
        audioParam.cancelScheduledValues(currentTime);
        safeExponentialRampToValue(audioParam, min, currentTime + this.release);
    };

    App.Enveloppe = Enveloppe;

}(App || {}));