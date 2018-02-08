//判断是否为ie浏览器或者使用ie兼容模式访问
	if(!-[1,]){
    alert("对不起，不支持ie浏览器访问。\n若您不是用ie浏览器访问的,请将浏览模式切换成极速模式\n什么！你不知道什么是极速模式？\n打网址的地方的最后面有个e的图标，点一下吧~");
    if (!!(window.attachEvent && !window.opera)){ 
    	document.execCommand("stop"); }
    else{ 
    	window.stop(); 
    }
	}
	

    // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
    //var useragent = navigator.userAgent;
    //if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
        // 这里警告框会阻塞当前页面继续加载
        //alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
        // 以下代码是用javascript强行关闭当前页面
        //document.write("已禁止本次访问：您必须使用微信内置浏览器访问本页面！");
        //var opened = window.open('about:blank', '_self');
        //var opened = window.write("已禁止本次访问：您必须使用微信内置浏览器访问本页面！");
       // opened.opener = null;

        //opened.close();
    //}
	
	var w;//宽度
	var h;//高度
	var clientwidth;//网页实际可见宽度

	var rows=10;//行数
	var cols=10;//列数
	
	var bg="";//背景
	
	var num=0;//随机方块数
	
	var count=0;//答对次数
	
	var timer="";//定时器
	
	var cheat_n=3;//偷瞄次数
		
	var level=0;//定义难度
	
	var c_time;//隐藏时间

	//定义判断屏幕大小
	function cw(){
		clientwidth=document.body.clientWidth;
		if(clientwidth<550){
			w=25;
			h=25;
		}else{
			w=30;
			h=30;
		}	
	}

	//定义map数组
	var map=new Array();	
	for(var i=0;i<rows;i++){
		map[i]=new Array();
		for(var j=0;j<cols;j++){
			map[i][j]=0;
		}
	}

	//清空showbox内div
	function clear(){
		var showbox=document.getElementById('showbox');
		var cover_b=document.getElementById('cover_board');//隐藏showbox
		while(showbox.hasChildNodes()){
			showbox.removeChild(showbox.firstChild);
		}	
		cover_b.style.zIndex=-1;
	}
	
	//隐藏showbox
	function b_hide(){
		var cover_b=document.getElementById('cover_board');//隐藏showbox
		cover_b.style.zIndex=1;
	}
	
	//显示showbox
	function b_show(){
		var cover_b=document.getElementById('cover_board');//隐藏showbox
		var cc=document.getElementById('cc');//获取机会次数
		if(cover_b.style.zIndex!=-1){//判断是否需要机会
			if(cheat_n>0){
				cover_b.style.zIndex=-1;
				cheat_n--;
				cc.innerText=cheat_n;
			}if(cheat_n==0){
				alert("您的机会已经用完了~加油！");
			}
		}
	}
	
	//游戏初始化
	function init(){	
		clear();
		ready_start();
	}
	
	//判断是否新生成的数组是否重复
	function iscontain(arr1,arr2){
		for(var i=0;i<arr1.length;i++){
			if(arr2[0]===arr1[i][0]){
				if(arr2[1]===arr1[i][1]){
						return true;
				}
			}
		}
		return false;
	}
	
	//获取随机位置map
	function getRandom(num){
		//重置map
		for(var i=0;i<rows;i++){
			for(var j=0;j<cols;j++){
				map[i][j]=0;
			}
		}
		
		//定义temp二维数组
		var temArr=new Array();
		for(var i=0;i<num;i++){
			temArr[i]=new Array();
			for(var j=0;j<2;j++){
				temArr[i][j]=0;
			}
		}
		
		//随机方块设置为1	
		for (var i=0;i<num;i++){
			var x=Math.floor(Math.random()*rows);
			var y=Math.floor(Math.random()*cols);
			
			var m=[x,y];			
			//对temp数值进行初始化
			for(var j=0;j<2;j++){
				temArr[i][j]=0;
			}			
			
			//存入第一个坐标
			if(i==0){
				temArr[0][0]=x;
				temArr[0][1]=y;
				map[x][y]=1;	
			}else{//第二个坐标开始判断是否重复
				if(iscontain(temArr,m)){
					if(i==1){//如果第二个坐标与第一个重复
						console.log('cover-(2->1)');
						if(x<10){
							map[x+1][y]=1;
						}else if(x==10&&y<10){
							map[x][y+1]=1;
						}else 
							map[x-1][y]=1;
					}else{//如果非第二个坐标重复
						i=i-1;
					}
				}else{
					temArr[i][0]=x;
					temArr[i][1]=y;
					map[x][y]=1;
				}
			}
		}
		return map;
	}
	
	//游戏开始
	function ready_start(){	
		//设置每次出现方块数量
		num=0;
		if(level==1){
			while(num<6){
				num=Math.floor(Math.random()*10);
			}
		}else if(level==2){
			while(num<=15||num>=20){
				num=Math.floor(Math.random()*100);
			}	
		}else if(level==3){
			while(num<=10||num>=15){
				num=Math.floor(Math.random()*100);
			}	
		}
		console.log(num);
		getRandom(num);
		img_print(num);
	}
	
	//输出到showbox
	function img_print(num){
		var showbox=document.getElementById("showbox");		
		var div='';
		for(var i=0;i<rows;i++){
			for(var j=0;j<cols;j++){
				if(map[i][j]==1){
					if(clientwidth<550){//区分不同分辨率
						if(level==3){//lv3的特殊图片
							bg="url(img/bg3-1.gif)";
						}else {
							bg="url(img/bg2-1.png)";
						}	
					}else{
						if(level==3){
							bg="url(img/bg3.gif)";
						}else {
							bg="url(img/bg2.png)";
						}	
					}
				}
				else bg="url(img/bg1.png)";
				div=document.createElement("div");
				div.style.width=w;
				div.style.height=h;
				div.style.backgroundImage=bg;
				div.style.position="absolute";
				div.style.marginLeft=i*w;
				div.style.marginTop=j*h;
				div.setAttribute("name","block");
				showbox.appendChild(div);
				if(level==3){//lv3的特殊移动方式
					if(map[i][j]==1){
						blockMove(div,i,j);
					}
				}
			}
		}
		if(level==1){//lv1的消失时间
			if(count<5){
				c_time=2500;
			}else if(count>=5&&count<10){
				c_time=2000;
			}else if(count>=10&&count<15){
				c_time=1500;
			}else if(count>=15&&count<20){
				c_time=1000;
			}else if(count>=20){
				c_time=500;
			}
			timer=setTimeout('b_hide()',c_time); 
		}else if(level==2){//lv2的消失时间
			if(count<5){
				c_time=5500;
			}else if(count>=5&&count<10){
				c_time=5000;
			}else if(count>=10&&count<15){
				c_time=4500;
			}else if(count>=15&&count<20){
				c_time=4000;
			}else if(count>=20){
				c_time=3500;
			}
			timer=setTimeout('b_hide()',c_time); 
		}else if(level==3){//lv3的消失时间
			if(count<5){
				c_time=3500;
			}else if(count>=5&&count<10){
				c_time=3000;
			}else if(count>=10&&count<15){
				c_time=2500;
			}else if(count>=15&&count<20){
				c_time=2000;
			}else if(count>=20){
				c_time=1500;
			}
			timer=setTimeout('b_hide()',c_time); 
		}
	}

	var stt=4;//倒数时间+1
	var timer2;//倒数的定时器
	
	//倒数计时
	function time_start(){
		var st=document.getElementById('start_time');
		stt--;
		st.innerText=""+stt;
		if(stt=="0"){
			clearInterval(timer2);
			build_selbtn(level);
		}
	}
	
	//点击开始运行方法
	function start(lev){
		level=lev;
		time_start(level);
		var st=document.getElementById("s_start");
		st.onmousedown="";
		timer2=setInterval(time_start,1000);
	}
	
	//生成选项按钮
	function build_selbtn(){
		init();
		var tb= document.getElementById('tb');
		var row1= tb.insertRow(0);
		var cell0= row1.insertCell(0);
		var cell1= row1.insertCell(1);
		var row2= tb.insertRow(1);
		var cell3= row2.insertCell(0);
		var cell4= row2.insertCell(1);
		if(level==1){
			cell0.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+6+">A:"+6+"</a>";
			cell1.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+7+">B:"+7+"</a>";
			cell3.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+8+">C:"+8+"</a>";
			cell4.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+9+">D:"+9+"</a>";
		}else if(level==2){
			cell0.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+16+">A:"+16+"</a>";
			cell1.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+17+">B:"+17+"</a>";
			cell3.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+18+">C:"+18+"</a>";
			cell4.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+19+">D:"+19+"</a>";
		}else if(level==3){
			cell0.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+11+">A:"+11+"</a>";
			cell1.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+12+">B:"+12+"</a>";
			cell3.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+13+">C:"+13+"</a>";
			cell4.innerHTML = "<a class='btn' href='#' onmousedown='selection(this)' name="+14+">D:"+14+"</a>";
		}
		//cell0.innerHTML = "<a class='btn' onclick='init()' name="+6+">A:"+6+"</a>";	
	}	
	
	//选项按钮事件
	function selection(sel){
		clearInterval(timer);
		//var score_p=document.getElementById('score_box');
		var score_p=document.getElementsByName('score_box');
		var b_a=document.getElementsByTagName("a");
		if(sel.name==num){
			count++;
			score_p[0].innerText=count;	
			score_p[1].innerText=count;	
			if(count<99){
				init();
			}else {//99分通关
				alert("大神，你赢了，求别再虐待我了。。。");
				for(var i=0;i<b_a.length;i++){
					b_a[i].onmousedown="";
				}
			}
		}else{
			var cover_b=document.getElementById('cover_board');//隐藏showbox
			for(var i=0;i<b_a.length;i++){
				b_a[i].onmousedown="";
			}
			cover_b.style.zIndex=1;
			if(clientwidth<550){
				cover_b.style.background="url('img/wrong-2.png')";
			}else
				cover_b.style.background="url('img/wrong.png')";
				cover_b.setAttribute("onclick", "javascript:window.location.reload();");	
		}
	}	
	
	//判断方块位置并进行移动
	function blockMove(obj,x,y){
		var wayArr=new Array();
		var i=0;
		var wy;
		if(clientwidth<550){
			wy=25;
		}else wy=30;
		var wy_b=0;
		if(x!=0){//能往左
			wayArr[i]=1;
			i++;
		}
		if(y!=0){//能往上
			wayArr[i]=2;
			i++;
		}
		if(x!=9){//能往右
			wayArr[i]=3;
			i++;
		}
		if(y!=9){//能往下
			wayArr[i]=4;
			i++;
		}	
		
		//获取当前标记的x，y的值
		var p_x=getStyle(obj,'margin-left');
		p_x=parseInt(p_x.substr(0,p_x.length-2));
		var p_y=getStyle(obj,'margin-top');
		p_y=parseInt(p_y.substr(0,p_y.length-2));
		var way=5;
		
		//随机获取方向
		while(way>i){
			way=Math.floor(Math.random()*i);
		}		
		
		//判断方向，并赋予移动值
		if(wayArr[way]==1){
			wayArr[way]="margin-left";
			wy=p_x-wy;
			wy_b=p_x;
		}else if(wayArr[way]==2){
			wayArr[way]="margin-top";
			wy=p_y-wy;
			wy_b=p_y;
		}else if(wayArr[way]==3){
			wayArr[way]="margin-left";
			wy=p_x+wy;
			wy_b=p_x;
		}else if(wayArr[way]==4){
			wayArr[way]="margin-top";
			wy=p_y+wy;
			wy_b=p_y;
		}
		
		//开始移动
		startMove(obj,wayArr[way],wy);
		
		//返回
		setTimeout(function(){
			startMove(obj,wayArr[way],wy_b);
		},800)
		
	}
	
	//取属性值
	function getStyle(obj,name){
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}else{	
			return getComputedStyle(obj,false)[name];
		}
	}
	
	//方块移动
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
				if(attr=='opacity'){
					obj.style.filter='alpha(opcaty:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}else{
					obj.style[attr]=cur+speed+'px';
				}
			}
		},60);
	}
	
	//让移动端active伪类生效
	document.addEventListener('touchstart', function (){},false); 