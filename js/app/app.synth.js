(function() {
    "use strict";

    var defaultOscillatorLineConfiguration = {
        filter : {
            type : 'lowpass',
            baseFrequency : 20000
        },
        oscillator : {
            script : '/* param1 : label param1 */\n/* param2 : label param2 */\n/* param3 : label param3 */\n/* param4 : label param4 */\n\nresult = Math.sin(2 * Math.PI / phase);'
        }
    };

    var Synth = function(context) {
        this.oscillatorLines = [];
        this.voices = [];
        this.context = context;

        this.createFilter();
        this.createGain();

        this.filter.connect(this.gain);
        this.gain.connect(this.context.destination);

        // setup the three oscillator lines
        this.addOscillatorLine();
        //this.addOscillatorLine();
        //this.addOscillatorLine();
    };

    Synth.prototype.oscillatorLines = null;
    Synth.prototype.voices = null;
    Synth.prototype.context = null;

    Synth.prototype.filter = null;
    Synth.prototype.gain = null;

    Synth.prototype.createFilter = function() {
        this.filter = this.context.createBiquadFilter();
    };

    Synth.prototype.createGain = function() {
        this.gain = this.context.createGain();
    };

    Synth.prototype.addOscillatorLine = function() {
        this.oscillatorLines.push(new App.OscillatorLine(defaultOscillatorLineConfiguration));
    };

    Synth.prototype.setOscillatorLineProperties = function(line, properties) {
        if(this.oscillatorLines[line]) {
            this.oscillatorLines[line].setProperties(properties);
        }
    };

    Synth.prototype.createVoice = function(note) {
        //TODO use a custom object instead of a litteral
        var voice = {
            lines : []
        };

        for(var i = 0; i < this.oscillatorLines.length; i++) {
            var nodes = this.oscillatorLines[i].createNode(this.context, note);
            voice.lines.push(nodes);

            nodes.output.connect(this.context.destination);
        }

        return voice;
    };

    App.Synth = Synth;
}(App || {}));