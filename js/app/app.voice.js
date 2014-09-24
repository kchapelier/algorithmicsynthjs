(function() {
    "use strict";

    var Voice = function(context) {
        this.lines = [];
        this.gain = context.createGain();
    };

    Voice.prototype.lines = null;
    Voice.prototype.gain = null;

    Voice.prototype.addLine = function(line) {
        this.lines.push(line);
        line.output.connect(this.gain);
    };

    Voice.prototype.connect = function(destination) {
        this.gain.connect(destination);
    };

    Voice.prototype.disconnect = function(destination) {
        this.gain.disconnect(destination);
    };

    App.Voice = Voice;
}(App || {}));