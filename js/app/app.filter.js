(function() {
    "use strict";

    var Filter = function() {
        this.type = Filter.LOWPASS;
        this.baseFrequency = 440;
        this.keyFollow = 0;
        this.q = 0;
    };

    Filter.LOWPASS = 0;
    Filter.HIGHPASS = 1;
    Filter.BANDPASS = 2;

    Filter.prototype.type = null;
    Filter.prototype.baseFrequency = null;
    Filter.prototype.keyFollow = null;
    Filter.prototype.q = null;

    Filter.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('type')) {
            this.setType(properties.type);
        }

        if(properties.hasOwnProperty('baseFrequency')) {
            this.setBaseFrequency(properties.baseFrequency);
        }

        if(properties.hasOwnProperty('keyFollow')) {
            this.setKeyFollow(properties.keyFollow);
        }

        if(properties.hasOwnProperty('q')) {
            this.setQ(properties.q);
        }
    };

    Filter.prototype.setType = function(type) {
        this.type = type;
    };

    Filter.prototype.setQ = function(q) {
        this.q = q;
    };

    Filter.prototype.setBaseFrequency = function(baseFrequency) {
        this.baseFrequency = baseFrequency;
    };

    Filter.prototype.setKeyFollow = function(keyFollow) {
        this.keyFollow = keyFollow;
    };

    Filter.prototype.createNode = function(context, note) {
        var filter = context.createBiquadFilter();

        switch(this.type) {
            case Filter.LOWPASS:
                filter.type = 'lowpass';
                break;
            case Filter.HIGHPASS:
                filter.type = 'highpass';
                break;
            case Filter.BANDPASS:
                filter.type = 'bandpass';
                break;
        }

        var frequency = this.baseFrequency + (note.frequency * this.keyFollow);
        frequency = Math.min(22000, Math.max(10, frequency));

        filter.Q.value = this.q;
        filter.frequency.value = frequency;

        return filter;
    };

    App.Filter = Filter;
}(App || {}))