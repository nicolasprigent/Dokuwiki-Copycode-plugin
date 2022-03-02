/**
 * DokuWiki Plugin copycode (Action Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  Nicolas Prigent <mail.nicolasprigent@gmail.com>
 *
 * Adds a click event on all code blocks that copy the content of the block to clipboard
 *
 */

jQuery(document).ready(function ($) {
  //Function to copy the content of an element and send it to clipboard
  function writeToClipboard(elem, mc) {
    inputValue = "";

    if (typeof elem == "string") {
      inputValue = elem;
      alertText = "selectioncopied";
      alertClass = "orange";
	    
    } else {
      inputValue = elem.textContent;
	    
      if (inputValue) {
        if (mc == 3) {
          inputValue = inputValue.split("_||copycode||_").join(" ");
          inputValue = inputValue.split("\n").join(" ");
          alertText = "copiedinline";
          alertClass = "blue";
		
        } else {
          inputValue = inputValue.split("_||copycode||_").join("\n");
          alertText = "copied";
          alertClass = "green";
        }
      }
    }

    //replacing problematic white space character that appears for no obvious reason :/
    inputValue = inputValue.split(/\u00A0/).join("");
	  
    if (inputValue != "") {
      //check if clipboard is available in navigator
      if (navigator.clipboard != undefined) {
        //Copy raw text to clipboard
        navigator.clipboard.writeText(inputValue);
      } else {
        //if for any reason the clipboard is unavalaible, uses the fake textarea hack to copy the content

        var $textarea = $("<textarea />");

        $textarea
          .val(inputValue)
          .css({ width: "1px", height: "1px" })
          .appendTo("body");

        $textarea.select();

        document.execCommand("copy");

        $textarea.remove();
      }

      alertMessage(LANG.plugins.copycode[alertText], alertClass);
    }
  }

  function alertMessage(message, alertclass) {
    var alertMsg =
      '<div class="' + alertclass + ' alert-copycode">' + message + "</div>";

    $("body").append(alertMsg);

    window.setTimeout(function () {
      $(".alert-copycode")
        .fadeTo(500, 0)
        .slideUp(500, function () {
          $(this).remove();
        });
    }, 1000);
  }

  var bloc_code = $("#dokuwiki__content pre.code, #dokuwiki__content pre.file");

  if (JSINFO.plugins.copycode.EnableForInline)
    bloc_code = bloc_code.add("#dokuwiki__content code");

  bloc_code.addClass("enabled-copycode");

  for (i = 0; i < bloc_code.length; i++) {
    //deactivate context menu on right click
    $(bloc_code[i]).on("contextmenu", function (evt) {
      evt.preventDefault();
    });
    $(bloc_code[i]).mouseup(function (event) {
      switch (event.which) {
        case 1:
          selected_text = window.getSelection().toString();

          if (selected_text != "") {
            writeToClipboard(selected_text, 1);
          } else {
            writeToClipboard(this, 1);
          }
          break;
        case 2:
          //alert("Middle Mouse button");
          break;
        case 3:
          //alert("Middle Mouse button");
          writeToClipboard(this, 3);
          break;
        default:
          alert("Nothing");
      }
    });

    line = $(bloc_code[i])
      .find("ol > li")
      .append('<span class="copycode_line">_||copycode||_</span>');
  }
});
