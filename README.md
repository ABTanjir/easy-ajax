# easyajax
easyajax jQuery Plugin
[Live Exaple](https://abtanjir.com/demo/easyajax/example/)
# Dependency
-jQuery

# Good to have
This plugins are not required but if you want to show toastr notification & sweetalert just integrate toastr & sweetalert plugin
easy ajax will automatically use those instead of alert

-bootstrap

-toastr

-sweetalert

```html    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.min.js"></script>
```
# Intrgrate easyajax

```html
    <script type="text/javascript" src="../easyajax.js"></script>
```

Select dom and initiate easyajax
```js
    $('.ajax').easyajax();
```

# easyajax callback functions
```js
$('.ajax').easyajax({
    autoEnable: "[false || time in mili second]",
    after_render: function(elem, data){
        // code
    },
    before_ajax: function(elem){
        console.log('before');
    },
    after_ajax: function(elem, data){
        console.log('after');
    },
    error_ajax: function(elem, xhr){
        console.log(xhr);
    }
});
```

If you don't want to use toastr or want to manage your notification

```js
$('.ajax').easyajax({
    notification: function(elem, data){
        //code
        alert(data.message);
    }
});
```

# Form markup

```html
<!-- just add a class *ajax* in your form element-->
<form action="" class="ajax">

<!-- if you want to use validation-->
<form action="" class="ajax needs-validation" novalidation="true">

<!-- if you want to force ignore validation-->
<form action="" class="ajax ignore_validation">
```

# href markup
if you want a link (href tag) to be submitted as ajax just simply add the class ajax in it
as you have initiates `.ajax` dom with easyajax

```html
<a href="http://sample.com/ajax/get" class="ajax" >
<!-- if you want to show a confirm alart -->
<a href="http://sample.com/ajax/get" class="ajax" data-confirm="are you suere you are doing this?" >
```

# Responses with action
response must be a json object

```json
{
"status":"success", 
"message":"Success message."
}
```
**status** must be [success, error, warning, info] 
**message** this can be html or plain string
[![N|Solid](https://abtanjir.com/examples/notification-ajax.png)

if you use sweetalert confirmation message will trigger swal confirmation box
[![N|Solid](https://abtanjir.com/examples/swal.png)

# There are few interesting action you can take only with response


#### Below response will remove closest **class_name** dom
```json
{
"status":"success", 
"message":"Deleted item successfully.",
"remove":".class_name"
}
```

#### If you want to refresh  or reload a part of your html page.
this will rerender the dom (#id_name) only after ajax request.
```json
{
"status":"success", 
"message":"Deleted item successfully.",
"rerender":"#id_name"
}
```

#### If you want to refresh the page
this response will refresh your page after 3 sec
```json
{
"status":"success", 
"message":"Deleted item successfully.",
"refresh":"3000"
}
```
empty an html dom after ajax success/error
```json
{
"empty":".class_name"
}
```
trigger form reset
```json
{
"reset":"true"
}
```
