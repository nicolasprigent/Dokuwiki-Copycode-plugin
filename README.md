# Dokuwiki-Copycode-plugin

Simple plugin for dokuwiki that adds a copy functionnality when clicking on a code block.
https://www.dokuwiki.org/plugin:copycode

## Change Log
### 2021-04-21
- Added "code" html selector in jquery

### 2021-02-18
- If for any reason, navigator.clipboard fails, it uses the hidden textarea hack instead
- Added dutch language file

### 2020-09-21
- Added code selection copy, with its own alert box
- css and js cleaning

### 2020-09-08
Refactoring of copycode functions with navigator.clipboard function instead of hidden input hack. Fixing the jump to top bug on android systems. See https://developer.mozilla.org/fr/docs/Web/API/Clipboard for compatible web browsers (everything but Internet Explorer).
### 2020-08-30
- Fix \<file\> tag with no filename did not work when trying to copy the code block (https://github.com/nicolasprigent/Dokuwiki-Copycode-plugin/issues/4)
### 2020-07-01
- Fix multi linebreaks when there is more than one code block
### 2020-06-25
- Fix preventing jump to top while clicking the code block
### 2020-06-24
- Fix of numbered lines issue
- Updated date and link to github repository
### 2020-06-15
- Initial release
