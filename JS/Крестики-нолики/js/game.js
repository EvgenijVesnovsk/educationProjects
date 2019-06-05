var game = {
	move: 'X',
	moves: {
		x: 'X',
		o: 'O'
	},
	board: [
		   [false, false, false],
		   [false, false, false],
		   [false, false, false],
		   ],
	boardFull: function() {
	for (var i = 0; i < this.board.length; i++) {
		for (var n = 0; n < this.board[i].length; n++) {
			if (this.board[i][n] == false) {
				return true;
				};
			};
		};
		return false;
	},
	setEvents: function() {
		var td = document.getElementsByTagName('td');
		
		for (var i = 0; i < td.length; i++) {
			td[i].addEventListener('click', this.onClick.bind(this));
		};
	},
	whoMove: function() {
		var who = document.getElementById('move');
		who.innerHTML = "Сейчас ходит: " + this.move;
	},
	changeMove: function() {
		this.move = this.move === this.moves.x ? this.moves.o : this.moves.x;
		this.whoMove();
	},
	onClick: function(e) {	
		var row = e.target.getAttribute('data-row');
		var col =  e.target.getAttribute('data-col');
		
		if (!this.board[row][col]) {
		this.board[row][col] = this.move;
		e.target.innerHTML = this.move;	
		};
		
		if (!this.boardFull()) {
		var i = 0;
		this.over(i);
		} else {
		if (!this.checkVictory()) {
			this.changeMove();
			} else {
				var i = 1;
				this.over(i);
			};	
		};
	},
	checkVictory: function(){
		var rules = [
			[{y: 0, x: 0}, {y: 0, x: 1}, {y: 0, x: 2}],
			[{y: 1, x: 0}, {y: 1, x: 1}, {y: 1, x: 2}],
			[{y: 2, x: 0}, {y: 2, x: 1}, {y: 2, x: 2}],

			[{y: 0, x: 0}, {y: 1, x: 0}, {y: 2, x: 0}],
			[{y: 0, x: 1}, {y: 1, x: 1}, {y: 2, x: 1}],
			[{y: 0, x: 2}, {y: 1, x: 2}, {y: 2, x: 2}],

			[{y: 0, x: 0}, {y: 1, x: 1}, {y: 2, x: 2}],
			[{y: 2, x: 0}, {y: 1, x: 1}, {y: 0, x: 2}]
		];


		for ( var rule, i = 0; i < rules.length; i++ ) {
			rule = rules[i];

			if ( this.board[rule[0].y][rule[0].x] && 
				this.board[rule[0].y][rule[0].x] === this.board[rule[1].y][rule[1].x] &&
				this.board[rule[0].y][rule[0].x] === this.board[rule[2].y][rule[2].x]
				) {
				return true;
			}
		}

		return false;
	},
	clearBoard: function() {
		for (var i = 0; i < this.board.length; i++) {
			for (var n = 0; n < this.board[i].length; n++) {
				this.board[i][n] = false;
			};
		};
		var td = document.getElementsByTagName('td');
		for (var i = 0; i < td.length; i++) {
		td[i].innerHTML= '';	
		};
	},
	over: function(i) {
	if (i == 0) {
		alert('Ничья');
		} else {
		alert('Победил: ' + this.move);
		};
	this.clearBoard();
	},
	run: function() {
		this.whoMove();
		this.setEvents();
	}
//	run: function() {console.log(this.board);} 
};

window.addEventListener('load', function() {
	game.run();
});