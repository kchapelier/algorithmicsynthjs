(function() {
    "use strict";

    var defaultOscillatorLineConfiguration = {
        filter : {
            type : 'lowpass',
            baseFrequency : 20000
        },
        oscillator : {
            script : '/* param1 : label param1 */\n/* param2 : label param2 */\n/* param3 : label param3 */\n/* param4 : label param4 */\n\nresult = Math.sin(2 * Math.PI * phase);'
        }
    };

    var Synth = function(context, destination) {
        destination = destination || context.destination;

        this.oscillatorLines = [];
        this.voices = {};
        this.context = context;

        this.createFilter();
        this.createGain();

        this.filter.connect(this.gain);
        this.gain.connect(destination);

        // setup the three oscillator lines
        this.addOscillatorLine();
        this.addOscillatorLine();
        this.addOscillatorLine();
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

    Synth.prototype.setVolume = function(volume) {
        volume = Math.max(0, Math.min(1, volume));

        this.gain.gain.value = volume;
    };

    Synth.prototype.setModulation = function(modulation) {
        this.modulation = Math.max(0, Math.min(1, modulation)); //TODO currently unused
    };

    Synth.prototype.addOscillatorLine = function() {
        this.oscillatorLines.push(new App.OscillatorLine(defaultOscillatorLineConfiguration));
    };

    Synth.prototype.setOscillatorLineProperties = function(line, properties) {
        if(this.oscillatorLines[line]) {
            this.oscillatorLines[line].setProperties(properties);
        }
    };

    Synth.prototype.getVoiceCount = function() {
        return Object.keys(this.voices).length;
    };

    Synth.prototype.createVoice = function(note) {
        var voice = new App.Voice(this.context);

        for(var i = 0; i < this.oscillatorLines.length; i++) {
            var oscillatorLine = this.oscillatorLines[i];
            if(oscillatorLine.isEnabled()) {
                voice.addLine(oscillatorLine.createNode(this.context, note));
            }
        }

        return voice;
    };

    Synth.prototype.noteOn = function(note, velocity) {
        if(!this.voices.hasOwnProperty(note.midi)) {
            var voice = this.createVoice(note);

            voice.setVelocity(velocity);
            voice.connect(this.filter);

            this.voices[note.midi] = voice;
        }
    };

    Synth.prototype.noteOff = function(note) {
        if(this.voices.hasOwnProperty(note.midi)) {
            var voice = this.voices[note.midi];

            voice.release(function() {
                voice.disconnect(this.filter);
                delete this.voices[note.midi];
            }.bind(this));
        }
    };

    Synth.prototype.panic = function() {
        for(var key in this.voices) {
            if(this.voices.hasOwnProperty(key)) {
                var voice = this.voices[key];

                voice.disconnect(this.filter);
            }
        }

        this.voices = {};
    };

    App.Synth = Synth;
}(App || {}));