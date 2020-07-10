class Game
{
	noRows;
	noCols;

	fps = 12;

	player;
	food;

	constructor(_noRows, _noCols)
	{
		this.noRows = _noRows;
		this.noCols = _noCols;

		this.startGame();
	}

	get cellSize()
	{
		return Math.min(canvas.width / this.noRows, canvas.height / this.noCols);
	}

	spawnFood()
	{
		let row, col;

		do
		{
			row = Math.floor(Math.random() * (this.noRows - 1)) + 1;
			col = Math.floor(Math.random() * (this.noCols - 1)) + 1;
		} while(row === this.player.head.row && col === this.player.head.col);

		return new Food(row, col);
	}

	checkPlayerEatFood()
	{
		if(this.player.head.row === this.food.row && this.player.head.col === this.food.col)
		{
			/*
			
			For fun :-)
			
			for(let i = 0; i < 50; i++)
			{
				this.player.addBody(this.player.tail.row, this.player.tail.col);
				this.food = this.spawnFood();
			}
			*/

			this.player.addBody(this.player.tail.row, this.player.tail.col);
			this.food = this.spawnFood();
		}
	}

	startGame()
	{
		this.player = new Player(Math.floor(this.noRows/2), Math.floor(this.noCols/2));
		this.food = this.spawnFood();
	}

	tickFast()
	{
		this.player.updateDirection();
	}

	tick()
	{
		//Update entities
		this.player.updatePosition(this.noRows, this.noCols);
		this.checkPlayerEatFood();

		//Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//Draw background
		ctx.fillStyle = "#252525";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		//Draw entities
		this.food.draw(this.cellSize);
		this.player.draw(this.cellSize);
	}

	run()
	{
		this.tick();

		setInterval(() => { this.tickFast() }, 1000 / 60);
		setInterval(() => { this.tick() }, 1000 / this.fps);
	}
}