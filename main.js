const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return { getSign };
}

const gameBoard = (() => {
    const board = new Array(9).fill("");
    
    const setField = (index, sign) => {
        board[index] = sign;
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

    const checkFree = (index) => {
        if (board[index] != "X" && board[index] != "O") {
            return true;
        } else {
            return false;
        }
    }

    return { setField, getField, reset, checkFree };
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll('.field');
    const message = document.querySelector('.message');

    fieldElements.forEach((field) => 
        field.addEventListener('click', (e) => {
            if (gameBoard.checkFree(e.target.dataset.index)) {
                gameController.playRound(parseInt(e.target.dataset.index));
                updateBoard();
            }
        })
    );
      
    const updateBoard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
        }
    };

    const updateDisplayMessage = (winner) => {
        if (gameController.checkWin() === "win") {
            message.textContent = "The winner is Player " + winner + "!";
        } else if (gameController.checkWin() === "tie"){
            message.textContent = "TIE!";
        } else {
            message.textContent = gameController.updateMessageContent();
        }
        
    }

    return { updateBoard, updateDisplayMessage };
})();

const gameController = (() => {
    const playerX = player("X");
    const playerO = player("O");
    let round = 1, winner;

    const restartBtn = document.querySelector('.restartBtn');

    restartBtn.addEventListener('click', (e) => {
        gameBoard.reset();
    });

    const playRound = (index) => {
        gameBoard.setField(index, getCurrentPlayer());
        displayController.updateDisplayMessage(setWinner());
        round++;
    };

    const setWinner = () => {
        winner = getCurrentPlayer();
        return winner;
    }

    const updateMessageContent = () => {
        return round % 2 === 1 ? "Player O's turn" : "Player X's turn";
    }

    const checkWin = () => {
        if (gameBoard.getField(0) === gameBoard.getField(1) && gameBoard.getField(0) === gameBoard.getField(2) && gameBoard.getField(0) !== "") {
            return "win";
        } else if (gameBoard.getField(3) === gameBoard.getField(4) && gameBoard.getField(3) === gameBoard.getField(5) && gameBoard.getField(3) !== "") {
            return "win";
        } else if (gameBoard.getField(6) === gameBoard.getField(7) && gameBoard.getField(6) === gameBoard.getField(8) && gameBoard.getField(6) !== "") {
            return "win";
        } else if (gameBoard.getField(0) === gameBoard.getField(3) && gameBoard.getField(0) === gameBoard.getField(6) && gameBoard.getField(0) !== "") {
            return "win";
        } else if (gameBoard.getField(1) === gameBoard.getField(4) && gameBoard.getField(1) === gameBoard.getField(7) && gameBoard.getField(1) !== "") {
            return "win";   
        } else if (gameBoard.getField(2) === gameBoard.getField(5) && gameBoard.getField(2) === gameBoard.getField(8) && gameBoard.getField(2) !== "") {
            return "win";
        } else if (gameBoard.getField(0) === gameBoard.getField(4) && gameBoard.getField(0) === gameBoard.getField(8) && gameBoard.getField(0) !== "") {
            return "win";
        } else if (gameBoard.getField(2) === gameBoard.getField(4) && gameBoard.getField(2) === gameBoard.getField(6) && gameBoard.getField(2) !== "") {
            return "win";
        } else {
            for (let index = 0; index < 9; index++) {
                if (gameBoard.checkFree(index) === true) {
                    return;
                }
            }
            return "tie";
        }
    }

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    
    return { playRound, getCurrentPlayer, updateMessageContent, checkWin, setWinner };
})();

