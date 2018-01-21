// const gameElement = document.getElementById('game');
// const row = document.createElement('tr');
// const col1 = document.createElement('td');
// const col2 = document.createElement('td');
// row.appendChild(col1);
// row.appendChild(col2);
// gameElement.appendChild(row);
//
// const cells =[col1, col2];
// for(let i =0; i<cells.length; i++) {
//     const clickedCell = cells[i];
//     clickedCell.addEventListener('click', function (event) {
//         clickedCell.classList.add('clicked');
//     });
// }
    'use strict';

    class ViewComponent {
        constructor(){
            if(new.target === ViewComponent) {
                throw new Error('Abstract class');
            }
        }
        getElement(){
            return this._element;
        }
    }

    class GameCell extends ViewComponent{
        constructor(handleCellClick, row, column){
            super();
            this._state = 'unknown';
            this._element = document.createElement('td');
            const self = this;
            this._element.addEventListener('click', function(){
               handleCellClick(row, column);
            })
        }
        setState(state){
         if(state !== 'unknown' && state !=='miss' && state !=='hit'){
             throw new Error('Invalid state');
         }
         this._state = state;
         this._element.className = 'cell_' + state;
        }

        getElement(){
            return this._element;

        }
    }

    class GameBoard extends ViewComponent {
        constructor(handleCellClick) {
            super();
            this._element = document.createElement('table');
            this._cells = {};
            const rowCount = 10;
            const colCount = 10;
            for (let i = 0; i < rowCount; i++) {
                const row = document.createElement('tr');

                for (let j = 0; j < colCount; j++) {
                    const cell = new GameCell(handleCellClick, i, j);
                    row.appendChild(cell.getElement());
                    const coordinatesText = i + 'x' + j;
                    this._cells[coordinatesText] = cell;
                }
                this._element.appendChild(row);
            }
        }

        setStateAt(row, column, state) {

                const coordinatesText = row + 'x' + column;
                this._cells[coordinatesText].setState(state);

        }
    }

    class GameController{
        constructor(boardModel){
            this._boardModel = boardModel;

        }
        handleCellClick(row, column){
            this._boardModel.fireAt(row, column);
            // this._boardView.setStateAt(row, column,'miss');
        }

    }

    class GameModel{
        constructor(){
            this._cells={};
            const rowCount = 10;
            const colCount = 10;
            for(let i=0; i< rowCount; i++){
                for(let j=0; j<colCount; j++){
                    const coordinatesText = i + '/' + j;
                    this._cells[coordinatesText] = {hasShip: true, fireAt: false};
                }

            }
        }

        fireAt(row, column){
            const coordinatesText = row + '/' + column;
            const targetCell = this._cells[coordinatesText];
            if(targetCell.fireAt){
                return;
            }
            targetCell.fireAt = true;
            console.log('has ship?s', targetCell.hasShip);

        }
    }

    const gameElement = document.getElementById('game');
    let board;
    let controller;
    function handleCellClick(row, column){
        controller.handleCellClick(row, column);
    }
    board = new GameBoard(handleCellClick);
    const model = new GameModel();
    controller = new GameController(model);
    gameElement.appendChild(board.getElement());






