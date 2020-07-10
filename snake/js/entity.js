class Entity
{
	row;
	col;
	colour;

	constructor(_row, _col, _colour)
	{
		this.row = _row;
		this.col = _col;
		this.colour = _colour;
	}

	draw(unit)
	{
		let x = (this.col - 1) * unit,
			y = (this.row - 1) * unit;

		ctx.fillStyle = this.colour;
		ctx.fillRect(x, y, unit, unit);
	}
}