(function(){
	var autoSlide=function(){
		
	};
	autoSlide.prototype.init=function(param){
		var sildes=param.slideLi;
		var slideWrap=param.slideWrap;
		var element=param.slideWrap.children[0];
		var slideFocus=param.slideFocus;
		var index=0;
		var direction;
		var currentWidth;
		var speed=300;
		var t=1;
		function init(){
			var pos=sildes.length;
			currentWidth=document.documentElement.clientWidth;
			element.style.width=currentWidth*pos+"px";
			var inner="";
			for(var i=0;i<pos;i++){
				inner+="<span></span>";
			}
			slideFocus.innerHTML=inner;
			slideFocus.style.width=currentWidth+"px";
			slidePos=new Array(pos);
			while(--pos){
				sildes[pos].style.left=0+"px";
				sildes[pos].style.width=currentWidth+"px";
				//move(pos,index>pos?-currentWidth:(index<pos?currentWidth:0),0);
			}
			move(sildes.length-1,-currentWidth,0);
			move(1,currentWidth,0);
			move(0,0,0);
		}
		function move(index,dist,speed){
			translate(index,dist,speed);
			slidePos[index]=dist;
		}
		function translate(index,dist,speed){
			sildes[index].style.webkitTransitionDuration=speed+"ms";
			sildes[index].style.webkitTransform='translate('+dist+'px,0)';
		}
				
		init();
		
		slideFocus.children[index].className="on";
		function circle(index){
			return (index+sildes.length)%sildes.length;
		}

		var events={
			handleEvent:function(event){
				switch(event.type){
					case "touchstart":this.start(event);break;
					case "touchmove":this.move(event);break;
					case "touchend":this.end(event);break;
				}
			},
			start:function(event){
				event.preventDefault();
				var touch=event.touches[0];
				start={
					x:touch.pageX,
					y:touch.pageY,
					time:+new Date,
				};
				delta={};

				element.addEventListener("touchmove",this,false);
				element.addEventListener("touchend",this,false);
			},
			move:function(event){
				var touches=event.touches[0];
				delta={
					x:touches.pageX-start.x,
					y:touches.pageY-start.y
				}
				direction=delta.x>0;
				if(direction){
					//right
					translate(circle(index),slidePos[circle(index)]+delta.x,speed);
					translate(circle(index-1),slidePos[circle(index-1)]+delta.x,speed);
					translate(circle(index-2),slidePos[circle(index-2)]+delta.x,speed);
				}else{
					translate(circle(index),slidePos[circle(index)]+delta.x,speed);
					translate(circle(index+1),slidePos[circle(index+1)]+delta.x,speed);
					translate(circle(index+2),slidePos[circle(index+2)]+delta.x,speed);
				}
			},
			end:function(event){
				var times=+new Date-start.time;
				if(Math.abs(delta.x)>(currentWidth/2)){
					if(direction){
						//right
						move(circle(index),currentWidth,speed);
						move(circle(index-1),0,speed);
						move(circle(index-2),-currentWidth,0);
						slideFocus.children[index].className="";
						index=circle(index-1);
						slideFocus.children[index].className="on";
					}else{
						//left
						move(circle(index),-currentWidth,speed);
						move(circle(index+1),0,speed);
						move(circle(index+2),currentWidth,0);
						slideFocus.children[index].className="";
						index=circle(index+1);
						slideFocus.children[index].className="on";
					}
				}
				var tims=setInterval(function(){
				
						element.addEventListener("touchstart",function(event){
							clearInterval(tims);
							events.handleEvent(event);
						},false);
						move(circle(index),-currentWidth,speed);
						move(circle(index+1),0,speed);
						move(circle(index+2),currentWidth,0);
						slideFocus.children[index].className="";
						index=circle(index+1);
						slideFocus.children[index].className="on";
				},3000);
			}
								
		
		}
		element.addEventListener("touchstart",events,false);
		var tims=setInterval(function(){
					element.addEventListener("touchstart",function(event){
						clearInterval(tims);
						events.handleEvent(event);
					},false);
					move(circle(index),-currentWidth,speed);
					move(circle(index+1),0,speed);
					move(circle(index+2),currentWidth,0);
					slideFocus.children[index].className="";
					index=circle(index+1);
					slideFocus.children[index].className="on";
		},3000);
		
	}	
window.autoSlide=new autoSlide;
	
})();

