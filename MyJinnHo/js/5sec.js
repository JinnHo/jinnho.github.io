	var start='';
	var end='';
	var timestamp='';
	//��ȡ��ǰʱ�䲢����timestamp
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
	//��������¼�
	function down(){
		start=getTime();
		console.log(start);
	}
	//�ɿ�����¼�
	function up(){
		end=getTime();
		console.log(end);
		countSec();
	}
	//�߼�����
	function countSec(){
		var tolsec='';
		tolsec=(end-start)/1000;
		console.log("------"+tolsec+"-------");
		start='';
		end='';
		if(tolsec>4.9&&tolsec<5.1)
		{
			alert("��ϲ�㣬Ȼ����û��ʲô����");
		}
		var tt=document.getElementById('score');
		var tc=document.getElementById('secText');
		tt.style.fontSize='3em';
		tc.style.display='inline';
		tt.innerHTML=tolsec;
	}
	//���Է���
	/*function test(){
		if(flag==0){
			var tem=getCurrentTime();
			console.log(tem.length);
			if(tem.length<7)alert(tt);
			if(tem<0)alert(tt);
			tt++;
		}
	}*/