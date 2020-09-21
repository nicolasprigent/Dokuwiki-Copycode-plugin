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

    var bloc_code = jQuery("pre.code, pre.file");

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
        navigator.clipboard.writeText(inputValue)
        .then(() => {
            alertMessage(LANG.plugins.copycode[alertText], alertClass);
        })
        .catch(err => {
            console.log(LANG.plugins.copycode['error'], err);
        })
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
