(function(App) {
    "use strict";

    var knobFunction = $.fn.knob;

    var Knob = function(element, options) {
        this.element = $(element);

        var span = $('<span>'),
            step = options.step || 1,
            displayPrecision = options.displayPrecision || 0,
            previousValue = null;

        var change = options.change;
        var newChange = function(value) {
            value = Math.round(value / step) * step;

            // filter out duplicate change events
            if(this.value !== value) {
                this.value = value;
                if (change) {
                    change(value);
                }

                span.text(value.toFixed(displayPrecision));
            }
        }.bind(this);

        options.change = options.release = newChange;

        this.container = knobFunction.apply(this.element, [options]);

        span.attr('style', this.element.attr('style'));
        span.css('lineHeight', span.css('height'));
        this.element.hide();

        this.container.append(span);
    };

    Knob.prototype.element = null;
    Knob.prototype.container = null;
    Knob.prototype.value = null;


    Knob.prototype.setValue = function(value) {
        this.element.val(value).trigger('change');
    };

    Knob.prototype.getValue = function() {
        return this.value;
    };

    App.UI = App.UI || {};
    App.UI.Knob = Knob;
}(App || {}));