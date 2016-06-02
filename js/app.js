$(document).ready(function(){

  $(".chips").click(function(){
      var amount = $(this).data("amount");
      if (total < betAmount + amount) {
        alertUser("<br><h1>You have no more money!</h1>")
        return;
      }
      betAmount += amount;
      renderBetAmount();
    });
    renderTotalAmount(total);

  $.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6" ,function(data){
    console.log(data);
    deckId = data.deck_id;
    console.log(deckId);
  });

  //                    DEAL CARDS

  $(".deal").click(function(event){

    //                    GET DEALER CARDS

    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2").done(function(data){
      var result = normalizeCardData(data)
      dealerCards = parseInt(result.num1) + parseInt(result.num2);
      $(".dealerTotal").html("<p>" + dealerCards + "</p>");
      $(".dealerArea1").html("<img src=" + result.card1 + " width=130 background-color: rgba(0,0,0,.5)>" );
      $(".dealerArea2").html("<img src=" + result.card2 + " width=130>" );
      if (dealerCards === 21) {
        // use handResult function
        changeTotal(-betAmount);
        betAmount = 0;
        renderBetAmount();
        alertUser( "<br><h1>AWWW SAD PANDA!!!</h1><br><h1>DEALER GOT 21...</h1>")
        reload();
      }
      else if ((playerCards < 21 && playerCards >= 19 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if(playerCards < dealerCards) {
            handResult("<br><h1>DEALER WON...</h1>");
          }else if (playerCards === dealerCards) {
            push();
          }
        }
        return $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2")
        //                   GET PLAYER CARDS
      }).done(function(data){
        console.log(data);
        var result = normalizeCardData(data)

        playerCards = parseInt(result.card1) + parseInt(result.card2);
        $(".playerTotal").html("<p>" + playerCards + "</p>");
        $(".cardArea1").html("<img src=" + result.card1 + " width=130>" );
        $(".cardArea2").html("<img src=" + result.card2 + " width=130>" );
        if (playerCards === 21) {
          changeTotal(betAmount * 2);
          betAmount = 0;
          renderBetAmount();
          alertUser("<br><h1>BLACKJACK!!!<h1><br><h1>WINNER WINNER CHICKEN DINNER!!!</h1>")
          reload();
        }else if (playerCards > 21) {
          youBust();
        }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
          push();
        }else if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
            if (playerCards > dealerCards) {
              youWin();
            }else if(playerCards < dealerCards) {
              handResult("<br><h1>DEALER WON...</h1>");
            }else if (playerCards === dealerCards) {
              push();
            }
          }
      });
  });

  //                    GET PLAYER HIT CARDS

  $(".hit").on("click", function(){
    if(cards === 0){
  $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
    hitCard1 = data.cards[0].image;
    hitVal1 = getCardPoints(data.cards[0].value);
    $(".cardArea3").html("<img src=" + hitCard1 + " width=130>" );
    cards += 1;
    playerCards += parseInt(hitVal1);
    $(".playerTotal").html("<p>" + playerCards + "</p>");
    if (playerCards === 21) {
      youGot21();
    }else if (playerCards > 21) {
      youBust();
    }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
      push();
    }else if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
        if (playerCards > dealerCards) {
          youWin();
        }else if (playerCards === dealerCards) {
          push();
        }
      }
    });
  }else if (cards === 1) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      hitCard2 = data.cards[0].image;
      hitVal2 = getCardPoints(data.cards[0].value);
      $(".cardArea4").html("<img src=" + hitCard2 + " width=130>" );
      cards += 1;
      playerCards += parseInt(hitVal2);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      if (playerCards === 21) {
        youGot21();
      }else if (playerCards > 21) {
        youBust();
      }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
        push();
      }else if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if (playerCards === dealerCards) {
            push();
          }
        }
      });
  }else if (cards === 2) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      hitCard3 = data.cards[0].image;
      hitVal3 = getCardPoints(data.cards[0].value);
      $(".cardArea5").html("<img src=" + hitCard3 + " width=130>" );
      cards += 1;
      playerCards += parseInt(hitVal3);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      if (playerCards === 21) {
        youGot21();
      }else if (playerCards > 21) {
        youBust();
      }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
        push();
      }else if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if (playerCards === dealerCards) {
            push();
          }
        }
    });
  };
});

//                    GET DEALER HIT CARDS
// indent well or place inside own file
var dealerCardTotal = 0;
var dealerCard1;
var dealerCard2;
var dealerCard3;
var dealerHit1;
var dealerHit2;
var dealerHit2;
$(".stay").on("click", function() {
  if (dealerCardTotal === 0 && dealerCards < 17) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      dealerCard1 = data.cards[0].image;
      dealerVal1 = getCardPoints(data.cards[0].value);
      $(".dealerArea3").html("<img src=" + dealerCard1 + " width=130>" );
      dealerCardTotal += 1;
      dealerCards += parseInt(dealerVal1);
      $(".dealerTotal").html("<p>" + dealerCards + "</p>");
      if (dealerCards === 21) {
        handResult("<br><h1>DEALER GOT<br><h1>21...</h1>");
      }else if (dealerCards > 21) {
        dealerBust();
      }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
        push();
      }
      if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if(playerCards < dealerCards) {
            handResult("<br><h1>DEALER WON...</h1>");
          }else if (playerCards === dealerCards) {
            push();
          }
        }
      if ((dealerCards > playerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if(playerCards < dealerCards) {
            handResult("<br><h1>DEALER WON...</h1>");
          }else if (playerCards === dealerCards) {
            push();
          }
        }
        if (dealerCardTotal === 1 && dealerCards < 17 ) {
          $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
            dealerCard2 = data.cards[0].image;
            dealerVal2 = getCardPoints(data.cards[0].value);
            $(".dealerArea4").html("<img src=" + dealerCard2 + " width=130>" );
            dealerCardTotal += 1;
            dealerCards += parseInt(dealerVal2);
            $(".dealerTotal").html("<p>" + dealerCards + "</p>");
            if (dealerCards === 21) {
              handResult("<br><h1>DEALER GOT<br><h1>21...</h1>");
              return;
            }else if (dealerCards > 21) {
              dealerBust();
            }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
              push();
              return;
            }
            if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
                if (playerCards > dealerCards) {
                  youWin();
                }else if (playerCards === dealerCards) {
                  push();
                  return;
                }
              }
            if ((dealerCards > playerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
                if (playerCards > dealerCards) {
                  youWin();
                }else if(playerCards < dealerCards) {
                  handResult("<br><h1>DEALER WON...</h1>");
                }else if (playerCards === dealerCards) {
                  push();
                }
              }
            if (dealerCardTotal === 2 && dealerCards < 17 ) {
              $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
                dealerCard3 = data.cards[0].image;
                dealerVal3 = getCardPoints(data.cards[0].value);

                $(".dealerArea5").html("<img src=" + dealerCard3 + " width=130>" );
                dealerCardTotal += 1;
                dealerCards += parseInt(dealerVal3);
                $(".dealerTotal").html("<p>" + dealerCards + "</p>");
                if (dealerCards === 21) {
                  handResult("<br><h1>DEALER GOT<br><h1>21...</h1>");
                }else if (dealerCards > 21) {
                  dealerBust();
                }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
                  push();
                }
              if ((dealerCards > playerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
                  if (playerCards > dealerCards) {
                    youWin();
                  }else if(playerCards < dealerCards) {
                    handResult("<br><h1>DEALER WON...</h1>");
                  }else if (playerCards === dealerCards) {
                    push();
                  }
                }
              if ((dealerCards > playerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
                  if (playerCards > dealerCards) {
                    youWin();
                  }else if(playerCards < dealerCards) {
                    handResult("<br><h1>DEALER WON...</h1>");
                  }else if (playerCards === dealerCards) {
                    push();
                  }
                }
              });
            };
          });
        };
      });
    };
  });
});
