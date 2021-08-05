class DogBot {
	constructor() {
		this.distance = 2
    this.love = -5
		this.grammar = tracery.createGrammar(dogGrammar)
		this.grammar.addModifiers(baseEngModifiers)
	}

	respondTo(s) {

		if (s.includes("walk")) {
      if(this.love <=0)
          return "The dog needs some more love, give it a treat or pet it to gain trust"
			if (this.distance === 5)
			    return "The dog is tired, and won't walk anymore, do something else"

			this.distance += 1
      this.love -= 1
			return this.grammar.flatten("#walked#")
		}

		if (s.includes("Pet")) {
			if (this.love <= 0)
			    return "The dog wants a treat before he will let you pet him"

			this.love +=1
      this.distance -=1
			return this.grammar.flatten("#petaccept#")
		}

		if (s.includes("trick")) {
			if (this.love <= 0)
			    return "The dog needs some more love to learn a trick, give it a treat or pet it"

			this.love -= 3
      this.distance +=1
			return this.grammar.flatten("#trick#")
		}
    if (s.includes("treat")) {
			this.love += 2
      this.distance -=3
			return this.grammar.flatten("#Treat#")
    }

	}
}
