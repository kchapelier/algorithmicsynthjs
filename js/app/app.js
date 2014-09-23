var context,
    synth;

var App = {};

var smi = new SimpleMidiInput();

window.addEventListener('load', function() {
    context = Aural.Utils.Support.getAudioContext();

    synth = new App.Synth(context);

    console.log(synth);

    smi.on('noteOn', function(data) {
        synth.noteOn(Aural.Music.Note.createFromMidi(data.key));
    });

    smi.on('noteOff', function(data) {
        synth.noteOff(Aural.Music.Note.createFromMidi(data.key));
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
