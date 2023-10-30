{

      // method to submit the form data for new post using AJAX
    let createHabbit = function(){
        let habbitForm = $('#createHabbitForm');
        habbitForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type : 'POST',
                url : '/create-habbit',
                data : habbitForm.serialize(),
                success : function(data){
                    console.log(data);
                    let newHabbit = habbitFormDOM(data.data.habbit);
                    $('#habbitContainer').prepend(newHabbit);
                    deleteHabbit($('  .delete-button', newHabbit));
                },error : function(err){
                    console.log(err.responseText);
                }

            })
        })
   }
//    method to create habbit in DOM
   
    let habbitFormDOM = (habbit) => {
        return $(`<li id="habbit-${habbit._id}">
                    <p>${habbit.habbit}</p>
                    <div id="linkRoute">
                        <div class="updateHabbit">
                            <a href="/update/habbit/${habbit._id}">Update</a>
                        </div>
                        <div class="delete-button">
                            <a href="/delete_habbit/${habbit._id}">
                            <i class="fa-solid fa-trash"></i>
                            </a>
                        </div>
                    </div>
                    
                </li>`)
    }


//    method to delete the habbit
    let deleteHabbit = function(deleteLink) {
        $(deleteLink).click(function(e) {
        e.preventDefault();
    
        $.ajax({
            type: 'GET',
            url: $(deleteLink).prop('href'),
            success: function(data) {
            $(`#habbit-${data.data.habit_id}`).remove();
            },
            error: function(err) {
            console.log(err.responseText);
            }
        });
        });
    };
    



   // loop over all the existing posts on the page (when the window loads for the first time) 
    // and call the delete post method on delete link of each, also add AJAX (using the class we've created)
    //  to the delete button of each
   let convertHabbitToAjax = ()=>{
    $(`#habbitContainer`).each(function(){
        let self = $(this);
        let deleteButton = $('  .delete-button',self);
        deleteHabbit(deleteButton);
    })
   }



   createHabbit();
   convertHabbitToAjax();
}