console.log('loaded m4.js')


let m4 = {
    identity: function(){
        return [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        ]
    },
    projection: function(width,height,depth){
        return [
            2/width,0,0,0,
            0,2/height,0,0,
            0,0,1/depth,0,
            0,0,0,1
        ]
    },
    perspective: function(degrees,aspect,zNear,zFar){
        const fov = degrees/180*Math.PI
        const invDis = 1/(zFar-zNear)
        const t = Math.tan((Math.PI-fov)*0.5)
        return [
            t/aspect,0,0,0,
            0,t,0,0,
            0,0,-1+2*zNear*zFar*invDis/zNear,1,
            0,0,-2*zNear*zFar*invDis,0,
        ]
    },
    scaling: function(sx,sy,sz){
        return [
            sx,0,0,0,
            0,sy,0,0,
            0,0,sz,0,
            0,0,0,1
        ]
    },
    translation: function(tx,ty,tz){
        return [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            tx,ty,tz,1
        ]
    },
    rotationZ: function(deg){
        const rad = Math.PI*deg/180
        return [
            Math.cos(rad),Math.sin(rad),0,0,//x basis vector
            -Math.sin(rad),Math.cos(rad),0,0,//y basis vector
            0,0,1,0,//z basis vector
            0,0,0,1
        ]
    },
    rotationY: function(deg){
        const rad = Math.PI*deg/180
        return [
            Math.cos(rad),0,-Math.sin(rad),0,//x basis vector
            0,1,0,0,//y basis vector
            Math.sin(rad),0,Math.cos(rad),0,//z basis vector
            0,0,0,1
        ]
    },
    rotationX: function(deg){
        const rad = Math.PI*deg/180
        return [
            1,0,0,0,//x basis vector
            0,Math.cos(rad),Math.sin(rad),0,//y basis vector
            0,-Math.sin(rad),Math.cos(rad),0,//z basis vector
            0,0,0,1
        ]
    },
    multiply: function(a,b){
        const a00 = a[0*4 + 0]
        const a01 = a[0*4 + 1]
        const a02 = a[0*4 + 2]
        const a03 = a[0*4 + 3]
        const a10 = a[1*4 + 0]
        const a11 = a[1*4 + 1]
        const a12 = a[1*4 + 2]
        const a13 = a[1*4 + 3]
        const a20 = a[2*4 + 0]
        const a21 = a[2*4 + 1]
        const a22 = a[2*4 + 2]
        const a23 = a[2*4 + 3]
        const a30 = a[3*4 + 0]
        const a31 = a[3*4 + 1]
        const a32 = a[3*4 + 2]
        const a33 = a[3*4 + 3]
        
        const b00 = b[0*4 + 0]
        const b01 = b[0*4 + 1]
        const b02 = b[0*4 + 2]
        const b03 = b[0*4 + 3]
        const b10 = b[1*4 + 0]
        const b11 = b[1*4 + 1]
        const b12 = b[1*4 + 2]
        const b13 = b[1*4 + 3]
        const b20 = b[2*4 + 0]
        const b21 = b[2*4 + 1]
        const b22 = b[2*4 + 2]
        const b23 = b[2*4 + 3]
        const b30 = b[3*4 + 0]
        const b31 = b[3*4 + 1]
        const b32 = b[3*4 + 2]
        const b33 = b[3*4 + 3]

        return [
            a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
            a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
            a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
            a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
            a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
            a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
            a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
            a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
            a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
            a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
            a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
            a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
            a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
            a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
            a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
            a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
        ]
    },
    scale: function(m,sx,sy,sz){
        return m4.multiply(m4.scaling(sx,sy,sz),m)
    },
    translate: function(m,tx,ty,tz){
        return m4.multiply(m4.translation(tx,ty,tz),m)
    },
    rotateZ: function(m,deg){
        return m4.multiply(m4.rotationZ(deg),m)
    },
    rotateY: function(m,deg){
        return m4.multiply(m4.rotationY(deg),m)
    },
    rotateX: function(m,deg){
        return m4.multiply(m4.rotationX(deg),m)
    },
    inverse: function(m){
        // Return the inverse of m
        const A2323 = m[2*4+2] * m[3*4+3] - m[2*4+3] * m[3*4+2] ;
        const A1323 = m[2*4+1] * m[3*4+3] - m[2*4+3] * m[3*4+1] ;
        const A1223 = m[2*4+1] * m[3*4+2] - m[2*4+2] * m[3*4+1] ;
        const A0323 = m[2*4+0] * m[3*4+3] - m[2*4+3] * m[3*4+0] ;
        const A0223 = m[2*4+0] * m[3*4+2] - m[2*4+2] * m[3*4+0] ;
        const A0123 = m[2*4+0] * m[3*4+1] - m[2*4+1] * m[3*4+0] ;
        const A2313 = m[1*4+2] * m[3*4+3] - m[1*4+3] * m[3*4+2] ;
        const A1313 = m[1*4+1] * m[3*4+3] - m[1*4+3] * m[3*4+1] ;
        const A1213 = m[1*4+1] * m[3*4+2] - m[1*4+2] * m[3*4+1] ;
        const A2312 = m[1*4+2] * m[2*4+3] - m[1*4+3] * m[2*4+2] ;
        const A1312 = m[1*4+1] * m[2*4+3] - m[1*4+3] * m[2*4+1] ;
        const A1212 = m[1*4+1] * m[2*4+2] - m[1*4+2] * m[2*4+1] ;
        const A0313 = m[1*4+0] * m[3*4+3] - m[1*4+3] * m[3*4+0] ;
        const A0213 = m[1*4+0] * m[3*4+2] - m[1*4+2] * m[3*4+0] ;
        const A0312 = m[1*4+0] * m[2*4+3] - m[1*4+3] * m[2*4+0] ;
        const A0212 = m[1*4+0] * m[2*4+2] - m[1*4+2] * m[2*4+0] ;
        const A0113 = m[1*4+0] * m[3*4+1] - m[1*4+1] * m[3*4+0] ;
        const A0112 = m[1*4+0] * m[2*4+1] - m[1*4+1] * m[2*4+0] ;

        let det = m[0*4+0] * ( m[1*4+1] * A2323 - m[1*4+2] * A1323 + m[1*4+3] * A1223 ) 
            - m[0*4+1] * ( m[1*4+0] * A2323 - m[1*4+2] * A0323 + m[1*4+3] * A0223 ) 
            + m[0*4+2] * ( m[1*4+0] * A1323 - m[1*4+1] * A0323 + m[1*4+3] * A0123 ) 
            - m[0*4+3] * ( m[1*4+0] * A1223 - m[1*4+1] * A0223 + m[1*4+2] * A0123 ) ;
        if(det === 0){
            console.warn('ERROR: det === 0')
        }
        det = 1 / det;

        return [
            m00 = det *   ( m[1*4+1] * A2323 - m[1*4+2] * A1323 + m[1*4+3] * A1223 ),
            m01 = det * - ( m[0*4+1] * A2323 - m[0*4+2] * A1323 + m[0*4+3] * A1223 ),
            m02 = det *   ( m[0*4+1] * A2313 - m[0*4+2] * A1313 + m[0*4+3] * A1213 ),
            m03 = det * - ( m[0*4+1] * A2312 - m[0*4+2] * A1312 + m[0*4+3] * A1212 ),
            m10 = det * - ( m[1*4+0] * A2323 - m[1*4+2] * A0323 + m[1*4+3] * A0223 ),
            m11 = det *   ( m[0*4+0] * A2323 - m[0*4+2] * A0323 + m[0*4+3] * A0223 ),
            m12 = det * - ( m[0*4+0] * A2313 - m[0*4+2] * A0313 + m[0*4+3] * A0213 ),
            m13 = det *   ( m[0*4+0] * A2312 - m[0*4+2] * A0312 + m[0*4+3] * A0212 ),
            m20 = det *   ( m[1*4+0] * A1323 - m[1*4+1] * A0323 + m[1*4+3] * A0123 ),
            m21 = det * - ( m[0*4+0] * A1323 - m[0*4+1] * A0323 + m[0*4+3] * A0123 ),
            m22 = det *   ( m[0*4+0] * A1313 - m[0*4+1] * A0313 + m[0*4+3] * A0113 ),
            m23 = det * - ( m[0*4+0] * A1312 - m[0*4+1] * A0312 + m[0*4+3] * A0112 ),
            m30 = det * - ( m[1*4+0] * A1223 - m[1*4+1] * A0223 + m[1*4+2] * A0123 ),
            m31 = det *   ( m[0*4+0] * A1223 - m[0*4+1] * A0223 + m[0*4+2] * A0123 ),
            m32 = det * - ( m[0*4+0] * A1213 - m[0*4+1] * A0213 + m[0*4+2] * A0113 ),
            m33 = det *   ( m[0*4+0] * A1212 - m[0*4+1] * A0212 + m[0*4+2] * A0112 ),
        ];
    }
}





// m4 = {
// 	identity: function(){
// 		return [
// 			1,0,0,0,
// 			0,1,0,0,
// 			0,0,1,0,
// 			0,0,0,1
// 		]
// 	},
// 	perspective: function(degrees,aspect,zNear,zFar){
// 		const fov = degrees * Math.PI / 180
// 		const invDis = 1/(zNear-zFar)
// 		const f = Math.tan((Math.PI-fov)*0.5)
// 		return [
// 			f/aspect,0,0,0,
// 			0,f,0,0,
// 			0,0,-(zNear+zFar)*invDis,1,
// 			0,0,2*zFar*zNear*invDis,0
// 		]
// 	},
// 	orthographic: function(width,height,depth){
// 		return [
// 			2/width,0,0,0,
// 			0,2/height,0,0,
// 			0,0,2/depth,0,
// 			0,0,0,1
// 		]
// 	},
// 	multiply: function(a,b){
// 		a00 = a[0 * 4 + 0]
// 		a01 = a[0 * 4 + 1]
// 		a02 = a[0 * 4 + 2]
// 		a03 = a[0 * 4 + 3]
// 		a10 = a[1 * 4 + 0]
// 		a11 = a[1 * 4 + 1]
// 		a12 = a[1 * 4 + 2]
// 		a13 = a[1 * 4 + 3]
// 		a20 = a[2 * 4 + 0]
// 		a21 = a[2 * 4 + 1]
// 		a22 = a[2 * 4 + 2]
// 		a23 = a[2 * 4 + 3]
// 		a30 = a[3 * 4 + 0]
// 		a31 = a[3 * 4 + 1]
// 		a32 = a[3 * 4 + 2]
// 		a33 = a[3 * 4 + 3]
		
// 		b00 = b[0 * 4 + 0]
// 		b01 = b[0 * 4 + 1]
// 		b02 = b[0 * 4 + 2]
// 		b03 = b[0 * 4 + 3]
// 		b10 = b[1 * 4 + 0]
// 		b11 = b[1 * 4 + 1]
// 		b12 = b[1 * 4 + 2]
// 		b13 = b[1 * 4 + 3]
// 		b20 = b[2 * 4 + 0]
// 		b21 = b[2 * 4 + 1]
// 		b22 = b[2 * 4 + 2]
// 		b23 = b[2 * 4 + 3]
// 		b30 = b[3 * 4 + 0]
// 		b31 = b[3 * 4 + 1]
// 		b32 = b[3 * 4 + 2]
// 		b33 = b[3 * 4 + 3]
		
// 		return [
// 			a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
// 			a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
// 			a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
// 			a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
// 			a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
// 			a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
// 			a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
// 			a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
// 			a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
// 			a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
// 			a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
// 			a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
// 			a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
// 			a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
// 			a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
// 			a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
// 		]
// 	},
// 	scaling: function(sx,sy,sz){
// 		return [
// 			sx,0,0,0,
// 			0,sy,0,0,
// 			0,0,sz,0,
// 			0,0,0,1
// 		]
// 	},
// 	rotationZ: function(degrees){
// 		const radians = Math.PI * degrees/180
// 		const c = Math.cos(radians)
// 		const s = Math.sin(radians)
// 		return [
// 			c,s,0,0,
// 			-s,c,0,0,
// 			0,0,1,0,
// 			0,0,0,1
// 		]
// 	},
// 	rotationY: function(degrees){
// 		const radians = Math.PI * degrees/180
// 		const c = Math.cos(radians)
// 		const s = Math.sin(radians)
// 		return [
// 			c,0,-s,0,
// 			0,1,0,0,
// 			s,0,c,0,
// 			0,0,0,1
// 		]
// 	},
// 	rotationX: function(degrees){
// 		const radians = Math.PI * degrees/180
// 		const c = Math.cos(radians)
// 		const s = Math.sin(radians)
// 		return [
// 			1,0,0,0,
// 			0,c,s,0,
// 			0,-s,c,0,
// 			0,0,0,1
// 		]
// 	},
// 	translation: function(tx,ty,tz){
// 		return[
// 			1,0,0,0,
// 			0,1,0,0,
// 			0,0,1,0,
// 			tx,ty,tz,1
// 		]
// 	},
// 	scale: function(mat,sx,sy,sz){
// 		return m4.multiply(m4.scaling(sx,sy,sz),mat)
// 	},
// 	rotateX: function(mat,degrees){
// 		return m4.multiply(m4.rotationX(degrees),mat)
// 	},
// 	rotateY: function(mat,degrees){
// 		return m4.multiply(m4.rotationY(degrees),mat)
// 	},
// 	rotateZ: function(mat,degrees){
// 		return m4.multiply(m4.rotationZ(degrees),mat)
// 	},
// 	translate: function(mat,tx,ty,tz){
// 		return m4.multiply(m4.translation(tx,ty,tz),mat)
// 	},
// 	inverse: function(m){
// 		const m00 = m[0 * 4 + 0]
// 		const m01 = m[0 * 4 + 1]
// 		const m02 = m[0 * 4 + 2]
// 		const m03 = m[0 * 4 + 3]
// 		const m10 = m[1 * 4 + 0]
// 		const m11 = m[1 * 4 + 1]
// 		const m12 = m[1 * 4 + 2]
// 		const m13 = m[1 * 4 + 3]
// 		const m20 = m[2 * 4 + 0]
// 		const m21 = m[2 * 4 + 1]
// 		const m22 = m[2 * 4 + 2]
// 		const m23 = m[2 * 4 + 3]
// 		const m30 = m[3 * 4 + 0]
// 		const m31 = m[3 * 4 + 1]
// 		const m32 = m[3 * 4 + 2]
// 		const m33 = m[3 * 4 + 3]
		
// 		const A2323 = m22 * m33 - m23 * m32 ;
// 		const A1323 = m21 * m33 - m23 * m31 ;
// 		const A1223 = m21 * m32 - m22 * m31 ;
// 		const A0323 = m20 * m33 - m23 * m30 ;
// 		const A0223 = m20 * m32 - m22 * m30 ;
// 		const A0123 = m20 * m31 - m21 * m30 ;
// 		const A2313 = m12 * m33 - m13 * m32 ;
// 		const A1313 = m11 * m33 - m13 * m31 ;
// 		const A1213 = m11 * m32 - m12 * m31 ;
// 		const A2312 = m12 * m23 - m13 * m22 ;
// 		const A1312 = m11 * m23 - m13 * m21 ;
// 		const A1212 = m11 * m22 - m12 * m21 ;
// 		const A0313 = m10 * m33 - m13 * m30 ;
// 		const A0213 = m10 * m32 - m12 * m30 ;
// 		const A0312 = m10 * m23 - m13 * m20 ;
// 		const A0212 = m10 * m22 - m12 * m20 ;
// 		const A0113 = m10 * m31 - m11 * m30 ;
// 		const A0112 = m10 * m21 - m11 * m20 ;

// 		let det = m00 * ( m11 * A2323 - m12 * A1323 + m13 * A1223 ) 
// 				- m01 * ( m10 * A2323 - m12 * A0323 + m13 * A0223 ) 
// 				+ m02 * ( m10 * A1323 - m11 * A0323 + m13 * A0123 ) 
// 				- m03 * ( m10 * A1223 - m11 * A0223 + m12 * A0123 ) ;
// 		if(det > -0.001 && det < 0.001){
// 			console.error('det error')
// 		}
// 		det = 1 / det;
// 		if(det > -0.001 && det < 0.001){
// 			console.error('det error')
// 		}

// 		return [
// 			det *   ( m11 * A2323 - m12 * A1323 + m13 * A1223 ),
// 			det * - ( m01 * A2323 - m02 * A1323 + m03 * A1223 ),
// 			det *   ( m01 * A2313 - m02 * A1313 + m03 * A1213 ),
// 			det * - ( m01 * A2312 - m02 * A1312 + m03 * A1212 ),
// 			det * - ( m10 * A2323 - m12 * A0323 + m13 * A0223 ),
// 			det *   ( m00 * A2323 - m02 * A0323 + m03 * A0223 ),
// 			det * - ( m00 * A2313 - m02 * A0313 + m03 * A0213 ),
// 			det *   ( m00 * A2312 - m02 * A0312 + m03 * A0212 ),
// 			det *   ( m10 * A1323 - m11 * A0323 + m13 * A0123 ),
// 			det * - ( m00 * A1323 - m01 * A0323 + m03 * A0123 ),
// 			det *   ( m00 * A1313 - m01 * A0313 + m03 * A0113 ),
// 			det * - ( m00 * A1312 - m01 * A0312 + m03 * A0112 ),
// 			det * - ( m10 * A1223 - m11 * A0223 + m12 * A0123 ),
// 			det *   ( m00 * A1223 - m01 * A0223 + m02 * A0123 ),
// 			det * - ( m00 * A1213 - m01 * A0213 + m02 * A0113 ),
// 			det *   ( m00 * A1212 - m01 * A0212 + m02 * A0112 ),
// 		]
// 	}
// }