console.log('loaded m4.js')


const m4 = {
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
    scaling: function(sx,sy){
        return [
            sx,0,0,0,
            0,sy,0,0,
            0,0,1,0,
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
    }
}