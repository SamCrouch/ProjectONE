# Space Casino (working title)
This is the best intergalactic Gambling Website

## App
This component makes an API call to fetch a new deck ID. This ID and the object `cardValues` is pushed down through `DeckContext` for use in child components. 

## Blackjack
This component handles the game of Blackjack, calling methods required to execute the logic and rendering of the game. It returns the `Start Game` `Stand` and `Hit` buttons and the `victoryBanner`. It calls the `CardCounter` and `ChipCounter` components to render the hands and chip count for the game.
### getHand
This async method sets the `gameStarted` state to true to signal the start of a new hand, while also resetting the `stay` state to false. Then it tells the API to shuffle the deck and draws 4 cards. These cards are then dealt into `playerHand` and `dealerHand`. Then it draws the remaining 48 cards from the API to handle it in `localDeck` for the remainder of the hand. Cards are handled here and throughout by their 2-character ID code ex: 2H = two of hearts. Triggered when `Start Game` button is pressed.

### getHit
This method draws another card from `localDeck` and adds it to `playerHand`. If `playerScore` is greater than 21 or a player has already clicked the `stand` button, a player is unable to draw another card. Triggered when a player clicks the `Hit` button.

### getDealerHit
This method draws another card from `LocalDeck` and adds it to `dealerHand`. `getDealerHit` will draw cards from `localDeck` until `dealerScore` is greater than 16. Upon completion of this logic the `trueEnd` state is set to true. Triggered when the `Stand` button is pressed.

### reduce
This method counts the values of the cards in a hand. It also handles the logic for determining if an ace is scored as  11 or 1. This method is called within `addCards` and takes a sorted array of numbers as its input.

### addCards
This method recieves a hand and maps the card ID to a number value. This value is then sorted and passed through the `reduce` method. This method is called in a useEffect to set `playerScore` or `dealerScore`.

### victoryBanner
This method handles the conditional HTML that displays the outcome of the hand. It is displayed once `gameStarted` is false.


## CardCounter

This component returns the rendered images of the player and dealer hand by retrieving the card .png from the API. Upon first deal, the dealer's hand is shown with one card face down. Then upon player stand the dealer's hand is fully revealed. The player and dealer hand card values are passed into this component as props.


## ChipCounter

This component handles the player's chip stack and the pot for the Blackjack game. The player's chip stack is returned in this component.

### winnerReducer 
 
sets the `winner` state to track who won the hand.

### victoryCheck 
 
dispatches the new state for the `winnerReducer` based on who wins a hand. This method is called by a useEffect watching for a change in `trueEnd`

### payout

Looks at the `winner` state and adjusts `chips` appropriately. It also resets the `pot` for a new hand. It is triggered by a useEffect watching for a change in `winner`

### placeBet

Allows the player to push chips from `chips` into `pot` before a hand is dealt. Both `chips` and `pot` are states set within `placeBet`. This method is used as the `onClick` for the poker chips displayed in the player's chip stack.

