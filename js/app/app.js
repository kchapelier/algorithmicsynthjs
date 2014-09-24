var context,
    synth;

var App = {};

var smi = new SimpleMidiInput();

window.addEventListener('load', function() {
    context = Aural.Utils.Support.getAudioContext();

    synth = new App.Synth(context);

    synth.setOscillatorLineProperties(1, {
        enabled : false,
        oscillator : {
            fineTuning : 7
        }
    });

    synth.setOscillatorLineProperties(2, {
        enabled : false,
        oscillator : {
            fineTuning : -7
        }
    });

    console.log(synth);

    smi.on('noteOn', function(data) {
        synth.noteOn(Aural.Music.Note.createFromMidi(data.key), data.velocity / 127);
    }).on('noteOff', function(data) {
        synth.noteOff(Aural.Music.Note.createFromMidi(data.key));
    });

    // "All sound off" and "All note off" messages
    smi.on('cc120', function() {
        synth.panic();
    }).on('cc123', function() {
        synth.panic();
    });

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
