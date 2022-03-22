# etch-a-sketch

Etch-a-sketch game in Vanilla JS.

Created as part of The Odin Project curriculum.

[Live version](https://melladoma.github.io/js-retro-games/)

## Functionalities

- By default, a color trail is left on the grid upon hovering any cell. Color adding can be stopped by clicking and re-enabled by clicking again.
- Grid functionalities panel:
  - a new grid can be created according to user choice size,
  - borderless grid can be toggled
  - grid with round cells can be toggled
  - grid reset : resets a blank new grid, according to last user choice on size, color mode isn't changed since last user choice
- Color modes:
  - default mode : blue color trail
  - funky mode : a random color is generated for every cell entered,
  - color gallery : user can pick any of the pre-selected colors by clicking on color square of its choice,
  - custom mode : custom mode color is triggered by changing any number of any r,g,b fields (=> it generates the color associated with this rgb value) or by clicking the custom mode buttom (if nothing entered, trail will be black as 0,0,0 is defined by default in the r,g,b fields)
  - blend effect: once toggled, will darken the color if passing over a cell that is already colored, in three steps.
