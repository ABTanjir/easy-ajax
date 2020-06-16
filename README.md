# easy-ajax
Easy ajax helper for jquery

# dependency
-jQuery

-bootstrap

-boootstrap-validator

-toastr

-sweetalert

# form markup

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
[![N|Solid](https://abtanjir.com/examples/notification-ajax.png)]

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

----
Action for only form submittion
----

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


### Whats New V 1.1
Replaces old javascript alert with sweelt alert
[![N|Solid](https://abtanjir.com/examples/swal.png)]