/**
 * Trigger the first BYG page matching a user audience (if any).
 */
import { getAudiences } from '@altis/analytics';

/**
 * Before go you page setting.
 *
 * @typedef {object} BYG_Config
 * @property {string} permalink URL of page to serve.
 * @property {integer} audience Post ID of audience for this page.
 */

/**
 * Find the first matching audience from an array of pages.
 *
 * @param {BYG_Config[]} urls Array of Before You Go pages and their audiences.
 * @returns {?string}  URL of BYG page to serve, if one matches.
 */
export const getMatchingAudience = ( urls ) => {
	const userAudiences = getAudiences();

	const matched = urls
		.find( ( { audience } ) => userAudiences.includes( audience ) );

	return matched ? matched.permalink : false;
};
