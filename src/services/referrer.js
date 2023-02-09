/**
 * Provide visibility into current document's referrer value.
 */

/**
 * Get the current document.referrer value.
 *
 * @returns {string} document.referrer value.
 */
const getReferrer = () => {
	return document.referrer;
};

/**
 * Remove the protocol and trailing slash from a domain for easier comparison.
 *
 * @param {string} domain Input domain URI, e.g. `https://t.co/`.
 * @returns {string} Cleaned domain, e.g. `t.co`.
 */
const getCleanDomain = ( domain ) => {
	return domain.replace( /https?:\/\//, '' ).replace( /\/+$/, '' ).toLowerCase();
};

/**
 * Check whether the document has one of the provided values as its referrer.
 *
 * @param {string[]|string} values     List of values to check
 * @param {string}          [referrer] Optional specific referrer to compare to.
 *                                     Uses document.referrer by default.
 * @returns {boolean} Whether any of the specified values match the referrer.
 */
export const has = ( values, referrer ) => {
	if ( ! Array.isArray( values ) && typeof values !== 'string' ) {
		return false;
	}

	if ( ! Array.isArray( values ) ) {
		return has( [ values ], referrer );
	}

	if ( typeof referrer !== 'string' ) {
		return has( values, getReferrer() );
	}

	for ( let targetValue of values ) {
		if ( getCleanDomain( referrer ) === getCleanDomain( targetValue ) ) {
			return true;
		}
	}

	return false;
};
