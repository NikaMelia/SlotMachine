const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 15
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const columns = [];
    for (let i = 0; i < COLS; i++) {
        columns.push([])
        const avalableSymbols = [...symbols]
        for (let j = 0; j < ROWS; j++) {
            const index = Math.floor(Math.random() * avalableSymbols.length)
            const selectedSymbol = avalableSymbols[index]
            columns[i].push(selectedSymbol);
            avalableSymbols.splice(index, 1);
        }
    }
    return columns;

}

const getFinalReel = (columns) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
      rows.push([]);
      for (let j = 0; j < COLS; j++) {
        rows[i].push(columns[j][i]);
      }
    }
  
    return rows;
}


const deposit = () => {
    while (true) {
        const depostiAmount = prompt("Enter deposit amount : ")
        const numberOfAmount = parseFloat(depostiAmount)
        if (isNaN(numberOfAmount) || numberOfAmount <= 0) {
            console.log("Invalid deposit amount, try again")
        }
        else return numberOfAmount;
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOL_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };

const getNumberOfLines = () => {
    while (true) {
        const depostiAmount = prompt("Enter number of lines you want to bet on(1-3) : ")
        const numberOfAmount = parseFloat(depostiAmount)
        if (isNaN(numberOfAmount) || numberOfAmount <= 0 || numberOfAmount > 3) {
            console.log("invalid number of lines")
        }
        else return numberOfAmount;
    }
}

const printRows = (rows) => {
    for (const row of rows) {
      let rowString = "";
      for (const [i, symbol] of row.entries()) {
        rowString += symbol;
        if (i != row.length - 1) {
          rowString += " | ";
        }
      }
      console.log(rowString);
    }
  };

const betAmount = (balance, numberOfLines) => {
    while (true) {
        const depostiAmount = prompt("Enter bet amount per line : ")
        const numberOfAmount = parseFloat(depostiAmount)
        if (isNaN(numberOfAmount) || numberOfAmount <= 0 || numberOfAmount * numberOfLines > balance) {
            console.log("Invalid bet")
        }
        else return numberOfAmount;
    }
}

const game = () => {
    let balance = deposit();
  
    while (true) {
      console.log("You have a balance of $" + balance);
      const numberOfLines = getNumberOfLines();
      const bet = betAmount(balance, numberOfLines);
      balance -= bet * numberOfLines;
      const reels = spin();
      const rows = getFinalReel(reels);
      printRows(rows);
      const winnings = getWinnings(rows, bet, numberOfLines);
      balance += winnings;
      console.log("You won, $" + winnings.toString());
  
      if (balance <= 0) {
        console.log("You ran out of money!");
        break;
      }
  
      const playAgain = prompt("Do you want to play again (y/n)? ");
  
      if (playAgain != "y") break;
    }
  };

  game()