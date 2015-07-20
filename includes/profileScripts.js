$(document).ready(function() {
	var i;

	var users = JSON.parse(localStorage.getItem('users'));
	var clicked = localStorage.getItem('clicked');
	var whoAmI = JSON.parse(localStorage.getItem('who'));
	var time = localStorage.getItem('time');

	

	for (i=0; i<users.length; i++){
		if (users[i].email == clicked){
		break;
		}
	}



function countbackTime(minutes){

	var seconds = (minutes*60);

	var timePerInterval= seconds/1000*1000;
	counter = time;
	$(".counting").html(time + "%"); 
	setInterval(function(){
	$(".counting").html(counter + "%"); 
	counter++;

	}, timePerInterval);

}


   countbackTime(whoAmI.ttime); // insert the minutes here


	
	$(".profile-pic").css('background-image', 'url(' + users[i].img + ')');
	$("h2").html(users[i].name );
	$("h3").html("תחנה אחרונה:" + users[i].lstop);




	


		
	
});