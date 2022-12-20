const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return { getSign };
}

const gameBoard = (() => {
    const board = new Array(9);

    
    const setField = (index, sign) => {
        if (board[index] != "X" && board[index] != "O") {
            board[index] = sign;
        }
    };

    const getField = (index) => {
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        displayController.updateBoard();
    };

    return { setField, getField, reset };
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll('.field');

    fieldElements.forEach((field) => 
        field.addEventListener('click', (e) => {
            gameController.playRound(parseInt(e.target.dataset.index));
            updateBoard();
        })
    );
      
    const updateBoard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
        }
    };

    return { updateBoard };
})();

const gameController = (() => {
    const playerX = player("X");
    const playerO = player("O");
    let round = 1;

    const restartBtn = document.querySelector('.restartBtn');

    restartBtn.addEventListener('click', (e) => {
        gameBoard.reset();
    });

    const playRound = (index) => {
        gameBoard.setField(index, getCurrentPlayer());
        round++;
    };

    getCurrentPlayer = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    
    return { playRound, getCurrentPlayer };
})();

