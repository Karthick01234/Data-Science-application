var input = document.getElementById("a");
var input1 = document.getElementById("b");
var pg1=document.createElement("table")
pg1.style="width:100%;display:none"
var mismatch=document.createElement("table")
mismatch.style="width:100%;display:none"
var match=document.createElement("table")
match.style="width:100%;display:none"
function upload() { // for upload image
	input.click();
}
function upload1() { // for upload image
	input1.click();
}
var result='';
var name='';
var result1='';
var name1='';
var start=false
input.onchange = function () { // for upload image
	var file = input.files[0];
	name=file.name
	var reader = new FileReader()
	reader.readAsText(file)
	reader.onload = function() {
	    result = reader.result
		//localStorage["file"] = reader.result
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
input1.onchange = function () { // for upload image
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
	 var ma = document.getElementById("text")
	 ma.style.display="block"
	 arr=result.split("\n")
	 arr1=result1.split("\n")
	 var n=arr.length
	 var n1=arr1.length
	 var mm=0
	 var m=0
	 var pg=document.createElement("table")
	 pg.style="width:100%"
	 var summary=document.createElement("tr")
	 summary.style.width="100%"
	 var summary1=document.createElement("th")
	 var summary2=document.createElement("th")
	 summary1.style.width="55%"
	 summary2.style.width="45%"
	 summary.appendChild(summary1) 
	 summary.appendChild(summary2)
	 pg.appendChild(summary)
	 var arow = document.createElement("tr")
     arow.style="width:100%;text-align:center"
	 var acolumn1 =  document.createElement("td")
	 acolumn1.style="width:5%;text-align:center"
	 var acolumn2 =  document.createElement("td")
	 acolumn2.style="width:40%;text-align:center"
	 var acolumn3 =  document.createElement("td")
	 acolumn3.style="width:10%;text-align:center"
	 var acolumn4 =  document.createElement("td")
	 acolumn4.style="width:5%;text-align:center"
	 var acolumn5 =  document.createElement("td")
	 acolumn5.style="width:40%;text-align:center"
	 acolumn1.innerHTML=" Line No "
	 acolumn2.innerHTML=" File 1 "
	 acolumn3.innerHTML=" Differences "
	 acolumn4.innerHTML=" Line No "
	 acolumn5.innerHTML=" File 1 "
	 arow.appendChild(acolumn1)
	 arow.appendChild(acolumn2)
	 arow.appendChild(acolumn3)
	 arow.appendChild(acolumn4)
	 arow.appendChild(acolumn5)
	 pg1.appendChild(arow.cloneNode(true))
	 mismatch.appendChild(arow.cloneNode(true))
	 match.appendChild(arow.cloneNode(true))
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
	 var row =  document.createElement("tr")
	 row.style.width="100%"
	 var column1 =  document.createElement("td")
	 column1.style.width="5%"
	 var column2 =  document.createElement("td")
	 column2.style.width="40%"
	 var column3 =  document.createElement("td")
	 column3.style.width="10%"
	 var column4 =  document.createElement("td")
	 column4.style.width="5%"
	 var column5 =  document.createElement("td")
	 column5.style.width="40%"
	 var no=i+1
	 column1.innerHTML=" "+no+" ) "
	 column2.innerHTML=text
	 if(torf) {
	    column3.innerHTML=" MISMATCH "
		mm+=1
	 }
	 else {
	    column3.innerHTML=" MATCH "
		m+=1
	 }
	 column4.innerHTML=" "+no+" ) "
	 column5.innerHTML=text1
	 row.appendChild(column1)
	 row.appendChild(column2)
	 row.appendChild(column3)
	 row.appendChild(column4)
	 row.appendChild(column5)
	 pg1.appendChild(row.cloneNode(true))
	 if(torf) {
	    mismatch.appendChild(row.cloneNode(true))
	 }
	 else {
	     match.appendChild(row.cloneNode(true))
	 }
	 console.log(torf)
	 }
	 torf=false
	 }
	 summary1.innerHTML="The file "+name+" contains "+n+" number of Lines and "+mm+" mismatched Lines and "+m+" matched Lines."
	 summary2.innerHTML="The file "+name1+" contains "+n1+" number of Lines and "+mm+" mismatched Lines and "+m+" matched Lines."
	 ma.appendChild(pg)
	 ma.appendChild(pg1)
	 pg1.style.display=""
	 ma.appendChild(mismatch)
	 mismatch.style.display="none"
	 ma.appendChild(match)
	 match.style.display="none"
	 start=true
	 var rem = Math.max(n,n1) - Math.min(n,n1);
	 var noo = Math.min(n,n1);
	 for(var k=0;k<rem;k++) {
		var row =  document.createElement("tr")
		//row.style.width="100%"
		var column1 =  document.createElement("td")
		//column1.style.width="5%"
		var column2 =  document.createElement("td")
		//column2.style.width="40%"
		var column3 =  document.createElement("td")
		//column3.style.width="10%"
		var column4 =  document.createElement("td")
		//column4.style.width="5%"
		var column5 =  document.createElement("td")
		//column5.style.width="40%"
		column1.innerHTML=" "+(noo+1)+" )";
		column3.innerHTML=" MISMATCH ";
		column4.innerHTML=" "+(noo+1)+" )";
		if(arr[k]) {
			column2.innerHTML="<span class='highlight'>"+arr[k]+" </span>";
			column5.innerHTML="<span class='highlight1'> No Line </span>";
		}
		else {
			column5.innerHTML="<span class='highlight1'>"+arr[k]+" </span>";
			column2.innerHTML="<span class='highlight'> No Line </span>";
		}
		row.appendChild(column1)
		row.appendChild(column2)
		row.appendChild(column3)
		row.appendChild(column4)
		row.appendChild(column5)
		pg1.appendChild(row.cloneNode(true))
		noo++;
	 }
}
document.onkeydown = (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
	if(start) {
    var value = prompt("Please search keyword :", "match or mismatch");
	value = value.toLowerCase()
	if(value == "match") {
	   match.style.display=""
	   mismatch.style.display="none"
	   pg1.style.display="none"
	}
	else if(value == "mismatch") {
	   match.style.display="none"
	   mismatch.style.display=""
	   pg1.style.display="none"
	}
	else {
	   match.style.display="none"
	   mismatch.style.display="none"
	   pg1.style.display=""
	}
	}
  }
  /*
  else if (e.key === 'n') {
     e.preventDefault();
	 var fileContent = localStorage["file"];
     var file = new File([fileContent], "my.html", {type: 'text/html'});
	 console.log(fileContent)
	 const url = window.URL.createObjectURL(file);
	 window.location=url
  }
  */
   else if (e.key === 'p') {
     e.preventDefault();
	 window.print()
   }
}