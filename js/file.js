var input = document.getElementById("a");
var input1 = document.getElementById("b");
function upload() {
	input.click();
}
function upload1() { 
	input1.click();
}
var result='';
var name='';
var result1='';
var name1='';
input.onchange = function () { 
	var file = input.files[0];
	name=file.name
	var reader = new FileReader()
	reader.readAsText(file)
	reader.onload = function() {
	    result = reader.result
	}
	reader.onerror = function() {
	    console.log(reader.error);
	}
	reader.onloadend = function() {
	  if(input1.files[0]) {
	    document.getElementById("round").style.display="none"
		document.getElementById("but").style.display="block"
	  }
	  else {
	     document.getElementById("p1").innerHTML=name;
	  }
	}
}
input1.onchange = function () { 
	var file = input1.files[0];
	name1=file.name
	var reader = new FileReader()
	reader.readAsText(file)
	reader.onload = function() {
	    result1 = reader.result
	}
	reader.onerror = function() {
	    console.log(reader.error);
	}
	reader.onloadend = function() {
	  if(input.files[0]) {
	    document.getElementById("round").style.display="none"
		document.getElementById("but").style.display="block"
	  }
	  else {
	     document.getElementById("p2").innerHTML=name1;
	  }
	}
}
function my() {
     document.getElementById("but").style.display="none"
	 arr=result.split("\n")
	 arr1=result1.split("\n")
	 var n=arr.length
	 var n1=arr1.length
	 var pg=document.createElement("table")
	 pg.style="width:100%;border:1px solid black;"
	 var pg1=document.createElement("table")
	 pg1.style.width="100%"
	 var pg2=document.createElement("table")
	 pg2.style.width="100%"
	 var pg3=document.createElement("table")
	 pg3.style.width="100%"
	 var summary=document.createElement("tr")
	 summary.style.width="100%"
	 var summary1=document.createElement("th")
	 var summary2=document.createElement("th")
	 summary1.innerHTML="The file "+name+" contains "+n+" number of Lines"
	 summary2.innerHTML="The file "+name1+" contains "+n1+" number of Lines"
	 summary1.style.width="55%"
	 summary2.style.width="45%"
	 summary.appendChild(summary1) 
	 summary.appendChild(summary2)
	 pg.appendChild(summary)
	 for(var i=0;i<n && i < n1;i++) {
	 if(arr[i].trim() && arr1[i].trim()) {
	 text=''
	 text1=''
	 check = arr[i].split(' ')
	 check1 = arr1[i].split(' ')
	 var k=check.length
	 var k1=check1.length
	 var max=Math.max(k, k1)
	 var torf=false
	 for(var j=0;j<max;j++) {
	   if(check[j] && check1[j]) {
	    if(check[j] === check1[j]) {
		   text += check[j].trim()+" " 
		   text1 += check1[j].trim()+" "
		}
		else {
		    torf=true
			text += "<span class='highlight'>"+check[j].trim()+" </span>"
		    text1 += "<span class='highlight1'>"+check1[j].trim()+" </span>"
		}
	   }
	   else {
	      if(check[j]) {
		    text += "<span class='highlight'>"+check[j].trim()+" </span>"
		  }
		  if(check1[j]) {
			text1 += "<span class='highlight1'>"+check1[j].trim()+" </span>"
		  }
	   }
	 }
	 var row1 =  document.createElement("tr")
	 var row2 =  document.createElement("tr")
	 var row3 =  document.createElement("tr")
	 var column1 =  document.createElement("td")
	 var column2 =  document.createElement("td")
	 var column3 =  document.createElement("td")
	 var d = document.createElement("div")
	 var d1 = document.createElement("div")
	 var d2 = document.createElement("div")
	 var no=i+1
	 d.innerHTML=" "+no+" ) "+text
	 d1.innerHTML=" "+no+" ) "+text1
	 if(torf) {
	    d2.innerHTML=" MISMATCH "
	 }
	 else {
	    d2.innerHTML=" MATCH "
	 }
	 d.style="width:100%;white-space:nowrap"
	 d1.style="width:100%;white-space:nowrap"
	 d2.style="width:100%;white-space:nowrap"
	 column1.appendChild(d)
	 column2.appendChild(d1)
	 column3.appendChild(d2)
	 row1.appendChild(column1)
	 row2.appendChild(column2)
	 row3.appendChild(column3)
	 pg1.appendChild(row1)
	 pg2.appendChild(row2)
	 pg3.appendChild(row3)
	 }
	 }
	 var h1 = document.createElement("div")
	 h1.style="width:100%"
	 var h2 = document.createElement("div")
	 h2.style="width:45%;overflow:auto;float:left"
	 var h3 = document.createElement("div")
	 h3.style="width:45%;overflow:auto;float:left"
	 var h4 = document.createElement("div")
	 h4.style="width:10%;overflow:auto;float:left"
	 h2.appendChild(pg1)
	 h3.appendChild(pg2)
	 h4.appendChild(pg3)
	 h1.appendChild(h2)
	 h1.appendChild(h4)
	 h1.appendChild(h3)
	 document.body.appendChild(pg)
	 document.body.appendChild(h1)
}