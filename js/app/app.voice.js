(function() {
    "use strict";

    var Voice = function(context) {
        this.lines = [];
        this.gain = context.createGain();
        this.velocity = 1;
    };

    Voice.prototype.lines = null;
    Voice.prototype.gain = null;

    Voice.prototype.setVelocity = function(velocity) {
        this.velocity = velocity;
    };

    Voice.prototype.addLine = function(line) {
        this.lines.push(line);
        line.output.connect(this.gain);
    };

    Voice.prototype.connect = function(destination) {
        this.gain.gain.value = Math.pow(this.velocity, 0.75); // very arbitrary here
        this.gain.connect(destination);
    };

    Voice.prototype.disconnect = function(destination) {
        this.gain.disconnect(destination);
    };

    App.Voice = Voice;
}(App || {}));