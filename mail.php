<?php
	$to      = 'ilez.kurskiev@gmail.com';
	$subject = 'Хотят с вами связаться';
	$message = 'Миша, кто-то увидев твой сайт визитку, оставил свой email чтобы ты с ним связался. Вот его email'.$_POST['email'];
	$headers = 'From: ilez.kurskiev@gmail.com' . "\r\n" .
	    'Reply-To: ilez.kurskiev@gmail.com' . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
?> 