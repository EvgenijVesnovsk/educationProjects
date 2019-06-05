var player = 'black';

var figures = {
	white: {
		king: '&#9812',
		queen: '&#9813',
		castle: '&#9814',
		elephant: '&#9815',
		horse: '&#9816',
		soldier: '&#9817'
	},
	black: {
		king: '&#9818',
		queen: '&#9819',
		castle: '&#9820',
		elephant: '&#9821',
		horse: '&#9822',
		soldier: '&#9823'
	}
};

var board = [
	['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
	['8', figures.black.castle, figures.black.horse, figures.black.elephant, figures.black.queen, figures.black.king, figures.black.elephant, figures.black.horse, figures.black.castle, '8'],
	['7', figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, '7'],
	['6', '', '', '', '', '', '', '', '', '6'],
	['5', '', '', '', '', '', '', '', '', '5'],
	['4', '', '', '', '', '', '', '', '', '4'],
	['3', '', '', '', '', '', '', '', '', '3'],
	['2', figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, '2'],
	['1', figures.white.castle, figures.white.horse, figures.white.elephant, figures.white.queen, figures.white.king, figures.white.elephant, figures.white.horse, figures.white.castle, '1'],
	['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '']
];

//для проверки на ПАТ
//var board = [
//	['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
//	['8', '', '', '', '', '', '', '', figures.black.king, '8'],
//	['7', '', '', '', '', '', '', '', '', '7'],
//	['6', '', '', '', '', '', '', '', '', '6'],
//	['5', '', '', '', '', '', figures.black.soldier, '', '', '5'],
//	['4', '', '', '', '', '', '', figures.black.soldier, '', '4'],
//	['3', '', '', '', '', '', figures.black.queen, '', figures.black.soldier, '3'],
//	['2', '', '', '', '', '', '', '', '', '2'],
//	['1', '', '', '', '', '', '', '', figures.white.king, '1'],
//	['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '']
//];

class Game {
	constructor() {
		this.figures = figures;
		this.board = board;
		this.player = player;

		this.arrTakingPassage = [];

		this.arrCastling = []; //массив с полями доступными для рокировки
		// ладьи, которые совершили хотя бы один ход (0 - не совершал, 1 - совершал)(необходимо для проверки соблюдения условий для рокировки)
		this.a1MadeAMove = 0;
		this.h1MadeAMove = 0;
		this.a8MadeAMove = 0;
		this.h8MadeAMove = 0;
		// короли, которые совершали хотя бы один ход (0 - не совершал, 1 - совершал)(необходимо для проверки соблюдения условий для рокировки)
		this.e1MadeAMove = 0;
		this.e8MadeAMove = 0;

		this.attackingFigureRow; //номер строки фигуры, объявившей шах
		this.attackingFigureCol; //номер столбца фигуры, объявившей шах
		this.arrAttackFigures = []; //массив с номерами полей атакующих фигур
		this.arrAttackLine = []; //линия атаки фигуры, объявившей шах

		this.sumMoves = 0; //подсчет ходов для правила 50-ти ходов

		this.run();
	}

	run() {
		this.renderFigures(); // отрисовка фигур на поле
		this.changePlayer(); // выбор игрока для хода
		this.setEventsForPlayer(); //задаем событие клика для фигур (выбираем фигуру для хода)
	} //запуск

	renderFigures() {
		var index = 0;
		for (var i = 0; i < this.board.length; i++) {
			for (var j = 0; j < this.board[i].length; j++) {
				$('td').eq(index).html(this.board[i][j]);
				index = ++index;
			};
		};
	} // отрисовка фигур на доске

	changePlayer() {
		this.player = this.player == 'white' ? 'black' : 'white';
		$('.choiceFigure').removeClass('choiceFigure');
		$('td').off();
	} //смена игрока

	soldierTransformation(newRow, newCol) {

		var newFigure = prompt('Ваша пешка достигла последнего поля. Вы можете превратить её в любую фигуру на Ваше усмотрение, кроме пешки и короля. Введите название фигуры на выбор: Ферзь, Слон, Конь, Ладья');
		newFigure = newFigure.toLowerCase();
		switch (newFigure) {
			case 'ферзь':
				if (this.player == 'white') {
					var figure = this.figures.white.queen;
				} else {
					var figure = this.figures.black.queen;
				};
				break;
			case 'слон':
				if (this.player == 'white') {
					var figure = this.figures.white.elephant;
				} else {
					var figure = this.figures.black.elephant;
				};
				break;
			case 'конь':
				if (this.player == 'white') {
					var figure = this.figures.white.horse;
				} else {
					var figure = this.figures.black.horse;
				};
				break;
			case 'ладья':
				if (this.player == 'white') {
					var figure = this.figures.white.castle;
				} else {
					var figure = this.figures.black.castle;
				};
				break;
			default:
				alert('Вы не ввели название фигуры или допустили ошибку в написании. Попробуйте снова.');
				return false;
				break;
		};
		return figure;
	} //трансформация пешки в любую фигуру по достижению края доски

	checkFields() {
		if (this.board[8][1] !== this.figures.white.castle) {
			this.a1MadeAMove = 1;
		};
		if (this.board[8][8] !== this.figures.white.castle) {
			this.h1MadeAMove = 1;
		};
		if (this.board[1][1] !== this.figures.black.castle) {
			this.a8MadeAMove = 1;
		};
		if (this.board[1][8] !== this.figures.black.castle) {
			this.h8MadeAMove = 1;
		};
		if (this.board[8][5] !== this.figures.white.king) {
			this.e1MadeAMove = 1;
		};
		if (this.board[1][5] !== this.figures.black.king) {
			this.e8MadeAMove = 1;
		};
	} //проверка наличия фигур, необходимых для рокировки

	getAttackLine(row, col) {
		if (row > this.attackingFigureRow && col == this.attackingFigureCol) {
			for (var i = 1; i < row - this.attackingFigureRow; i++) {
				this.arrAttackLine.push({
					row: row - i,
					col: col
				});
			};
		};
		if (row < this.attackingFigureRow && col == this.attackingFigureCol) {
			for (var i = 1; i < this.attackingFigureRow - row; i++) {
				this.arrAttackLine.push({
					row: row + i,
					col: col
				});
			};
		};
		if (row == this.attackingFigureRow && col > this.attackingFigureCol) {
			for (var i = 1; i < col - this.attackingFigureCol; i++) {
				this.arrAttackLine.push({
					row: row,
					col: col - i
				});
			};
		};
		if (row == this.attackingFigureRow && col < this.attackingFigureCol) {
			for (var i = 1; i < this.attackingFigureCol - col; i++) {
				this.arrAttackLine.push({
					row: row,
					col: col + i
				});
			};
		};
		if (row > this.attackingFigureRow && col > this.attackingFigureCol) {
			for (var i = 1; i < row - this.attackingFigureRow; i++) {
				this.arrAttackLine.push({
					row: row - i,
					col: col - i
				});
			};
		};
		if (row > this.attackingFigureRow && col < this.attackingFigureCol) {
			for (var i = 1; i < row - this.attackingFigureRow; i++) {
				this.arrAttackLine.push({
					row: row - i,
					col: col + i
				});
			};
		};
		if (row < this.attackingFigureRow && col > this.attackingFigureCol) {
			for (var i = 1; i < this.attackingFigureRow - row; i++) {
				this.arrAttackLine.push({
					row: row + i,
					col: col - i
				});
			};
		};
		if (row < this.attackingFigureRow && col < this.attackingFigureCol) {
			for (var i = 1; i < this.attackingFigureRow - row; i++) {
				this.arrAttackLine.push({
					row: row + i,
					col: col + i
				});
			};
		};
	} //получение линии атаки фигуры, объявившей шах

	searchMate(row, col, color) {
		//проверка отступления короля
		if (col - 1 > 0 && (this.board[row][col - 1] == '' || this.searchEnemy(this.board[row][col - 1], color)) && !this.fieldUnderAttack(row, col - 1, color)) {
			return false;
		};
		if (col + 1 < 9 && (this.board[row][col + 1] == '' || this.searchEnemy(this.board[row][col + 1], color)) && !this.fieldUnderAttack(row, col + 1, color)) {
			return false;
		};
		if (row - 1 > 0 && col - 1 > 0 && (this.board[row - 1][col - 1] == '' || this.searchEnemy(this.board[row - 1][col - 1], color)) && !this.fieldUnderAttack(row - 1, col - 1, color)) {
			return false;
		};
		if (row - 1 > 0 && col + 1 < 9 && (this.board[row - 1][col + 1] == '' || this.searchEnemy(this.board[row - 1][col + 1], color)) && !this.fieldUnderAttack(row - 1, col + 1, color)) {
			return false;
		};
		if (row - 1 > 0 && (this.board[row - 1][col] == '' || this.searchEnemy(this.board[row - 1][col], color)) && !this.fieldUnderAttack(row - 1, col, color)) {
			return false;
		};
		if (row + 1 < 9 && col - 1 > 0 && (this.board[row + 1][col - 1] == '' || this.searchEnemy(this.board[row + 1][col - 1], color)) && !this.fieldUnderAttack(row + 1, col - 1, color)) {
			return false;
		};
		if (row + 1 < 9 && (this.board[row + 1][col] == '' || this.searchEnemy(this.board[row + 1][col], color)) && !this.fieldUnderAttack(row + 1, col, color)) {
			return false;
		};
		if (row + 1 < 9 && col + 1 < 9 && (this.board[row + 1][col + 1] == '' || this.searchEnemy(this.board[row + 1][col + 1], color)) && !this.fieldUnderAttack(row + 1, col + 1, color)) {
			return false;
		};

		if (color == 'white') {
			color = 'black';
		} else {
			color = 'white';
		};

		//можно ли убить атакующую фигуру
		if (this.fieldUnderAttack(this.attackingFigureRow, this.attackingFigureCol, color)) {

			for (var i = 0; i < this.arrAttackFigures.length; i++) {
				var defendFigureRow = parseInt(this.arrAttackFigures[i].row);
				var defendFigureCol = parseInt(this.arrAttackFigures[i].col);

				if (!this.checkAfterMove(defendFigureRow, defendFigureCol, this.attackingFigureRow, this.attackingFigureCol, color)) {
					return false;
				};
			};
		};

		//можно ли встать на пути атакующей фигуры (для слона, ладьи и ферзя)
		this.getAttackLine(row, col);

		for (var i = 0; i < this.arrAttackLine.length; i++) {
			var fieldLineRow = this.arrAttackLine[i].row;
			var fieldLineCol = this.arrAttackLine[i].col;

			if (this.fieldUnderAttack(fieldLineRow, fieldLineCol, color)) {

				for (var i = 0; i < this.arrAttackFigures.length; i++) {
					var defendFigureRow = parseInt(this.arrAttackFigures[i].row);
					var defendFigureCol = parseInt(this.arrAttackFigures[i].col);

					if (!this.checkAfterMove(defendFigureRow, defendFigureCol, fieldLineRow, fieldLineCol, color)) {
						return false;
					};
				};
			};
		};
		return true;
	} //проверка на МАТ

	searchCheck(newRow, newCol) {
		var whiteKingRow, whiteKingCol, blackKingRow, blackKingCol;

		for (var i = 0; i < this.board.length; i++) {
			for (var j = 0; j < this.board[i].length; j++) {
				if (this.board[i][j] == this.figures.white.king) {
					whiteKingRow = i;
					whiteKingCol = j;
				};
				if (this.board[i][j] == this.figures.black.king) {
					blackKingRow = i;
					blackKingCol = j;
				};
			};
		};

		var resultForWhiteKing = this.fieldUnderAttack(whiteKingRow, whiteKingCol, 'white');
		var resultForBlackKing = this.fieldUnderAttack(blackKingRow, blackKingCol, 'black');

		if (this.player == 'white') {
			if (resultForWhiteKing) {
				// откат хода
				alert('Так ходить нельзя. Ваш король оказывается под ударом');
				return 1;
			};
		} else {
			if (resultForBlackKing) {
				// откат хода
				alert('Так ходить нельзя. Ваш король оказывается под ударом');
				return 1;
			};
		};

		if (this.player == 'white') {
			if (resultForBlackKing) {
				alert('Объявлен ШАХ для черного короля');
				this.attackingFigureRow = newRow;
				this.attackingFigureCol = newCol;
				var result = this.searchMate(blackKingRow, blackKingCol, 'black');
				if (result) {
					alert('МАТ для черного короля');
					return 2;
				};
			};
		} else {
			if (resultForWhiteKing) {
				alert('Объявлен ШАХ для белого короля');
				this.attackingFigureRow = newRow;
				this.attackingFigureCol = newCol;
				var result = this.searchMate(whiteKingRow, whiteKingCol, 'white');
				if (result) {
					alert('МАТ для белого короля');
					return 2;
				};
			};
		};
		return 3;
	} //проверка на ШАХ

	checkAfterMove(oldRow, oldCol, newRow, newCol, color) {
		//запоминаем значения в переменные
		var fieldOld = this.board[oldRow][oldCol];
		var fieldNew = this.board[newRow][newCol];

		//подставляем
		this.board[oldRow][oldCol] = '';
		this.board[newRow][newCol] = fieldOld;

		//проверка на шах
		var kingRow, kingCol;

		if (color == 'white') {
			var figure = this.figures.black.king;
			var color = 'black';
		} else {
			var figure = this.figures.white.king;
			var color = 'white';
		};

		for (var i = 0; i < this.board.length; i++) {
			for (var j = 0; j < this.board[i].length; j++) {
				if (this.board[i][j] == figure) {
					kingRow = i;
					kingCol = j;
				};
			};
		};

		var result = this.fieldUnderAttack(kingRow, kingCol, color); //white

		//откат подстановки
		this.board[oldRow][oldCol] = fieldOld;
		this.board[newRow][newCol] = fieldNew;

		if (result) {
			return true;
		} else {
			return false;
		};
	} //проверка на шах после хода

	pat() {
		if (this.player == 'white') {
			var figureColor = this.figures.black;
			var soldiersRow = row - 1;
			var color = 'black';
		} else {
			var figureColor = this.figures.white;
			var soldiersRow = row + 1;
			var color = 'white';
		};

		for (var row = 1; row < 9; row++) {
			for (var col = 1; col < 9; col++) {
				// проверка пешек
				if (this.board[row][col] == figureColor.soldier && soldiersRow > 0 && soldiersRow < 9) {
					if (this.board[soldiersRow][col] == '' && !this.checkAfterMove(row, col, soldiersRow, col, color)) {
						return false;
					};
					if (col - 1 > 0 && this.searchEnemy(this.board[soldiersRow][col - 1], color) && !this.checkAfterMove(row, col, soldiersRow, col - 1, this.player)) {
						return false;
					};
					if (col + 1 < 9 && this.searchEnemy(this.board[soldiersRow][col + 1], color) && !this.checkAfterMove(row, col, soldiersRow, col + 1, this.player)) {
						return false;
					};
				};
				//проверка коней
				if (this.board[row][col] == figureColor.horse) {
					if (row - 2 > 0 && col - 1 > 0 && (this.board[row - 2][col - 1] == '' || this.searchEnemy(this.board[row - 2][col - 1], color)) && !this.checkAfterMove(row, col, row - 2, col - 1, this.player)) {
						return false;
					};
					if (row - 2 > 0 && col + 1 < 9 && (this.board[row - 2][col + 1] == '' || this.searchEnemy(this.board[row - 2][col + 1], color)) && !this.checkAfterMove(row, col, row - 2, col + 1, this.player)) {
						return false;
					};
					if (row - 1 > 0 && col - 2 > 0 && (this.board[row - 1][col - 2] == '' || this.searchEnemy(this.board[row - 1][col - 2], color)) && !this.checkAfterMove(row, col, row - 1, col - 2, this.player)) {
						return false;
					};
					if (row - 1 > 0 && col + 2 < 9 && (this.board[row - 1][col + 2] == '' || this.searchEnemy(this.board[row - 1][col + 2], color)) && !this.checkAfterMove(row, col, row - 1, col + 2, this.player)) {
						return false;
					};

					if (row + 2 < 9 && col - 1 > 0 && (this.board[row + 2][col - 1] == '' || this.searchEnemy(this.board[row + 2][col - 1], color)) && !this.checkAfterMove(row, col, row + 2, col - 1, this.player)) {
						return false;
					};
					if (row + 2 < 9 && col + 1 < 9 && (this.board[row + 2][col + 1] == '' || this.searchEnemy(this.board[row + 2][col + 1], color)) && !this.checkAfterMove(row, col, row + 2, col + 1, this.player)) {
						return false;
					};
					if (row + 1 < 9 && col - 2 > 0 && (this.board[row + 1][col - 2] == '' || this.searchEnemy(this.board[row + 1][col - 2], color)) && !this.checkAfterMove(row, col, row + 1, col - 2, this.player)) {
						return false;
					};
					if (row + 1 < 9 && col + 2 < 9 && (this.board[row + 1][col + 2] == '' || this.searchEnemy(this.board[row + 1][col + 2], color)) && !this.checkAfterMove(row, col, row + 1, col + 2, this.player)) {
						return false;
					};
				};
				//проверка фигур, ходящих по диагонали
				if (this.board[row][col] == figureColor.elephant || this.board[row][col] == figureColor.queen || this.board[row][col] == figureColor.king) {
					if (row - 1 > 0 && col - 1 > 0 && (this.board[row - 1][col - 1] == '' || this.searchEnemy(this.board[row - 1][col - 1], color)) && !this.checkAfterMove(row, col, row - 1, col - 1, this.player)) {
						return false;
					};
					if (row - 1 > 0 && col + 1 < 9 && (this.board[row - 1][col + 1] == '' || this.searchEnemy(this.board[row - 1][col + 1], color)) && !this.checkAfterMove(row, col, row - 1, col + 1, this.player)) {
						return false;
					};
					if (row + 1 < 9 && col - 1 > 0 && (this.board[row + 1][col - 1] == '' || this.searchEnemy(this.board[row + 1][col - 1], color)) && !this.checkAfterMove(row, col, row + 1, col - 1, this.player)) {
						return false;
					};
					if (row + 1 < 9 && col + 1 < 9 && (this.board[row + 1][col + 1] == '' || this.searchEnemy(this.board[row + 1][col + 1], color)) && !this.checkAfterMove(row, col, row + 1, col + 1, this.player)) {
						return false;
					};
				};
				// проверка фигур, ходящих по горизонтали и вертикали
				if (this.board[row][col] == figureColor.castle || this.board[row][col] == figureColor.queen || this.board[row][col] == figureColor.king) {
					if (row - 1 > 0 && (this.board[row - 1][col] == '' || this.searchEnemy(this.board[row - 1][col], color)) && !this.checkAfterMove(row, col, row - 1, col, this.player)) {
						return false;
					};
					if (row + 1 < 9 && (this.board[row + 1][col] == '' || this.searchEnemy(this.board[row + 1][col], color)) && !this.checkAfterMove(row, col, row + 1, col, this.player)) {
						return false;
					};
					if (col - 1 > 0 && (this.board[row][col - 1] == '' || this.searchEnemy(this.board[row][col - 1], color)) && !this.checkAfterMove(row, col, row, col - 1, this.player)) {
						return false;
					};
					if (col + 1 < 9 && (this.board[row][col + 1] == '' || this.searchEnemy(this.board[row][col + 1], color)) && !this.checkAfterMove(row, col, row, col + 1, this.player)) {
						return false;
					};
				};
			};
		};
		return true;
	} //проверка на пат

	notEnoughFigures() {
		var sumfigures = {
			white: {
				queen: 0,
				castle: 0,
				elephant: 0,
				horse: 0,
				soldier: 0
			},
			black: {
				queen: 0,
				castle: 0,
				elephant: 0,
				horse: 0,
				soldier: 0
			}
		};

		// подсчитываем фигуры
		for (var row = 1; row < 9; row++) {
			for (var col = 1; col < 9; col++) {
				var figure = this.board[row][col];
				switch (figure) {
					case this.figures.white.soldier:
						sumfigures.white.soldier = sumfigures.white.soldier + 1;
						break;
					case this.figures.black.soldier:
						sumfigures.black.soldier = sumfigures.black.soldier + 1;
						break;
					case this.figures.white.queen:
						sumfigures.white.queen = sumfigures.white.queen + 1;
						break;
					case this.figures.black.queen:
						sumfigures.black.queen = sumfigures.black.queen + 1;
						break;
					case this.figures.white.castle:
						sumfigures.white.castle = sumfigures.white.castle + 1;
						break;
					case this.figures.black.castle:
						sumfigures.black.castle = sumfigures.black.castle + 1;
						break;
					case this.figures.white.horse:
						sumfigures.white.horse = sumfigures.white.horse + 1;
						break;
					case this.figures.black.horse:
						sumfigures.black.horse = sumfigures.black.horse + 1;
						break;
					case this.figures.white.elephant:
						sumfigures.white.elephant = sumfigures.white.elephant + 1;
						break;
					case this.figures.black.elephant:
						sumfigures.black.elephant = sumfigures.black.elephant + 1;
						break;
				};
			};
		};

		if (sumfigures.white.soldier == 0 && sumfigures.white.queen == 0 && sumfigures.white.castle == 0 && sumfigures.black.soldier == 0 && sumfigures.black.queen == 0 && sumfigures.black.castle == 0) {
			//остались только короли
			if (sumfigures.white.horse == 0 && sumfigures.white.elephant == 0 && sumfigures.black.horse == 0 && sumfigures.black.elephant == 0) {
				return true;
			};
			//остались только короли и белый слон
			if (sumfigures.white.horse == 0 && sumfigures.white.elephant == 1 && sumfigures.black.horse == 0 && sumfigures.black.elephant == 0) {
				return true;
			};
			//остались только короли и черный слон
			if (sumfigures.white.horse == 0 && sumfigures.white.elephant == 0 && sumfigures.black.horse == 0 && sumfigures.black.elephant == 1) {
				return true;
			};
			//остались только короли и белый конь(кони)
			if (sumfigures.white.horse > 0 && sumfigures.white.elephant == 0 && sumfigures.black.horse == 0 && sumfigures.black.elephant == 0) {
				return true;
			};
			//остались только короли и черный конь(кони)
			if (sumfigures.white.horse == 0 && sumfigures.white.elephant == 0 && sumfigures.black.horse > 0 && sumfigures.black.elephant == 0) {
				return true;
			};
		};
		return false;
	} //проверка необходимого кол-ва фигур для объявления мата

	rule50Moves(figure, figureInNewField) {
		if (figure !== this.figures.white.soldier && figure !== this.figures.black.soldier) {
			if (figureInNewField == '') {
				this.sumMoves = this.sumMoves + 1;
			} else {
				this.sumMoves = 0;
			};
		} else {
			this.sumMoves = 0;
		};
	} //подсчет ходов для правила 50-ти ходов

	drawnGame() { //ничья
		//return 0 - ничьи нет, return 2 - ПАТ, return 3 - недостаточное кол-во фигур для объявления мата, return 4 - правило 50-ти ходов

		if (this.player == 'white') {
			var figureColor = this.figures.black;
			var color = 'white';
		} else {
			var figureColor = this.figures.white;
			var color = 'black';
		};

		//проверка на пат
		if (this.pat()) {
			return 2;
		};

		if (this.notEnoughFigures()) {
			return 3;
		};

		if (this.sumMoves > 50) {
			return 4;
		}

		return 0;
	} //проверка на НИЧЬЮ

	move(row, col) {
		var figure = this.board[row][col];

		var newField = event.target;
		var newRow = parseInt(newField.getAttribute('row'));
		var newCol = parseInt(newField.getAttribute('col'));
		var figureInNewField = this.board[newRow][newCol];

		var takingPassage = this.arrTakingPassage; //взятие на подходе для пешек
		this.arrTakingPassage = [];

		//если ходит пешка
		if (figure == this.figures.white.soldier || figure == this.figures.black.soldier) {
			if (row == 7 && newRow == 5 || row == 2 && newRow == 4) {
				this.arrTakingPassage.push({
					row: newRow,
					col: newCol
				});
			};

			if (takingPassage.length > 0) {
				var arrRow = parseInt(takingPassage[0].row);
				var arrCol = parseInt(takingPassage[0].col);
				if (figure == this.figures.white.soldier && newRow == arrRow - 1 || figure == this.figures.black.soldier && newRow == arrRow + 1) {
					this.board[arrRow][arrCol] = '';
				};
			};

			if (newRow == 1 || newRow == 8) {
				figure = false;
				while (figure == false) {
					figure = this.soldierTransformation();
				};
			};
		};

		if (this.player == 'white') {
			var figureColor = this.figures.white;
			var rowNum = 8;
		} else {
			var figureColor = this.figures.black;
			var rowNum = 1;
		};

		//если ходит король
		if (figure == figureColor.king && row == rowNum && col == 5 && newRow == rowNum && (newCol == 3 || newCol == 7)) {
			var answer = parseInt(prompt('Желаете выполнить рокировку? Ответ Да: 1'));
			if (answer == 1) {
				if (newCol == 3) {
					this.board[rowNum][1] = '';
					this.board[rowNum][4] = figureColor.castle;
				};
				if (newCol == 7) {
					this.board[rowNum][8] = '';
					this.board[rowNum][6] = figureColor.castle;
				};
			} else {
				return false;
			};
		};

		//если ходит ладья
		if (figure == figureColor.castle && row == rowNum && newRow == rowNum && ((col == 1 && newCol == 4) || (col == 8 && newCol == 6))) {
			this.castling(this.player);
			for (var i = 0; i < this.arrCastling.length; i++) {
				var castlingRow = parseInt(this.arrCastling[i].row);
				var castlingCol = parseInt(this.arrCastling[i].col);
				if (newCol == 4 && castlingRow == rowNum && castlingCol == 3) {
					var answer = parseInt(prompt('Желаете выполнить рокировку? Ответ Да: 1'));
					if (answer == 1) {
						this.board[rowNum][5] = '';
						this.board[rowNum][3] = figureColor.king;
					};
				};
				if (newCol == 6 && castlingRow == rowNum && castlingCol == 7) {
					var answer = parseInt(prompt('Желаете выполнить рокировку? Ответ Да: 1'));
					if (answer == 1) {
						this.board[rowNum][5] = '';
						this.board[rowNum][7] = figureColor.king;
					};
				};
			};
		};

		this.checkFields(); // проверка на занятость полей (необходимо для ракировки)

		//ход
		this.board[row][col] = '';
		$('[row = ' + row + '][col = ' + col + ']').html('');
		this.board[newRow][newCol] = figure;
		$('[row = ' + newRow + '][col = ' + newCol + ']').html(figure);
		$('.choiceFigure').removeClass('choiceFigure');

		var result = this.searchCheck(newRow, newCol); //проверка на шах и мат
		// если шах для игрока который ходит, то откат хода
		if (result == 1) {
			//откат хода
			this.board[row][col] = figure;
			$('[row = ' + row + '][col = ' + col + ']').html(figure);
			this.board[newRow][newCol] = figureInNewField;
			$('[row = ' + newRow + '][col = ' + newCol + ']').html(figureInNewField);
			return false;
		};

		//если мат, то конец игры
		if (result == 2) {
			this.gameOver();
		} else {
			//подсчет для правила 50-ти ходов
			this.rule50Moves(figure, figureInNewField);

			//проверка на ничью
			var drawnGame = this.drawnGame();
			switch (drawnGame) {
				case 2:
					alert('ПАТ');
					break;
				case 3:
					alert('НИЧЬЯ! (ни у одной из сторон не осталось достаточно фигур для объявления мата)');
					break;
				case 4:
					alert('НИЧЬЯ! (правило 50-ти ходов: ни кому из игроков не удалось поставить Мат, сходить пешкой или побить вражескую фигуру в течении 50-ти ходов)');
					break;
			};

			//если ничья, то конец игры
			if (drawnGame !== 0) {
				this.gameOver();
			} else {
				this.run();
			};
		};

	} //ход

	searchEnemy(field, color) { //проверить нужен ли этот метод или нет?
		if (color == 'white') {
			var figures = this.figures.black;
		} else {
			var figures = this.figures.white;
		};

		for (var figure in figures) {
			if (figures[figure] == field) {
				return true;
			};
		};
		return false;
	} //поиск вражеской фигуры в заданном поле

	takingPassage(row, col) {
		var newRow = parseInt(this.arrTakingPassage[0].row);
		var newCol = parseInt(this.arrTakingPassage[0].col);
		if (row == newRow && (col == newCol - 1 || col == newCol + 1)) {
			if (this.player == 'white') {
				$('[row = ' + (newRow - 1) + '][col = ' + newCol + ']').on('click', this.move.bind(this, row, col));
			} else {
				$('[row = ' + (newRow + 1) + '][col = ' + newCol + ']').on('click', this.move.bind(this, row, col));
			};
		};
	} //проверка на взятие на подходе для пешек

	setEventsForSoldier(row, col, color) {
		if (color == 'white') { // улучшить searchEnemy() чтобы он искал союзные фигуры, т.е если в поле союзная фигура, то ходить нельзя, а если нет, то без разницы что там(враг или пустая)
			if (row - 1 > 0 && this.board[row - 1][col] == '') {
				$('[row = ' + (row - 1) + '][col = ' + col + ']').on('click', this.move.bind(this, row, col));
			};
			if (row == 7 && this.board[row - 2][col] == '' && this.board[row - 1][col] == '') {
				$('[row = ' + (row - 2) + '][col = ' + col + ']').on('click', this.move.bind(this, row, col));
			};

			if (row - 1 > 0 && col - 1 > 0 && this.searchEnemy(this.board[row - 1][col - 1], color)) {
				$('[row = ' + (row - 1) + '][col = ' + (col - 1) + ']').on('click', this.move.bind(this, row, col));
			};

			if (row - 1 > 0 && col + 1 < 9 && this.searchEnemy(this.board[row - 1][col + 1], color)) {
				$('[row = ' + (row - 1) + '][col = ' + (col + 1) + ']').on('click', this.move.bind(this, row, col));
			};
		} else {
			if (row + 1 < 9 && this.board[row + 1][col] == '') {
				$('[row = ' + (row + 1) + '][col = ' + col + ']').on('click', this.move.bind(this, row, col));
			};
			if (row == 2 && this.board[row + 2][col] == '' && this.board[row + 1][col] == '') {
				$('[row = ' + (row + 2) + '][col = ' + col + ']').on('click', this.move.bind(this, row, col));
			};

			if (row + 1 < 9 && col - 1 > 0 && this.searchEnemy(this.board[row + 1][col - 1], color)) {
				$('[row = ' + (row + 1) + '][col = ' + (col - 1) + ']').on('click', this.move.bind(this, row, col));
			};

			if (row + 1 < 9 && col + 1 < 9 && this.searchEnemy(this.board[row + 1][col + 1], color)) {
				$('[row = ' + (row + 1) + '][col = ' + (col + 1) + ']').on('click', this.move.bind(this, row, col));
			};
		};
		if (this.arrTakingPassage.length > 0) {
			this.takingPassage(row, col);
		};
	} //задаем событи для пешек

	setEventsForHorse(row, col, color) {
		if (row - 2 > 0 && col - 1 > 0 && (this.board[row - 2][col - 1] == '' || this.searchEnemy(this.board[row - 2][col - 1], color))) {
			$('[row = ' + (row - 2) + '][col = ' + (col - 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row - 2 > 0 && col + 1 < 9 && (this.board[row - 2][col + 1] == '' || this.searchEnemy(this.board[row - 2][col + 1], color))) {
			$('[row = ' + (row - 2) + '][col = ' + (col + 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row - 1 > 0 && col - 2 > 0 && (this.board[row - 1][col - 2] == '' || this.searchEnemy(this.board[row - 1][col - 2], color))) {
			$('[row = ' + (row - 1) + '][col = ' + (col - 2) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row - 1 > 0 && col + 2 < 9 && (this.board[row - 1][col + 2] == '' || this.searchEnemy(this.board[row - 1][col + 2], color))) {
			$('[row = ' + (row - 1) + '][col = ' + (col + 2) + ']').on('click', this.move.bind(this, row, col));
		};

		if (row + 2 < 9 && col - 1 > 0 && (this.board[row + 2][col - 1] == '' || this.searchEnemy(this.board[row + 2][col - 1], color))) {
			$('[row = ' + (row + 2) + '][col = ' + (col - 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row + 2 < 9 && col + 1 < 9 && (this.board[row + 2][col + 1] == '' || this.searchEnemy(this.board[row + 2][col + 1], color))) {
			$('[row = ' + (row + 2) + '][col = ' + (col + 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row + 1 < 9 && col - 2 > 0 && (this.board[row + 1][col - 2] == '' || this.searchEnemy(this.board[row + 1][col - 2], color))) {
			$('[row = ' + (row + 1) + '][col = ' + (col - 2) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row + 1 < 9 && col + 2 < 9 && (this.board[row + 1][col + 2] == '' || this.searchEnemy(this.board[row + 1][col + 2], color))) {
			$('[row = ' + (row + 1) + '][col = ' + (col + 2) + ']').on('click', this.move.bind(this, row, col));
		};
	} //задаем событи для конец

	setEventsForElephant(row, col, color) {
		for (var i = 1; i < 8; i++) {
			if (row - i > 0 && col - i > 0 && (this.board[row - i][col - i] == '' || this.searchEnemy(this.board[row - i][col - i], color))) {
				$('[row = ' + (row - i) + '][col = ' + (col - i) + ']').on('click', this.move.bind(this, row, col));
			};
			if (row - i > 0 && col - i > 0 && this.board[row - i][col - i] !== '') {
				break;
			};
		};

		for (var i = 1; i < 8; i++) {
			if (row - i > 0 && col + i < 9 && (this.board[row - i][col + i] == '' || this.searchEnemy(this.board[row - i][col + i], color))) {
				$('[row = ' + (row - i) + '][col = ' + (col + i) + ']').on('click', this.move.bind(this, row, col));
			};
			if (row - i > 0 && col + i < 9 && this.board[row - i][col + i] !== '') {
				break;
			};
		};

		for (var i = 1; i < 8; i++) {
			if (row + i < 9 && col - i > 0 && (this.board[row + i][col - i] == '' || this.searchEnemy(this.board[row + i][col - i], color))) {
				$('[row = ' + (row + i) + '][col = ' + (col - i) + ']').on('click', this.move.bind(this, row, col));
			};
			if (row + i < 9 && col - i > 0 && this.board[row + i][col - i] !== '') {
				break;
			};
		};

		for (var i = 1; i < 8; i++) {
			if (row + i < 9 && col + i < 9 && (this.board[row + i][col + i] == '' || this.searchEnemy(this.board[row + i][col + i], color))) {
				$('[row = ' + (row + i) + '][col = ' + (col + i) + ']').on('click', this.move.bind(this, row, col));
			};
			if (row + i < 9 && col + i < 9 && this.board[row + i][col + i] !== '') {
				break;
			};
		};
	} //задаем событи для слонов

	setEventsForCastle(row, col, color) {
		for (var i = 1; i < 8; i++) {
			if (col - i > 0 && (this.board[row][col - i] == '' || this.searchEnemy(this.board[row][col - i], color))) {
				$('[row = ' + row + '][col = ' + (col - i) + ']').on('click', this.move.bind(this, row, col));
			};
			if (col - i > 0 && this.board[row][col - i] !== '') {
				break;
			};
		};

		for (var i = 1; i < 8; i++) {
			if (col + i < 9 && (this.board[row][col + i] == '' || this.searchEnemy(this.board[row][col + i], color))) {
				$('[row = ' + row + '][col = ' + (col + i) + ']').on('click', this.move.bind(this, row, col));
			};
			if (col + i < 9 && this.board[row][col + i] !== '') {
				break;
			};
		};

		for (var i = 1; i < 8; i++) {
			if (row - i > 0 && (this.board[row - i][col] == '' || this.searchEnemy(this.board[row - i][col], color))) {
				$('[row = ' + (row - i) + '][col = ' + col + ']').on('click', this.move.bind(this, row, col));
			};
			if (row - i > 0 && this.board[row - i][col] !== '') {
				break;
			};
		};

		for (var i = 1; i < 8; i++) {
			if (row + i < 9 && (this.board[row + i][col] == '' || this.searchEnemy(this.board[row + i][col], color))) {
				$('[row = ' + (row + i) + '][col = ' + col + ']').on('click', this.move.bind(this, row, col));
			};
			if (row + i < 9 && this.board[row + i][col] !== '') {
				break;
			};
		};
	} //задаем событи для ладьи

	setEventsForQueen(row, col, color) {
		this.setEventsForElephant(row, col, color);
		this.setEventsForCastle(row, col, color);
	} //задаем событи для ферзей

	fieldUnderAttack(row, col, color) {
		var row = parseInt(row);
		var col = parseInt(col);
		this.arrAttackFigures = [];
		if (color == 'white') {
			var figureColor = this.figures.black;
		} else {
			var figureColor = this.figures.white;
		};

		//проверка пешек
		if (row - 1 > 0 && col - 1 > 0 && this.board[row - 1][col - 1] == figureColor.soldier && this.board[row][col] !== '') {
			this.arrAttackFigures.push({
				row: row - 1,
				col: col - 1
			});
		};
		if (row - 1 > 0 && col + 1 < 9 && this.board[row - 1][col + 1] == figureColor.soldier && this.board[row][col] !== '') {
			this.arrAttackFigures.push({
				row: row - 1,
				col: col + 1
			});
		};

		//проверка пешек
		if (row + 1 < 9 && col - 1 > 0 && this.board[row + 1][col - 1] == figureColor.soldier && this.board[row][col] !== '') {
			this.arrAttackFigures.push({
				row: row + 1,
				col: col - 1
			});
		};
		if (row + 1 < 9 && col + 1 < 9 && this.board[row + 1][col + 1] == figureColor.soldier && this.board[row][col] !== '') {
			this.arrAttackFigures.push({
				row: row + 1,
				col: col + 1
			});
		};

		//проверка лошадей
		if (row - 2 > 0 && col - 1 > 0 && this.board[row - 2][col - 1] == figureColor.horse) {
			this.arrAttackFigures.push({
				row: row - 2,
				col: col - 1
			});
		};
		if (row - 2 > 0 && col + 1 < 9 && this.board[row - 2][col + 1] == figureColor.horse) {
			this.arrAttackFigures.push({
				row: row - 2,
				col: col + 1
			});
		};
		if (row + 2 < 9 && col - 1 > 0 && this.board[row + 2][col - 1] == figureColor.horse) {
			this.arrAttackFigures.push({
				row: row + 2,
				col: col - 1
			});
		};
		if (row + 2 < 9 && col + 1 < 9 && this.board[row + 2][col + 1] == figureColor.horse) {
			this.arrAttackFigures.push({
				row: row + 2,
				col: col + 1
			});
		};
		if (row - 1 > 0 && col - 2 > 0 && this.board[row - 1][col - 2] == figureColor.horse) {
			this.arrAttackFigures.push({
				row: row - 1,
				col: col - 2
			});
		};
		if (row - 1 > 0 && col + 2 < 9 && this.board[row - 1][col + 2] == figureColor.horse) {
			this.arrAttackFigures.push({
				row: row - 1,
				col: col + 2
			});
		};
		if (row + 1 < 9 && col - 2 > 0 && this.board[row + 1][col - 2] == figureColor.horse) {
			this.arrAttackFigures.push({
				row: row + 1,
				col: col - 2
			});
		};
		if (row + 1 < 9 && col + 2 < 9 && this.board[row + 1][col + 2] == figureColor.horse) {
			this.arrAttackFigures.push({
				row: row + 1,
				col: col + 2
			});
		};

		//проверка вертикали и горизонтали
		for (var i = 1; i < 8; i++) {
			if (row - i > 0) {
				if (this.board[row - i][col] == figureColor.castle || this.board[row - i][col] == figureColor.queen) {
					this.arrAttackFigures.push({
						row: row - i,
						col: col
					});
				};
				if (this.board[row - i][col] !== '') {
					break;
				};
			};
		};
		for (var i = 1; i < 8; i++) {
			if (row + i < 9) {
				if (this.board[row + i][col] == figureColor.castle || this.board[row + i][col] == figureColor.queen) {
					this.arrAttackFigures.push({
						row: row + i,
						col: col
					});
				};
				if (this.board[row + i][col] !== '') {
					break;
				};
			};
		};
		for (var i = 1; i < 8; i++) {
			if (col - i > 0) {
				if (this.board[row][col - i] == figureColor.castle || this.board[row][col - i] == figureColor.queen) {
					this.arrAttackFigures.push({
						row: row,
						col: col - i
					});
				};
				if (this.board[row][col - i] !== '') {
					break;
				};
			};
		};
		for (var i = 1; i < 8; i++) {
			if (col + i < 9) {
				if (this.board[row][col + i] == figureColor.castle || this.board[row][col + i] == figureColor.queen) {
					this.arrAttackFigures.push({
						row: row,
						col: col + i
					});
				};
				if (this.board[row][col + i] !== '') {
					break;
				};
			};
		};

		//проверка диагонали
		for (var i = 1; i < 8; i++) {
			if (row - i > 0 && col - i > 0) {
				if (this.board[row - i][col - i] == figureColor.elephant || this.board[row - i][col - i] == figureColor.queen) {
					this.arrAttackFigures.push({
						row: row - i,
						col: col - i
					});
				};
				if (this.board[row - i][col - i] !== '') {
					break;
				};
			};
		};
		for (var i = 1; i < 8; i++) {
			if (row - i > 0 && col + i < 9) {
				if (this.board[row - i][col + i] == figureColor.elephant || this.board[row - i][col + i] == figureColor.queen) {
					this.arrAttackFigures.push({
						row: row - i,
						col: col + i
					});
				};
				if (this.board[row - i][col + i] !== '') {
					break;
				};
			};
		};
		for (var i = 1; i < 8; i++) {
			if (row + i < 9 && col - i > 0) {
				if (this.board[row + i][col - i] == figureColor.elephant || this.board[row + i][col - i] == figureColor.queen) {
					this.arrAttackFigures.push({
						row: row + i,
						col: col - i
					});
				};
				if (this.board[row + i][col - i] !== 0) {
					break;
				};
			};
		};
		for (var i = 1; i < 8; i++) {
			if (row + i < 9 && col + i < 9) {
				if (this.board[row + i][col + i] == figureColor.elephant || this.board[row + i][col + i] == figureColor.queen) {
					this.arrAttackFigures.push({
						row: row + i,
						col: col + i
					});
				};
				if (this.board[row + i][col + i] !== '') {
					break;
				};
			};
		};

		if (this.arrAttackFigures.length > 0) {
			return true;
		} else {
			return false;
		};
	} //является ли поле под атакой

	castling(color) {
		this.arrCastling = [];
		if (color == 'white') {
			// выбран белый король или белая ладья подошла к белому королю
			if (this.board[8][2] == '' && this.board[8][3] == '' && this.board[8][4] == '' && this.e1MadeAMove == 0 && this.a1MadeAMove == 0 && !this.fieldUnderAttack(8, 5, color) && !this.fieldUnderAttack(8, 4, color) && !this.fieldUnderAttack(8, 3, color)) {
				this.arrCastling.push({
					row: 8,
					col: 3
				});
			};

			if (this.board[8][6] == '' && this.board[8][7] == '' && this.e1MadeAMove == 0 && this.h1MadeAMove == 0 && !this.fieldUnderAttack(8, 5, color) && !this.fieldUnderAttack(8, 6, color) && !this.fieldUnderAttack(8, 7, color)) {
				this.arrCastling.push({
					row: 8,
					col: 7
				});
			};
		} else {
			// выбран черный король или черная ладья подошла к черному королю
			if (this.board[1][2] == '' && this.board[1][3] == '' && this.board[1][4] == '' && this.e8MadeAMove == 0 && this.a8MadeAMove == 0 && !this.fieldUnderAttack(1, 5, color) && !this.fieldUnderAttack(1, 4, color) && !this.fieldUnderAttack(1, 3, color)) {
				this.arrCastling.push({
					row: 1,
					col: 3
				});
			};
			if (this.board[1][6] == '' && this.board[1][7] == '' && this.e8MadeAMove == 0 && this.h8MadeAMove == 0 && !this.fieldUnderAttack(1, 5, color) && !this.fieldUnderAttack(1, 6, color) && !this.fieldUnderAttack(1, 7, color)) {
				this.arrCastling.push({
					row: 1,
					col: 7
				});
			};
		};
	} //рокировка

	setEventsForKing(row, col, color) {
		if (col - 1 > 0 && (this.board[row][col - 1] == '' || this.searchEnemy(this.board[row][col - 1], color))) {
			$('[row = ' + row + '][col = ' + (col - 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (col + 1 < 9 && (this.board[row][col + 1] == '' || this.searchEnemy(this.board[row][col + 1], color))) {
			$('[row = ' + row + '][col = ' + (col + 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row - 1 > 0 && col - 1 > 0 && (this.board[row - 1][col - 1] == '' || this.searchEnemy(this.board[row - 1][col - 1], color))) {
			$('[row = ' + (row - 1) + '][col = ' + (col - 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row - 1 > 0 && col + 1 < 9 && (this.board[row - 1][col + 1] == '' || this.searchEnemy(this.board[row - 1][col + 1], color))) {
			$('[row = ' + (row - 1) + '][col = ' + (col + 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row - 1 > 0 && (this.board[row - 1][col] == '' || this.searchEnemy(this.board[row - 1][col], color))) {
			$('[row = ' + (row - 1) + '][col = ' + col + ']').on('click', this.move.bind(this, row, col));
		};
		if (row + 1 < 9 && col - 1 > 0 && (this.board[row + 1][col - 1] == '' || this.searchEnemy(this.board[row + 1][col - 1], color))) {
			$('[row = ' + (row + 1) + '][col = ' + (col - 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row + 1 < 9 && col + 1 < 9 && (this.board[row + 1][col + 1] == '' || this.searchEnemy(this.board[row + 1][col + 1], color))) {
			$('[row = ' + (row + 1) + '][col = ' + (col + 1) + ']').on('click', this.move.bind(this, row, col));
		};
		if (row + 1 < 9 && (this.board[row + 1][col] == '' || this.searchEnemy(this.board[row + 1][col], color))) {
			$('[row = ' + (row + 1) + '][col = ' + col + ']').on('click', this.move.bind(this, row, col));
		};

		this.castling(color);
		for (var i = 0; i < this.arrCastling.length; i++) {
			var castlingRow = this.arrCastling[i].row;
			var castlingCol = this.arrCastling[i].col;
			$('[row = ' + castlingRow + '][col = ' + castlingCol + ']').on('click', this.move.bind(this, row, col));
		};
	} //задаем событи для королей

	setEventsForFigure(field) {
		var row = parseInt(field.getAttribute('row'));
		var col = parseInt(field.getAttribute('col'));
		var figure = this.board[row][col];

		$('td').off();
		this.setEventsForPlayer();

		if (figure == this.figures.white.king || figure == this.figures.white.queen || figure == this.figures.white.castle || figure == this.figures.white.elephant || figure == this.figures.white.horse || figure == this.figures.white.soldier) {
			var color = 'white';
		} else {
			var color = 'black;'
		};

		switch (figure) {
			case this.figures.white.king:
			case this.figures.black.king:
				this.setEventsForKing(row, col, color);
				break;
			case this.figures.white.queen:
			case this.figures.black.queen:
				this.setEventsForQueen(row, col, color);
				break;
			case this.figures.white.castle:
			case this.figures.black.castle:
				this.setEventsForCastle(row, col, color);
				break;
			case this.figures.white.elephant:
			case this.figures.black.elephant:
				this.setEventsForElephant(row, col, color);
				break;
			case this.figures.white.horse:
			case this.figures.black.horse:
				this.setEventsForHorse(row, col, color);
				break;
			case this.figures.white.soldier:
			case this.figures.black.soldier:
				this.setEventsForSoldier(row, col, color);
				break;
		};
	} //задаем событи для выбранной фигуры

	choiceFigure(event) {
		$('.choiceFigure').removeClass('choiceFigure');
		var field = event.target;
		field.classList.add('choiceFigure');
		this.setEventsForFigure(field);
	} //выбор фигуры

	setEventsForPlayer() {
		if (this.player == 'white') {
			var figures = this.figures.white;
		} else {
			var figures = this.figures.black;
		};

		for (var i = 0; i < this.board.length; i++) {
			for (var j = 0; j < this.board[i].length; j++) {
				for (var figure in figures) {
					if (figures[figure] == this.board[i][j]) {
						$('[row = ' + i + '][col = ' + j + ']').on('click', this.choiceFigure.bind(this));
					};
				};
			};
		};
	} //задаем событи для всех фигур в зависимости от цвета фигур, совершающих ход

	newGame() {
		this.board = [ // не понятно почему, но board сохраняет все значения this.board???
	['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
	['8', figures.black.castle, figures.black.horse, figures.black.elephant, figures.black.queen, figures.black.king, figures.black.elephant, figures.black.horse, figures.black.castle, '8'],
	['7', figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, figures.black.soldier, '7'],
	['6', '', '', '', '', '', '', '', '', '6'],
	['5', '', '', '', '', '', '', '', '', '5'],
	['4', '', '', '', '', '', '', '', '', '4'],
	['3', '', '', '', '', '', '', '', '', '3'],
	['2', figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, figures.white.soldier, '2'],
	['1', figures.white.castle, figures.white.horse, figures.white.elephant, figures.white.queen, figures.white.king, figures.white.elephant, figures.white.horse, figures.white.castle, '1'],
	['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '']
];
		this.player = player;

		this.arrTakingPassage = [];

		this.arrCastling = [];
		this.a1MadeAMove = 0;
		this.h1MadeAMove = 0;
		this.a8MadeAMove = 0;
		this.h8MadeAMove = 0;
		this.e1MadeAMove = 0;
		this.e8MadeAMove = 0;

		this.arrAttackFigures = [];
		this.arrAttackLine = [];

		this.run();
	} //начать новую игру

	gameOver() {
		var answer = prompt('Игра окончена. Желаете сыграть новую партию? Ответ Да: 1');
		if (answer == 1) {
			this.newGame();
		} else {
			//
		};
	} //конец игры
};

$(document).ready(function () {
	var game = new Game();
});
