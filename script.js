/**
 * DokuWiki Plugin copycode (Action Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  Nicolas Prigent <mail.nicolasprigent@gmail.com>
 *
 * Adds a click event on all code blocks that copy the content of the block to clipboard
 *
 */


class SourceCodeProvider {

  constructor(source) {
    if (this.constructor === SourceCodeProvider) {
      throw new TypeError("Abstract class must be subclassed.");
    }
    this._source = source;
  }

  get_source_code() {
    throw new TypeError("Not implemented.");
  }
}


class SelectionProvider extends SourceCodeProvider {

  get_source_code() {
    return this._source.getSelection().toString();
  }
}

class BlockProvider extends SourceCodeProvider {

  constructor(source, inline=false) {
    super(source);
    this._inline = inline;
  }

  get_source_code() {
    let result = this._source.textContent.split("_||copycode||_").join("\n");
    if (this._inline) {
      result = result.split("\n").join(" ");
    }
    return result;
  }
}


class CopyCodeStrategy {

  constructor() {
    if (this.constructor === CopyCodeStrategy) {
      throw new TypeError("Abstract class must be subclassed.");
    }
  }

  get_message() {
    throw new TypeError("Not implemented.");
  }

  copy() {
    throw new TypeError("Not implemented.");
  }
}


class DummyCopyStrategy {

  get_message() {
    return "";
  }

  copy() {
    // dummy doens't da anything.
  }
}


class CopyCodeStrategyBase {

  constructor(source) {
    if (this.constructor === CopyCodeStrategyBase) {
      throw new TypeError("Abstract class must be subclassed.");
    }
    this._source = source;
    this._provider = null;
  }

  get_message() {
    return '<div class="' + this._alert_class + ' alert-copycode">' + this._message + "</div>";
  }

  copy() {
    if (this._provider === null) {
      throw new TypeError("No source-code provider available.");
    }
    let inputValue = this._provider.get_source_code();
    // replacing problematic white space character that appears for no obvious reason :/
    inputValue = inputValue.split(/\u00A0/).join("");
    if (inputValue !== "") {
      // check if clipboard is available in navigator
      if (navigator.clipboard != undefined) {
        //Copy raw text to clipboard
        navigator.clipboard.writeText(inputValue);
      } else {
        // if for any reason the clipboard is unavalaible, uses the fake textarea hack to copy the content
        let textarea = document.createElement("textarea");
        textarea.value = inputValue;
        textarea.style = "height: 1px; width : 1px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
    }
  }
}


class CopyHighlighted extends CopyCodeStrategyBase {

  constructor(source) {
    super(source);
    this._message = LANG.plugins.copycode["highlightedcopied"];
    this._alert_class = "orange";
    this._provider = new SelectionProvider(this._source)
  }
}


class CopyBlock extends CopyCodeStrategyBase {

  constructor(source) {
    super(source);
    this._message = LANG.plugins.copycode["copied"];
    this._alert_class = "green";
    this._provider = new BlockProvider(this._source)
  }
}


class CopyBlockInline extends CopyBlock {

  constructor(source) {
    super(source);
    this._message = LANG.plugins.copycode["copiedinline"];
    this._alert_class = "blue";
    this._provider = new BlockProvider(this._source, true)
  }
}


jQuery(document).ready(function ($) {

  //detects mouseup after scroll
  var scrolling = false;
  function preventClickOnScroll () {
    $(window).mouseup(function(){
      scrolling = false;
    });
  }

  function alertMessage(message) {
    $("body").append(message);

    window.setTimeout(function () {
      $(".alert-copycode")
        .fadeTo(500, 0)
        .slideUp(500, function () {
          $(this).remove();
        });
    }, 1000);
  }

  //enabled <code> and <file> blocks on all wiki pages and hooks(sidebar,header,mainpage,dropdownpages etc.)
  var blocs = $(".dokuwiki pre.code, .dokuwiki pre.file");
  //enabled inlinecodes ''like this''
  if (JSINFO.plugins.copycode.EnableForInline)
    blocs = blocs.add(".dokuwiki code");
  blocs.addClass("enabled-copycode");


  for (i = 0; i < blocs.length; i++) {
    //deactivate context menu on right click
    $(blocs[i]).on("contextmenu", function (evt) {
      if (window.getSelection().toString() == "") {
        evt.preventDefault();
      }
    });

    // detects scrolling on element
    $(blocs[i]).scroll(function() {
      scrolling = true;
      preventClickOnScroll();
    });

    $(blocs[i]).mouseup(function (event) {

      if (!scrolling){
        let strategy = new DummyCopyStrategy();
        if (JSINFO.plugins.copycode.EnableForHighlighted) {
          strategy = new CopyHighlighted(window);
        }
        if (window.getSelection().toString() == "") {
          strategy = new CopyBlock(this);
          if (event.which === 3) {
            strategy = new CopyBlockInline(this);
          }
        }
        strategy.copy();
        alertMessage(strategy.get_message());
      }
    });

    line = $(blocs[i])
      .find("ol > li")
      .append('<span class="copycode_line">_||copycode||_</span>');
  }
});
