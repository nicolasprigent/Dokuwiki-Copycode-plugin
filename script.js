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

            writeToClipboard(this)

        });

        line = jQuery(bloc_code[i]).find("ol > li").append('<span class="copycode_line">_||copycode||_</span>');

    }

});

function writeToClipboard(elem) {
    var inputValue = elem.textContent;
    if (inputValue) {
        inputValue = inputValue.split("_||copycode||_").join("\n");
        navigator.clipboard.writeText(inputValue)
        .then(() => {
            //Alert

            

            var alertMsg = '<div class="alert alert-success alert-copycode" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>' + LANG.plugins.copycode['copied'] + '</strong></div>';

            jQuery( "body" ).append( alertMsg );

            window.setTimeout(function() {
                jQuery(".alert").fadeTo(500, 0).slideUp(500, function(){
                    jQuery(this).remove(); 
                });
            }, 1000);

        })
        .catch(err => {
            console.log(LANG.plugins.copycode['error'], err);
        })
    }
};
