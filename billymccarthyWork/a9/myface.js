
class myMask{
	constructor(){

	}

	draw(p,t){
			p.background("silver")

			// Both face sides
			face.sideOrder.forEach(side => {

				p.stroke(0)
				let hue = 150 + 100*SLIDER.leftfacecolor
				let transparency = SLIDER.lefttransparency

			//	p.fill(255*SLIDER.rightfacecolor, 100*SLIDER.rightfacecolor, 50*SLIDER.rightfacecolor,SLIDER.rftransp)
				if(side.index > -1){
					hue = 0 + 100*SLIDER.rightfacecolor
					transparency = SLIDER.righttransparency
				//	p.fill(30*SLIDER.leftfacecolor, 20*SLIDER.leftfacecolor, 30*SLIDER.leftfacecolor,SLIDER.lftransp)

				}
				p.fill(hue,100,50,transparency)
				p.stroke(hue,100,40,1)

				let outlinePoints = side.faceRings[0].concat(face.centerLine.slice().reverse())
				drawContour(p, outlinePoints)

				p.noFill()
				let eyebrow = side.eyeRings[0].slice(2, 7).map(pt => {
					let pt2 = new Vector(0,0)

					pt2.setToLerp(side.eye, pt, .2 + 2*SLIDER.eyebrow)
					return pt2
				})
				hue = 360 * SLIDER.eyecolor
				drawContour(p, eyebrow)
				p.fill(hue, 100, 50)
				drawContour(p, side.eyeRings[4])
				side.eye.draw(p, 5)
			})

		hand.forEach((h,handIndex) => {


		h.fingers.forEach((finger,fingerIndex) => {
			// let fingerHue = (fingerIndex*20 + 150 + t*100) %360

			// // Leave a trail? Make an 8-point trail
			// let trail = fingerTrails[handIndex][fingerIndex]
			// if (!app.paused)
			// 	addToTrail(trail, finger[3], 8)


			// p.noStroke()
			// p.fill(fingerHue, 100, 50, .3)
			// drawRibbon(p, trail, (pct, side) => {

			// 	return 10*pct
			// })

			// Draw each bone of the finger
			for (var i = 0; i < finger.length - 1; i++) {
				p.fill(200, 200, 0, SLIDER.handtransparency)
				p.noStroke()

				// What angle is this finger bone?
				let joint0 = finger[i]
				let joint1 = finger[i + 1]
				let radius0 = getFingerSize(fingerIndex, i)
				let radius1 = getFingerSize(fingerIndex, i)
				let boneAngle = joint0.angleTo(joint1)


				p.beginShape(p.TRIANGLE_MESH)
				joint0.polarOffsetVertex(p, radius0, boneAngle + Math.PI/2)
				joint0.polarOffsetVertex(p, radius0, boneAngle - Math.PI/2)
				joint1.polarOffsetVertex(p, radius1, boneAngle - Math.PI/2)
				joint1.polarOffsetVertex(p, radius1, boneAngle + Math.PI/2)
				p.endShape()

				p.beginShape(p.TRIANGLE_MESH)
				joint0.polarOffsetVertex(p, radius0*.3, boneAngle + Math.PI/2)
				joint0.polarOffsetVertex(p, radius0*.7, boneAngle - Math.PI/2)
				joint1.polarOffsetVertex(p, radius1*.7, boneAngle - Math.PI/2)
				joint1.polarOffsetVertex(p, radius1*.3, boneAngle + Math.PI/2)
				p.endShape()

				joint1.draw(p, radius1)
				joint1.draw(p, radius1*.8)
			}
		})
	})


	}

	update(t, dt, frameCount){

	}


}

function getFingerSize(fingerIndex, index) {
	let r = 1 + .3*Math.sin(1*fingerIndex - .5)
	// Make the thumb bigger
	if (fingerIndex == 0)
		r *= 1.6
	r *= 12
	// Taper the fingers a bit
	r *= (1 - .06*index)
	return r
}

masks.myMask = myMask
