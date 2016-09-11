$(".input").click(function(){
  updateEquation($(this)[0].innerHTML);
});
$(".equals").click(function(){
  var $equation = $("#equation")[0];
  if(!checkIfOperatorODeciaml($equation.innerHTML.slice(-1))){
		setEquation($("#answer")[0], $equation);
	}
});
$(".clear").click(function(){
  clearEquation();
  clearOperator();
});
$(".clear-operator").click(function(){
	clearOperator();
});
function updateEquation(strToAppend){
	var $equation = $("#equation")[0];
	var $answer = $("#answer")[0];
	resetEquation($answer, strToAppend, $equation);
	if($equation.innerHTML == undefined || $equation.innerHTML == ""){
		setInitialEquation($equation, strToAppend);
	} else{
		setInput(strToAppend, $("#operator")[0], $equation);
	}
}
function resetEquation($answer, strToAppend, $equation){
	if($answer.innerHTML != undefined && $answer.innerHTML != ""){
		if(!checkIfOperator(strToAppend)){
			$equation.innerHTML = "";
		}
		$answer.innerHTML = "";
	}
}
function setEquation($answer, $equation){
	var formattedEquation = $equation.innerHTML.split(multiplicationOperator()).join("*");
	formattedEquation = formattedEquation.split(minusOperator()).join("-");
	formattedEquation = formattedEquation.split(divisionOperator()).join("/");
	$equation.innerHTML = eval(formattedEquation);
	$answer.innerHTML = $equation.innerHTML;
}
function setInitialEquation($equation, input){
	if(input == "."){
		input = formatDecimalInput(input);
	}
	if(!checkIfDivideOrMultiply(input) ){
		$equation.innerHTML = input;
	};
}
function setInput(input, $operator, $equation){
	if(input == "." && !previousIsDecimal($equation.innerHTML)){
		if(previousIsOperator($equation.innerHTML)){
			input = formatDecimalInput(input);
		}
		addInputToEquation(input, $equation, $operator);
	}
	else if(checkIfOperator(input)){
		if(previousIsDecimal($equation.innerHTML)){
			console.log(removeLastCharacter($equation.innerHTML));
			$equation.innerHTML = removeLastCharacter($equation.innerHTML);
		}
		setOperator($operator, $equation, input);
	} else if(checkIfEquationHasDecimal(input, $equation) || (input != ".")){
		addInputToEquation(input, $equation, $operator);
	}
}
function formatDecimalInput(input){
	return "0" + input;
}
function previousIsDecimal(equation){
	return equation[equation.length - 1] == ".";
}
function previousIsOperator(equation){
	return checkIfOperator(equation[equation.length - 1]);
}
function setOperator($operator, $equation, input){
	if(($operator.innerHTML == "") || ($operator.innerHTML == undefined)){
		$equation.innerHTML = $equation.innerHTML + input;
		$operator.innerHTML = input;
	}
}
function addInputToEquation(input, $equation, $operator){
	$operator.innerHTML = "";
	$equation.innerHTML = $equation.innerHTML + input;
}
function checkIfEquationHasDecimal(input, $equation){
	var operators = ['\\\+', minusOperator(), multiplicationOperator(), divisionOperator()];
	var substrings = $equation.innerHTML.split(new RegExp(operators.join('|'), 'g'));
	return (input == "." && substrings[substrings.length - 1].indexOf(".") < 0);
}
function checkIfOperator(input){
	return (checkIfDivideOrMultiply(input) || input == "+" || input == minusOperator())
}
function checkIfDivideOrMultiply(input){
	return (input == divisionOperator() || input == multiplicationOperator())
}
function checkIfOperatorODeciaml(input){
	return checkIfOperator(input) || input == "."
}
function divisionOperator(){
	return String.fromCharCode(247);
}
function multiplicationOperator(){
	return String.fromCharCode(215);
}
function minusOperator(){
	return String.fromCharCode(8722);
}
function clearEquation(){
	$("#equation")[0].innerHTML = "";
}
function clearOperator(){
	var $equation = $("#equation")[0];
	$("#operator")[0].innerHTML = "";
	$equation.innerHTML = removeLastCharacter($equation.innerHTML);
}
function removeLastCharacter(string){
	return string.substring(0, string.length - 1);
}