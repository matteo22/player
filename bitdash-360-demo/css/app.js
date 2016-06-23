/**
 * funziona che aggiorna il contenuto del div
 */
function aggiornaDiv(testo) {
    document.getElementById('player-state').innerHTML = testo
}

/**
 * in questa funzione vengono date le specifiche al player, e gli viene detto cosa fare, usando l'oggetto conf in formato JSON
 */
function Main() {
    var conf = {
        key: "427a38e5-f37b-436f-a340-1c54aa757e68",


        style: {
            width: '100%',
            height: '100%',
            mouse: 'false',
            controls: 'true'
        },
        source: {
            dash: 'http://192.168.150.100/live/vrstream/manifest.mpd',
            vr: {
                startupMode: '2d'
            }
        },
            /**
             * in questa funzione vengono gestiti gli eventi
             */
        events: {
            onPlay: function () {
                document.getElementById('player-state').innerHTML = 'Playing';
                playerVA.start(3600 * 24);

            },

            onPause: function () {
                document.getElementById('player-state').innerHTML = 'Pause'
                playerVA.stop();
            },


            onStartBuffering: function () {
                document.getElementById('player-state').innerHTML = 'Buffering'
            },

            onStopBuffering: function () {
                document.getElementById('player-state').innerHTML = 'Stop Buffering'
            },

            onSourceLoaded: function () {

            }
        }
    };
    
/**
 *introduzione di  ShinyStat, serve per verificare le statistiche dell' account verso il player
 */
    if (window.codeVAReady) {
        playerVA = new videoAnalytics();
        playerVA.loadVideoAnalytics("AC001a", "ac020/live_vr", window.location.href, "Demo Live VR ac020", 0)
    }
/**
 * il player viene istanziato. Il .then valuta due casi: successo o errore
 */
    var player = bitdash('player');
    player.setup(conf).then(function (value) {
        console.log('player loaded');
    }, function (reason) {
        console.log('error during player setup', reason)
    });
}

 
window.addEventListener("load",Main);