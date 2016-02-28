const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const Gettext = imports.gettext.domain('web-dev-panel');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Meta = ExtensionUtils.getCurrentExtension();
const Utils = Meta.imports.utils;

const WEBSERVER = 'web-server';
const DATABASE = 'data-base';

let settings;

function init() {
	settings = Utils.getSettings(Meta);
	Utils.initTranslations("web-dev-panel");
}

function buildPrefsWidget() {
	let frame = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL,
		border_width: 10, margin: 20});
	frame.set_spacing(10);
	
	frame.add(_createStringSetting(WEBSERVER, _("Web server service name"), _("Service name of web server")));
	frame.add(_createStringSetting(DATABASE, _("Data base service name"), _("Service name of data base")));
	
	frame.show_all();
	return frame;
}
function _createStringSetting(key, text, tooltip)
{
	let box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
	let label = new Gtk.Label({ label: text, xalign: 0, tooltip_text:tooltip });
	let widget = new Gtk.Entry({text: settings.get_string(key)});
	widget.set_width_chars(30);
	widget.connect('notify::text', function(entry) {
        settings.set_string(key, entry.text);
    });
	box.pack_start(label, true, true, 0);
	box.add(widget);
	return box;
}
