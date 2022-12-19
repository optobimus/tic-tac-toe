const gameBoard = (() => {
    const board = new Array(9);

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll('.field');

    fieldElements.forEach((field) => 
        field.addEventListener('click', (e) => {
            e.target.textContent = "X";
        })
    );
      
})();

const gameController = (() => {
    const playerX = player("X");
    const playerY = player("Y");
})();

const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return { getSign };
}