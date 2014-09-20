(function(App) {
    "use strict";

    var AlgorithmicOscillator = function() {
        this.script = 'return 0;';
        this.octave = 0;
        this.tuning = 0;
        this.pan = 0;
        this.gain = 1;

        this.param1 = 0;
        this.param2 = 0;
        this.param3 = 0;
        this.param4 = 0;
    };

    // main parameters

    AlgorithmicOscillator.prototype.script = null;
    AlgorithmicOscillator.prototype.octave = null;
    AlgorithmicOscillator.prototype.tuning = null;
    AlgorithmicOscillator.prototype.pan = null;
    AlgorithmicOscillator.prototype.gain = null;

    // arbitrary parameters

    AlgorithmicOscillator.prototype.param1 = null;
    AlgorithmicOscillator.prototype.param2 = null;
    AlgorithmicOscillator.prototype.param3 = null;
    AlgorithmicOscillator.prototype.param4 = null;

    AlgorithmicOscillator.prototype.createNodeFunction = function() {
        var script = [
            'var data = (function(t, params, note) { "use strict"; var window, document; ' + this.script + '}(t, params, note));',
            'return data;'
        ].join('');

        var func = new Function('t', 'params', 'note', script); // necessary evil

        return func.bind(func);
    };

    AlgorithmicOscillator.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('script')) {
            this.script = properties.script;
        }
        if(properties.hasOwnProperty('octave')) {
            this.octave = properties.octave;
        }
        if(properties.hasOwnProperty('tuning')) {
            this.tuning = properties.tuning;
        }
        if(properties.hasOwnProperty('pan')) {
            this.pan = properties.pan;
        }
        if(properties.hasOwnProperty('gain')) {
            this.gain = properties.gain;
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

    AlgorithmicOscillator.prototype.createNoteParameterObject = function(note) {
        return {
            //TODO implements
        };
    };

    AlgorithmicOscillator.prototype.createParameterObject = function() {
        return {
            val1 : this.param1,
            val2 : this.param2,
            val3 : this.param3,
            val4 : this.param4
        };
    };

    AlgorithmicOscillator.prototype.createNode = function(note) {
        var func = this.createNodeFunction();

        var osc = context.createScriptProcessor(4096, 1, 1);

        var t = 0;
        osc.onaudioprocess = function(event) {
            var buffer = event.outputBuffer;
            var data = buffer.getChannelData(0); // we DO know that our channel is mono

            var params = this.createParameterObject();
            var noteParams = this.createNoteParameterObject(note);

            for (var sample = 0; sample < buffer.length; sample++) {
                data[sample] = func(++t, params, noteParams);
            }
        }.bind(this);

        return osc;
    };

    App.AlgorithmicOscillator = AlgorithmicOscillator;
}(App || {}));