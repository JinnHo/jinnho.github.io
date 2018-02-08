//当浏览器窗口大小改变时，设置显示内容的高度  
  window.onresize=function(){  
    minHeight();  
  }  
	function minHeight(){
		var ch=document.body.clientHeight;
		var cw=document.body.clientWidth;
		console.log("ch:"+ch+" cw:"+cw);
		var box1=document.getElementById("demo1");
		var box2=document.getElementById("demo2");
		var box3=document.getElementById("demo3");
		var box4=document.getElementById("demo4");
		var my=document.getElementById("jinnho");
		if(ch<500&&cw>1018){
			box1.style.top="125px";
			box2.style.top="125px";
			box3.style.top="375px";
			box4.style.top="375px";
			box1.style.left="25%";
			box2.style.left="75%";
			box3.style.left="25%";
			box4.style.left="75%";
			my.style.top="250px";
		}else if(ch>=500&&cw>1035){
			box1.style.top="25%";
			box2.style.top="25%";
			box3.style.top="75%";
			box4.style.top="75%";
			box1.style.left="25%";
			box2.style.left="75%";
			box3.style.left="25%";
			box4.style.left="75%";
			my.style.top="50%";
		}else if(cw<1035){
			my.style.top="60px";
			box1.style.top="125px";
			box2.style.top="125px";
			box3.style.top="125px";
			box4.style.top="125px";
			box1.style.left="400px";
			box2.style.left="400px";
			box3.style.left="400px";
			box4.style.left="400px";
		}
		if(cw<633){
			my.style.top="60px";
			box1.style.top="125px";
			box2.style.top="125px";
			box3.style.top="125px";
			box4.style.top="125px";
			box1.style.left="50%";
			box2.style.left="50%";
			box3.style.left="50%";
			box4.style.left="50%";
		}
	}