// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function(){
	console.log("Hello, webpage!")
});


function makeFire() {
	console.log("homies vibing")

  let el = document.getElementById("fireplace");

	// Add 20 fire emoji to it
	for (var i = 0; i < 21; i++) {

    if (i == 10 || i == 5 || i == 15){
      el.append("🦈")
    }

    else {
      el.append("🌊\n")
    }
	}
}
