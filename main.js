const gameBoard = (() => {
    let _board = new Array(9);
})();

const displayController = (() => {

})();

const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return { getSign };
}