(function(App) {
    "use strict";

    var Line = function () {
        this.generateElements();
    };

    Line.prototype.appendTo = function(container) {
        container.appendChild(this.element);
    };

    Line.prototype.generateElements = function() {
        this.element = document.createElement('div');
        this.element.className = 'line';

        this.generateFilterElement();
        this.generateOscillatorElement();
    };

    Line.prototype.generateFilterElement = function() {
        var container = document.createElement('div');
        container.className = 'filter';

        var inputType = document.createElement('input');
        inputType.type = 'text'

        this.element.appendChild(container);
    };

    Line.prototype.generateOscillatorElement = function() {
        var container = document.createElement('div');
        container.className = 'oscillator';

        this.element.appendChild(container);
    };

    App.UI = App.UI || {};
    App.UI.Line = Line;
}(App || {}));