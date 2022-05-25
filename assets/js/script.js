// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            // mediaPath = 'https://archive.org/download/mythium/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Only One Can Win The Battle (Heroic, Action, Orchestral)",
                "duration": "1:36",
                "file": "https://drive.google.com/uc?export=download&id=1h8Les6WrdnCQHKEHr2kSpoq66hg6OJ69"
            }, {
                "track": 2,
                "name": "Are You Sure, Right Now? (Mysterious, Dark, Orchestral)",
                "duration": "2:02",
                "file": "https://drive.google.com/uc?export=download&id=120TRS41xP36vWwGU3rbVeNwInJCDtV5W"
            }, {
                "track": 3,
                "name": "Do You Fancy A Walk? (Whimsical, Light, Orchestral)",
                "duration": "1:08",
                "file": "https://drive.google.com/uc?export=download&id=1Tm8D0bp1FXTDg8iAMo7QgDUP6CAQVZni"
            }, {
                "track": 4,
                "name": "JSOM News Theme",
                "duration": "0:30",
                "file": "https://drive.google.com/uc?export=download&id=1lvuqWeL-jR3bdza2a5djirxHTUV0glLS"
            }, {
                "track": 5,
                "name": "A Hero's Tribute (Patriotic, Orchestral)",
                "duration": "1:18",
                "file": "https://drive.google.com/uc?export=download&id=1fYTOZBhCgy_zBiRqbzwVKI9u6IKTReqv"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Alec Lubin');
            }).on('pause', function () {
                playing = false;
                npAction.text('Alec Lubin');
            }).on('ended', function () {
                npAction.text('Alec Lubin');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = tracks[id].file;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});