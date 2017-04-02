(function(root,factory,plug,option){
	factory(root,plug,option); //创建changedata函数，用于设置storage
})(window,function(window,plug,option){
	var storage=window.localStorage;
	if(!window[option]){
		window[option]=[];
	}
	window[plug]=function(a){
		//0:将storage转换成mypassword
		//1:将mypassword转换为storage
		if(a==0&&storage.pwd){
			for(var i=0;i<storage.pwd.length;i++){
				window[option][i]=storage.pwd[i];
			}
		}else if(a==1){
			storage.setItem("pwd",window[option].join(""));
		}else if(a==0&&!storage.pwd){
			storage.setItem("pwd",window[option].join(""));
		}
	}
	
},"changedata","mypassword");
changedata(0);