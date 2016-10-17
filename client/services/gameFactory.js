app.factory('gameFactory', function($http, $location){
    var factory = [];
    factory.player1 = [];
    factory.player2 = [];
    factory.result = [];

        ////////Card Creation/////////
    factory.deckofCards = function (){
        function Card(suit, type, value) {
            this.suit = suit;
            this.type = type;
            this.value= value;
            return this;
        }
        this.cards = [];
        this.reset = function() {
            var suit = ['heart', 'diamond', 'club', 'spade'];
            var count = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
            var counter = 0;
            var value = 0;
            for(var i=0; i<suit.length; i++){
                for(var j=0; j<count.length; j++){
                    if(typeof count[j] === 'number'){
                        value = count[j];
                    } else {
                        if(count[j] === "J"){
                            value = 11;
                        }
                        if(count[j] === "Q"){
                            value = 12;
                        }
                        if(count[j] === "K"){
                            value = 13;
                        }
                        if(count[j] === "A"){
                            value = 14;
                        }
                    }
                    this.cards.push(new Card(suit[i], count[j], value));
                    counter++;
                }
            }
            return this.cards
        };
        this.shuffle = function(deck) {
            var counter = 0
            for(var i=0; i<deck.length; i++){
                var temp = deck[i];
                var swapValue = Math.floor(Math.random()*52);
                deck[i] = deck[swapValue];
                deck[swapValue] = temp;
                counter++;
            }
            return deck
        };
        return this;
    }

        ////////Player Creation/////////
    factory.players = function(){
        function Player (name, hand){
            this.name = name;
            this.hand = [hand];
            return this;
        }

        this.createPlayers = function (players){
            var player1 = new Player(players.player1)
            var player2 = new Player(players.player2)
            factory.player1 = player1;
            factory.player2 = player2;
            return player1, player2
        }
        return this;
    }
            ////////Game Functionality/////////
    factory.game = function(){
        this.deal = function(shuffled) {
            for(var i=0; i <= shuffled.length-1; i = i+2){
                factory.player1.hand.push(shuffled[i]);
                factory.player2.hand.push(shuffled[i+1]);
            }
            return this
        };
        this.flip = function(){
            var valPlayer1 = factory.player1.hand[factory.player1.hand.length-2]
            var valPlayer2 = factory.player2.hand[factory.player2.hand.length-2]

            var batch = [];
            if(factory.player1.hand.length === 0){
                return "gameOverPlay1"
            }
            else if (factory.player2.hand.length === 0 ){
                return "gameOverPlay2"
            }
            else {
                if (valPlayer1.value === valPlayer2.value){
                    batch.push(valPlayer1, valPlayer2)
                    factory.player1.hand.pop();
                    factory.player2.hand.pop();
                    return "war"
                }
                if ( valPlayer1.value > valPlayer2.value){
                    batch.push(valPlayer1, valPlayer2)
                    for(var i=0; i<batch.length; i++){
                            factory.player1.hand.unshift(batch[i])
                    }
                    factory.player1.hand.pop();
                    factory.player2.hand.pop()
                    return "player1"
                }

                 else {
                    batch.push(valPlayer1, valPlayer2)
                    for(var i=0; i<batch.length; i++){
                            factory.player2.hand.unshift(batch[i])
                    }
                    factory.player1.hand.pop();
                    factory.player2.hand.pop();
                    return "player2"
                }
            }
        }
        return this
    }

    return factory
})
