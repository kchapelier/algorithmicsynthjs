(function(App) {
    "use strict";

    var OscillatorLine = function() {
        this.filter = this.createFilter();
        this.oscillator = this.createAlgorithmicOscillator();
    };

    OscillatorLine.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('filter')) {
            this.setFilter(properties.filter);
        }

        if(properties.hasOwnProperty('oscillator')) {
            this.setOscillator(properties.oscillator);
        }
    };

    OscillatorLine.prototype.setFilter = function(properties) {
        this.filter.setProperties(properties);
    };

    OscillatorLine.prototype.setOscillator = function(properties) {
        this.oscillator.setProperties(properties);
    };

    OscillatorLine.prototype.createFilter = function() {
        return new App.Filter();
    };

    OscillatorLine.prototype.createAlgorithmicOscillator = function() {
        return new App.AlgorithmicOscillator();
    };

    OscillatorLine.prototype.createNode = function(note) {
        var filter = this.filter.createNode(note);
        var oscillator = this.oscillator.createNode(note);

        oscillator.connect(filter);

        return {
            filter : filter,
            oscillator : oscillator,
            output : filter
        };
    };

    OscillatorLine.prototype.oscillator = null;
    OscillatorLine.prototype.filter = null;

    App.OscillatorLine = OscillatorLine;
}(App || {}));