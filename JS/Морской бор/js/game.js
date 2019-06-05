function removeEvent(event) {
	game.choiceShipPlace(event);
};

var game = {
	playerName1: '',
	playerName2: '',
	playerName: '', //имя текущего игрока
	
	index: 0, // дает понять что сейчас происходит: расстановка кораблей или ход
	arrTd: [], //массив для добавление полей игрового поля
	addNumber: 0, //счетчик добавленных палуб
	addArr: [], //массив для записывания полей с кораблями при расстановке кораблей
	arrLine: [], //массив для добавления значений, при автоматической расстановке кораблей

	battleShip: [
		{
			deck: 4,
			sum: 1
		},
		{
			deck: 3,
			sum: 2
		},
		{
			deck: 2,
			sum: 3
		},
		{
			deck: 1,
			sum: 4
		}
	],

	player1: [
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false]
	],
	player2: [
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false]
	],

	player: [ //поле для текущего игрока
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false, false, false]
	],

	randomField: function () {
		var row = Math.floor(Math.random() * 10);
		var col = Math.floor(Math.random() * 10);

		if (this.player[row][col] === false) {
			return {
				row: row,
				col: col
			};
		} else {
			return false;;
		};

	},

	whatKindShip: function () {
		var ship;
		for (var i = 0; i < this.battleShip.length; i++) {
			if (this.battleShip[i].sum > 0) {
				ship = i;
				break;
			};
		};

		switch (ship) {
			case 0:
				ship = 4;
				break;
			case 1:
				ship = 3;
				break;
			case 2:
				ship = 2;
				break;
			case 3:
				ship = 1;
				break;
		};
		return ship;

	},

	randomLine: function (row, col) {
		var lineNumber = Math.floor(Math.random() * 4) + 1;

		for (var i = 0; i < this.arrLine.length; i++) {
			if (this.arrLine[i] === lineNumber) {
				return false;
			};
		};

		var row = parseInt(row);
		var col = parseInt(col);
		var ship = this.whatKindShip();

		switch (lineNumber) {
			case 1:
				for (var i = 0; i < ship; i++) {
					if (row - i < 0) {
						this.arrLine.push(lineNumber);
						return false;
					} else {
						if (this.player[row - i][col] !== false) {
							this.arrLine.push(lineNumber);
							return false;
						};
					};
					if (i == ship - 1) {
						for (var j = 0; j < ship; j++) {
							this.player[row - j][col] = 1;
							this.paintField(row - j, col, 1);
							this.addNumber = this.addNumber + 1;
							this.addArr.push({
								row: row - j,
								col: col,
								addNumber: this.addNumber
							});
							this.ships();
						};
						return true;
					};
				};
				break;
			case 2:
				for (var i = 0; i < ship; i++) {

					if (col + i > 9) {
						this.arrLine.push(lineNumber);
						return false;
					} else {
						if (this.player[row][col + i] !== false) {
							this.arrLine.push(lineNumber);
							return false;
						};
					};
					if (i == ship - 1) {
						for (var j = 0; j < ship; j++) {
							this.player[row][col + j] = 1;
							this.paintField(row, col + j, 1);
							this.addNumber = this.addNumber + 1;
							this.addArr.push({
								row: row,
								col: col + j,
								addNumber: this.addNumber
							});
							this.ships();
						};
						return true;
					};
				};
				break;
			case 3:
				for (var i = 0; i < ship; i++) {

					if (row + i > 9) {
						this.arrLine.push(lineNumber);
						return false;
					} else {
						if (this.player[row + i][col] !== false) {
							this.arrLine.push(lineNumber);
							return false;
						};
					};
					if (i == ship - 1) {
						for (var j = 0; j < ship; j++) {
							this.player[row + j][col] = 1;
							this.paintField(row + j, col, 1);
							this.addNumber = this.addNumber + 1;
							this.addArr.push({
								row: row + j,
								col: col,
								addNumber: this.addNumber
							});
							this.ships();
						};
						return true;
					};
				};
				break;
			case 4:
				for (var i = 0; i < ship; i++) {

					if (col - i < 0) {
						this.arrLine.push(lineNumber);
						return false;
					} else {
						if (this.player[row][col - i] !== false) {
							this.arrLine.push(lineNumber);
							return false;
						};
					};
					if (i == ship - 1) {
						for (var j = 0; j < ship; j++) {
							this.player[row][col - j] = 1;
							this.paintField(row, col - j, 1);
							this.addNumber = this.addNumber + 1;
							this.addArr.push({
								row: row,
								col: col - j,
								addNumber: this.addNumber
							});
							this.ships();
						};
						return true;
					};
				};
				break;
		};
	},

	autoChoice: function () {
		
		this.clearAll();

		while (this.battleShip[3].sum > 0) {

			var obj = false;
			var randomLine = false;

			while (obj === false) {
				obj = this.randomField();
			};
			var row = obj.row;
			var col = obj.col;

			while (randomLine === false) {
				if (this.arrLine.length == 4) {

					var obj = false; //повтор кода исправить
					while (obj === false) {
						obj = this.randomField();
					};
					var row = obj.row;
					var col = obj.col;

					this.arrLine = [];

				};

				randomLine = this.randomLine(row, col);
			};
			this.arrLine = [];
			this.addNumber = 0;

		};
	},

	clearAll: function () {
		for (var i = 0; i < this.player.length; i++) {
			for (var j = 0; j < this.player[i].length; j++) {
				this.player[i][j] = false;
			};
		};

		this.addNumber = 0;
		this.addArr = [];

		this.battleShip = [
			{
				deck: 4,
				sum: 1
		},
			{
				deck: 3,
				sum: 2
		},
			{
				deck: 2,
				sum: 3
		},
			{
				deck: 1,
				sum: 4
		}
	];

		this.clearFields();

		this.changeAlert();

	},

	last: function () {

		if (this.addArr.length > 0) {

			var lastElement = this.addArr[this.addArr.length - 1];
			var row = lastElement.row;
			var col = lastElement.col;
			var addNumber = lastElement.addNumber;
			this.addNumber = addNumber - 1;

			this.player[row][col] = false;

			for (var i = 0, ship; i < this.battleShip.length; i++) {
				switch (i) {
					case 0:
						ship = 4;
						break;
					case 1:
						ship = 3;
						break;
					case 2:
						ship = 2;
						break;
					default:
						ship = 1;
						break;
				};

				if (this.battleShip[i].deck > 0 && this.battleShip[i].deck < ship) {
					this.battleShip[i].deck = this.battleShip[i].deck + 1;
					console.log(this.battleShip);
					break;

				} else {
					if (this.battleShip[i].deck == ship && this.battleShip[i].sum == i + 1) {
						var j = i - 1;
						this.battleShip[j].deck = this.battleShip[j].deck + 1;
						this.battleShip[j].sum = this.battleShip[j].sum + 1;
						console.log(this.battleShip);
						break;
					} else {
						if (this.battleShip[i].deck == ship) {
							this.battleShip[i].deck = 1;
							this.battleShip[i].sum = this.battleShip[i].sum + 1;
							console.log(this.battleShip);
							break;
						} else {
							if (this.battleShip[3].sum == 0) {
								this.battleShip[3].deck = 1;
							};
						};
					};
				};
			};

			var index = false;
			this.paintField(row, col, index);

			row = parseInt(row);
			col = parseInt(col);

			addNumber = lastElement.addNumber;

			for (var i = 1; i <= addNumber; i++) {
				var elt = this.addArr[this.addArr.length - i];
				var row = parseInt(elt.row);
				var col = parseInt(elt.col);

				var a = row - 1;
				var b = row + 1;
				var c = col - 1;
				var d = col + 1;

				if (a >= 0 && this.player[a][col] === 0) {
					this.player[a][col] = false;
					this.paintField(a, col, 2);
				};

				if (b <= 9 && this.player[b][col] === 0) {
					this.player[b][col] = false;
					this.paintField(b, col, 2);
				};

				if (c >= 0 && this.player[row][c] === 0) {
					this.player[row][c] = false;
					this.paintField(row, c, 2);
				};

				if (d <= 9 && this.player[row][d] === 0) {
					this.player[row][d] = false;
					this.paintField(row, d, 2);
				};

				if (a >= 0 && d <= 9 && this.player[a][d] === 0) {
					this.player[a][d] = false;
					this.paintField(a, d, 2);
				};

				if (a >= 0 && c >= 0 && this.player[a][c] === 0) {
					this.player[a][c] = false;
					this.paintField(a, c, 2);
				};

				if (b <= 9 && d <= 9 && this.player[b][d] === 0) {
					this.player[b][d] = false;
					this.paintField(b, d, 2);
				};

				if (b <= 9 && c >= 0 && this.player[b][c] === 0) {
					this.player[b][c] = false;
					this.paintField(b, c, 2);
				};
			};

			this.notNearShip(addNumber);
			this.addArr.pop();
			this.changeAlert();

		} else {
			alert('Нет ходов для удаления');
		};

	},

	endChoice: function () {
		if (this.battleShip[this.battleShip.length - 1].sum > 0) {
			alert('Не все корабли раставлены');
		} else {
			if (this.playerName === this.playerName1) { //повторяющийся код
				this.player1 = this.player;

				this.player = [
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false]
			];

				this.battleShip = [
					{
						deck: 4,
						sum: 1
				},
					{
						deck: 3,
						sum: 2
				},
					{
						deck: 2,
						sum: 3
				},
					{
						deck: 1,
						sum: 4
				}
			];

				this.addArr = [];

			} else {
				this.player2 = this.player;
				this.index = 1;

				for (var j = 0; j < this.arrTd.length; j++) {
					this.arrTd[j].removeEventListener('click', removeEvent);
					this.arrTd[j].addEventListener('click', this.move.bind(this));
				};

			};

			this.changePlayer();
		};
	},

	setPointExtension: function (row, col) {

		var a = row - 1;
		var b = row + 1;
		var c = col - 1;
		var d = col + 1;

		if (a >= 0 && this.player[a][col] !== -1) {
			this.player[a][col] = -2;
			this.paintField(a, col, 0);
		};

		if (b <= 9 && this.player[b][col] !== -1) {
			this.player[b][col] = -2;
			this.paintField(b, col, 0);
		};

		if (c >= 0 && this.player[row][c] !== -1) {
			this.player[row][c] = -2;
			this.paintField(row, c, 0);
		};

		if (d <= 9 && this.player[row][d] !== -1) {
			this.player[row][d] = -2;
			this.paintField(row, d, 0);
		};

		if (a >= 0 && d <= 9 && this.player[a][d] !== -1) {
			this.player[a][d] = -2;
			this.paintField(a, d, 0);
		};

		if (a >= 0 && c >= 0 && this.player[a][c] !== -1) {
			this.player[a][c] = -2;
			this.paintField(a, c, 0);
		};

		if (b <= 9 && d <= 9 && this.player[b][d] !== -1) {
			this.player[b][d] = -2;
			this.paintField(b, d, 0);
		};

		if (b <= 9 && c >= 0 && this.player[b][c] !== -1) {
			this.player[b][c] = -2;
			this.paintField(b, c, 0);
		};


	},

	setPoint: function (row, col) {
		var row = parseInt(row);
		var col = parseInt(col);

		for (var i = 0; i < 4; i++) {
			if (row - i >= 0 && this.player[row - i][col] === -1) {
				this.setPointExtension(row - i, col);
			} else {
				break;
			};
		};

		for (var i = 0; i < 4; i++) {
			if (row + i <= 9 && this.player[row + i][col] === -1) {
				this.setPointExtension(row + i, col);
			} else {
				break;
			};
		};

		for (var i = 0; i < 4; i++) {
			if (col - i >= 0 && this.player[row][col - i] === -1) {
				this.setPointExtension(row, col - i);
			} else {
				break;
			};
		};

		for (var i = 0; i < 4; i++) {
			if (col + i <= 9 && this.player[row][col + i] === -1) {
				this.setPointExtension(row, col + i);
			} else {
				break;
			};
		};

	},

	gameOver: function () {
		alert('Игра закончена. Победил игрок: ' + this.playerName);
		//		var newGame = prompt('Хотите сыграть новую игру? (Да/Нет)');
		//		if (newGame == 'Да') {
		//			
		//		} else {
		//			
		//		};
	},

	victory: function () {
		for (var i = 0; i < this.player.length; i++) {
			for (var j = 0; j < this.player[i].length; j++) {
				if (this.player[i][j] === 1) {
					return false;
				};
			};
		};
		return true;
	},

	move: function (e) {

		var field = e.target;
		var row = parseInt(field.getAttribute('row'));
		var col = parseInt(field.getAttribute('col'));
		

		switch (this.player[row][col]) {
			case 1:
				this.paintField(row, col, -1);
				if (this.secondField(row, col)) {
					alert('Ранил');
					this.player[row][col] = -1;
				} else {
					alert('Убил');
					this.player[row][col] = -1;
					this.setPoint(row, col);
				};
				if (this.victory()) {
					this.gameOver();
				};
				break;
			case 0:
			case false:
				alert('Промах');
				this.paintField(row, col, 0);
				this.player[row][col] = -2;
				if (this.playerName === this.playerName1) {
					this.player2 = this.player;
				} else {
					this.player1 = this.player;
				};
				this.changePlayer();
				break;
			default:
				alert('Сюда стрелять нельзя');
				break;
		};
	},

	changeAlert: function () {
		var p = document.getElementsByTagName('p');
		for (var i = 0; i < this.battleShip.length; i++) {
			if (this.battleShip[i].deck > 0) {
				var x = this.battleShip.length - i;
				p[0].innerHTML = 'Разместите (' + x + ') -палубный корабль';
				break;
			};
			if (this.battleShip[this.battleShip.length - 1].sum == 0) {
				p[0].innerHTML = 'Больше нет кораблей для размещения';
			};
		};
	},

	paintField: function (row, col, index) {
		for (i = 0, arrRow = []; i < this.arrTd.length; i++) {
			var tdRow = this.arrTd[i].getAttribute('row');
			if (tdRow == row) {
				var tdCol = this.arrTd[i].getAttribute('col');
				if (tdCol == col) {
					switch (index) {
						case 1:
							this.arrTd[i].classList.add('ship');
							break;
						case false:
							this.arrTd[i].classList.remove('ship');
							break;
						case 0:
							this.arrTd[i].innerHTML = '.';
							break;
						case 2:
							this.arrTd[i].innerHTML = '';
							break;
						case -1:
							this.arrTd[i].classList.add('damage');
							break;
						default:
							break;
					};
				};
			};
		};
	},

	notNearShip: function (addNumber) {

		for (var i = 0; i < this.addArr.length - addNumber; i++) {

			var row = parseInt(this.addArr[i].row);
			var col = parseInt(this.addArr[i].col);

			var a = row - 1;
			var b = row + 1;
			var c = col - 1;
			var d = col + 1;

			if (a >= 0 && this.player[a][col] === false) {
				this.player[a][col] = 0;
				this.paintField(a, col, 0);
			};

			if (b <= 9 && this.player[b][col] === false) {
				this.player[b][col] = 0;
				this.paintField(b, col, 0);
			};

			if (c >= 0 && this.player[row][c] === false) {
				this.player[row][c] = 0;
				this.paintField(row, c, 0);
			};

			if (d <= 9 && this.player[row][d] === false) {
				this.player[row][d] = 0;
				this.paintField(row, d, 0);
			};

			if (a >= 0 && d <= 9 && this.player[a][d] === false) {
				this.player[a][d] = 0;
				this.paintField(a, d, 0);
			};

			if (a >= 0 && c >= 0 && this.player[a][c] === false) {
				this.player[a][c] = 0;
				this.paintField(a, c, 0);
			};

			if (b <= 9 && d <= 9 && this.player[b][d] === false) {
				this.player[b][d] = 0;
				this.paintField(b, d, 0);
			};

			if (b <= 9 && c >= 0 && this.player[b][c] === false) {
				this.player[b][c] = 0;
				this.paintField(b, c, 0);
			};

		};
	},

	ships: function () {
		for (var i = 0; i < this.battleShip.length; i++) {
			if (this.battleShip[i].deck > 1) {
				this.battleShip[i].deck = this.battleShip[i].deck - 1;
				break;
			};
			if (this.battleShip[i].deck == 1) {
				this.battleShip[i].deck = this.battleShip[i].deck - 1;
				this.battleShip[i].sum = this.battleShip[i].sum - 1;
				if (this.battleShip[i].sum > 0) {
					this.battleShip[i].deck = this.addNumber;
					this.addNumber = 0;
					this.notNearShip(0);
					break;
				};
				this.addNumber = 0;
				this.notNearShip(0);
				this.changeAlert();
				break;
			};
		};
	},

	nextField: function (row, col) {
		var a = row - 1;
		var b = row + 1;
		var c = col - 1;
		var d = col + 1;
		var aa = a - 1;
		var bb = b + 1;
		var cc = c - 1;
		var dd = d + 1;

		if (a >= 0 && a <= 9 && this.player[a][col] > 0 && aa >= 0 && aa <= 9 && this.player[aa][col] > 0) {
			return true;
		};

		if (b >= 0 && b <= 9 && this.player[b][col] > 0 && bb >= 0 && bb <= 9 && this.player[bb][col] > 0) {
			return true;
		};

		if (c >= 0 && c <= 9 && this.player[row][c] > 0 && cc >= 0 && cc <= 9 && this.player[row][cc] > 0) {
			return true;
		};

		if (d >= 0 && d <= 9 && this.player[row][d] > 0 && dd >= 0 && dd <= 9 && this.player[row][dd] > 0) {
			return true;
		};

		return false;
	},

	secondField: function (row, col) {
		var a = row - 1;
		var b = row + 1;
		var c = col - 1;
		var d = col + 1;

		if (a >= 0 && a <= 9 && this.player[a][col] === 1) {
			return true;
		};

		if (b >= 0 && b <= 9 && this.player[b][col] === 1) {
			return true;
		};

		if (c >= 0 && c <= 9 && this.player[row][c] === 1) {
			return true;
		};

		if (d >= 0 && d <= 9 && this.player[row][d] === 1) {
			return true;
		};

		return false;
	},

	choiceShipPlace: function (e) {
		if (this.battleShip[this.battleShip.length - 1].sum == 0) {
			alert('Больше нет кораблей для размещения');
		} else {
			console.log(e);
			var field = e.target;
			var row = parseInt(field.getAttribute('row'));
			var col = parseInt(field.getAttribute('col'));

			if (this.player[row][col] === false) {
				switch (this.addNumber) {
					case 1:
						if (this.secondField(row, col)) {
							this.player[row][col] = 1;
							this.paintField(row, col, 1);
							this.addNumber = this.addNumber + 1;
							this.addArr.push({
								row: row,
								col: col,
								addNumber: this.addNumber
							});
							this.ships();
						} else {
							alert('Это не соседнее поле');
						};
						break;
					case 2:
					case 3:
						if (this.nextField(row, col)) {
							this.player[row][col] = 1;
							this.paintField(row, col, 1);
							this.addNumber = this.addNumber + 1;
							this.addArr.push({
								row: row,
								col: col,
								addNumber: this.addNumber
							});
							this.ships();
						} else {
							if (!this.secondField(row, col)) {
								alert('Это не соседнее поле');
							} else {
								alert('Можно ставить только в ряд');
							};
						};
						break;
					default:
						this.player[row][col] = 1;
						this.paintField(row, col, 1);
						this.addNumber = this.addNumber + 1;
						this.addArr.push({
							row: row,
							col: col,
							addNumber: this.addNumber
						});
						this.ships();
						break;
				};
			} else {
				if (this.player[row][col] == 0) {
					alert('Нельзя располагать корабли рядом друг с другом');
				} else {
					alert('Это поле занято');
				};
			};
		};
	},

	setEvents: function () {
		var button = document.getElementById('nextPlayer');
		button.addEventListener('click', this.choicePlayer.bind(this));

		//начало панели добавления
		var last = document.getElementById('last');
		last.addEventListener('click', this.last.bind(this));

		var clearAll = document.getElementById('clearAll');
		clearAll.addEventListener('click', this.clearAll.bind(this));

		var autoChoice = document.getElementById('autoChoice');
		autoChoice.addEventListener('click', this.autoChoice.bind(this));

		var endChoice = document.getElementById('endChoice');
		endChoice.addEventListener('click', this.endChoice.bind(this));
		//конец панели управления

		this.getFields();
		for (var j = 0; j < this.arrTd.length; j++) {
			this.arrTd[j].addEventListener('click', removeEvent);
		};
	},

	clearFields: function () {
		for (i = 0; i < this.arrTd.length; i++) {
			var atrClass = this.arrTd[i].getAttribute('class');
			if (atrClass !== null) {
				switch (atrClass) {
					case 'ship':
						this.arrTd[i].classList.remove('ship');
						break;
					case 'damage':
						this.arrTd[i].classList.remove('damage');
						break;
				};
			};
			this.arrTd[i].innerHTML = '';
		};
	},

	getFields: function () {
		var td = document.getElementsByTagName('td');
		for (var i = 0; i < td.length; i++) {
			if (td[i].innerHTML == '' || td[i].innerHTML == '.') {
				this.arrTd.push(td[i]);
			};
		};
		this.arrTd.shift();
	},

	choicePlayer: function () {
		var button = document.getElementById('nextPlayer');
		button.classList.add('opacity');

		var table = document.getElementsByTagName('table');
		table[0].classList.remove('opacity');

		this.clearFields();

		if (this.index == 0) {
			var form = document.getElementById('controlPanel');
			form.classList.remove('opacity');

			var p = document.getElementsByTagName('p');
			p[0].classList.remove('opacity');

			this.changeAlert();
		} else {

			if (this.playerName === this.playerName1) { //одинаковый код
				this.player = this.player2;
			} else {
				this.player = this.player1;
			};

			for (var i = 0; i < this.player.length; i++) {
				for (var j = 0; j < this.player[i].length; j++) {
					if (this.player[i][j] === -1) {
						this.paintField(i, j, -1);
					};
					if (this.player[i][j] === -2) {
						this.paintField(i, j, 0);
					};
				};
			};
		};
	},

	changePlayer: function () { //промежутойчный этап для смены игрока

		if (this.playerName === this.playerName1) {
			this.playerName = this.playerName2;
		} else {
			this.playerName = this.playerName1;
		};

		var button = document.getElementById('nextPlayer');
		button.innerHTML = 'Ходит игрок: ' + this.playerName;
		button.classList.remove('opacity');

		var controlPanel = document.getElementById('controlPanel');
		controlPanel.classList.add('opacity');

		var p = document.getElementsByTagName('p');
		p[0].classList.add('opacity');

		var table = document.getElementsByTagName('table');
		table[0].classList.add('opacity');
	},

	checkPlayerName: function () {
		this.playerName1 = prompt('Введите имя Игрока №1:');
		this.playerName2 = prompt('Введите имя Игрока №2:');
		if (this.playerName1 == '') {
			this.playerName1 = 'Игрок 1';
		};
		if (this.playerName2 == '') {
			this.playerName2 = 'Игрок 2';
		};
	},

	run: function () {
		console.log('game run');
		this.checkPlayerName();
		this.setEvents();
		this.changePlayer();
	}
};

window.onload = function () {
	game.run();
};
