/**
 * easy-ajax v 2
 * author: ABTanjir
 * author URI: https://abtanjir.com/
 * source: https://github.com/ABTanjir/easy-ajax/
  */
 if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function($) {
    "use strict"
    var EasyAjax = {
        init: function( options, elem ) {
            console.log('initializez...');
            self = this;
            self.elem = elem;
            self.$elem = $( elem );
            self.$elem.content = self.$elem.find(":submit").html();
            self.options = $.extend( {}, $.fn.easyajax.options, options );
            // self.toolbar = $('<div class="tool-container gradient" />').addClass('tool-'+self.options.position);
            self.setTrigger();
        },

        setTrigger: function() {
            var self = this;
            console.log('trigger set....');
            if(self.$elem.prop("tagName").toLowerCase() == 'form'){
                self.$elem.on('submit', function(e) {
                    e.preventDefault();
                    //validate from first
                    var isValidated = null
                    if(self.$elem.hasClass('needs-validation')){
                        if (self.elem.checkValidity() === false) {
                            e.preventDefault();
                            e.stopPropagation();
                            isValidated = false;
                        }else{
                            isValidated = true;
                        }

                        if(!self.$elem.hasClass('was-validated')){
                            self.realTimeValidate();
                        }
                        self.elem.classList.add('was-validated')
                    }
                    // self.$elem.remove();
                    self.$elem.find('.form-control').each(function(i, obj) {
                        if($(obj).parent().find('.invalid-feedback').length){
                            $(obj).parent().find('.invalid-feedback').text(obj.validationMessage);
                        }else{
                            $(obj).parent().append('<em id="'+$(obj).attr('name')+'-error" class="error invalid-feedback">'+obj.validationMessage+'</em>');
                        }
                    });

                    if(isValidated === false) return false;

                    if(self.$elem.data('confirm')){
                        self.sweetConfirm(self.$elem.data('confirm'), 'Click ok if you want to proceed', function(confirm){
                            if(confirm){
                                self.postRequest(e);
                            }
                        })
                    }else{
                        self.postRequest(e);
                    }
                });
            }else{
                // on [.ajax] link click
                self.$elem.on('click', function(e) {
                    e.preventDefault();
                    if(e.target.tagName.toLowerCase() === 'a'){
                        if(self.$elem.data('confirm')){
                            self.sweetConfirm(self.$elem.data('confirm'), 'Click ok if you want to proceed', function(confirm){

                                if(confirm){
                                    self.getRequest();
                                }
                            })
                        }else{
                            self.getRequest();
                        }
                    }
                });
            }

        },

        realTimeValidate: function(){
            var self = this;
            console.log('Realtime validation started...')
            self.$elem.on('input', function(e) {
                e.preventDefault();

                console.log('validationg...')
                $(this).closest('form').find('.form-control').each(function(i, obj) {
                    if(e.target.validationMessage.length == 0){
                        $(e.target).removeClass('is-invalid');
                        return true;
                    }
                    if($(obj).parent().find('.invalid-feedback').length){
                        $(obj).parent().find('.invalid-feedback').text(obj.validationMessage);
                    }else{
                        $(obj).parent().append('<em id="'+$(obj).attr('name')+'-error" class="error invalid-feedback">'+obj.validationMessage+'</em>');
                    }
                });
            });
        },

        // actions
        render_to: function(data){
            var self = this;
            $(data.render_to).html(data.html).trigger('changed');
            self.options.after_render(self.$elem, data)
        },

        notification: function(data){
            var self = this;
            if(data.status != 'success'){
                self.$elem.find(":submit").prop('disabled', false);
            }else{
                if (typeof self.$elem.closest('.modal').modal === 'function') {
                    self.$elem.closest('.modal').modal("hide");
                }
            }
            if(typeof self.options.notification === 'function'){
                self.options.notification(self.$elem, data)
            }else{
                if((typeof toastr !== 'undefined')){
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
            }
        },

        rerender: function(data){
            var self = this;
            var current_url = window.location.href;
            $.ajax({
                url: current_url,
                type: 'GET',
                success: function(data) {
                    var data = $.parseHTML(data);
                    if(!$(data).find(data.rerender)){
                        data.rerender = '.app-content';
                    }
                    $(data.rerender).html($(data).find(data.rerender).html()).trigger('change');

                    if(data.scriptReload != false){
                        var reloadable = $('#reloadable').html();
                        $('#reloadable').html('').html(reloadable);
                    }
                }
            });
        },

        remove: function(data){
            var self = this;
            self.$elem.closest(data.remove).css({"background":'#b2bec3', 'transition': 'linear background .3s'}).delay(300).queue(function(){
                $(this).remove();
            });
        },

        // ---------------------------.actions.-------------------------------- //

        validate: function() {
            //show form validation
            $('.form-control').each(function(i, obj) {
                if($(obj).parent().find('.invalid-feedback').length){
                    $(obj).parent().find('.invalid-feedback').text(obj.validationMessage);
                }else{
                    $(obj).parent().append('<em id="'+$(obj).attr('name')+'-error" class="error invalid-feedback">'+obj.validationMessage+'</em>');
                }
            });
        },

        isJson: function(str){
            return typeof str == 'object';
        },

        sweetConfirm: function(title, message, callback) {
            if((typeof Swal !== 'undefined')){
                Swal.fire({
                    title: title,
                    text: message,
                    type: 'warning',
                    showCancelButton: true
                }).then((confirmed) => {
                    callback(confirmed && confirmed.value == true);
                });
            }else{
                if(confirm(title)){
                    callback(true)
                }
            }
        },

        getRequest: function(){
            var self = this;
            var url = self.$elem.attr('href');

            self.options.before_ajax(self.$elem);
            $.get(url, function(data, status){
                self.options.after_ajax(self.$elem, data);
                if(status == 'success'){
                    if(!self.isJson(data)){
                        data = JSON.parse(data)
                    }

                    if(data.message){
                        self.notification(data);
                    }

                    if(data.render_to){
                        self.render_to(data);
                    }

                    if(data.rerender){
                        self.rerender(data);
                    }

                    if(data.remove){
                        self.remove(data);
                    }

                    if(data.empty){
                        $(data.empty).html('');
                    }

                    if(data.reset){
                        $(_self).trigger('reset');
                    }

                    if(data.refresh){
                        setTimeout(function(){
                            window.location.reload(1);
                        }, data.refresh);
                    }
                }else{
                    self.options.error_ajax(self.$elem, xhr);
                }
            });
        },

        postRequest: function(e){
            var self = this;
            var btn_submit = self.$elem.find(":submit");
            // var stn_submit_content = btn_submit.html() //store content of submit button
            btn_submit.prop('disabled', true);
            //enable submit button after certain second
            if(self.options.autoEnable){
                setTimeout(function(){
                    btn_submit.html(self.$elem.content)
                    btn_submit.prop('disabled', false);
                }, self.options.autoEnable);
            }

            var action = self.$elem.attr('action');
            var method = self.$elem.attr('method');
            var formData = new FormData(self.elem);

            self.options.before_ajax(self.$elem);
            $.ajax({
                type: method,
                url: action,
                processData: false,
                contentType: false,
                data: formData, // serializes the form's elements.
                success: function(data){
                    self.options.after_ajax(self.$elem, data);

                    if(!self.isJson(data)){
                        data = JSON.parse(data)
                    }

                    if(data.message){
                        self.notification(data);
                    }

                    if(data.render_to){
                        self.render_to(data);
                    }

                    if(data.rerender){
                        self.rerender(data);
                    }

                    if(data.remove){
                        self.remove(data);
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
                },
                error: function(xhr){
                    self.options.error_ajax(self.$elem, xhr);

                    //enable submit form
                    btn_submit.html(self.$elem.content)
                    btn_submit.prop('disabled', false);
                }
            });
        }

    };

    $.fn.easyajax = function( options ) {
        return this.each(function() {
            var easyAjaxObj = Object.create( EasyAjax );
            easyAjaxObj.init( options, this );
        });
    };

    $.fn.easyajax.options = {
        autoEnable: 5000,
        notification: null,
        after_render: function(el, data){},
        before_ajax: function(el, data){},
        after_ajax: function(el, data){},
        error_ajax: function(el, data){},
    };

}) (jQuery);
