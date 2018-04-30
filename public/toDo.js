// check off specific to dos by clicking 
// when a ul is clicked inside a li
$("#todos").addClass('active');
var deletedArr = new Array();
$("#todos").on("click","li",function(){
	$(this).toggleClass("completed");
});
$("ul").on("click",".trash",function(event){
	$(this).parent().fadeOut(500, function(){
		deletedArr.push();
		var oldToDo = $(this).text();
		$("#deleted").append("<li>"+oldToDo+"</li>");
		remove()});
	event.stopPropagation();
});
$("#write").keypress(function(event){
	if (event.which === 13){
		var newToDo = $(this).val();
		$(this).val("");
		$("#todos").append("<li><span class = 'trash'><i class='fas fa-trash-alt'></i></span> "+newToDo+"</li>");
	}
})




