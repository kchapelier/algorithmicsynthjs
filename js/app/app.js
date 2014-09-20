var context;

var App = {};

window.addEventListener('load', function() {
    context = Aural.Utils.Support.getAudioContext();

    var osc = new App.OscillatorLine();

    osc.setFilter({
        type : App.Filter.HIGHPASS,
        keyFollow : 0.1
    });

    console.log(osc.createNode({ velocity : 1, frequency : 440 }).filter);
});
