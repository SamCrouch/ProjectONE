class Hand {
    constructor() {
        let res = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).json()
        this.cards = res.cards.map(card => card.code)
        this.values = this.cards.map(card => {
            if (Number(card[0]).isNaN()) {
                if (card[0] === 'A') {
                    return 11
                }
                else {
                    return 10
                }
            }
            else {
                return Number(card[0])
            }
        }).sort()

        this.score = this.values.reduce((acc, val) => {
            if (val === 11) {
                if ((acc + val) > 21) {
                    return acc + 1
                }
                else {
                    return acc + val
                }
            }
            else {
                return acc + val
            }
        })
    }

    addToHand(cardcode) {
        this.cards.push(cardcode)
    }
}

export default Hand