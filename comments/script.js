jQuery(document).ready(function(){
	jQuery('.modal-title').click(function(){
		jQuery(this).toggleClass('active');
	});

  $('#discussion-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('discussion') // Extract info from data-* attributes
    var modal = $(this);
    $.getJSON('data/discussion'+recipient+'.json',function(data) {
    	var items = [];
    	$.each( data.discussions, function( key, val ) {
        var comment_body = val.answer;
        if(val.children.length > 0){
          comment_body += '<ul>';
          $.each(val.children, function(child_key, child_val){
            comment_body += '<li>';
            comment_body += child_val.child_answer;
            if(val.child_discussion !== ""){
              comment_body += '<ul><li><a href="#" class="read-more-link" data-child-discussion-id="'+child_val.child_discussion+'">Read More</a></li></ul>';
            }
            comment_body +='</li>';
          });
          comment_body += '</ul>';
        }
    		items.push(comment_body);
    	});
    	$('.modal-title', modal).html(data.title).removeClass('active');
    	$('.modal-body', modal).html('<ul></ul>');
    	$.each(items, function(key, val){
    		$('.modal-body ul', modal).append('<li>'+val+'</li>');
    	});
    });
  });


});