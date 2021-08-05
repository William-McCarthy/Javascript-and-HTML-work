let dogGrammar = {
	"walked" : ["You take the dog for a #miles# walk, and the dog is #adjective# "],
	"miles" : ["1 mile", "2 mile", "3 mile", "4 mile", "8 mile"],
	"adjective" : ["tired", "happy", "estatic but exhausted", "rolling on the ground with glee"],


	"petaccept" : ["The dog #accept#."],
	"accept" : ["rolls over", "looks happy getting pet", "growls", "licks your hand", "loves getting pet"],


	"trick" : ["The dog #typeoftrick#. It #reaction#."],
	"typeoftrick" : ["barks", "rolls over", "begs", "gives paw", "whines", "comes", "dances"],
	"reaction" : ["gives up", "tries one more time", "is excited", "snuggles", "licks your hand", "begs for a treat"],

	"treatDetail" : ["Baconstrips", "human food", "rawhide"],
	"reacts" : ["barks, spins around twice, and eats the food ", "whines and turns away", "begs for more"],
	"Treat" : ["You gave the dog #treatDetail#, it #reacts#."]

}
