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
        constructor(){
            super();
            this._state = 'unknown';
            this._element = document.createElement('td');
            const self = this;
            this._element.addEventListener('click', function(){
                self.setState('miss');
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

    class GameBoard extends ViewComponent{
        constructor(){
            super();
            this._element = document.createElement('table');
            const rowCount = 10;
            const colCount = 10;
            for(let i=0; i<rowCount; i++) {
                const row = document.createElement('tr');

                for (let j = 0; j < colCount; j++) {
                    const col = new GameCell();
                    row.appendChild(col.getElement());
                }
                this._element.appendChild(row);
            }
        }
    }

    const gameElement = document.getElementById('game');
    const board = new GameBoard();
    gameElement.appendChild(board.getElement());





