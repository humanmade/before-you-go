/**
 * Sidebar plugin which renders an audience picker to limit a post to a
 * specific audience.
 *
 */
import { components as altisComponents } from '@altis/analytics';
import { useMeta } from '@humanmade/block-editor-components';

import { useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

export const name = 'before-you-go-audience-picker';

/**
 * Render audience selection panel.
 *
 * Renders a panel in the document settings toolbar to select post audiences
 * for the current BYG offer.
 *
 * @returns {Component} Sidebar slotfill panel for selecting target audience.
 */
const AudienceSelectionPanel = function AudienceSelectionPanel() {
	const [ audience, setAudience ] = useMeta( 'byg-audience' );
	const { AudiencePicker } = altisComponents;

	return (
		<PluginDocumentSettingPanel
			icon="admin-site-alt2"
			name="post-audience"
			expanded
			title={ __( 'Target Audience', 'byg-admin' ) }
		>
			<AudiencePicker
				audience={ audience || null }
				label={
					audience ?
						__( 'Audience for this page', 'byg-admin' ) : ''
				}
				onClearSelection={ () => setAudience( null ) }
				onSelect={ ( audienceId, audience ) => {
					setAudience( parseInt( audienceId ) );
				} }
			/>

			<p className="description">
				{ audience ?
					__( 'Show this page only to viewers who match the selected audience.', 'byg-admin' ) :
					__( 'This page is not restricted by audience, and will be served to all viewers.', 'byg-admin' ) }
			</p>
		</PluginDocumentSettingPanel>
	);
};

export const settings = {
	/**
	 * Render the audience picker in the post status panel.
	 *
	 * @returns {Component} UI for selecting post audience.
	 */
	render: function Render() {
		const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType() );

		if ( postType !== 'byg-page' ) {
			return null;
		}

		return <AudienceSelectionPanel />;
	},
};

registerPlugin( name, settings );

if ( module.hot ) {
	module.hot.dispose( () => unregisterPlugin( name ) );
	module.hot.accept();
}
