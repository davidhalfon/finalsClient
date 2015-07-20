$(document).ready(function() {	
	var moveToMe;
	var ME;


					
					var me = JSON.parse(localStorage.getItem('me'));

					var allUsers = JSON.parse(localStorage.getItem('allUsers'));
					//var allUsers = [{"_id":"55816554e4b0ce410a699835","email":"brezrkgmail.com","age":25,"status":"1","name":"Shlomi Yossef","img":"http://fruit-powered.com/wp-content/uploads/2013/08/Doug-Graham-150px.jpg","top":55,"left":50,"lstop":"חיפה - הכרמל","ttime":140,"carrige":1},{"_id":"55816660e4b0ce410a69988d","email":"galigmail.com","age":23,"status":"1","name":"Gali Galili","img":"http://conference.betterboards.net/wp-content/uploads/2015/02/Speaker-Elise-Sernik-150px.jpg","top":55,"left":440,"lstop":"רמת השרון","ttime":71,"carrige":1},{"_id":"55816866e4b0ce410a6998a0","email":"ronigmail.com","age":29,"status":"0","name":"Roni Shai","img":"http://conference.betterboards.net/wp-content/uploads/2015/02/Speaker-Ingo-Susing-150px.jpg","top":55,"left":440,"lstop":"נתניה","ttime":91,"carrige":3},{"_id":"558164e4e4b0ce410a6997d2","email":"nezer14gmail.com","age":26,"status":"1","name":"Yoni Nezer ","img":"https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xtf1/t51.2885-19/10852728_620781938050188_612583_a.jpg","top":55,"left":50,"lstop":"השלום","ttime":54,"carrige":4},{"_id":"558165e2e4b0ce410a69988a","email":"ronagmail.com","age":22,"status":"0","name":"Rona Cohen","img":"http://sproutsummit.com/wp-content/uploads/2015/03/Speaker-SS-Sophie-McNamara-150px.jpg","top":1205,"left":50,"lstop":"הרצליה צפון","ttime":60,"carrige":5},{"_id":"558166f7e4b0ce410a699896","email":"bargmail.com","age":30,"status":"0","name":"Bar Refaeli","img":"http://conference.betterboards.net/wp-content/uploads/2015/02/Speaker-Natalie-Elliot-150px.jpg","top":870,"left":205,"lstop":"רמת השרון","ttime":71,"carrige":5},{"_id":"55a941e9dbcac145058b49bf","email":"halfon7gmail.com","name":"David Halfon","status":"0","left":205,"top":55,"lstop":"תל אביב ההגנה","ttime":10,"carrige":3,"img":"http://graph.facebook.com/10206098359232290/picture?type=square","age":25,"__v":0}];
					//var me = userSelection("halfon7gmail.com");
					for(var i=0 ; i<allUsers.length; i++){ // create each user by its attributes



						  
						  var User = document.createElement("div");
						  User.setAttribute("class" , "seat");
						  User.setAttribute("id" , allUsers[i].email);

						  if (allUsers[i].email == me.email){
						  	ME = [User , allUsers[i].carrige];
						  	$(User).css('border','7px solid #FF0000');
						  }


						//set arrtibutes from json fields
						User.style.left = allUsers[i].left+"px";
						User.style.top = allUsers[i].top+"px";
						var bgr = allUsers[i].img;

						User.style.backgroundImage = "url('"+bgr+"')";					 
						  var carrigeParent = document.getElementById("carrige" + allUsers[i].carrige);
						  carrigeParent.appendChild(User);
						  
						}



						
			


				function userSelection(id){
					for(var i=0; i<allUsers.length; i++){
						if (allUsers[i].email == id){
							return allUsers[i];
						}
						
					}
				}

				var user;
				var uname;
				var newName='';

				$(".seat").click(function(e){
					
					if(this.id != me.email){
						moveToMe = $(this);

						 
						 user = userSelection(this.id);

						  userToServer = JSON.stringify(user);
						 
						


					$.get("https://itsthefinal.herokuapp.com/getStatus?person="+ userToServer).success(function (data){ // send updated user to the server
					 		if (data == 0){


								 uname = user.name;		
								 newName='';

								for(var i=0; i<uname.length; i++){ 	// cut the sure name
							 	if(uname[i]==' '){
									break;
								}
								newName+=uname[i];

							}


						//var scroll = ($("body").scrollTop());
						//$(".userInfo").css('top',scroll);
						$(".userInfoh2").html(newName +", "+ user.age);
						$(".userInfoh3").html("תחנה אחרונה: "+ user.lstop);
						$(".userInfoh4").html("קרון: "+ user.carrige);
						$(".userInfoh5").html("מושב: 51");
						$(".userBigCircle").css('background-image' , 'url(' + user.img + ')');
						$(".trainWrapper").hide();
						$(".userInfo").show();
					}

					else {
						

						var d = $(moveToMe).parent().attr('id');
						console.log(d);
						d = d[d.length-1];
						console.log(d);
						d = parseInt(d);

						if (d>1){
							d -=1;
							console.log('good');
							d = d*1400;
						}
	

						$(".isBusy").css('top' ,d+500);

						$(".isBusyPic").css('background-image' , 'url(' + user.img + ')');
						$(".isBusyh1").html(user.name);

						$(".isBusy").show()
					}
						
				 });
			}
  		});


				$(".xcancel").click(function(e){
					$(".userInfo").hide();
					$(".trainWrapper").show();
				
				});

				hookUpArr = [1,2,3];// have to initialize first.(global variable).

				$(".vapprove").click(function(e){

					$(".userInfo").hide();
					$(".trainWrapper").show();
					

					hookUp(user.top,user.left,user.carrige);

					console.log("movetome.top: "+user.top);



					console.log("hookupArr is: "+hookUpArr);

					walkToHim(hookUpArr ,ME[0], ME[1], "#carrige"+user.carrige);





					
				});

					function countbackTime(minutes){

						var seconds = (minutes*60);

						var timePerInterval= seconds/1000*10000;

						var counter=0;
						$(".counting").html(counter+ "%"); 


						var time =setInterval(function(){
						$(".counting").html(counter + "%"); 
						counter++;
						if (counter==101){
							window.clearInterval(time);
						}
						}, timePerInterval);
				}

				countbackTime(me.ttime);
			


				$("#side h1").html("1 קרון ");
				
				$(window).scroll(function() {
  					var top = ($("body").scrollTop());

  					if((top>0)&&(top<1240)){
  						$("#side h1").html("1 קרון ");
  					}
  					if((top>1240)&&(top<2600)){
  						$("#side h1").html("2 קרון ");
  					}
  					if((top>2601)&&(top<3900)){
  						$("#side h1").html("3 קרון ");
  					}
  					if((top>3900)&&(top<5200)){
  						$("#side h1").html("4 קרון ");
  					}
  					if((top>5200)&&(top<6500)){
  						$("#side h1").html("5 קרון ");
  					}
  					console.log(top);
				});


				

			//gets where the potential lover seats as parameter , and returns hookUpArr near him
				function hookUp(top,left,carrige){ 

					
							
						if((top=="55")&&(left=="50")) {
							hookUpArr = [55,205,carrige]; 
							
						}

						if((top=="55")&&(left=="440")) {
							hookUpArr = [55,595,carrige]; 
						}

						if((top=="870")&&(left=="205")) {
							hookUpArr = [715,50,carrige]; 
						}

						if((top=="715")&&(left=="595")) {
							hookUpArr = [870,595,carrige]; 
						}

						if((top=="1205")&&(left=="50")) {
							hookUpArr = [1050,50,carrige]; 
						}
				}


				

			
/*
			Arguments :
				1) hookUpArr which contains 3 fields - top left & carrige number. (constructed with hookUp function).
				2) me - #ID of the desired moveable element (don't forget the "#" as argument).
				3) startingCarrige - the number of the carrige where the element(#ID) is sitting before movement
*/

				function walkToHim(hookUpArr,me,startingCarrige,recId){

					
					var upOrDown=0;

					console.log("Carrige number: " +hookUpArr[2]);

					var carrigeDiff = (hookUpArr[2]) - (startingCarrige);

					if (carrigeDiff > 0){
						upOrDown = 10;
					}

					else if (carrigeDiff < 0){
						upOrDown = -10
					}


					console.log("where user starts: "+startingCarrige);
					console.log("where i clicked on: "+hookUpArr);

					
					var addPixels = (carrigeDiff * 1400);
					var intervalInMilli = carrigeDiff*1000;

					var intervalInMilli = Math.abs(intervalInMilli);
					console.log("intervalInMilli: "+intervalInMilli);


					 if(carrigeDiff==0){
					 	addPixels = 0;
					 	intervalInMilli = 2000;
					}

					var intervalInMilli = Math.abs(intervalInMilli);

					console.log("intervalInMilli: "+intervalInMilli);
					


					//var conditionValue = Math.abs(conditionValue);

					console.log("Carrige Difference Value: "+ carrigeDiff);

					

					var setScrollPerm = Math.abs(addPixels);


					$(moveToMe).css('border','7px solid #FF0000');
					
					var focus=($(ME[0]).position().top);  //55px
				

					console.log("starting carrige: "+startingCarrige);
					if (startingCarrige>1){

						focus =  focus +((startingCarrige-1)*1400);
						if(carrigeDiff>0){
							focus = focus-500;
						}

					}

					console.log("focus: "+focus);

	 				 window.scrollTo(0,focus);





					
					$('html, body').animate({scrollTop: $(recId).offset().top}, intervalInMilli);

				

					 $(me).animate({top: addPixels+hookUpArr[0]+upOrDown+"px"},intervalInMilli);
					  $(me).animate({left: hookUpArr[1]+10+"px"},intervalInMilli);

					 console.log("successfuly seat");
					 console.log("top: "+hookUpArr[0]);
					 setTimeout(function(){
					 	$.get("https://itsthefinal.herokuapp.com/setStatus?person="+ userToServer);
						$(".userInfo").hide();
					  	$(".trainWrapper").show();
					  	$(".onADate").show();
						$("#h1Date").html("זמן שנותר לדייט");
						$(".counting").hide();

					    var oneMinutes = 60 * 1,
				        display = $('.countingDate');
				   		startTimer(oneMinutes, display);
						$(".countingDate").show();

					   }, intervalInMilli+2000);


					 

				}

				function startTimer(duration, display) {
				    var timer = duration, minutes, seconds;
				 	var refreshIntervalId = setInterval(function () {
				        minutes = parseInt(timer / 60, 10);
				        seconds = parseInt(timer % 60, 10);

				        minutes = minutes < 10 ? "0" + minutes : minutes;
				        seconds = seconds < 10 ? "0" + seconds : seconds;

				        display.text(minutes + ":" + seconds);

				        if (--timer < 0) {
				        	$.get("https://itsthefinal.herokuapp.com/setStatus?person="+ userToServer);
				        	$(moveToMe).css('border','none');
				        	$(".onADate").hide();
						  	$(".trainWrapper").show();
							$("#h1Date").html("נסיעה שבוצעה");
							$(".countingDate").hide();
							$(".counting").show();
							$(moveToMe).css('border','none');
				            timer = duration;
				            clearInterval(refreshIntervalId);
				        }
				    }, 1000);
				}


				$(".x2").click(function(e){

					$(".isBusy").hide();

				});
				




				

			

});