//�ж��Ƿ�Ϊie���������ʹ��ie����ģʽ����
	if(!-[1,]){
    alert("�Բ��𣬲�֧��ie��������ʡ�\n����������ie��������ʵ�,�뽫���ģʽ�л��ɼ���ģʽ\nʲô���㲻֪��ʲô�Ǽ���ģʽ��\n����ַ�ĵط���������и�e��ͼ�꣬��һ�°�~");
    if (!!(window.attachEvent && !window.opera)){ 
    	document.execCommand("stop"); }
    else{ 
    	window.stop(); 
    }
	}
	

    // ���������UserAgent��������ƥ�䣬������΢�Ŷ��б�ʶ����Ϊ���������
    //var useragent = navigator.userAgent;
    //if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
        // ���ﾯ����������ǰҳ���������
        //alert('�ѽ�ֹ���η��ʣ�������ʹ��΢��������������ʱ�ҳ�棡');
        // ���´�������javascriptǿ�йرյ�ǰҳ��
        //document.write("�ѽ�ֹ���η��ʣ�������ʹ��΢��������������ʱ�ҳ�棡");
        //var opened = window.open('about:blank', '_self');
        //var opened = window.write("�ѽ�ֹ���η��ʣ�������ʹ��΢��������������ʱ�ҳ�棡");
       // opened.opener = null;

        //opened.close();
    //}
	
	var w;//���
	var h;//�߶�
	var clientwidth;//��ҳʵ�ʿɼ����

	var rows=10;//����
	var cols=10;//����
	
	var bg="";//����
	
	var num=0;//���������
	
	var count=0;//��Դ���
	
	var timer="";//��ʱ��
	
	var cheat_n=3;//͵�����
		
	var level=0;//�����Ѷ�
	
	var c_time;//����ʱ��

	//�����ж���Ļ��С
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

	//����map����
	var map=new Array();	
	for(var i=0;i<rows;i++){
		map[i]=new Array();
		for(var j=0;j<cols;j++){
			map[i][j]=0;
		}
	}

	//���showbox��div
	function clear(){
		var showbox=document.getElementById('showbox');
		var cover_b=document.getElementById('cover_board');//����showbox
		while(showbox.hasChildNodes()){
			showbox.removeChild(showbox.firstChild);
		}	
		cover_b.style.zIndex=-1;
	}
	
	//����showbox
	function b_hide(){
		var cover_b=document.getElementById('cover_board');//����showbox
		cover_b.style.zIndex=1;
	}
	
	//��ʾshowbox
	function b_show(){
		var cover_b=document.getElementById('cover_board');//����showbox
		var cc=document.getElementById('cc');//��ȡ�������
		if(cover_b.style.zIndex!=-1){//�ж��Ƿ���Ҫ����
			if(cheat_n>0){
				cover_b.style.zIndex=-1;
				cheat_n--;
				cc.innerText=cheat_n;
			}if(cheat_n==0){
				alert("���Ļ����Ѿ�������~���ͣ�");
			}
		}
	}
	
	//��Ϸ��ʼ��
	function init(){	
		clear();
		ready_start();
	}
	
	//�ж��Ƿ������ɵ������Ƿ��ظ�
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
	
	//��ȡ���λ��map
	function getRandom(num){
		//����map
		for(var i=0;i<rows;i++){
			for(var j=0;j<cols;j++){
				map[i][j]=0;
			}
		}
		
		//����temp��ά����
		var temArr=new Array();
		for(var i=0;i<num;i++){
			temArr[i]=new Array();
			for(var j=0;j<2;j++){
				temArr[i][j]=0;
			}
		}
		
		//�����������Ϊ1	
		for (var i=0;i<num;i++){
			var x=Math.floor(Math.random()*rows);
			var y=Math.floor(Math.random()*cols);
			
			var m=[x,y];			
			//��temp��ֵ���г�ʼ��
			for(var j=0;j<2;j++){
				temArr[i][j]=0;
			}			
			
			//�����һ������
			if(i==0){
				temArr[0][0]=x;
				temArr[0][1]=y;
				map[x][y]=1;	
			}else{//�ڶ������꿪ʼ�ж��Ƿ��ظ�
				if(iscontain(temArr,m)){
					if(i==1){//����ڶ����������һ���ظ�
						console.log('cover-(2->1)');
						if(x<10){
							map[x+1][y]=1;
						}else if(x==10&&y<10){
							map[x][y+1]=1;
						}else 
							map[x-1][y]=1;
					}else{//����ǵڶ��������ظ�
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
	
	//��Ϸ��ʼ
	function ready_start(){	
		//����ÿ�γ��ַ�������
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
	
	//�����showbox
	function img_print(num){
		var showbox=document.getElementById("showbox");		
		var div='';
		for(var i=0;i<rows;i++){
			for(var j=0;j<cols;j++){
				if(map[i][j]==1){
					if(clientwidth<550){//���ֲ�ͬ�ֱ���
						if(level==3){//lv3������ͼƬ
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
				if(level==3){//lv3�������ƶ���ʽ
					if(map[i][j]==1){
						blockMove(div,i,j);
					}
				}
			}
		}
		if(level==1){//lv1����ʧʱ��
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
		}else if(level==2){//lv2����ʧʱ��
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
		}else if(level==3){//lv3����ʧʱ��
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

	var stt=4;//����ʱ��+1
	var timer2;//�����Ķ�ʱ��
	
	//������ʱ
	function time_start(){
		var st=document.getElementById('start_time');
		stt--;
		st.innerText=""+stt;
		if(stt=="0"){
			clearInterval(timer2);
			build_selbtn(level);
		}
	}
	
	//�����ʼ���з���
	function start(lev){
		level=lev;
		time_start(level);
		var st=document.getElementById("s_start");
		st.onmousedown="";
		timer2=setInterval(time_start,1000);
	}
	
	//����ѡ�ť
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
	
	//ѡ�ť�¼�
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
			}else {//99��ͨ��
				alert("������Ӯ�ˣ������Ű�����ˡ�����");
				for(var i=0;i<b_a.length;i++){
					b_a[i].onmousedown="";
				}
			}
		}else{
			var cover_b=document.getElementById('cover_board');//����showbox
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
	
	//�жϷ���λ�ò������ƶ�
	function blockMove(obj,x,y){
		var wayArr=new Array();
		var i=0;
		var wy;
		if(clientwidth<550){
			wy=25;
		}else wy=30;
		var wy_b=0;
		if(x!=0){//������
			wayArr[i]=1;
			i++;
		}
		if(y!=0){//������
			wayArr[i]=2;
			i++;
		}
		if(x!=9){//������
			wayArr[i]=3;
			i++;
		}
		if(y!=9){//������
			wayArr[i]=4;
			i++;
		}	
		
		//��ȡ��ǰ��ǵ�x��y��ֵ
		var p_x=getStyle(obj,'margin-left');
		p_x=parseInt(p_x.substr(0,p_x.length-2));
		var p_y=getStyle(obj,'margin-top');
		p_y=parseInt(p_y.substr(0,p_y.length-2));
		var way=5;
		
		//�����ȡ����
		while(way>i){
			way=Math.floor(Math.random()*i);
		}		
		
		//�жϷ��򣬲������ƶ�ֵ
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
		
		//��ʼ�ƶ�
		startMove(obj,wayArr[way],wy);
		
		//����
		setTimeout(function(){
			startMove(obj,wayArr[way],wy_b);
		},800)
		
	}
	
	//ȡ����ֵ
	function getStyle(obj,name){
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}else{	
			return getComputedStyle(obj,false)[name];
		}
	}
	
	//�����ƶ�
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
	
	//���ƶ���activeα����Ч
	document.addEventListener('touchstart', function (){},false); 