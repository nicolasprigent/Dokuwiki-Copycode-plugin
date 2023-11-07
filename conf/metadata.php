<?php
/**
 * Options for the copycode plugin
 *
 * @author Nicolas Prigent <mail.nicolasprigent@gmail.com>
 */

$meta['enable_for_inline'] = array('onoff');
$meta['enable_for_highlighted'] = array('onoff');
$meta['copycode_hover_cursor'] = array('multichoice','_choices' => array('default','cell','copy','pointer','crosshair','grab','grabbing','alias','context-menu'));
