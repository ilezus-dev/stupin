<?php
	$to      = 'mikhail@stupin.it';
	$subject = 'C Вами хотят связаться';
	$message = 'Михаил, кто-то увидев твой сайт визитку, оставил свой email чтобы ты с ним связался. Вот его email: ' . $_POST['email'] . '';
	$headers = 'From: ' . $_POST['email'] . "\r\n" .
	    'Reply-To: ' . $to . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
?> 