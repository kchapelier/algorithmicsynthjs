(function(App) {
    "use strict";

    var Main = function(synth, smi) {
        this.synth = synth;
        this.smi = smi;
        this.lines = [];

        this.createEditor();
        //this.createLine();
    };

    Main.prototype.editor = null;
    Main.prototype.synth = null;
    Main.prototype.smi = null;
    Main.prototype.lines = null;

    Main.prototype.createLine = function() {
        var line = new App.UI.Line();
        this.lines.push(line);

        line.appendTo(document.getElementById('editor'));
    };

    Main.prototype.createEditor = function() {
        this.editor = new App.UI.Editor(
            document.getElementById('editor'),
            this.compile.bind(this)
        );
    };

    Main.prototype.compile = function() {
        var script = this.editor.getContent();

        this.synth.setOscillatorLineProperties(0, {
            oscillator : {
                script : script
            }
        });

        this.synth.setOscillatorLineProperties(1, {
            oscillator : {
                script : script
            }
        });

        this.synth.setOscillatorLineProperties(2, {
            oscillator : {
                script : script
            }
        });
    };

    App.UI = App.UI || {};
    App.UI.Main = Main;
}(App || {}));