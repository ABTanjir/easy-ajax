<?php
    header('Access-Control-Allow-Origin: *');

    $status = $_GET['status'];
    if(isset($status)){
        $response = array(
            'status'=> $_GET['status'],
            'message'=> 'Link clicked successfully!',
        );
    }
    
    $remove = $_GET['remove'];
    if(isset($remove)){
        $response = array(
            'status'=> 'success',
            'message'=> 'Line removed successfully!',
            'remove'=> '.line'
        );
    }

    $render_to = $_GET['render_to'];
    if(isset($render_to)){        
        $response = array(
            'status'=> 'success',
            'message'=> 'Say meaw to cat!',
            'html'=> '<h4>Meaw Cat!</h4>',
            'render_to'=> '#info1'
        );
    }

    $render_to_confirm = $_GET['render_to_confirm'];
    if(isset($render_to_confirm)){        
        $response = array(
            'status'=> 'success',
            'message'=> 'Captain cat said meaw!',
            'html'=> '<h4>Meaw Captain Cat!</h4>',
            'render_to'=> '#info1'
        );
    }

    $clear = $_GET['clear'];
    if(isset($clear)){        
        $response = array(
            'status'=> 'success',
            'message'=> 'Link clicked successfully!',
            'empty'=> '#info1'
        );
    }

    $refresh = $_GET['refresh'];
    if(isset($refresh)){        
        $response = array(
            'status'=> 'success',
            'message'=> 'Page will refresh after 5 sec!',
            'refresh'=> 5000
        );
    }

    $post = $_GET['post'];
    if(isset($post)){      
        $response = array(
            'status'=> 'success',
            'message'=> 'Form submitted successfully'
        );
        if($_POST['name']) $response['message']="Hello ".$_POST['name'];
    }

    $post_render = $_POST['post_render'];
    if(isset($post_render)){      
        $response = array(
            'status'=> 'success',
            'message'=> 'Captain cat said meaw!',
            'html'=> '<h4>Hello '.$post_render.'!</h4>',
            'render_to'=> '#info2'
        );
    }

    echo json_encode($response);
?>