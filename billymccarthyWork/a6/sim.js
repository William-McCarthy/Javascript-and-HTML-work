


// let emoji = "🌷 🐑 🌲 🌳 🌴 🐟 🐠 🐡 🌱 🦞 🐙 🦀 🦐 🐄".split(" ")
//let emoji = "🌷 🐑 🌲".split(" ")

let simCount = 0
class Simulation {
	// Some number of grids
	constructor(mode) {
		// Mode can control various factors about the simulation

		this.price =.9
		this.mode = mode
		this.idNumber = simCount++
		this.noiseSeed = this.idNumber
		this.stepCount = 0

		// Set my size
		this.w = 40
		this.h = 18
		// But smaller if in emoji mode
		// if (mode == "emoji") {
		// 	this.w = 20
		// 	this.h = 10
		// }


		this.isWrapped = true
		this.isPaused = true
		this.selectedCell = undefined

		this.noiseScale = .3

		this.gameOfLifeGrid = new Grid(this.w, this.h, this.isWrapped)

		// You can make additional grids, too
		//this.heightMap = new Grid(this.w, this.h, this.isWrapped)
		//this.emojiGrid = new Grid(this.w, this.h, this.isWrapped)

		// Tuning values for the continuous simulation
		this.backgroundRadiation = 1
		this.lifeThreshold = 1

		this.randomize()

	}

	randomize() {

		console.log("set to a random layout")
		this.noiseSeed += 10



		//this.heightMap.setAll((x,y) => noise(x*this.noiseScale, y*this.noiseScale + 100*this.noiseSeed))**4

	//	if (this.mode === "continuous")
	//		this.gameOfLifeGrid.setAll((x,y) =>(this.heightMap.get(x, y)))
	//	else
			this.gameOfLifeGrid.setAll((x,y) =>
			{
					let val = Math.floor(Math.random() * 7)
					if(this.mode === "broken")
						val = Math.floor(Math.random() * 2)
					return val
			}
		)



		// Add some random emoji
	//	this.emojiGrid.setAll((x,y) => Math.random()>.9?getRandom(emoji):"")
	}

	step() {
		this.stepCount++

		// Make one step
		// Set all the next steps, then swap the buffers

		this.gameOfLifeGrid.setNext((x, y, currentValue) => {
			let neighbors = this.getNeighborPositions(x, y, true)
			let n0 = this.gameOfLifeGrid.get(x + 1, y)
			let n1 = this.gameOfLifeGrid.get(x - 1, y)
			let n2 = this.gameOfLifeGrid.get(x, y + 1)
			let n3 = this.gameOfLifeGrid.get(x, y - 1)
			let scores = [0,0,0]
			scores[n0]++
			scores[n1]++
			scores[n2]++
			scores[n3]++

			let newscores = [0,0,0,0,0,0,0]
			newscores[n0]++
			newscores[n1]++
			newscores[n2]++
			newscores[n3]++

			let max = 0
			let sum = n0 + n1 + n2 + n3
			let min = 10
			let neighborhood = [n0,n1,n2,n3]
			let rand = Math.floor(Math.random() * 10)
			if (this.mode === "broken"){

			if(x === 5 && y === 5)
				console.log(scores)
			for( var i = 0; i < scores.length; i++ ){
				if (scores[i] >= 2)
					return i
			}


			return 0
		}





		//correct
		for(var i =0; i < 4; i++){
			if (neighborhood[i] > max){

				max = neighborhood[i]
			}
		}
		for(var i = 0; i < 4; i++){
			if(neighborhood[i] < min && neighborhood[i] > 0){
				min = neighborhood[i]
			}
		}


		if (this.mode === "correct"){

			for( var i = 0; i < newscores.length; i++ ){
				if (newscores[i] >= 2)
					return i
			}
			if(max == 6 && rand >= 6){
				return max
			}
			if(min === 1 && rand <= 4){
				return min
			}




			return 0


		}



		if (this.mode === "emoji"){

			for( var i = 1; i < newscores.length; i++ ){
				if (newscores[i] >= 3 && rand > 2)
					return i

			}
			for( var i = 1; i < newscores.length; i++ ){
				if (newscores[i] >= 2 && rand > 4)
					return i
			}
			for( var i = 1; i < newscores.length; i++ ){
				if (newscores[i] === 1 && rand > 6)
					return i
			}
			return 0

		}

		if (this.mode === "continuous"){

			for( var i = 0; i < newscores.length; i++ ){
				if (newscores[i] >= 2)
					return i
			}


			return 0
		}
		//	switch (this.mode) {
		//		case "broken": {





				// case "correct": {
				//
				// 	if (currentValue === 1) {
				// 		// "Any live cell with two or three live neighbours survives."
				// 		if (count >= 2 && count <= 3)
				// 			return 1
				//
				// 		return 0
				// 	} else {
				// 		// "Any dead cell with three live neighbours becomes a live cell."
				// 		if (count === 3)
				// 			return 1
				//
				// 		return 0
				// 	}
				// 	return currentValue
				// }
				//
				// case "emoji": {
				// 	let em = this.emojiGrid.get(x, y)
				// 	if (em)
				// 		return 1
				// 	if (currentValue === 1) {
				// 		// "Any live cell with two or three live neighbours survives."
				// 		if (count >= 2 && count <= 3)
				// 			return 1
				//
				// 		return 0
				// 	} else {
				// 		// "Any dead cell with three live neighbours becomes a live cell."
				// 		if (count === 3)
				// 			return 1
				//
				// 		return 0
				// 	}
				// 	return currentValue
				// }
				//
				// case "continuous": {
				// 	let bgRadiation = parseFloat(this.backgroundRadiation)
				// 	let threshold = parseFloat(this.lifeThreshold)
				//
				// 	let bgValue = (.2 + bgRadiation)*Math.pow(noise(x*this.noiseScale, y*this.noiseScale, .2*this.stepCount), 2)
				// 	if (currentValue > .1) {
				// 		// "Any live cell with two or three live neighbours survives."
				// 		let dist = Math.abs(count - 2.5)
				//
				// 		if (Math.random() > dist*threshold)
				// 			return 1
				//
				// 		return bgValue
				// 	} else {
				// 		// "Any dead cell with three live neighbours becomes a live cell."
				// 		if (count === 3)
				// 			return 1 + Math.random()
				//
				// 		return bgValue
				// 	}
				// 	return currentValue
				// }

			//
			// 	default: {
			// 		if (x == 0 && y == 0)
			// 			console.warn("unknown mode:", this.mode)
			// 		// Just copy the current values
			// 		return currentValue
			// 	}
			//
			// }
		})

		// Show the whole grid for debugging
		// this.gameOfLifeGrid.debugPrintGrid()

		// Swap the new value buffer into the current value buffer
		this.gameOfLifeGrid.swap()
	}



	//==============
	// Draw a cell.  Add emoji or color it


	drawCell(p, x, y, cellX, cellY, cellW, cellH) {


		if (this.selectedCell && this.selectedCell[0] === x && this.selectedCell[1] === y) {
			p.strokeWeight(2)
			p.stroke("red")
		}
		else  {
			p.strokeWeight(1)
			p.stroke(0, 0, 0, .2)
		}

		let val = this.gameOfLifeGrid.get(x, y)
		switch(val){
			case 0:p.fill(150, 0, 50) //grey
			break

			case 1:p.fill(200, 100, 50)  //blue
			break

			case 2:p.fill(100, 100, 50) // green
			break

			case 3:p.fill(150, 100, 50) //grey
			break

			case 4:p.fill(50, 100, 50) //grey
			break

			case 5:p.fill(250, 100, 50) //grey
			break

			case 6:p.fill(350, 100, 50) //grey
			break
		}

		p.rect(cellX, cellY, cellW, cellH)




		// if (this.mode === "emoji") {
		// 	let em = this.emojiGrid.get(x, y)
		// 	p.text(em, cellX, cellY + cellH)
		// }

	//	p.fill(0, 100, 100*this.price)
	//	p.circle(cellX + cellW*.5, cellY + cellW*.5, cellW*this.price)

	}

	//=====================================================
	// Mouse interactions

	select(x, y) {
		this.selectedCell = [x, y]
	}

	click(x, y) {
		this.gameOfLifeGrid.set(x, y, 1)
	}



	//=====================================================
	// Utility functions


	getNeighborPositions(x1, y1, wrap) {
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + this.w)%this.w
			x2 = (x2 + this.w)%this.w
			y0 = (y0 + this.h)%this.h
			y2 = (y2 + this.h)%this.h
		}

		return [[x0,y0],[x1,y0],[x2,y0],[x2,y1],[x2,y2],[x1,y2],[x0,y2],[x0,y1]]
	}


}
