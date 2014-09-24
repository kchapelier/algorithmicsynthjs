algorithmicsynthjs
==================

Three algorithmic oscillators in parallel with three individual filters and a global filter.

## Roadmap

 - [x] Algorithmic oscillator (with octave, tuning, phasing, gain and stereo panning parameters).
 - [x] 4 arbitrary parameters with configurable name.
 - [ ] ACE editor integration.
 - [x] General structure (3 oscillator > 1 filter per oscillator > 1 gain per voices > 1 global filter > gain).
 - [x] Making it a polyphonic.
 - [ ] Making it work with Midi input.
 - [ ] Implementing Midi learning.
 - [ ] Hardcoded enveloppe.
 - [ ] Hardcode a few preset.
 - [ ] Output saving as WAV.
 - [ ] Minimal UI : premature UI considerations are considered harmful (I just [made this up](http://modelviewculture.com/pieces/the-making-of-myths)).

## Extras

 - [ ] Configurable enveloppe, global or per oscillators ?
 - [ ] Flexible number of oscillators ?
 - [ ] Other types of oscillators ? (basic waveform, handdrawn, ...)
 - [ ] Allow drag&dropping a sound file on a oscillator to be able to use its data in the algorithm.
 - [ ] Saving custom presets.
 - [ ] Making it visually appealing.

## Motivations

 * The flexibility of algorithmic synthesis.
 * Making a case for web-(and javascript)-based audio application for my employers and coworkers.
 * Making a test case for the unstable [Aural.js](https://github.com/kchapelier/Aural.js) and for the MIDI learning ability of [SMI](https://github.com/kchapelier/SimpleMidiInput.js).