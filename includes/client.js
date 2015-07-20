
var users = {};
var abc;





	



	 //$.get("http://localhost:3000/login?person="+a).success(function (data){

     //});


/*
$.get("https://dateontrain.herokuapp.com/getAllUsers", function(data){
		users = data;

 for(var i=1 ; i<data.length; i++){


  //create paragraph
  var para = document.createElement("p");
  para.setAttribute("class" , "circle");
  para.setAttribute("id" , data[i].email);



//set arrtibutes from json fields
para.style.left = data[i].left+"px";
para.style.top = data[i].top+"px";
var bgr = data[i].img;

para.style.backgroundImage = "url('"+bgr+"')";



  //insert the paragraph to a div called dvi1
  var element = document.getElementById("div1");
  element.appendChild(para);




}


}); 

	setTimeout (function() {

		
		localStorage.setItem('users', JSON.stringify(users));
		a = JSON.parse(localStorage.getItem('users'));
		var whoAmI = users[0];
		localStorage.setItem('who', JSON.stringify(whoAmI));
				
		countbackTime(whoAmI.ttime); 

		

		$( ".circle" ).click(function() {

			localStorage.setItem('clicked', this.id);
			window.location.href = "./profile.html";

		});


	}, 1000);



	function countbackTime(minutes){

	var seconds = minutes*60;
	var timePerInterval= seconds/1000*1000;

	counter = 1;
	setInterval(function(){
	$(".counting").html(counter + "%"); 
	counter++;
	
	localStorage.setItem('time', counter);

	}, timePerInterval);

}

*/
	
$(document).ready(function() {	





	function displayCitys(arrOfCitys){
	console.log("This array was sent to displayCitys "+arrOfCitys);
	for (var i=0; i<arrOfCitys.length; i++){

		document.getElementById("way"+arrOfCitys[i]).style.display = "block";
		
	}

}


function drawStations(stop_station){
	switch (stop_station) {
    case "נהריה":
        console.log("Entered case: "+stop_station);
        displayCitys([1,3,5,6,7,9,13,14,15]); 
        break;
    case "עכו":
        console.log("Entered case: "+stop_station);
        displayCitys([1,3,5,6,7,9,10,14,15]); 
        break;
    case "קריית מוצקין":
    	console.log("Entered case: "+stop_station);
    	displayCitys([1,3,5,4,7,13,14,15]); 
		break;
    case "קריית חיים":
	console.log("Entered case: "+stop_station);
	displayCitys([1,3,5,7,8,13,15]); 
		break;
	case "חוצות המפרץ":
	console.log("Entered case: "+stop_station);
	displayCitys([1,4,7,10,13,17]); 
		break;
	case "לב המפרץ":
	console.log("Entered case: "+stop_station);
	displayCitys([1,4,7,10,5]); 
		break;
	case "חיפה מרכז השמונה":
	console.log("Entered case: "+stop_station);
	displayCitys([1,4,8,3]); 
		break;
	case "חיפה בת גלים":
	console.log("Entered case: "+stop_station);
	displayCitys([1,6,3]); 
		break;
	case "חיפה חוף הכרמל":
	console.log("Entered case: "+stop_station);
	displayCitys([1,14]); 
		break;
	case "תל אביב אוניברסיטה":
	console.log("Entered case: "+stop_station);
	displayCitys([1]); 
		break;
	case "תל אביב השלום":
	console.log("Entered case: "+stop_station);
	displayCitys([1]); 
		break;
	case "תל אביב ההגנה":
	console.log("Entered case: "+stop_station);
	displayCitys([1,16]); 
		break;
	case "רמלה":
	console.log("Entered case: "+stop_station);
	displayCitys([1,5,9]); 
		break;
	case "להבים":
	console.log("Entered case: "+stop_station);
	displayCitys([1,5,9,13]); 
		break;
	case "באר שבע":
	console.log("Entered case: "+stop_station);
	displayCitys([1,5,9,13,16]); 
		break;
    }

}





		var user = JSON.parse(localStorage.getItem('user'));
			
		
		var profileImg = "http://graph.facebook.com/" + user.id +"/picture?type=square";
		//var profileImg = "http://graph.facebook.com/10206098359232290/picture?type=square";


		$('.profilePic').css('background-image', 'url(' + profileImg + ')');
 
		

		//var stations = ['חיפה','חוף הכרמל','חולון-וולפסון','חוצות המפרץ','תל-אביב ההגנה'];

		a1 = $('#query').autocomplete({
			width: 448,
			delimiter: /(,|;)\s*/,
			lookup: 'באר שבע,להבים,רמלה,תל אביב ההגנה,תל אביב השלום,תל אביב סבידור,תל אביב אוניברסיטה,חיפה חוף הכרמל,חיפה בת גלים,חיפה מרכז השמונה,לב המפרץ,חוצות המפרץ,קריית חיים,קריית מוצקין,עכו,נהריה'.split(','), //this are the stations list
			onSelect: function (suggestion) {		//yoni here you send the station to your function
      		  				$("#showOrNot").show();
 							$('#query').css('background-position', '-999px -999px');

 							$('.redCircle3').css('margin-top', '655px');
 							
 							$("#wrapper").show();
 							$(".vi").hide();
 							$(".viblue").show();
 							carrigeNum  = generateCarrige(carrige);	
							seatTopandLeft =  generateSeat(topLeftArr);
 							$('#carrige').val("קרון מס׳ "+carrigeNum);
 							$('#seat').val("מושב מס׳ 41");
 							drawStations($('#query').val());
 	

   			 }

		});


	$(".viblue").click(function(e){




			valueStation = $('#query').val();
			user['lstop'] = valueStation;
			user['carrige'] = carrigeNum;
			user['top'] = seatTopandLeft.top;
			user['left'] = seatTopandLeft.left;
			user['ttime'] = 10;
			var userEmail = user.email;
			userEmail = userEmail.replace("@", "");
			user.email = userEmail;
			
							
			updateUser = JSON.stringify(user); 

			$.get("https://itsthefinal.herokuapp.com/login?person="+ updateUser).success(function (data){ // send updated user to the server
				var a = JSON.stringify(data);

				localStorage.setItem('allUsers', a);
				localStorage.setItem('me', updateUser);

				window.location.href = "traintable.html";  

			});


		});


		$("#query").click(function(e){
			$("#showOrNot").hide();
			$("#wrapper").hide();
			var parentOffset = $(this).offset(); 
  			 //or $(this).offset(); if you really just want the current element's offset
  			 var relX = e.pageX - parentOffset.left;
  		
  			 if (relX>20 && relX<100){
  			 	$("#showOrNot").show();

  			 	$('#query').val("");

  			 	$('#query').css('background-position', '-999px -999px');
  			 }

  			});

  			/* $( "#query" ).keydown(function(event) {
 					if(event.which == 13){
 												
 						if(stations.indexOf($('#query').val()) != -1){
 							$("#showOrNot").show();
 							$('#query').css('background-position', '-999px -999px');
 							$('#carrige').val("קרון מס׳ 7");
 							$('#seat').val("מושב מס׳ 41");
 						}
 						else{$('#query').css('background-position', '50px 35px');}


 					}
			});
*/


			$('#query').on('input', function() {
				var input = $('#query').val();
				if ( input == ""){
					$("#showOrNot").show();
					$('#query').css('background-position', '-999px -999px');
				}
				
				else {
					$("#showOrNot").hide();
					$("#wrapper").hide();
					$('#query').css('background-position', '50px 25px');
				}



			});



			var counter =0;

			setInterval(function(){ // red circles animation

				if (counter == 0){
					$('.redCircle1').css('border', '3px solid rgba(200, 54, 54, 0)');
					$('.redCircle2').css('border', '3px solid rgba(200, 54, 54, 0)');
					$('.redCircle3').css('border', '3px solid rgba(200, 54, 54, 0)');
					counter++;
				
				}	
				
				else if (counter == 1){
					$('.redCircle1').css('border', '3px solid rgba(200, 54, 54, 0.5)');
					$('.redCircle2').css('border', '3px solid rgba(200, 54, 54, 0)');
					$('.redCircle3').css('border', '3px solid rgba(200, 54, 54, 0)');
					counter++;					
				}	
				else if(counter == 2){
					$('.redCircle1').css('border', '3px solid rgba(200, 54, 54, 0)');
					$('.redCircle2').css('border', '3px solid rgba(200, 54, 54, 0.3)');
					$('.redCircle3').css('border', '3px solid rgba(200, 54, 54, 0)');
					counter++;
				}

				else{
					$('.redCircle1').css('border', '3px solid rgba(200, 54, 54, 0)');
					$('.redCircle2').css('border', '3px solid rgba(200, 54, 54, 0)');
					$('.redCircle3').css('border', '3px solid rgba(200, 54, 54, 0.2)');
					
					counter=0;

					
				}
				


			}, 200);
			


			carrige = [2,4,5];

				topLeftArr =
				 [
				    {
				    "top": "55", 
				    "left": "205",
					},

					{
					"top": "205", 
				    "left": "50",
					},

				    {
				    "top": "55", 
				    "left": "595",
					},

					{
					"top": "715", 
				    "left": "50",
					},

					{
 					"top": "870", 
				    "left": "595",
					},

				   {
				    "top": "1050", 
				    "left": "50",
					}
				] 
				


					
					function generateSeat(openSeats){
							
						var chosenSeat = openSeats[Math.floor(Math.random()*openSeats.length)];
						console.log(chosenSeat);
						return chosenSeat;
					}


					function generateCarrige(carrige){
							
						var chosenCarrige = carrige[Math.floor(Math.random()*carrige.length)];
						console.log(chosenCarrige);
						return chosenCarrige;
					}

					



//var stations = ["באר שבע", "להבים", "רמלה" , "תל אביב ההגנה", "תל אביב השלום" , "תל אביב סבידור","תל אביב אוניברסיטה" , "חיפה חוף הכרמל","חיפה בת גלים","חיפה מרכז השמונה","לב המפרץ","חוצות המפרץ","קריית חיים","קריית מוצקין","עכו","נהריה"];





	/*		
			$(".burger").click(function(e){
				$("#menuIcon").hide();
				$( ".menu" ).slideDown();
				

  			});

  			$(".holder").click(function(e){

				$(".menu" ).slideUp();
				$("#menuIcon").show();

  			});

	*/		



});