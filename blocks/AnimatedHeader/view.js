/* eslint-disable no-unused-expressions, no-shadow, no-mixed-operators, no-bitwise,  no-nested-ternary */
'use strict'; const _cc = ( function() {
	function t( t, i ) {
		for ( let s = 0; s < i.length; s++ ) {
			const e = i[ s ]; e.enumerable = e.enumerable || ! 1, e.configurable = ! 0, 'value' in e && ( e.writable = ! 0 ), Object.defineProperty( t, e.key, e );
		}
	} return function( i, s, e ) {
		return s && t( i.prototype, s ), e && t( i, e ), i;
	};
}() ); function _ccc( t, i ) {
	if ( ! ( t instanceof i ) ) {
		throw new TypeError( 'Cannot call a class as a function' );
	}
}! ( function( t ) {
	function i( t, i ) {
		const s = Math.tan( .017453 * Math.abs( t ) ); return Math.ceil( i * s );
	} function s( t ) {
		let i = void 0; return /^#([A-Fa-f0-9]{3}){1,2}$/.test( t ) ? ( 3 === ( i = t.substring( 1 ).split( '' ) ).length && ( i = [ i[ 0 ], i[ 0 ], i[ 1 ], i[ 1 ], i[ 2 ], i[ 2 ] ] ), { r: ( i = '0x' + i.join( '' ) ) >> 16 & 255, g: i >> 8 & 255, b: 255 & i } ) : { r: 0, g: 0, b: 0 };
	} const e = ( function() {
			function t( i, e, h ) {
				_ccc( this, t ), this.o = h, this.r = s( i ), this.d = this.grd(), this.h = this.grs(), this.s = Math.abs( this.gnfr( this.o.size ) ), this.srpgq( e ), this.vx = this.gnfr( this.o.speed.x ) * this.grd(), this.vy = this.gnfr( this.o.speed.y ) * this.grd();
			} return _cc( t, [ { key: 'srpgq', value( t ) {
				const i = this.srpiq(); return 3 === t ? ( this.x = i.x + i.halfWidth, void ( this.y = i.y ) ) : 2 === t ? ( this.x = i.x, void ( this.y = i.y + i.halfHeight ) ) : 1 === t ? ( this.x = i.x + i.halfWidth, void ( this.y = i.y + i.halfHeight ) ) : ( this.x = i.x, void ( this.y = i.y ) );
			} }, { key: 'srpiq', value() {
				const t = this.o.c.w / 2,
					i = this.o.c.h / 2; return { x: Math.random() * t, y: Math.random() * i, halfHeight: i, halfWidth: t };
			} }, { key: 'gnfr', value( t ) {
				if ( t.min === t.max ) {
					return t.min;
				} const i = t.max - t.min; return Math.random() * i + t.min;
			} }, { key: 'grd', value() {
				return Math.random() > .5 ? 1 : -1;
			} }, { key: 'grs', value() {
				return this.o.shapes[ Math.floor( Math.random() * this.o.shapes.length ) ];
			} }, { key: 'gr', value( t, i ) {
				return 'rgba(' + t.r + ', ' + t.g + ', ' + t.b + ', ' + i + ')';
			} }, { key: 'an', value( t, s, e ) {
				this.o.size.pulse && ( this.s += this.o.size.pulse * this.d, ( this.s > this.o.size.max || this.s < this.o.size.min ) && ( this.d *= -1 ), this.s = Math.abs( this.s ) ), this.x += this.vx, this.y += this.vy, this.x < 0 ? ( this.vx *= -1, this.x += 1 ) : this.x > s && ( this.vx *= -1, this.x -= 1 ), this.y < 0 ? ( this.vy *= -1, this.y += 1 ) : this.y > e && ( this.vy *= -1, this.y -= 1 ), t.beginPath(), this.o.blending && 'none' !== this.o.blending && ( t.globalCompositeOperation = this.o.blending ); const h = this.gr( this.r, this.o.opacity.center ),
					a = this.gr( this.r, this.o.opacity.edge ),
					n = 'c' === this.h ? this.s / 2 : 't' === this.h ? .577 * this.s : 's' === this.h ? .707 * this.s : this.s,
					o = t.createRadialGradient( this.x, this.y, .01, this.x, this.y, n ); o.addColorStop( 0, h ), o.addColorStop( 1, a ), t.fillStyle = o; const r = Math.abs( this.s / 2 ); if ( 'c' === this.h && t.arc( this.x, this.y, r, 0, 6.283185, ! 1 ), 's' === this.h ) {
					const c = this.x - r,
						l = this.x + r,
						u = this.y - r,
						d = this.y + r; t.moveTo( c, d ), t.lineTo( l, d ), t.lineTo( l, u ), t.lineTo( c, u );
				} if ( 't' === this.h ) {
					const v = i( 30, r ),
						g = this.y + v; t.moveTo( this.x - r, g ), t.lineTo( this.x + r, g ), t.lineTo( this.x, this.y - 2 * v );
				}t.closePath(), t.fill();
			} } ] ), t;
		}() ),
		h = ( function() {
			function h( i ) {
				const s = this; _ccc( this, h ), this.c = document.createElement( 'canvas' ), this.x = this.c.getContext( '2d' ), this.c.setAttribute( 'id', 'finisher-canvas' ), this.gr( i.className ).appendChild( this.c ); let e = void 0; t.addEventListener( 'resize', ( function() {
					clearTimeout( e ), e = setTimeout( s.resize.bind( s ), 150 );
				} ), ! 1 ), this.init( i ), t.requestAnimationFrame( this.an.bind( this ) );
			} return _cc( h, [ { key: 'gr', value( t ) {
				const i = document.getElementsByClassName( t || 'finisher-header' ); if ( ! i.length ) {
					throw new Error( 'No .finisher-header element found' );
				} return i[ 0 ];
			} }, { key: 'resize', value() {
				const t = this.gr( this.o.className ); this.o.c = { w: t.clientWidth, h: t.clientHeight }, this.c.width = this.o.c.w, this.c.height = this.o.c.h; const s = i( this.o.skew, this.o.c.w / 2 ),
					e = 'skewY(' + this.o.skew + 'deg) translateY(-' + s + 'px)'; this.c.setAttribute( 'style', 'position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;-webkit-transform:' + e + ';transform:' + e + ';outline: 1px solid transparent;background-color:rgba(' + this.bc.r + ',' + this.bc.g + ',' + this.bc.b + ',1);' );
			} }, { key: 'init', value( t ) {
				this.o = t, this.bc = s( this.o.colors.background ), this.ps = [], this.resize(), this.cp();
			} }, { key: 'cp', value() {
				let i = 0; this.ps = [], this.o.ac = t.innerWidth < 600 && this.o.count > 5 ? Math.round( this.o.count / 2 ) : this.o.count; for ( let s = 0; s < this.o.ac; s++ ) {
					const h = s % 4,
						a = new e( this.o.colors.particles[ i ], h, this.o ); ++i >= this.o.colors.particles.length && ( i = 0 ), this.ps[ s ] = a;
				}
			} }, { key: 'an', value() {
				t.requestAnimationFrame( this.an.bind( this ) ), this.x.clearRect( 0, 0, this.o.c.w, this.o.c.h ); for ( let i = 0; i < this.o.ac; i++ ) {
					this.ps[ i ].an( this.x, this.o.c.w, this.o.c.h );
				}
			} } ] ), h;
		}() ); t.FinisherHeader = h;
}( window ) );
/* eslint-enable no-unused-expressions, no-shadow, no-mixed-operators, no-bitwise,  no-nested-ternary */
