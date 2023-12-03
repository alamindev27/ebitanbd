$(document).on('submit','form#cart_form', function(e){
	e.preventDefault();

	// let size=$(document).find('button.active').data('quantity');
    let size='';

	// if (size.length==0) {
	// 	toastr.error('Please Select A Size At First');

	// 	return;
	// }

	let url=$(this).attr('action');
	let method=$(this).attr('method');
	let data= $(this).serialize()+ '&size=' + size;

	console.log(data);
	$.ajax({
        url: url,
        method: method,
        data: data,
        success: function (res) {
        	if (res.success) {
                toastr.success(res.msg);
                if (res.view) {
                	$(document).find('div#cart_section').html(res.view);
                }

                if (res.item) {
                	$(document).find('span.cart-count').text(res.item);
                }
              
                if(res.url){
                	document.location.href = res.url;
                }
                
            }else{
                toastr.error(res.msg);
            }
        },
        error:function (response){
            $.each(response.responseJSON.errors,function(field_name,error){
                toastr.error(error);
            })
        }
    });
});


 $(document).on('submit','form#cart_remove_form', function(e) {
    e.preventDefault(); 
    var ele=$(this);
    swal({
      title: "Are you sure?",
      text: "You want To Delete!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006400",
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel plz!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm){
      if (isConfirm) {

        let url=ele.attr('action');
        let method=ele.attr('method');
        let data= ele.serialize();

        $.ajax({
            type: method,
            url: url,
            data: data,
            success: function(res) {
                
                console.log(res);
                
                if(res.success==true){
                    toastr.success(res.msg);
                    $(document).find('span.cart-count').text(res.item);
                    $('div#cart-dropdown').html(res.html);
                    $(document).find('div.orderDetails').html(res.html2);
                    $(document).find('div.cart_other_details').html(res.html3);
                    /*if((res.segment) && (res.segment=='carts' || res.segment=='checkouts')){
                        window.location.reload();
                    }*/
                   if(res.item <= 0)
                    {
                      document.location.href = res.url;
                    }
                    
                }else if(res.success==false){
                    toastr.error(res.msg);
                }
                
            },
            error:function (response){
                
            }
        });
        swal.close();
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
});


$(document).on('click','a.cart-dropdown-btn', function(){

    let url=$(this).attr('href');
    $.ajax({
        url: url,
        method: "GET",
        data: {},
        dataType: "json",
        success: function (res) {
            if (res.success) {
                $('div#cart-dropdown').html(res.html);
            }else{
                toastr.error(res.msg);
            }
           
        }
    });

});
