import * as referrer from './referrer';

describe( 'referrer', () => {
	describe( '.has', () => {
		beforeEach( () => {
			global.document = {
				referrer: 'https://t.co/',
			};
		} );

		it( 'is a function', () => {
			expect( referrer.has ).toBeInstanceOf( Function );
		} );

		it( 'returns false if the parameter is not set', () => {
			expect( referrer.has( 'widgets.com' ) ).toBe( false );
		} );

		it( 'returns false if the referrer is ""', () => {
			expect( referrer.has( 'widgets.com', '' ) ).toBe( false );
		} );

		it( 'returns false if an invalid target value is passed', () => {
			expect( referrer.has( {} ) ).toBe( false );
		} );

		it( 'returns true if the parameter is set', () => {
			expect( referrer.has( 't.co' ) ).toBe( true );
		} );

		it( 'ignores case in comparisons', () => {
			expect( referrer.has( 'T.cO' ) ).toBe( true );
		} );

		it( 'can check a parameter for one of several target values', () => {
			expect( referrer.has( [ 't.co', 'facebook.com' ] ) ).toBe( true );
		} );
	} );
} );
