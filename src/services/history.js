const { history, addEventListener, sessionStorage } = window;

/**
 * Store a value in session storage indicating whether the user has already
 * been served a Before You Go! experience.
 */
const SESSION_STORAGE_KEY = 'beforeYouGo';

/**
 * Insert a page into the history, by replacing the current page with the
 * target and then pushing the current actual page again to create a virtual
 * page "back" from the current one.
 *
 * @param {any}             data  Data to set in the injected page state.
 * @param {string|URL|null} bygUrl URL of the history entry to inject.
 */
export const injectPage = ( data, bygUrl ) => {

	/*
	 * The landing page URL where the BYG page was injected from.
	 *
	 * @var string
	 */
	const currentUrl = window.location.href;

	// After navigating backward and forward, clear the navigation
	// hacks out of the history so history navigation works as usual.
	if ( history.state && history.state.isForwardPage ) {
		history.replaceState( {}, '', currentUrl );
		window.location.reload();
		return;
	}

	// Ensure that we're not injecting more than one item into history.
	if ( sessionStorage.getItem( SESSION_STORAGE_KEY ) ) {
		return;
	}

	sessionStorage.setItem( SESSION_STORAGE_KEY, bygUrl );

	/**
	 * Handle popstate navigation in browsers that don't allow access to it directly.
	 *
	 * Browsers have different behavior when it comes to reloading "virtual"
	 * pageviews through their respective History APIs (see
	 * https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API).
	 * Some browsers, when navigating back to entries which exist in their
	 * history, will reload from the URL, while others only update the location
	 * bar and the state object. This function, run after the popstate event
	 * occurs, ensures we get a new pageload rather than solely a location bar update.
	 *
	 * @param {Event} event HTML popstate event triggered by back button navigation.
	 * @param {Window} event.target Window state after pop navigation.
	 */
	const onPopState = ( { state: { isBackPage, isForwardPage } } ) => {

		if ( ! ( isBackPage || isForwardPage ) ) {
			return;
		}

		setTimeout( () => {
			window.location.reload();
			window.scrollTo( 0, 0 );
			history.replaceState( {}, '', currentUrl );
		} );
	};

	history.replaceState( { isBackPage: true }, '', bygUrl );
	history.pushState( { isForwardPage: true }, '', currentUrl );

	addEventListener( 'popstate', onPopState );
};
