<?php
include 'conexion.php';

if (isset($_POST['nombre'], $_POST['email'], $_POST['mensaje'])) {
  $nombre = trim($_POST['nombre']);
  $email = trim($_POST['email']);
  $mensaje = trim($_POST['mensaje']);

  if (!empty($nombre) && filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($mensaje)) {
    $sql = "INSERT INTO contacto (nombre, email, mensaje) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $nombre, $email, $mensaje);
    mysqli_stmt_execute($stmt);
    echo "Mensaje enviado correctamente.";
  } else {
    echo "Datos inválidos.";
  }
} else {
  echo "Faltan datos.";
}
?>
