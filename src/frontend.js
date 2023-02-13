import { has as hasQuery } from './services/query';
import { has as hasReferrer } from './services/referrer';

window.addEventListener( 'load', () => {
	// Read in the BYG global values; ensure required arrays are present.
	const BYG = Object.assign( {
		referrers: [],
		utmSources: [],
	}, window.BYG || {} );

	if ( hasQuery( 'utm_source', BYG.utmSources ) || hasReferrer( BYG.referrers ) ) {
		alert( 'BYG would initialize!' );
	}
} );
