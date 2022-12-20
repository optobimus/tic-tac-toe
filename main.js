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

    const updateDisplayMessage = () => {
        let msg = gameController.updateMessageContent();
        message.textContent = msg;
    }

    return { updateBoard, updateDisplayMessage };
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
        displayController.updateDisplayMessage();
        checkLogic(index);
        round++;
    };

    const updateMessageContent = () => {
        return round % 2 === 1 ? "Player O's turn" : "Player X's turn";
    }

    const checkLogic = (index) => {
    }

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    
    return { playRound, getCurrentPlayer, updateMessageContent };
})();

