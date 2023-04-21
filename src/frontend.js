import { getMatchingAudience } from './services/audiences';
import { injectPage } from './services/history';

/**
 * BYG global object, mostly PHP-filterable.
 *
 * @typedef {object} BYG
 * @property {BYG_Page[]} urls     Array of BYG pages and the audiences for each.
 * @property {boolean}  debug      Whether in debug mode.
 * @property {Function} [trigger]  Trigger logic for BYG behavior.
 * @property {Function} [callback] Callback to execute if trigger condition is met.
 */

/**
 * Before You Go page configuration.
 *
 * @typedef {object} BYG_Page
 * @property {string} permalink URL of page to serve.
 * @property {integer} audience Post ID of audience for this page.
 */

/**
 * Default trigger logic, if no other JS has configured a custom path.
 *
 * @param {BYG} BYG Before You Go window global object.
 */
const defaultTrigger = ( BYG ) => {
	const { callback, urls } = BYG;

	BYG.url = getMatchingAudience( urls );

	callback( BYG );
};

/**
 * Default callback to fire when BYG trigger condition is met.
 *
 * @param {BYG} BYG Before You Go window object.
 */
const defaultCallback = ( { url } ) => {
	if ( url ) {
		injectPage( {}, url );
	}
};

window.addEventListener( 'load', () => {

	// Read in the BYG global values and ensure required arrays are present.
	/** @type {BYG} */
	const BYG = Object.assign( {
		referrers: [],
		utmSources: [],
	}, window.BYG || {} );

	if ( typeof BYG.trigger === 'function' ) {
		// Custom logic present. Run BYG.trigger.
		BYG.trigger( BYG );
		return;
	}

	// Default logic. Ensure trigger and callback are callable.
	if ( typeof BYG.trigger !== 'function' ) {
		BYG.trigger = defaultTrigger;
	}
	if ( typeof BYG.callback !== 'function' ) {
		BYG.callback = defaultCallback;
	}

	BYG.trigger( BYG );
} );
