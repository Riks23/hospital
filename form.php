<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/Exception.php';

    $mail = new PHPMailer(true);
    $mail ->CharSet = 'UTF-8';
    $mail ->setLanguage('ru','phpmailer/language/');
    $mail ->IsHTML(true);

    $mail -> setFrom('danel.2002@yandex.ru');
    $mail ->Subject = 'Задание Данила Работает ли ?';

    $body ='<h1>Письмо!!!';
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['subname']))){
        $body.='<p><strong>Фамилия:</strong>'.$_POST['subname'].'</p>';
    }
    if(trim(!empty($_POST['Patronymic']))){
        $body.='<p><strong>Отчество:</strong>'.$_POST['Patronymic'].'</p>';
    }
    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Телефон:</strong>'.$_POST['phone'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>Email:</strong>'.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['age']))){
        $body.='<p><strong>Возраст:</strong>'.$_POST['age'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong>'.$_POST['message'].'</p>';
    }

    if(!empty($_FILES['image']['tmp_name'])){
        $filePath = __DIR__."/files/" .$_FILES['image']['name'];

        if(copy($_FILES['iamge']['tmp_name'], $filePath)){
            $fileAttach=$filePath;
            $body.='<p><strong>Фото в приложении</strong>';
            $mail ->addAttachment($fileAttach);
        }
    }
    $mail->Body=$body;

    if(!$mail-> send()){
        $message='Ошибка';
    }
    else{
        $message='Привет письмо отправленно!'
    }
    $response=['message'=>$message];
    header('Content-type: application/json');
    echo json_encode($response);
?>
