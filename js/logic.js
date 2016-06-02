function renderTotalAmount(total){
  $("#total").val(total);
}
function getCardPoints(cardName){
  if (cardName === "KING") {
    return  10;
  } else if (cardName === "QUEEN") {
     return  10;
  } else if (cardName === "JACK") {
    return  10;
  }else if (cardName === "ACE") {
    return 11;
  }else {
    return cardName;
  }
}

function alertUser(words){
  $(".alert").html(words)
  .css("background-color", "#41020d").css("text-align", "center")
  .css("color", "white").css("font-size", "2rem").show().fadeOut(2500);
}

function normalizeCardData(data) {
  return {
    card1: data.cards[0].image,
    card2: data.cards[1].image,
    num1: getCardPoints(data.cards[0].value),
    num2: getCardPoints(data.cards[1].value),
  }
}


  function renderBetAmount(){
    $('#betAmount').val(betAmount);
  }
  function changeTotal(amount){
    total += amount;
    renderTotalAmount(total);
  }


  function reload(){
    setTimeout(function(){$(".dealerArea1").empty();
    var cardAreas = 5;
    $(".dealerArea2").empty();
    $(".dealerArea3").empty();
    $(".dealerArea4").empty();
    $(".dealerArea5").empty();
    $(".dealerTotal").empty();
    for (var i = 1; i <= cardAreas; i++) {
      $(".cardArea" + i).empty();
    }
    $(".playerTotal").empty();

    cards = 0;
    dealerCardTotal = 0;}, 2000);
    if (total === 0) {
      alertUser("<br><h1>You lost your ass!!!</h1><br><h1>Please enter your credit info or refresh page</h1>");
    }
  }
  function push(){
    betAmount = 0;
    renderTotalAmount(total);
    renderBetAmount();
    alertUser("<br><h1>PUSH</h1>")
    reload();
  }
  function handResult(message) {
    changeTotal(-betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser(message)
    reload();
  }

// refactor this on to use handResult
  function youBust(){
    changeTotal(-betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><br><h1>BUST!!!</h1>")
    reload();
  }
  // refactor all three fncs into one
  function youWin(){
    changeTotal(betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><h1>YOU WIN!!</h1>")
    reload();
  }
  function dealerBust(){
    changeTotal(betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><h1>DEALER</h1><br><h1>BUST!!!</h1>")
    reload();
  }
  function youGot21(){
    changeTotal(betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><br><h1>21!!!</h1>")
    reload();
  }
