var input = document.getElementById("a");
function upload() { 
	input.click();
}
var result={};
var result1=''
var name='';
var n=0
/* 
input.onchange = function () { 
	var file = input.files[0];
	name=file.name
	var reader = new FileReader()
	reader.readAsText(file)
	reader.onload = function() {
		text = reader.result.split("\n")
		pattern = prompt()
		words = prompt()
		// data structure element = [startswithcaps, endwithcaps, startswithsmalls, endwithsmalls, pattern, words, length, word count, repeated sentence, repeated words]
		var n = text.length
		for(var i =0; i<n; i++) {
		   let x=text[i].trim()
		   let y=x.length
		   
		}
		console.log(reader.result)
	}
	reader.onerror = function() {
	    console.log(reader.error);
	}
	reader.onloadend = function() {
	 console.log(name)
	 console.log(result)
	}
	}
}
*/
/*
input.onchange = function () { 
	var file = input.files[0];
	name=file.name
	var chunkSize = 10;
    var fileSize = (file.size - 1);

    for(var i =0; i < fileSize; i += chunkSize) {
        (function( fil, start ) {
            var reader = new FileReader();
            var blob = fil.slice(start, chunkSize + start);
            reader.onload = function(e){
                console.log(e.target.result);
            };
            reader.readAsText(blob);
        })(file, i);
    }
} 
*/
function readFile(fil, start, chunkSize) {
    return new Promise((resolve, reject)=> {
      var reader = new FileReader();
	  var blob = fil.slice(start, chunkSize + start);
      reader.onload = function(e){
	    result1=e.target.result
		var arr=result1.split("\n")
		n+=arr.length
		/*var data = new Blob([arr], {type: 'text/plain'});
		var link = document.createElement('a');
        link.setAttribute('download', n+'.txt');
        link.href = window.URL.createObjectURL(data);
		link.click()
        console.log("reading .....");
		console.log("Total Lines ..... "+n);*/
		resolve()
      }
	  reader.readAsText(blob);
	  })
}
input.onchange = async function () { 
	var startTime = performance.now()
	var file = input.files[0];
	name=file.name
	var chunkSize = 1024*1024;
    var fileSize = (file.size - 1);
	console.log(fileSize);
	console.log("reading .....")
	for(var i =0; i < fileSize; i += chunkSize) {
	  await readFile(file, i, chunkSize);
	}
	console.log("Total Lines ..... "+n)
	var endTime = performance.now()
	console.log(`Call to doSomething took ${(endTime - startTime)/1000} seconds`)
}
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = 'en-IN';
var finalTranscripts = '';
var interimTranscripts = '';
recognition.onresult = function(event) {
	for(var i=event.resultIndex;i<event.results.length;i++) {
	  var transcript = event.results[i][0].transcript;
	  if(event.results[i].isFinal) {
	    finalTranscripts += transcript;
	  }
	  else {
	    interimTranscripts += transcript;
	  }
   }
}
document.onkeydown = (e) => { 
  if (e.key === 's') {
    e.preventDefault(); 
	recognition.start();
  }
  else if (e.key === 'r') {
    e.preventDefault(); 
	recognition.stop();
	console.log(finalTranscripts);
	finalTranscripts = '';
    interimTranscripts = '';
  }
  else if (e.key === 'u') {
    var url = 'https://www.amazon.in/Apple-iPhone-13-Pro-128GB/dp/B09G99YPQM?ref_=Oct_DLandingS_D_5576c81e_62&smid=A14CZOWI0VEHLG'
	var request = new Request('https://www.amazon.in/Apple-iPhone-13-Pro-128GB/dp/B09G99YPQM?ref_=Oct_DLandingS_D_5576c81e_62&smid=A14CZOWI0VEHLG')
	//fetch(url)
	fetch(request)
	.then(res => res.text())
	.then(text => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, 'text/html');
        var body = doc.querySelector('body').innerHTML;
		console.log(body)
	}).catch(err => console.log(err));
  }
  else if(e.key === 't') {
     function makeHttpObject() {
        if("XMLHttpRequest" in window)return new XMLHttpRequest();
	    else if("ActiveXObject" in window)return new ActiveXObject("Msxml2.XMLHTTP");
     }
     var request = makeHttpObject();
     request.open("GET", "https://www.amazon.in/Apple-iPhone-13-Pro-128GB/dp/B09G99YPQM?ref_=Oct_DLandingS_D_5576c81e_62&smid=A14CZOWI0VEHLG", true);
     request.send();
     request.onreadystatechange = function() {
       if (request.readyState == 4)
          console.log(request.responseText);
     }
  }
}