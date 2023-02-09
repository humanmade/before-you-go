import * as query from './query';

describe( 'query', () => {
	describe( '.has', () => {
		beforeEach( () => {
			global.document = {
				location: {
					search: '?utm_source=facebook&utm_letter=a&utm_letter=B&utm_campaign=TwitterGoingDownInFlames',
				},
			};
		} );

		it( 'is a function', () => {
			expect( query.has ).toBeInstanceOf( Function );
		} );

		it( 'returns false if the parameter is not set', () => {
			expect( query.has( 'utm_delicious', 'giardiniera' ) ).toBe( false );
		} );

		it( 'returns false if an invalid target value is passed', () => {
			expect( query.has( 'utm_delicious', new Date() ) ).toBe( false );
		} );

		it( 'returns true if the parameter is set', () => {
			expect( query.has( 'utm_source', 'facebook' ) ).toBe( true );
		} );

		it( 'ignores case in comparisons', () => {
			expect( query.has( 'utm_campaign', 'TwItTeRgOiNgDoWnInFlAmEs' ) ).toBe( true );
		} );

		it( 'correctly matches against repeated query parameters', () => {
			expect( query.has( 'utm_letter', 'b' ) ).toBe( true );
		} );

		it( 'can check a parameter for one of several target values', () => {
			expect( query.has( 'utm_source', [ 'Twitter', 'Facebook' ] ) ).toBe( true );
			expect( query.has( 'utm_letter', [ 'N', 'D', 'A' ] ) ).toBe( true );
		} );

		it( 'uses a custom URLQueryParams object if provided', () => {
			const customParams = new URLSearchParams( '?ennui=much' );
			expect( query.has( 'ennui', 'much', customParams ) ).toBe( true );
		} );
	} );
} );
