var context,
    synth;

var App = {};

window.addEventListener('load', function() {
    context = Aural.Utils.Support.getAudioContext();

    synth = new App.Synth(context);

    console.log(synth);

    console.log(synth.createVoice(Aural.Music.Note.createFromFrequency(440)));
});
