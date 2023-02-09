/**
 * Provide visibility into current document's utm_* query parameters.
 */

/**
 * Get the URL Search Params object for the current page.
 *
 * @returns {URLSearchParams} Current page params.
 */
const currentPageParams = () => {
	return new URLSearchParams( document.location.search );
};

/**
 * Return true if specific param matches any of the provided values.
 *
 * @param {string}          utmParam Name of utm_parameter to check.
 * @param {string[]|string} values   List of values to check for.
 * @param {URLSearchParams} [params] Optional search params instance to use,
 *                                    uses current page query params by default.
 * @returns {boolean} Whether the parameter has any of the expeced values.
 */
export const has = ( utmParam, values, params = null ) => {
	if ( ! Array.isArray( values ) && typeof values !== 'string' ) {
		return false;
	}

	// Always process values as array.
	if ( ! Array.isArray( values ) ) {
		return has( utmParam, [ values ], params );
	}

	// Load params from current document if not specified.
	if ( ! params || ! params.getAll ) {
		return has( utmParam, values, currentPageParams() );
	}

	for ( let parameterValue of params.getAll( utmParam ) ) {
		if ( ! parameterValue || typeof parameterValue !== 'string' ) {
			continue;
		}

		for ( let targetValue of values ) {
			if ( parameterValue.toLowerCase() === targetValue.toLowerCase() ) {
				return true;
			}
		}
	}

	return false;
};
