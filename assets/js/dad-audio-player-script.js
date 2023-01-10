// const TRACKS = [{
//     //"track": 1,
//     "name": "Only One Can Win The Battle (Heroic, Action, Orchestral)",
//     //"duration": "1:36",
//     "file": "https://drive.google.com/uc?export=download&id=1h8Les6WrdnCQHKEHr2kSpoq66hg6OJ69"
// }, {
//     //"track": 2,
//     "name": "Are You Sure, Right Now? (Mysterious, Dark, Orchestral)",
//     //"duration": "2:02",
//     "file": "https://drive.google.com/uc?export=download&id=120TRS41xP36vWwGU3rbVeNwInJCDtV5W"
// }, {
//     //"track": 3,
//     "name": "Do You Fancy A Walk? (Whimsical, Light, Orchestral)",
//     //"duration": "1:08",
//     "file": "https://drive.google.com/uc?export=download&id=1Tm8D0bp1FXTDg8iAMo7QgDUP6CAQVZni"
// }, {
//     //"track": 4,
//     "name": "JSOM News Theme",
//     //"duration": "0:30",
//     "file": "https://drive.google.com/uc?export=download&id=1lvuqWeL-jR3bdza2a5djirxHTUV0glLS"
// }, {
//     //"track": 5,
//     "name": "A Hero's Tribute (Patriotic, Orchestral)",
//     //"duration": "1:18",
//     "file": "https://drive.google.com/uc?export=download&id=1fYTOZBhCgy_zBiRqbzwVKI9u6IKTReqv"
// }];

jQuery(function ($) {
    'use strict'
    var supportsAudio = true; // !!document.createElement('audio').canPlayType;
    // most modern browsers support this... to bad for them if they do not
    if (supportsAudio) {

        // find all the audio tags marked alec-audioplayer-xxx
        // loop through them and create the player for each
        const players = $('[class^="alec-audioplayer-"]');
        console.log('there are ', players.length, ' players')
        players.each((player, attrs) => {

            const selector = `.${attrs.className}`;
            new Plyr(selector, { controls: ['restart', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume'] });

        });

    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('.alec-audioplayer-1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});