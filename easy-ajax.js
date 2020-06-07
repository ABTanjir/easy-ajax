/**
 * easy-ajax v 1.0
 * author: ABTanjir
 * author URI: https://abtanjir.com/
 * source: https://github.com/ABTanjir/easy-ajax/
  */
(function($){
    "use strict"
        
    function isJson(str) {
        return typeof str == 'object';
    }

    $(document).on('click', 'a.ajax', function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        if($(this).data('confirm')){
            if (!confirm($(this).data('confirm'))) return false;
        }

        $(this).parent().toggleClass('show');
        var _self = $(this);
        $.get(url, function(data, status){
            if(status == 'success'){
                if(data.remove){
                    $(_self).closest(data.remove).addClass('highlight').delay(300).queue(function(){
                        $(this).remove();
                    });
                }

                if(data.message){
                    toastr.options = {
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "positionClass": "toast-bottom-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    toastr[data.status](data.message);
                }

                if(data.refresh){
                    setTimeout(function(){
                        window.location.reload(1);
                    }, data.refresh);
                }
            }
            
        });
    });    

    $(document).on('submit', '.ajax', function(e){
        e.preventDefault();
        var action = $(this).attr('action');
        var method = $(this).attr('method');
        var _self = $(this);
        var isValidated = null;

        if(_self.hasClass('needs-validation')){
            if (_self[0].checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
                
                isValidated = false;
            }else{
                isValidated = true;
            }
            _self[0].classList.add('was-validated');
        }

        $('.form-control').each(function(i, obj) {
            if($(obj).parent().find('.invalid-feedback').length){
                $(obj).parent().find('.invalid-feedback').text(obj.validationMessage);
            }else{
                $(obj).parent().append('<em id="'+$(obj).attr('name')+'-error" class="error invalid-feedback">'+obj.validationMessage+'</em>');
            }
        });

        if($(this).data('confirm')){
            if (!confirm($(this).data('confirm'))) return false;
        }
        
        if(!_self.hasClass('ignore_validation')){
            if(isValidated === false) return false;
        }
        
        
        _self.find(":submit").prop('disabled', true);
        setTimeout(function(){
            _self.find(":submit").prop('disabled', false);
        }, 5000);
        
        var formData = new FormData(this);

        $.ajax({
            type: method,
            url: action,
            processData: false,
            contentType: false,
            data: formData, 
            success: function(data){
                if(data.message){
                    if(data.status != 'success'){
                        _self.find(":submit").prop('disabled', false);
                    }else{
                        _self.closest('.modal').modal("hide");
                    }
                    toastr.options = {
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "positionClass": "toast-bottom-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    toastr[data.status](data.message);
                }

                if(data.render_to){
                    $(data.render_to).html(data.html);
                    if(jQuery().bootstrapToggle) {
                        $(data.render_to).find("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle()
                    }
                    if(jQuery().datepicker) {
                        $(data.render_to).find(".datepicker").datepicker({
                            todayHighlight: true,
                            autoclose: true,
                            format: 'yyyy-mm-dd'
                        })
                    }
                }
                
                if(data.rerender){
                    $.ajax({
                        url: current_url,
                        type: 'GET',
                        success: function(res) {
                            var res = $.parseHTML(res);
                            if(!$(res).find(data.rerender)){
                                console.log('404', data.rerender);
                                data.rerender = '.app-content';
                            }
                            $(data.rerender).html($(res).find(data.rerender).html()).trigger('change');
                            console.log('reloaded', data.rerender);
                            if(data.scriptReload != false){
                                var reloadable = $('#reloadable').html();
                                $('#reloadable').html('').html(reloadable);
                            }
                        }
                    });
                }

                if(data.remove){
                    $(_self).closest(data.remove).addClass('highlight').delay(300).queue(function(){
                        $(this).remove();
                    });
                }
                
                if(data.empty){
                    $(data.empty).html('');
                }
                
                if(data.reset){
                    $(".select2").val("");
                    $(".select2").trigger("change");
                    $(".select2-tag").val("");
                    $(".select2-tag").trigger("change");
                    $(_self).trigger('reset')
                }
                
                if(data.refresh){
                    setTimeout(function(){
                        window.location.reload(1);
                    }, data.refresh);
                }
            }
        });
    });

})(jQuery);