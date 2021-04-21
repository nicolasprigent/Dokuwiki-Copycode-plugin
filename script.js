/**

 * DokuWiki Plugin copycode (Action Component)

 *

 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html

 * @author  Nicolas Prigent <mail.nicolasprigent@gmail.com>

 * 

 * Adds a click event on all code blocks that copy the content of the block to clipboard

 * 

 */



document.addEventListener('DOMContentLoaded', function () {

    var bloc_code = jQuery("pre.code, pre.file, code");

    for(i=0;i<bloc_code.length;i++){

        bloc_code[i].addEventListener('click', function(){
            selected_text = window.getSelection().toString();
            if (selected_text != "") {
                writeToClipboard(selected_text);
            }else{
                writeToClipboard(this);
            }
        });

        line = jQuery(bloc_code[i]).find("ol > li").append('<span class="copycode_line">_||copycode||_</span>');

    }

});


function writeToClipboard(elem) {
    inputValue = '';
    if (typeof elem == 'string'){
        inputValue = elem;
        alertText = 'selectioncopied';
        alertClass = 'orange';
    }else{
        inputValue = elem.textContent;
        if (inputValue) {
            inputValue = inputValue.split("_||copycode||_").join("\n");
            alertText = 'copied';
            alertClass = 'green';
        }
    }
    if (inputValue != '') {
        if (navigator.clipboard != undefined) {
            navigator.clipboard.writeText(inputValue);
        } else {
            /*if for any reason the clipboard is unavalaible, uses the fake textarea hack to copy the content*/
            var $textarea = jQuery('<textarea />');
            $textarea.val(inputValue).css({ width: "1px", height: "1px" }).appendTo('body');
            $textarea.select();
            document.execCommand('copy');
            $textarea.remove();
        }
        alertMessage(LANG.plugins.copycode[alertText], alertClass);
    } 
};


function alertMessage(message, alertclass){
    var alertMsg = '<div class="' + alertclass + ' alert-copycode">' + message + '</div>';

    jQuery( "body" ).append( alertMsg );

    window.setTimeout(function() {
        jQuery(".alert-copycode").fadeTo(500, 0).slideUp(500, function(){
            jQuery(this).remove(); 
        });
    }, 1000);
};
