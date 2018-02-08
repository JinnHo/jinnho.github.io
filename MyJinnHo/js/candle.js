//判断是否为ie浏览器或者使用ie兼容模式访问
	if(!-[1,]){
	    alert("对不起，不支持ie浏览器访问。\n若您不是用ie浏览器访问的,请将浏览模式切换成极速模式\n什么！你不知道什么是极速模式？\n打网址的地方的最后面有个e的图标，点一下吧~");
	    if (!!(window.attachEvent && !window.opera)){ 
	    	document.execCommand("stop"); }
	    else{ 
	    	window.stop(); 
	    }
	}
	//a_flag:是否有按钮已按下，score:得分，p:按下的是属于哪个值,g_timer:1秒倒计时的定时器，num:随机数，level:难度等级
	var a_flag=1,score=0,p,g_timer,num,level=1;
	//判断键盘按键按下的事件
	document.onkeydown=function(event){
		var l=document.getElementById('left');
		var r=document.getElementById('right');
		var fire_l=document.getElementById("f_left");
		var fire_r=document.getElementById("f_right");
	  	var event=event||window.event;
	    if(event.keyCode==37){//如果是左箭头键
	    	l.setAttribute("class","btn btn_active");
	    	p++;
	    	if(a_flag==1){
	    		setTimeout(tol_score,200);//延迟0.2s判断
	    		a_flag=0;//将flag设置成0，让其他按键的事件不可用，以免重复
	    	}	
	    	fire_l.style.display="none";
	    }
	    if(event.keyCode==39){//如果是右箭头键
	    	r.setAttribute("class","btn btn_active");
	    	p+=2;
	    	if(a_flag==1){
	    		setTimeout(tol_score,200);
	    		a_flag=0;
	    	}	
	    	fire_r.style.display="none";
	    }
	};	
	//键盘按键放开事件，用于按钮样式的改变
	document.onkeyup=function(event){
		var l=document.getElementById('left');
		var r=document.getElementById('right');
		var fire_l=document.getElementById("f_left");
		var fire_r=document.getElementById("f_right");
	    var event=event||window.event;
	    if(event.keyCode==37){
	    	l.setAttribute("class","btn");
	    }
	    if(event.keyCode==39){
	    	r.setAttribute("class","btn");
	    }
	};	
	function tol_score(){//计算成绩
		if(p==num){
			score++;
			init();
			clearInterval(g_timer);
			setTimeout(start,200);
		}else {
			clearInterval(g_timer);
			game_end();
		}
	}
	function init(){//初始化数据flag
		a_flag=1;
		var o_score=document.getElementById("score");
		var fire_l=document.getElementById("f_left");
		var fire_r=document.getElementById("f_right");
		fire_l.style.display="block";
		fire_r.style.display="block";
		o_score.innerHTML=score;
	}
	function game_end(){//游戏结束
		alert("game over\n最终得分是："+score);
	}
	function start(){//游戏开始
		var word=getRandomWord();//获取随机的文字
		var g_ch=document.getElementById("g_ch");
		var st=document.getElementById('time');
		st.style.display="none";
		g_ch.style.display="block";
		var t_arr=new Array();
		t_arr=getRandomXY();//获取文字提醒框随机偏移的xy值
		g_ch.style.left=t_arr[0];
		g_ch.style.top=t_arr[1];
		g_ch.innerHTML=word;//显示文字
		p=0;
		g_timer=setInterval(tol_score,1500);//判断是否在规定时间内做出回应
		if(score>10&&score<20){//得分在10-20之间为level 2
			level=2;
		}else if(score>=20){//得分在20以上为level 3
			level=3;
		}
	}
	var stt=4;//倒数时间+1
	var timer2;//倒数的定时器
	
	//倒数计时
	function time_start(){
		var st=document.getElementById('time');
		stt--;
		st.innerText=""+stt;
		if(stt=="0"){
			clearInterval(timer2);
			start();
		}
	}
	//点击开始运行方法
	function pre_start(){
		var t=document.getElementById('t');
		t.style.display="none";
		time_start();
		timer2=setInterval(time_start,1000);
	}
	//随机获取一个数
	function getRandom(i){
		var r_num;
		if(i==1){
			r_num=0;
			while(r_num>2||r_num==0){
				r_num=Math.floor(Math.random()*10);
			}
		}else if(i==2){
			r_num=4;
			while(r_num>3){
				r_num=Math.floor(Math.random()*10);
			}
		}
		return r_num;
	}
	//获取随机x，y值
	function getRandomXY(){
		if(level==1){
			var max_x=140;
			var max_y=110;
			var min_x=75;
			var x=74;
		}else if(level==2){
			var max_x=185;
			var max_y=160;
			var min_x=40;
			var x=39;
		}else if(level==3){
			var max_x=225;
			var max_y=245;
			var min_x=1;
			var x=0;
		}
		var y=59;
		var min_y=60;
		while(x<min_x){
			x=Math.floor(Math.random()*max_x);
		}
		while(y<min_y){
			y=Math.floor(Math.random()*max_y);
		}
		var t_arr=new Array();
		t_arr[0]=x+"px";
		t_arr[1]=y+"px";
		return t_arr;
	}
	//根据随机数获取随机文字
	var l_word="亮",r_word="亮";
	var lw="左",rw="右",word,tem_word;
	function getRandomWord(){
		l_word="亮";
		r_word="亮";
		if(level==1){
			num=getRandom(1);
			changeWord();
			word=lw+l_word+rw+r_word;
		}else if(level==2){
			num=getRandom(2);
			changeWord();
			word=lw+l_word+rw+r_word;
		}else if(level==3){
			num=getRandom(2);
			changeWord();
			var tem=getRandom(1);
			if(tem==1){
				word=rw+r_word+lw+l_word;				
			}else {
				word=lw+l_word+rw+r_word;
			}
		}
		return word;
	}
	//改变文字
	function changeWord(){
		if(num==1){
			l_word="灭";
		}else if(num==2){
			r_word="灭";
		}else if(num==3){
			l_word="灭";
			r_word="灭";
		}
	}
	//移动端多点触控按钮
	function load (){
    document.addEventListener('touchstart',touch, false);
    document.addEventListener('touchend',touch, false);
    function touch (event){
      var event = event || window.event;  
      var b_l=document.getElementById('left');
			var b_r=document.getElementById('right');
			var fire_l=document.getElementById("f_left");
			var fire_r=document.getElementById("f_right");
      switch(event.type){
          case "touchstart":
          		if(event.touches.length==2){ 
          			var t_id1=event.touches[0].target.id;
								var t_id2=event.touches[1].target.id;
          			if((t_id1=='left'&&t_id2=='right')||(t_id1=='right'&&t_id2=='left')){
				       		p=3;
								  if(a_flag==1){
								    setTimeout(tol_score,200);
								    a_flag=0;
	  							}	
				       		b_l.setAttribute("class","btn btn_active");
				       		b_r.setAttribute("class","btn btn_active");
				       		fire_l.style.display="none";
				       		fire_r.style.display="none";
				       	}
          		}else if(event.touches.length==1){
          			var t_id1=event.touches[0].target.id;
          			if(t_id1=='left'){
				 					p=1;
								  if(a_flag==1){
								   	setTimeout(tol_score,200);//延迟0.2s判断
								    a_flag=0;//将flag设置成0，让其他按键的事件不可用，以免重复
								  }	
				 					b_l.setAttribute("class","btn btn_active");
				 					fire_l.style.display="none";
				 				}else if(t_id1=='right'){
				 					p=2;
								  if(a_flag==1){
								    setTimeout(tol_score,200);
								    a_flag=0;
	  							}	
				 					b_r.setAttribute("class","btn btn_active");
				 					fire_r.style.display="none";
				 				}
          		}
              break;
          case "touchend":
              b_l.setAttribute("class","btn");
              b_r.setAttribute("class","btn");
              break;
      }
    }
	}
	window.addEventListener('load',load, false);