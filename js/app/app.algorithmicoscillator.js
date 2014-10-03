(function(App) {
    "use strict";

    var AlgorithmicOscillator = function() {
        this.script = 'result = 0;';
        this.phaseOffset = 0;
        this.octave = 0;
        this.tuning = 0;
        this.fineTuning = 0;
        this.pan = 0;
        this.gain = 1;

        this.param1 = 0;
        this.param2 = 0;
        this.param3 = 0;
        this.param4 = 0;
    };

    // main parameters

    AlgorithmicOscillator.prototype.script = null;
    AlgorithmicOscillator.prototype.phaseOffset = null;
    AlgorithmicOscillator.prototype.octave = null;
    AlgorithmicOscillator.prototype.tuning = null;
    AlgorithmicOscillator.prototype.fineTuning = null;
    AlgorithmicOscillator.prototype.pan = null;
    AlgorithmicOscillator.prototype.gain = null;

    // arbitrary parameters

    AlgorithmicOscillator.prototype.param1 = null;
    AlgorithmicOscillator.prototype.param2 = null;
    AlgorithmicOscillator.prototype.param3 = null;
    AlgorithmicOscillator.prototype.param4 = null;

    AlgorithmicOscillator.prototype.param1Label = null;
    AlgorithmicOscillator.prototype.param2Label = null;
    AlgorithmicOscillator.prototype.param3Label = null;
    AlgorithmicOscillator.prototype.param4Label = null;

    AlgorithmicOscillator.prototype.createNodeFunction = function(params, noteParams) {
        //TODO add functions

        var script = [
            '"use strict";',
            'var previous = 0;',
            'var t = 0;',
            'var window, document;',
            'return function() {',
            '   var phase = ((t * note.frequency / params.sampleRate) + params.phaseOffset + 1) % 1;',
            '   var result = 0;',
            '   t++;',
            '   ' + this.script + ';',
            '   previous = result;',
            '   return result;',
            '};'
        ].join('\n');

        var func = (new Function('params', 'note', script))(params, noteParams); // necessary evil

        return func.bind(func);
    };

    AlgorithmicOscillator.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('script')) {
            this.setScript(properties.script);
        }
        if(properties.hasOwnProperty('phaseOffset')) {
            this.setPhaseOffset(properties.phaseOffset);
        }
        if(properties.hasOwnProperty('octave')) {
            this.setOctave(properties.octave);
        }
        if(properties.hasOwnProperty('tuning')) {
            this.setTuning(properties.tuning);
        }
        if(properties.hasOwnProperty('fineTuning')) {
            this.setFineTuning(properties.fineTuning);
        }
        if(properties.hasOwnProperty('pan')) {
            this.setPan(properties.pan);
        }
        if(properties.hasOwnProperty('gain')) {
            this.setGain(properties.gain);
        }

        if(properties.hasOwnProperty('param1')) {
            this.param1 = properties.param1;
        }

        if(properties.hasOwnProperty('param2')) {
            this.param2 = properties.param2;
        }

        if(properties.hasOwnProperty('param1')) {
            this.param3 = properties.param3;
        }

        if(properties.hasOwnProperty('param1')) {
            this.param4 = properties.param4;
        }
    };

    AlgorithmicOscillator.prototype.setScript = function(script) {
        this.script = script;
        this.retrieveParametersLabel();
    };

    AlgorithmicOscillator.prototype.setPhaseOffset = function(phaseOffset) {
        this.phaseOffset = Math.min(1, Math.max(-1, phaseOffset));
    };

    AlgorithmicOscillator.prototype.setOctave = function(octave) {
        this.octave = Math.min(4, Math.max(-4, ~~octave));
    };

    AlgorithmicOscillator.prototype.setTuning = function(tuning) {
        this.tuning = Math.min(12, Math.max(-12, ~~tuning));
    };

    AlgorithmicOscillator.prototype.setFineTuning = function(fineTuning) {
        this.fineTuning = Math.min(100, Math.max(-100, fineTuning));
    };

    AlgorithmicOscillator.prototype.setPan = function(pan) {
        this.pan = Math.min(1, Math.max(-1, pan));
    };

    AlgorithmicOscillator.prototype.setGain = function(gain) {
        this.gain = Math.min(1, Math.max(0, gain));
    };

    AlgorithmicOscillator.prototype.retrieveParametersLabel = function() {
        var parameterLabelRegexp = /\/\*+ ?param([1-4]) *: *(.*) *\*+\//ig,
            match = null;

        this.param1Label = this.param2Label = this.param3Label = this.param4Label = '';

        while((match = parameterLabelRegexp.exec(this.script)) !== null) {
            var paramNumber = parseInt(match[1], 10),
                paramLabel = match[2].trim();


            this['param' + paramNumber + 'Label'] = paramLabel;
        }
    };

    AlgorithmicOscillator.prototype.createNoteParameterObject = function(note) {
        note.transpose(this.octave * 12 + this.tuning, this.fineTuning);

        return {
            frequency : note.frequency
        };
    };

    AlgorithmicOscillator.prototype.createParameterObject = function(context) {
        return {
            sampleRate : context.sampleRate,
            phaseOffset : this.phaseOffset,
            val1 : this.param1,
            val2 : this.param2,
            val3 : this.param3,
            val4 : this.param4
        };
    };

    AlgorithmicOscillator.prototype.createNode = function(context, note) {
        var osc = context.createScriptProcessor(512, 0, 2);

        //TODO make sure the way stereo gain is calculated is "good"

        var noteParams = this.createNoteParameterObject(note),
            params = this.createParameterObject(context),
            leftGain = Math.min(1, Math.max(0, this.gain - this.pan)),
            rightGain = Math.min(1, Math.max(0, this.gain + this.pan));

        var func = this.createNodeFunction(params, noteParams);

        osc.onaudioprocess = function(event) {
            var buffer = event.outputBuffer,
                leftData = buffer.getChannelData(0),
                rightData = buffer.getChannelData(1),
                sampleData = 0;

            for (var sample = 0; sample < buffer.length; sample++) {
                try {
                    sampleData = func();
                } catch(e) {
                    console.log(e);
                }

                if(!isFinite(sampleData)) {
                    sampleData = 0;
                } else {
                    sampleData = Math.min(1, Math.max(-1, sampleData));
                }

                leftData[sample] = sampleData * leftGain;
                rightData[sample] = sampleData * rightGain;
            }
        };

        return osc;
    };

    App.AlgorithmicOscillator = AlgorithmicOscillator;
}(App || {}));