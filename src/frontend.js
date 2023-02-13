import { has as hasQuery } from './services/query';
import { has as hasReferrer } from './services/referrer';

/**
 * BYG global object, mostly PHP-filterable.
 *
 * @typedef {object} BYG
 * @property {string[]} referrers  Array of referrer trigger domains.
 * @property {string[]} utmSources Array of utm_source trigger values.
 * @property {boolean}  debug      Whether in debug mode.
 * @property {Function} [trigger]  Trigger logic for BYG behavior.
 * @property {Function} [callback] Callback to execute if trigger condition is met.
 */

/**
 * Default trigger logic, if no other JS has configured a custom path.
 *
 * @param {BYG} BYG Before You Go window global object.
 */
const defaultTrigger = ( { referrers, utmSources, callback } ) => {
	if ( hasQuery( 'utm_source', utmSources ) || hasReferrer( referrers ) ) {
		callback();
	}
};

/**
 * Default callback to fire when BYG trigger condition is met.
 */
const defaultCallback = () => {
	alert( 'BYG would initialize!' );
};

window.addEventListener( 'load', () => {
	// Read in the BYG global values and ensure required arrays are present.
	/** @type {BYG} */
	const BYG = Object.assign( {
		referrers: [],
		utmSources: [],
	}, window.BYG || {} );

	// Ensure trigger and callback are callable.
	if ( typeof BYG.trigger !== 'function' ) {
		BYG.trigger = defaultTrigger;
	}
	if ( typeof BYG.callback !== 'function' ) {
		BYG.callback = defaultCallback;
	}

	BYG.trigger( BYG );
} );
