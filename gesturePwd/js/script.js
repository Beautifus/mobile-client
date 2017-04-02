	/*------获得触摸位置的坐标-----*/
	function getPos(event){
		var touch=event.touches[0];
		x=touch.pageX;
		y=touch.pageY;
		x=x-wid;
		y=y-hei;
		return {x:x,y:y};
	}
	/*---------用于处理touch事件---------------*/
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
			pos=getPos(event);
			downck=checked(pos);
			pos.x=downck.x;
			pos.y=downck.y;
			records.push(downck.w);
			mycanvas.addEventListener("touchmove",this,false);//在touchstart后启动touchmove和touchend事件
			mycanvas.addEventListener("touchend",this,false);
		},
		move:function(event){
			if(downck.w>=0){
				movepos=getPos(event);
				overck=checked(movepos);
				v.render(35,35);
				v.drawLine(ctx,pos.x,pos.y,movepos.x,movepos.y);
				if(overck.w>=0&&records[records.length-1]!=overck.w){  //判断如果之前触摸的点与上一次加入records的点不一致，
					records.push(overck.w);  //则将此点存入records（保证在这个点之内移动时，只加入此节点一次）
					lines.push({x1:pos.x,y1:pos.y,x2:overck.x,y2:overck.y});
					pos.x=overck.x;        //然后更新线的起始点为本次触摸的节点
					pos.y=overck.y;
				}
			}	   
		},
		end:function(event){
				mycanvas.removeEventListener("touchmove",this,false); 
				mycanvas.removeEventListener("touchend",this,false);
				if(downck.w<0){  //如果touchstart时并将手指放在点上，则取消这次touch事件，
					records=[];
					lines=[];
					v.render(35,35);	//重新渲染
				}else if(downck.w>=0){
					var uppos={};
					uppos.x=event.changedTouches[0].pageX-wid; //获得touchend事件发生时的坐标
					uppos.y=event.changedTouches[0].pageY-hei;
					var ck=checked(uppos);  // 检查此坐标的位置，查看其是否在其中一个圆上
					//alert(ck.w);
					if(ck.w<0){
						ck.w=records[records.length-1]; //touch结束时，并不在圆上
					}else if(ck.w>=0){
						v.drawLine(ctx,pos.x,pos.y,ck.x,ck.y);    //touch结束时，在圆上，则连线
						lines.push({x1:pos.x,y1:pos.y,x2:ck.x,y2:ck.y});//将线加入lines中，以便下次渲染时有此线
					}
					if(records[records.length-1]!=ck.w){  //将此点加入records一次
						records.push(ck.w);
					}
					v.render(35,35);
					if(records.length<5){                  //密码长度小于5
						radios.querySelector("p").innerHTML="密码太短，至少需要5个点";
						radios.querySelector("p").style.color="#f00";
						lines=[];   
						records=[];
						v.render(35,35);  
					}else if(radios.querySelectorAll("input")[0].checked){ //密码长度大于5，检查设置按钮按下
						this.isSet();
					}else if(radios.querySelectorAll("input")[1].checked){//验证密码
						this.isValidate();
					}
				}
		},
		isSet:function(){      /*---当选中设置密码时的处理函数--*/
				var t=setTimeout(function(){                     //过一秒后重新渲染画面，以便下次重新输入
					clearTimeout(t);
					if(!mypassword.length){                      //判断是否是首次设置密码
						for(var i=0;i<records.length;i++){
							mypassword[i]=records[i];              //首次设置密码，将records记录到mypassword中
						}
						radios.querySelector("p").innerHTML="请再次输入手势密码";
						radios.querySelector("p").style.color="#fc0";	//更新提示
					}else{
						var pwdflag=validate(mypassword,records);  //验证此密码是否与上次输入一致
						if(pwdflag){
							changedata(1);                      //保存密码到localStorage中
							radios.querySelector("p").innerHTML="密码设置成功";
							radios.querySelector("p").style.color="#0f0";
							mypassword=[];
						}else{
							radios.querySelector("p").innerHTML="两次输入的不一致,重新绘制";
							radios.querySelector("p").style.color="#f00";
							mypassword=[];
						}	
					}
					lines=[];
					records=[];
					v.render(35,35);       //重新渲染
				},1000);
		},
		isValidate:function(){   /*----当选中验证密码的处理函数---*/
					var t=setTimeout(function(){
							clearTimeout(t);
							changedata(0);//读出localStorage中存储的的密码
							var flag=validate(mypassword,records);  
							if(flag){
								radios.querySelector("p").innerHTML="密码正确！";
								radios.querySelector("p").style.color="#0f0";
							}else{
								radios.querySelector("p").innerHTML="输入的密码不正确";
								radios.querySelector("p").style.color="#f00";
							}
							lines=[];
							records=[];
							v.render(35,35);
						},1000);
		}
	}
	/*-----验证存储的密码和本次输入的密码是否一致---*/
	function validate(mypassword,records){
		if(mypassword.length!=records.length){
			return false;
		}else{
			var flag=true;
			for(var i=0;i<mypassword.length;i++){
				if(mypassword[i]!=records[i]){
					flag=false;
					break;
				}
			}
		}
		return flag;
	}

	/*-------检查touch的位置是否在其中一个圆上--------------*/
	function checked(pos){
		var w=-1;
		for(var i=0;i<circles.length;i++){
			if(circles[i].x-35<=pos.x&&pos.x<=circles[i].x+35){
				if(circles[i].y-35<=pos.y&&pos.y<=circles[i].y+35){
					w=i;
					pos.x=circles[i].x;
					pos.y=circles[i].y;
					break;
				}
			}
		}
		return {w:w,x:pos.x,y:pos.y};
	}