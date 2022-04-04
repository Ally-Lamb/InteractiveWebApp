/*getHistory" takes the inputted calculation from "History-Value" via ID from the initial entry into the "Output" box*/
function getHistory(){
	return document.getElementById("history-value").innerText;
}
/*This function will print that inputted calculation into the top "history-value" box once an "Operator" button is clicked*/
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}

/*"Output-Value" will take the calculation from the history value box*/
function getOutput(){
	return document.getElementById("output-value").innerText;
}
/*This function will print the total */
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
//Function to add , between every third number//
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

//If Else Statements for operator keys//
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		//if id returns "clear button" return cleared history and output boxes//
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		//ce will delete a number from the right side of the equasion should you need to//
		else if(this.id=="ce"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substring(0,output.length-1);
				printOutput(output);
			}
		}
		//Prompts Error Message//
		else if (this.id=="error"){
			printHistory("Error");
		}
		//This will insure that if output input has run through a ce change it will display the same digit into history box//
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substring(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){
			output=output+this.id;
			printOutput(output);
		}
	});
}