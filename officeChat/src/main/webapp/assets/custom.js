var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);

    $("#startChating").click(function() {

        if( $("#userName").val() ) { // if user provides username
           $("#chatName").hide();
           $(".hideForm").show();
        }
    });
    $("#submitMessage").click(function() {

        var userName = $("#userName").val();
        var message  = $("#message").val();

     $.post("message.action", {
             message: message,
             userName: userName,
             uniqueId: uniqueId
         })
         .done(function(data) {
             //empty the message input
             $("#message").val("");
         });
     });
    var pusher = new Pusher('6ed215cc1d60c3aafb35', {// Replace with your PUSHER_APP_KEY
        cluster: 'ap2', // Replace with your PUSHER_APP_CLUSTER
        encrypted: true
      });

      var channel = pusher.subscribe('struts-chat');
      channel.bind('message', function(data) {

       var textDirection = (data.uniqueId == uniqueId) ? " text-right" : "";

        $("#msgItems").append(
              `<div id="chat-item" class="row` +textDirection+ `">
        <div class="cols-xs-4">
              <p>
                  <p><b>` +data.userName+ `</b></p><img src="http://placehold.it/30X30" class="img-circle img-responsive">`
                  +data.message+ `
              </p>

        </div>
    </div>`
        );
      });

