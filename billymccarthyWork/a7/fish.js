

class Fish {
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {

		this.aof = aof
		this.center = new Vector()
	}


	update(t, dt) {
		// let hue = this.aof.get("flowerHue")
		// // Update this with the current value of the AOF and any other parameters, like time
		// this.root.energy = this.aof.energy
		// this.root.start.orientation = -Math.PI/2
		// this.root.update(t, dt)

		// this.flowerColor.setTo((300*hue + 100)%360, 100, 80)


	}

	draw(p) {
		p.push()

		// Draw the root (and recursively, all the branches)
		p.noStroke()
		p.strokeWeight(1)
		p.stroke(0,0,0)
		let hue = this.aof.get("hue")*360
		console.log("hue", hue)
		p.fill(hue, 100, 50)
		let radius = this.aof.get("size") *50 + 20
		let locationheight = this.aof.get("locationheight") * -200
		p.ellipse(0, locationheight, radius, radius*(1.2 + this.aof.get("aspect")))
		let visorcolor = this.aof.get("visorcolor")*100
		let imposter = this.aof.get("imposter")
		if(imposter > 0.9){
			visorcolor = "red"
		}
		p.fill(visorcolor)

		p.ellipse(radius *.1, locationheight + radius * -0.6, radius*.7, radius*.3)




		p.pop()
	}
}


// Static properties for this class
Fish.landmarks = {
	"Blue": [0.4, 0.6, 0.4, 0.2, 0.6, 0.4],
	"Yellow": [0.2, 0.16, 0.4, 0.4, 0.2, 0.4],
	"Red": [0, 0, 0.7, 0.6, 0.4, 0.3],
	"Green": [0.6, 0.3, 0.9, 1, 1, 0.2],
	"Pink": [0.2, 0.867, 0.4, 0.4, 0.2, 0.4],
	"Imposter": [0.8, 0.486, 0.4, 0.2, 0.8, 0.91]
}
Fish.labels = ["size", "hue", "aspect", "visorcolor", "locationheight", "imposter"]
