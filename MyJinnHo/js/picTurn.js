var aPic=document.getElementsByName('lipic');
	var aPicD=document.getElementsByClassName('small_pic');
	var bPic=document.getElementsByClassName('big_pic');
	var arrow=document.getElementsByClassName('arrow');
	var box=document.getElementsByClassName('box');
	var w=-95;
	var zindex=3;
	var n=0;
	var timer=null;
	window.onload=function(){
		timer=setInterval(function (){
				n++;
				if(n>aPic.length-1){
					n=0;
				}
				changePic(n);
				moveDiv(n);
				changeOpa(n);		
		},2000);
			
		box[0].onmousemove=function (){
			clearInterval(timer);
		};
		box[0].onmouseout=function (){
			timer=setInterval(function (){
				n++;
				if(n>aPic.length-1){
					n=0;
				}
				changePic(n);
				moveDiv(n);
				changeOpa(n);	
				startMove(arrow[0],'opacity',10);
			},2000);
		};
	}

	function c_liPic(id){
		n=id;
		changePic(n);
		moveDiv(n);
		changeOpa(n);	
	}

	function c_next(){
		n++;
		if(n>aPic.length-1){
			n=0;
		}
		changePic(n);
		moveDiv(n);
		changeOpa(n);
	}
	
	function c_pre(){
		n--;
		if(n<0){
			n=aPic.length-1;
		}
		changePic(n);
		moveDiv(n);
		changeOpa(n);
	}
		
	function moumove(obj){
		var name=obj.getAttribute('name');
		startMove(arrow[name],'opacity',100);
	}
	
	function mouout(obj){
		var name=obj.getAttribute('name');
		startMove(arrow[name],'opacity',10);
	}

	function moveDiv (n){
		if(n>=2&&n!=aPic.length-1){
			startMove(aPicD[0],'marginLeft',w*(n-1));
		}
		else if(n<2){
			startMove(aPicD[0],'marginLeft',0);
		}else if(n==aPic.length-1){
			startMove(aPicD[0],'marginLeft',w*(n-2));
		}
	}
	
	function changeOpa(n){
		for(var i=0;i<aPic.length;i++){
			startMove(aPic[i],'opacity',60);
		}
		startMove(aPic[n],'opacity',100);
	}
		
	function changePic (n){
		bPic[n].style.zIndex=zindex;
		zindex++;
	}
	
	function getStyle(obj,name){
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}else{
			return getComputedStyle(obj,false)[name];
		}
	}

	function startMove(obj,attr,iTarget){
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var cur=0;			
			if(attr=='opacity'){
				cur=parseFloat(getStyle(obj,attr))*100;
			}else{
				cur=parseInt(getStyle(obj,attr));
			}		
			var speed=(iTarget-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);		
			if(cur==iTarget){
				clearInterval(obj.timer);
			}
			else{
				if(attr=='opacity')
				{
					obj.style.filter='alpha(opcaty:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}else{
					obj.style[attr]=cur+speed+'px';
				}
			}
		},30);
	}