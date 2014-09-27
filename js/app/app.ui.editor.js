(function(App) {
    "use strict";

    var Editor = function(element, compileCallback) {
        this.element = element;
        this.compileCallback = compileCallback;

        this.createACE();
        this.createInsertableList();
        this.createButtons();
    };

    Editor.prototype.createACE = function() {
        this.editorElement = document.createElement('pre');
        this.editorElement.style.position = 'absolute';
        this.editorElement.style.margin = 0;
        this.editorElement.style.padding = 0;
        this.editorElement.style.top = 0;
        this.editorElement.style.bottom = 0;
        this.editorElement.style.left = 0;
        this.editorElement.style.right = '200px';
        this.element.appendChild(this.editorElement);

        this.editor = ace.edit(this.editorElement);
        this.editor.setTheme("ace/theme/vibrant_ink");
        this.editor.setShowInvisibles(true);
        this.editor.setShowFoldWidgets(false);
        this.editor.setHighlightActiveLine(true);
        this.editor.setBehavioursEnabled(true);
        this.editor.setDisplayIndentGuides(true);
        this.editor.getSession().setMode("ace/mode/javascript");

        this.session = this.editor.getSession();
        this.session.setUseWrapMode(false);
        this.session.setUseSoftTabs(true);
        this.session.setTabSize(2);
    };

    Editor.prototype.createInsertableList = function() {
        this.insertableList = document.createElement('ul');
        this.insertableList.style.position = 'absolute';
        this.insertableList.style.background = 'red';
        this.insertableList.style.margin = 0;
        this.insertableList.style.padding = 0;
        this.insertableList.style.bottom = '50px';
        this.insertableList.style.top = 0;
        this.insertableList.style.right = 0;
        this.insertableList.style.width = '200px';

        this.populateInsertableList();

        this.element.appendChild(this.insertableList);
    };

    Editor.prototype.populateInsertableList = function() {
        for(var i = 0; i < this.insertables.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('data-value', this.insertables[i].value);
            li.setAttribute('title', this.insertables[i].description);
            li.appendChild(document.createTextNode(this.insertables[i].label));

            li.addEventListener('click', this.insertableClickHandler.bind(this));

            this.insertableList.appendChild(li);
        }
    };

    Editor.prototype.insertableClickHandler = function(e) {
        var element = e.target;
        this.insert(element.getAttribute('data-value'));
    };

    Editor.prototype.createButtons = function() {
        this.buttonList = document.createElement('div');
        this.buttonList.style.position = 'absolute';
        this.buttonList.style.background = 'green';
        this.buttonList.style.margin = 0;
        this.buttonList.style.padding = 0;
        this.buttonList.style.bottom = 0;
        this.buttonList.style.height = '50px';
        this.buttonList.style.right = 0;
        this.buttonList.style.width = '200px';

        this.element.appendChild(this.buttonList);

        this.buttonList.addEventListener('click', this.compileCallback);
    };

    Editor.prototype.insertables = [
        {
            'label' : 'phase',
            'value' : 'phase',
            'description' : 'Current phase in the waveform'
        },
        {
            'label' : 'frequency',
            'value' : 'note.frequency',
            'description' : 'Frequency of the note being played'
        },
        {
            'label' : 'velocity',
            'value' : 'note.velocity',
            'description' : 'Velocity of the note being played'
        },
        {
            'label' : 'parameter #1',
            'value' : 'params.val1',
            'description' : 'First arbitrary parameter'
        },
        {
            'label' : 'parameter #2',
            'value' : 'params.val2',
            'description' : 'Second arbitrary parameter'
        },
        {
            'label' : 'parameter #3',
            'value' : 'params.val3',
            'description' : 'Third arbitrary parameter'
        },
        {
            'label' : 'parameter #4',
            'value' : 'params.val4',
            'description' : 'Fourth arbitrary parameter'
        },
        {
            'label' : 'samplerate',
            'value' : 'params.sampleRate',
            'description' : 'Sample rate of the audio context'
        },
        {
            'label' : 'noise',
            'value' : '(Math.random() * 2 - 1)',
            'description' : 'Random noise'
        },
        {
            'label' : 'simple sine',
            'value' : 'Math.sin(2 * Math.PI * phase)',
            'description' : 'Sine wave'
        },
        {
            'label' : 'simple triangle',
            'value' : '(Math.abs((phase - 0.5) * 4) - 1)',
            'description' : 'Triangle wave'
        },
        {
            'label' : 'simple saw',
            'value' : '(phase * 2 - 1)',
            'description' : 'Saw wave'
        },
        {
            'label' : 'simple square',
            'value' : '(phase > 0.5 ? 1 : -1)',
            'description' : 'Saw wave'
        }
    ];

    Editor.prototype.insert = function(str) {
        this.editor.insert(str);
        this.editor.focus();
    };

    Editor.prototype.setContent = function(str) {
        this.editor.setValue(str);
        this.editor.focus();
        this.editor.navigateFileEnd();
    };

    Editor.prototype.getContent = function() {
        return this.editor.getValue();
    };

    App.UI = App.UI || {};
    App.UI.Editor = Editor;
}(App || {}));