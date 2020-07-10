class Player
{
	bodies = [];
	direction = "NULL";

	constructor(startRow, startCol)
	{
		this.addBody(startRow, startCol);
	}

	get head()
	{
		return this.bodies[0];
	}

	get tail()
	{
		return this.bodies[this.bodies.length - 1];
	}

	addBody(row, col)
	{
        let shade = 255 - this.bodies.length * 16;
        if(shade < 111) shade = 111;

        let colour = "rgb(" + shade + ", " + shade + ", " + shade + ")";

		this.bodies.push(new PlayerBody(row, col, colour));
	}

	draw(unit)
	{
		this.bodies.forEach(body => {
			body.draw(unit);
		});
	}

	updateDirection()
	{
		if(keyPressed[37]) this.direction = "LEFT";
		if(keyPressed[38]) this.direction = "UP";
		if(keyPressed[39]) this.direction = "RIGHT";
		if(keyPressed[40]) this.direction = "DOWN";
	}

	updatePosition(maxRow, maxCol, food)
	{
		//Update tail
		for(let i = this.bodies.length - 1; i > 0; i--)
		{
			let body = this.bodies[i];

			body.row = this.bodies[i - 1].row;
			body.col = this.bodies[i - 1].col;
		}

		//Update head
		if(this.direction === "LEFT") this.head.col--;
		if(this.direction === "UP") this.head.row--;
		if(this.direction === "RIGHT") this.head.col++;
		if(this.direction === "DOWN") this.head.row++;

		//Constrain positions
		this.bodies.forEach(body => {
			body.row %= maxRow;
			body.col %= maxCol;

			if(body.row === 0) body.row = maxRow;
			if(body.col === 0) body.col = maxCol;
		});
	}
}