/** ZDEFINIOWANIE PRZYCISKÓW */

let buttonPaper, buttonRock, buttonScissors, buttonClear;

buttonClear = document.getElementById('button-clear');
buttonRock = document.getElementById('button-rock');
buttonPaper = document.getElementById('button-paper');
buttonScissors = document.getElementById('button-scissors'); 

buttonClear.addEventListener('click', function(){ 
  clearMessages();
  console.log('Przycisk Wyczyść został kliknięty');
});
buttonRock.addEventListener('click', function(){ 
  playGame('1'); 
});
buttonPaper.addEventListener('click', function(){ 
  playGame('2'); 
});
buttonScissors.addEventListener('click', function(){ 
  playGame('3'); 
});


/** PRZYPISANIE RUCHU DO NUMERU */
 /** var argMoveId;
 Czy powyższa linijka jest potrzebna? Przecież to argument funkcji, a nie zmienna? */

function getMoveName(argMoveId) {
  console.log('Wywołano funkcję getMoveName z argumentem: ' + argMoveId);
  if (argMoveId == 1) {
    return 'kamień';
  } else if (argMoveId == 2) {
    return 'papier';
  } else if (argMoveId == 3) {
    return 'nożyce';
  } else {
    printMessage('Nie znam ruchu o id ' + argMoveId + '. Zakładam, że chodziło o "kamień".');
    return 'kamień';
  }
}


/** ODCZYTANIE RUCHU GRACZA, LOSOWANIE LICZBY PRZEZ SKRYPT */

function playGame (playerMoveId) {
  const playerMove = getMoveName(playerMoveId);
  console.log('Ruch gracza to: ' + playerMove);
  const randomNumber = Math.floor(Math.random() * 3 + 1);
  console.log('Wylosowana liczba to: ' + randomNumber);
  const computerMove = getMoveName(randomNumber);
  console.log('Ruch komputera to: ' + computerMove);
  displayResult(playerMove, computerMove);
}

/** WYŚWIETLENIE WYNIKU */
/** var argComputerMove, argPlayerMove;
 Czy powyższa linijka jest potrzebna? Przecież to są argumenty funkcji, a nie zmienne? */

function displayResult(argPlayerMove, argComputerMove) {
  printMessage('Wybrałem ' + argComputerMove + ', a Ty ' + argPlayerMove);
  console.log('Wywołano funkcję displayResults z argumentami: ' + argPlayerMove + ', ' + argComputerMove);
  if (argPlayerMove == 'papier' && argComputerMove == 'kamień') {
    printMessage('Wygrywasz!');
  } else if (argPlayerMove == 'kamień' && argComputerMove == 'nożyce') {
    printMessage('Wygrywasz!');
  } else if (argPlayerMove == 'nożyce' && argComputerMove == 'papier') {
    printMessage('Wygrywasz!');
  } else if (argPlayerMove == argComputerMove) {
    printMessage('Jest remis! :)');
  } else {
    printMessage('Przegrywasz :(');
  }
}