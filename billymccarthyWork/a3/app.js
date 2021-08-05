
// Outermost scope,
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let mode = "squarebase"
let mousePositions = []
let worb = true
function clearCanvas() {
	myP5.background("white")
  worb = true
}

function blackClearCanvas() {
	myP5.background("black")
  worb = false
}


document.addEventListener("DOMContentLoaded", function(){
	console.log("BillyPix")

	// Add a processing instance


	// Create the processing instance, and store it in myP5,
	// where we can access it anywhere in the code
	let element = document.getElementById("main")
	myP5 = new p5(



		// Run after processing is initialized
		function(p) {



			p.setup = () => {

				console.log("Do setup", p)

				p.createCanvas(300, 300);
				p.colorMode(p.HSL);

				// Hue, Sat, Light
				// (0-360,0-100,0-100)
				p.background("white")


			}

			p.mouseDragged = () => {
				let t = p.millis()*.001

				// Save this current mouse position in an array
				// .... but what will you do with an array of vectors?
				mousePositions.push([p.mouseX, p.mouseY])


				switch(mode) {
					case "shapes":
						let speed = Math.sqrt(p.movedX*p.movedX + p.movedY*p.movedY)

						let allEmoji = ["💠","🟢","🔴","🔲","🔻","🔷","🔹","🔺"]
            if (worb == false){
              allEmoji = ["💠","⚪","🔳","🔵","🔶","🔸","🔺"]
            }
						let emojiIndex = Math.floor(Math.random()*allEmoji.length)
						let emoji = allEmoji[emojiIndex]

						// Draw the emoji at the mouse
						p.textSize(2*speed + 6)

						// Try out some blend modes
						// p.blendMode(p.MULTIPLY);
						// p.blendMode(p.OVERLAY);
						// p.blendMode(p.SCREEN);
						//p.blendMode(p.DIFFERENCE);

						p.text(emoji, p.mouseX + Math.random()*speed, p.mouseY + Math.random()*speed)
						// Turn back to normal
						p.blendMode(p.BLEND);
						break;

					case "smudge":
						// Draw scattered circles
						p.noStroke()
						p.fill((Math.random()*30 + t*40)%360, 100, 50 + Math.random()*30)
						p.circle(p.mouseX + Math.random()*10, p.mouseY + Math.random()*10, 3 + Math.random())

						break;

					case "squarebase":
            if(worb){
              p.fill(0, 100, 0)
            }
            else{
              p.fill(174, 100, 70)
            }

						// The current vector
						let p0x = p.mouseX
            let p0y = p.mouseY
            if (p0x < 150){
              if (p0y < 150){

                p.beginShape()

                p.vertex(125,125)

                p.vertex(175,125)
                p.vertex(p0x,p0y)
                p.vertex(125,175)

                p.endShape()
              }
              else{
                p.beginShape()

                p.vertex(125,125)

                p.vertex(p0x,p0y)
                p.vertex(175,175)
                p.vertex(125,175)

                p.endShape()
              }
            }

            else{
              if(p0y < 150){
                p.beginShape()

                p.vertex(125,125)

                p.vertex(175,125)
                p.vertex(175,175)
                p.vertex(p0x,p0y)

                p.endShape()
              }
              else{
                p.beginShape()

                p.vertex(p0x,p0y)

                p.vertex(175,125)
                p.vertex(175,175)
                p.vertex(125,175)

                p.endShape()
              }
            }




						break;

					case "bezier":
          let cpx = p.mouseX
          let cpy = p.mouseY
          if(worb){
            p.fill(0, 100, 0)
          }
          else{
            p.fill(174, 100, 70)
          }
          if (worb){

            p.bezier(50, 50, cpx, cpy, 180 ,180 , 300, 300);

          }

          else{


            p.bezier(50, 50, 180, 180, cpx, cpy, 300, 300);
            }
						break;

					default:
						console.warn("UNKNOWN TOOL:" + mode)
				}

			}

			p.draw = () => {
				// Not updating the background
				let t = p.millis()*.001

				// Smear pixels continuously, even when not drawing
				if (mode == "smudge") {
					smearPixels(p)
				}

				// Draw the text box to label the tool (OPTIONAL)
				p.noStroke()
				p.fill("white")
				p.rect(0, 0, 90, 30)
				p.fill("black")
				p.textSize(10)
				p.text("TOOL " + mode, 5, 20)


			}
		},

		// A place to put the canvas
		element);
})


// Use the Pixel buffer to "smudge" pixels by
// linearly interpolating their colors with some other color
function smearPixels(p) {
	// Smear the pixels down from here
	// console.log("smudge2")
	p.loadPixels();

	// Get the current mouse position
	let x = Math.floor(p.mouseX)
	let y = Math.floor(p.mouseY)

	for (var i = 0; i < 10; i++) {
		let x2 = x + i

		let lastColor = p.get(x2, y)


		let dripDistance = Math.random()* Math.random()*150
		for (var j = 0; j < dripDistance; j++) {
			let dripPct = j/dripDistance

			let y2 = y + j

			// Get the current color and blend it with the last color
			let pixelColor = p.get(x2, y2)
			let finalColor = vector.lerp(pixelColor, lastColor, 1 - dripPct)

			if (x2 > 0 && x2 < p.width && y2 > 0 && y2 < p.height)
				p.set(x2, y2, finalColor)

			// Save this color to blend with later pixels
			lastColor = finalColor

		}
	}
	p.updatePixels();
}


// Using a lot of mouse positions to do... something
function drawBeziers(p, mousePositions) {
	// Draw some vectors

	// Get every 7th point in the array
	let everyOther = mousePositions.filter((element, index) => {
		return (mousePositions.length - index) % 7 === 0;
	})

	// Take the last N positions
	let count = 2
	let pts = everyOther.slice(everyOther.length - count)

	// Now we have 5 points, sampled every 7th point, starting at the end
	// So we can draw "backward" from the end

	if (pts.length > 0) {
		p.stroke(0)
		p.fill(Math.random()*360, 100, 50, .2)

		p.beginShape()
		p.vertex(...pts[0])

		// Draw each segment of a bezier curve
		// (start at index=1!)
		for (var i = 1; i < pts.length; i++) {
			// For this segment, we draw between 2 pts
			let pt0 = pts[i - 1]
			let pt1 = pts[i]
			let d = vector.getSub(pt1, pt0)
			let mag = vector.magnitude(d)
			let n = [-d[1], d[0]]

			let cp0 = pt0.slice(0)
			let cp1 = pt1.slice(0)
			cp0[1] -= mag
			cp1[1] -= mag

			// vector.addTo(cp1, n)


			p.bezierVertex(...cp0, ...cp1, ...pt1)
		}

		p.endShape()
	}
}
