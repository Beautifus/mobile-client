function view(){}
	/*-----重新渲染画面------------*/
view.prototype.render=function(r1,r2){
	ctx.clearRect(0,0,mycanvas.width,mycanvas.height);
	for(var i=0;i<circles.length;i++){
		v.drawCircle(ctx,r1,circles[i].x,circles[i].y);
	}
	for(var i=0;i<records.length;i++){
		v.drawPwdCircle(ctx,r2,circles[records[i]].x,circles[records[i]].y);
	}
	for(var j=0;j<lines.length;j++){
		v.drawLine(ctx,lines[j].x1,lines[j].y1,lines[j].x2,lines[j].y2);
	}
}
/*-----画圆---------*/
view.prototype.drawCircle=function(ctx,r,x,y){
	ctx.lineWidth=4;
	ctx.strokeStyle="#fff";
	ctx.beginPath();
	ctx.moveTo(x+r,y);
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.stroke();
	ctx.closePath();
}
/*---画选中后的圆----*/
view.prototype.drawPwdCircle=function(ctx,r,x,y){
	ctx.shadowBlur=10;
	ctx.shadowColor="#00ccff";
	ctx.lineWidth=4;
	ctx.fillStyle="#fff";
	ctx.beginPath();
	ctx.moveTo(x+r,y);
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

view.prototype.drawLine=function(ctx,x1,y1,x2,y2){
	ctx.lineWidth=4;
	ctx.fillStyle="#fff";
	ctx.strokeStyle="#fff";
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}