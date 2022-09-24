function getListUsers() {
    $('#users-table tbody').html("");
    $.ajax({
        type: "GET",
        url: "get-users",
        success: function (result) {
            let users = result;
            Object.keys(users).forEach(function (key) {
                let html = "<tr>" +
                    "<td>"+users[key].id+"</td>" +
                    "<td>"+users[key].name+"</td>" +
                    "<td onClick='getUserInfo(this, \"modal-update-user-info\" )' data-id='"+users[key].id+"'><span class=\"icon-pencil2\"></span></td>" +
                    "<td onClick='getUserInfo(this, \"modal-confirm\" )' data-id='"+users[key].id+"'><span class=\"icon-bin\"></span></td>" +
                    "</tr>"

                $('#users-table tbody').append(html);
                $('.show-when-data-available').css('visibility', 'visible');
            });
            $('.loading').hide();
        }
    })
}

function getUserInfo(elm, modal) {
    let id = $(elm).data('id');
    $.ajax({
        type: "GET",
        url: "user/"+id,
        success: function (result) {
            let user = result[0];
            if (modal.length)
            {
                $('#'+modal+' .user-placeholder-name').html(user.name);
                $('#'+modal+' .user-placeholder-id').html(user.id);
                $('#'+modal+' .id-user').val(user.id);
                $('#'+modal).attr('open', true);
            }
        }
    })
}

$('#new-user-form').on('submit', function(){
    let form = $(this);
    let formData = JSON.stringify(getFormData(form));
    $.ajax({
        type: "POST",
        url: "add-user",
        data: formData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('.show-when-data-available').css('visibility', 'hidden');
            $('.loading').show();
            getListUsers();
        }
    });
    return false;
});

$('#update-user-form').on('submit', function(){
    let form = $(this);
    let formData = getFormData(form);
    console.log(formData.id);
    $.ajax({
        type: "PUT",
        url: "user/"+formData.id,
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#modal-update-user-info').removeAttr('open');
            $('.show-when-data-available').css('visibility', 'hidden');
            $('.loading').show();
            getListUsers();
        }
    });
    return false;
});

function deleteUser()
{
    let userId = $('#modal-confirm .id-user').val();
    $.ajax({
        type: "DELETE",
        url: "user/"+userId,
        success: function (result) {
            $('.show-when-data-available').css('visibility', 'hidden');
            $('.loading').show();
            getListUsers();
        }
    });
}

$(document).ready(function(){
    getListUsers();
    $('#modal-user-information').attr('open', true);
});


/* INTERNAL USE */
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function closeModal(elm)
{
    let id = $(elm).data('target');
    $('#'+id).removeAttr('open');
}