app.controller('gameController', function($scope, gameFactory){
    console.log('gameController')
    $scope.player1 = [];
    $scope.player2 = [];
    $scope.deck = [];

    $scope.startNewGame = function(players){
        var newDeck = gameFactory.deckofCards().reset();
        var shuffled = gameFactory.deckofCards().shuffle(newDeck);
        gameFactory.players().createPlayers(players);
        gameFactory.game().deal(shuffled);
        gameFactory.player1.hand.shift()
        gameFactory.player2.hand.shift()
        $scope.player1 = gameFactory.player1;
        $scope.player2 = gameFactory.player2;
    }

    $scope.flipCard = function(){
        var results = gameFactory.game().flip();
        $scope.winner = [];
        if(results === "player1"){
            $scope.winner = $scope.player1.name + " wins!"
        } else {
            $scope.winner = $scope.player2.name + " wins!"
        }
        if(results === "war"){
            $scope.war()
        }
        if(results === "gameOverPlay1"){
            alert("Game over! " + $scope.player2.name + " wins!!!")
        }
        if(results === "gameOverPlay2"){
            alert("Game over! " + $scope.player1.name + " wins!!!")
        }
    }

    $scope.war = function(){
        alert('THIS IS WAR!!!')
        var results = gameFactory.game().flip()
        if(results === "player1"){
            alert($scope.player1.name + " wins the war with an " + $scope.player1.hand[$scope.player1.hand.length-1].type + " of " + $scope.player1.hand[$scope.player1.hand.length-1].suit)
        } else if (results === "player2"){
            alert($scope.player2.name + " wins the war with an " + $scope.player2.hand[$scope.player2.hand.length-1].type + " of " + $scope.player2.hand[$scope.player2.hand.length-1].suit)
        }
        if(results === "war"){
            $scope.flipCard();
        }
    }
})
