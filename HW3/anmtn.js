const 
  t1 = { transform: [
 "translate(100px,0px)", "translate(-100px,0px)","translate(100px,0px)"]}
function pikachu(){
	var pikachu = document.getElementById("pikachu");
	var str = document.getElementById("speed").value;
	console.log(duration);
	var duration = parseInt(str);
	pikachu.animate(t1,{ 
            duration,
            iterations: Infinity
            });	

}
pikachu();