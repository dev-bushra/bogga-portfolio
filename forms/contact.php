<?php

  // The receiving email address 
  $receiving_email_address = 'bushragtv@gmail.com';

  // Check if the file 'php-email-form.php' is exists
  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    // include file 'php-email-form.php'
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  // Create a model from the file 'php-email-form.php'
  $contact = new PHP_Email_Form;
  // Access the contact methods ajax
  $contact->ajax = true;
  // Access the contact variable 'to'
  $contact->to = $receiving_email_address;
  // Access the contact variable 'form_name'
  $contact->from_name = $_POST['name'];
  // Access the contact variable 'form_email'
  $contact->from_email = $_POST['email'];
  // Access the contact variable 'subject'
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  // Access the contact methods add_message and pass POST method value to it and the target
  $contact->add_message( $_POST['name'], 'From');
  // Access the contact methods add_message and pass POST method value to it and the target
  $contact->add_message( $_POST['email'], 'Email');
  // Access the contact methods add_message and pass POST method value to it and the target
  $contact->add_message( $_POST['message'], 'Message', 10);

  // Display send method value
  echo $contact->send();
?>
