// Register the function, if it does not already exist.
if (!window.slideFunctions['itk-vimeo']) {
    window.slideFunctions['itk-vimeo'] = {
        /**
         * Setup the slide for rendering.
         * @param scope
         *   The slide scope.
         */
        setup: function setupSlide (scope) {
            var slide = scope.ikSlide;

            if (!document.ITK_VIMEO_LOADED) {
                document.ITK_VIMEO_LOADED = true;
                $.getScript('https://player.vimeo.com/api/player.js')
                    .done(function () {
                    })
                    .fail(function () {
                        document.ITK_VIMEO_LOADED = false;
                    });
            }
        },

        /**
         * Run the slide.
         *
         * @param slide
         *   The slide.
         * @param region
         *   The region object.
         */
        run: function runSlide (slide, region) {
            region.itkLog.info('Running itk-vimeo slide: ' + slide.title);

            var slideElement = $('.slide-' + slide.uniqueId);

            // Wait fadeTime before start to account for fade in.
            region.$timeout(function () {
                var options = {
                    id: slide.options.id,
                    width: slideElement.width(),
                    background: 1,
                    title: 0,
                    byline: 0,
                    loop: 0
                };

                var element = document.querySelector('.js-itk-vimeo--player-' + slide.uniqueId);

                try {
                    // Initialize vimeo player.
                    if (!slide.player) {
                        slide.player = new Vimeo.Player(element, options);
                    }

                    var player = slide.player;

                    // Unregister previous event listeners.
                    player.off('play');
                    player.off('ended');
                    player.off('error');

                    // Catch error events.
                    player.on('error', function (data) {
                        region.itkLog.error('Vimeo player error', data);
                        player.stop();
                        region.nextSlide();
                    });

                    // Set the volume to max, since background option sets it to 0.
                    if (slide.options.sound) {
                        player.setVolume(1);
                    }

                    // On video end, go to next slide.
                    player.on('ended', function () {
                        region.nextSlide();
                    });

                    // Disable looping.
                    player.setLoop(false);

                    // If background = 1, does not trigger the autoplay.
                    player.play();

                    // Start progress bar.
                    player.getDuration().then(function (dur) {
                        region.progressBar.start(dur);
                    });
                }
                catch (err) {
                    region.itkLog.info("Error running vimeo video, continuing");
                    region.$timeout((function (region) {
                        region.nextSlide();
                    })(region), 1000);
                }
            }, region.fadeTime);
        }
    };
}
