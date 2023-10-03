<?php
/**
 * DokuWiki Plugin copycode (Action Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  Nicolas Prigent <mail.nicolasprigent@gmail.com>
 */

// must be run within Dokuwiki
if (!defined('DOKU_INC')) {
    die();
}

class action_plugin_copycode_copycode extends DokuWiki_Action_Plugin
{

    /**
     * Registers a callback function for a given event
     *
     * @param Doku_Event_Handler $controller DokuWiki's event controller object
     *
     * @return void
     */
    public function register(Doku_Event_Handler $controller)
    {
        $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this, 'pass_settings_js');   
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this,'add_cursor_styling'); 
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this,'hook_copycode_js');     
    }

    /**
     * [Custom event handler which performs action]
     *
     * Called for event:
     *
     * @param Doku_Event $event  event object by reference
     * @param mixed      $param  [the parameters passed as fifth argument to register_hook() when this
     *                           handler was registered]
     *
     * @return void
     */
    public function hook_copycode_js(Doku_Event $event, $param)
    {
		// this code does not need execution (anymore?), as 'script.js' is automatically merged into global js.php.
        // $event->data['script'][] = array(
            // 'type'    => 'text/javascript',
            // 'charset' => 'utf-8',
            // '_data'   => '',
            // 'src'     => DOKU_PLUGIN.'copycode/script.js');
    }

    /**
     * Event handler to pass settings to JavaScript via $JSINFO
     *
     * Called for event:
     *
     * @param Doku_Event $event  event object by reference
     * @param mixed      $param  [the parameters passed as fifth argument to register_hook() when this
     *                           handler was registered]
     *
     * @return void
     */
    public function pass_settings_js(Doku_Event $event, $param)
    {
		
		global $JSINFO;
		if (empty($JSINFO['plugins'])) {
			$JSINFO['plugins'] = [];
		}
		$JSINFO['plugins']['copycode'] = [
			'EnableForInline' => $this->getConf('enable_for_inline', 0)
		];
	}

    /**
     * adds cursor styling
     *
     */
    public function add_cursor_styling()
    {
        $cursor = $this->getConf('copycode_hover_cursor');
        echo '<style>.enabled-copycode { cursor:'. $cursor .'; }</style>';
    }

}

