(function(App) {
    "use strict";

    var hardcodedEnveloppe = new App.Enveloppe();
    hardcodedEnveloppe.setProperties({
        attack : 1.0,
        decay : 1.0,
        sustain : 0.0,
        release : 0.0
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

    Voice.prototype.setVelocity = function(velocity) {
        this.velocity = velocity;
    };

    Voice.prototype.addLine = function(line) {
        this.lines.push(line);
        line.output.connect(this.gain);
    };

    Voice.prototype.connect = function(destination) {
        var maxGain = Math.pow(this.velocity, 0.75); // very arbitrary here
        hardcodedEnveloppe.applyToAudioParam(this.context, this.gain.gain, 0.0, maxGain);
        this.gain.connect(destination);
    };

    Voice.prototype.disconnect = function(destination) {
        this.gain.disconnect(destination);
    };

    App.Voice = Voice;
}(App || {}));