var context,
    synth,
    smi;

var App = { UI : {}};

window.addEventListener('load', function() {
    "use strict";

    context = Aural.Utils.Support.getAudioContext();

    smi = new SimpleMidiInput();
    synth = new App.Synth(context);

    synth.setOscillatorLineProperties(1, {
        oscillator : {
            fineTuning : 7
        }
    });

    synth.setOscillatorLineProperties(2, {
        oscillator : {
            fineTuning : -7
        }
    });

    var ui = new App.UI.Main(synth, smi);



    smi.on('noteOn', function(data) {
        synth.noteOn(Aural.Music.Note.createFromMidi(data.key), data.velocity / 127);
    }).on('noteOff', function(data) {
        synth.noteOff(Aural.Music.Note.createFromMidi(data.key));
    });

    // "Main volume" TODO set it using the MIDI learn system later
    smi.on('cc7', function(data) {
        synth.setVolume(data.value / 127);
    });

    // "All sound off" and "All note off" messages
    smi.on('cc120', function() {
        synth.panic();
    }).on('cc123', function() {
        synth.panic();
    });

    /*
    // Modulation wheel
    smi.on('cc1', function(data) {
        synth.setModulation(data.value / 127);
    });

    // Pitch wheel
    smi.on('pitchWheel', function(data) {
        synth.setPitch(data.value / 127);
    });

    // Sustain events
    smi.on('cc64', function(data) {
        synth.setSustain(data.value > 0);
    });
    */

    /*
    smi.on('global', function(data) {
        console.log(data);
    });
    */

    navigator.requestMIDIAccess().then(
        function(midi) {
            console.log(midi.inputs());
            smi.attach(midi.inputs());
        },
        function(err) {
            console.log('ERROR : ' + err.code);
        }
    );
});
