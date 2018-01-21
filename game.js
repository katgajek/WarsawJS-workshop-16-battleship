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
            this._observers=[];
            this._cells={};
            const rowCount = 10;
            const colCount = 10;
            for(let i=0; i< rowCount; i++){
                for(let j=0; j<colCount; j++){
                    const coordinatesText = i + '/' + j;
                    const hasShip = (Math.random() >= 0.8);
                    this._cells[coordinatesText] = {hasShip: hasShip, fireAt: false};
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
            const result = targetCell.hasShip ? 'hit' : 'miss';
            this._observers.forEach(function(observer){
                observer('firedAt', {result,row,column});
            })

        }

        addObserver(observerFunction){
            this._observers.push(observerFunction);
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
    model.addObserver(function(eventType, params){
        switch (eventType){
            case 'firedAt':
                board.setStateAt(params.row, params.column, params.result);
                break;
        }
    });
    controller = new GameController(model);
    gameElement.appendChild(board.getElement());






