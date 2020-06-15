/**
 * DokuWiki Plugin copycode (Action Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  Nicolas Prigent <mail.nicolasprigent@gmail.com>
 * 
 * Adds a click event on all code blocks that copy the content of the block to clipboard
 * 
 * Original function : https://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery
 * By jfriend00 : https://stackoverflow.com/users/816620/jfriend00
 * 
 */

document.addEventListener('DOMContentLoaded', function () {

    var bloc_code = jQuery("pre.code");

    for(i=0;i<bloc_code.length;i++){

        bloc_code[i].addEventListener('click', function(){

            copyToClipboard(this)

        });

    }

});


function copyToClipboard(elem) {

    //Alert
    var alertMsg = '<div class="alert alert-success alert-copycode" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>' + LANG.plugins.copycode['copied'] + '</strong></div>';
    jQuery( ".page" ).prepend( alertMsg );

    window.setTimeout(function() {

        jQuery(".alert").fadeTo(500, 0).slideUp(500, function(){

            jQuery(this).remove(); 

        });

    }, 1000);

	  // create hidden text element, if it doesn't already exist

    var targetId = "_hiddenCopyText_";

    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";

    var origSelectionStart, origSelectionEnd;

    if (isInput) {

        // can just use the original source element for the selection and copy

        target = elem;

        origSelectionStart = elem.selectionStart;

        origSelectionEnd = elem.selectionEnd;

    } else {

        // must use a temporary form element for the selection and copy

        target = document.getElementById(targetId);

        if (!target) {

            var target = document.createElement("textarea");

            target.style.position = "absolute";

            target.style.left = "-9999px";

            target.style.top = "0";

            target.id = targetId;

            document.body.appendChild(target);

        }

        target.textContent = elem.textContent;

    }

    // select the content

    var currentFocus = document.activeElement;

    target.focus();

    target.setSelectionRange(0, target.value.length);

    

    // copy the selection

    var succeed;

    try {

    	  succeed = document.execCommand("copy");

    } catch(e) {

        succeed = false;

    }

    // restore original focus

    if (currentFocus && typeof currentFocus.focus === "function") {

        currentFocus.focus();

    }

    

    if (isInput) {

        // restore prior selection

        elem.setSelectionRange(origSelectionStart, origSelectionEnd);

    } else {

        // clear temporary content

        target.textContent = "";

    }

    return succeed;

}