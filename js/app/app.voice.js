(function(App) {
    "use strict";

    var hardcodedEnveloppe = new App.Enveloppe();
    hardcodedEnveloppe.setProperties({
        attack : 0.5,
        decay : 0.75,
        sustain : 0.7,
        release : 1.0
    });

    var Voice = function(context) {
        this.lines = [];
        this.gain = context.createGain();
        this.context = context;
        this.velocity = 1;
    };

    Voice.prototype.lines = null;
    Voice.prototype.gain = null;
    Voice.prototype.context = null;
    Voice.prototype.velocity = null;

    Voice.prototype.setVelocity = function(velocity) {
        this.velocity = velocity;
    };

    Voice.prototype.addLine = function(line) {
        this.lines.push(line);
        line.output.connect(this.gain);
    };

    Voice.prototype.connect = function(destination) {
        var maxGain = Math.pow(this.velocity, 0.75); // very arbitrary here
        //this.gain.gain.value = maxGain;
        console.log(maxGain);
        hardcodedEnveloppe.applyToAudioParam(this.context, this.gain.gain, 0.0, maxGain);
        this.gain.connect(destination);
    };

    Voice.prototype.release = function(callback) {
        hardcodedEnveloppe.applyToAudioParam(this.context, this.gain.gain, 0.0, 0.0, true);

        setTimeout(callback, hardcodedEnveloppe.release * 1000 + 25);
    };

    Voice.prototype.disconnect = function(destination) {
        this.gain.disconnect(destination);
    };

    App.Voice = Voice;
}(App || {}));