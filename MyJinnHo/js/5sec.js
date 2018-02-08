	var start='';
	var end='';
	var timestamp='';
	//获取当前时间并返回timestamp
	function getTime(){
		/*var date=new Date();
		var mil=date.getMilliseconds();
		if(mil<10)mil='00'+mil;
		else if(mil<100&&mil>=10)mil='0'+mil;
		var s=date.getMinutes()*60+date.getSeconds();
		timestamp=s+""+mil;*/
		timestamp=Math.round(new Date().getTime());
		return timestamp;
	}
	//按下左键事件
	function down(){
		start=getTime();
		console.log(start);
	}
	//松开左键事件
	function up(){
		end=getTime();
		console.log(end);
		countSec();
	}
	//逻辑方法
	function countSec(){
		var tolsec='';
		tolsec=(end-start)/1000;
		console.log("------"+tolsec+"-------");
		start='';
		end='';
		if(tolsec>4.9&&tolsec<5.1)
		{
			alert("恭喜你，然而并没有什么卵用");
		}
		var tt=document.getElementById('score');
		var tc=document.getElementById('secText');
		tt.style.fontSize='3em';
		tc.style.display='inline';
		tt.innerHTML=tolsec;
	}
	//测试方法
	/*function test(){
		if(flag==0){
			var tem=getCurrentTime();
			console.log(tem.length);
			if(tem.length<7)alert(tt);
			if(tem<0)alert(tt);
			tt++;
		}
	}*/