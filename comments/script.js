jQuery(document).ready(function(){
  var modal = $('#discussion-modal');

	$('.modal-title', modal).click(function(){
		$(this).toggleClass('active');
	});

  $('#discussion-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var discussion = button.data('discussion');
    update_modal(discussion);
  });

  $('#modal-go-back').click(function(e){
    update_modal($(this).data('discussion'));
  });

  function update_modal(discussion){
    $.getJSON('data/discussion'+discussion+'.json',function(data) {
      var items = [];
      $.each( data.discussions, function( key, val ) {
        var comment_body = val.answer;
        if(val.children.length > 0){
          comment_body += '<ul>';
          $.each(val.children, function(child_key, child_val){
            comment_body += '<li>';
            comment_body += child_val.child_answer;

            var child_body = '';

            if(child_val.child_discussion !== ""){
              child_body = '<ul><li><p><a href="#" class="read-more-link" data-child-discussion-id="'+child_val.child_discussion+'">Read More</a></p></li></ul>';
            }

            comment_body += child_body;

            comment_body +='</li>';
          });
          comment_body += '</ul>';
        }
        items.push(comment_body);
      });
      console.log(items);
      $('.modal-title', modal).html(data.title).removeClass('active');
      $('.modal-body', modal).html('<ul></ul>');

      var content = '';
      $.each(items, function(key, val){
        content += '<li>'+val+'</li>';
      });

      $('.modal-body ul', modal).append(content);

      $('#modal-go-back', modal).attr('data-discussion', data.parent_discussion);
      if(data.parent_discussion === ''){
        $('#modal-go-back', modal).addClass('hidden');
      }
      else{
        $('#modal-go-back', modal).removeClass('hidden');
      }

      $('.read-more-link').click(function(e){
        e.preventDefault();
        update_modal($(this).data('child-discussion-id'));
      });
    });
  }


});