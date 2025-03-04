> [!Important]
> 
> ### This project is no longer actively maintained.
> 
> The source code in this repository is no longer maintained. It has been superseded by [version 2](https://os2display.github.io/display-docs/), which offers improved features and better support.
> 
> Thank you to all who have contributed to this project. We recommend transitioning to [Os2Display version 2](https://os2display.github.io/display-docs/) for continued support and updates.
> 
> **Final Release**: The final stable release is version [2.0.0](https://github.com/os2display/vimeo-bundle/releases/tag/2.0.0)
<br>

# os2display/vimeo

Supplies a slide template for playing vimeo videos. This bundle uses Vimeo's js player: https://github.com/vimeo/player.js/

## Installation

Add the git repository to "repositories" in `composer.json`.

<pre>
"repositories": {
    "os2display/vimeo-bundle": {
      "type": "vcs",
      "url": "https://github.com/os2display/vimeo-bundle"
    },
    ...
}
</pre>

Require the bundle with composer.

<pre>
composer require os2display/vimeo-bundle
</pre>

Enable the bundle in `AppKernel.php`, by adding Os2DisplayVimeoBundle to $bundles.

<pre>
new Os2Display\VimeoBundle\Os2DisplayVimeoBundle()
</pre>

Run os2display:core:templates:load command to load the template in the installation.

<pre>
bin/console os2display:core:templates:load
</pre>

Enable the template in the administration.

## Ads and controls

To avoid ads and video controls, the shared video has to come from a user
that has disabled the options at vimeo.com. To do it yourself, you need to have
at least a PLUS account (https://vimeo.com/plus).
