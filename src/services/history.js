const { history } = window;

/**
 * Insert a page into the history, by replacing the current page with the
 * target and then pushing the current actual page again to create a virtual
 * page "back" from the current one.
 *
 * @param {any}             data  Data to set in the injected page state.
 * @param {string|URL|null} [url] URL of the history entry to inject.
 */
export const injectPage = ( data, url ) => {
	const currentPage = window.location.href;

	history.replaceState( data, '', url );
	history.pushState( {}, '', currentPage );
};
