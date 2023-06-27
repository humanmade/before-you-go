const { history, addEventListener, removeEventListener } = window;

/**
 * Insert a page into the history, by replacing the current page with the
 * target and then pushing the current actual page again to create a virtual
 * page "back" from the current one.
 *
 * @param {any}             data  Data to set in the injected page state.
 * @param {string|URL|null} bygUrl URL of the history entry to inject.
 */
export const injectPage = ( data, bygUrl ) => {
	const currentPage = window.location.href;

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
	 * @param {Event} event HTML popstate event triggered by back nutton navigation.
	 * @param {Window} event.target Window state after pop navigation.
	 */
	const onPopState = ( { target } ) => {
		setTimeout( () => {
			if ( [ bygUrl, currentPage ].includes( target.location.href ) ) {
				target.location.reload();
				window.scrollTo( 0, 0 );
			}

			removeEventListener( 'popstate', onPopState );
		} );

		return;
	};

	history.replaceState( data, '', bygUrl );
	history.pushState( {}, '', currentPage );

	addEventListener( 'popstate', onPopState );
};
