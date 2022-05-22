<?php
if(isset($_POST['submit'])) {
$name = $_POST['name'];
$message= $_POST['message'];

$mailTo = "bushragtv@gmail.com";
$headers = "From: ".$mailForm;
$txt = "You have a mesg from your portfolio from ".$name.$message;

mail($mailTo, $name, $txt, $headers);

header("Location: index.html?MessageSend");
}

?>
