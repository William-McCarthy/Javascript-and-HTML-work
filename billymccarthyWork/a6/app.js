
let paused = false
document.addEventListener('keyup', function(e){
	if(e.keyCode == 32){
		paused = !paused
	}
	if(e.keyCode == 78){
		sim.step()
	}
});


// let simplex = new SimplexNoise()
// function noise() {
// 	if (arguments.length === 1)
// 		return simplex.noise2D(arguments[0])
// 	if (arguments.length === 2)
// 		return simplex.noise2D(arguments[0], arguments[1])
// 	if (arguments.length === 3)
// 		return simplex.noise3D(arguments[0], arguments[1], arguments[2])

// }


let noise = new p5().noise
console.log(noise)
let sim = new Simulation()

document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">


			<simulation mode="broken"/>

			<p>
			 I attempted two colors, neutral(grey) and a light blue. Here I have a
			 check to see if there are two neighbors, and if there are, you switch to said color.

			</p>

			<simulation mode="correct"/>

			<p>Here, 2 neighbors sway the color. If you dont have two neighbors of the same color, red and blue will have a 40% chance to sway, and then you go neutral</p>

			<simulation mode="emoji"/>

			<p>Here I show group mentality, so 3 neighbors of a color have an 80% chance to sway, 2 have a 60, and one has a 40%chance</p>

			<simulation mode="continuous"/>

			<p>Continuous is the same as broken, so two or more neighbors sway, but continous takes into account all 7 of the colors.</p>


		</div>`,

	})
})
