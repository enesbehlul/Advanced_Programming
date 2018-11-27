const 
  t1 = { transform: [
 "translate(500px,0px)", "translate(-200px,0px)","translate(500px,0px)"]}
 t2 = {transform: ["rotate(0deg)", "rotate(180deg)", "rotate(360deg)"]}
 t3 = {transform: ["translateY(0px)", "translateY(-50px)", "translateY(50px)", "translateY(0px)"]}
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
function rotate(){
	var pikachu = document.getElementById("pikachu");
	var str = document.getElementById("speed").value;
	console.log(duration);
	var duration = parseInt(str);
	pikachu.animate(t2,{ 
            duration,
            iterations: Infinity
            });	

}
function picaDown() {
var pikachu = document.getElementById("pikachu");
	var str = document.getElementById("speed").value;
	console.log(duration);
	var duration = parseInt(str);
	pikachu.animate(t3,{ 
            duration,
            iterations: Infinity
            });	

}