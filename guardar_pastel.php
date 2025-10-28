<?php
include 'conexion.php';

if (isset($_POST['tam'], $_POST['harina'], $_POST['relleno'])) {
  $tam = $_POST['tam'];
  $harina = $_POST['harina'];
  $relleno = $_POST['relleno'];
  $especificaciones = $_POST['especificaciones'] ?? '';
  $imagen = $_POST['imagen'] ?? '';

  $sql = "INSERT INTO pasteles (tamano, harina, relleno, especificaciones, imagen) VALUES (?, ?, ?, ?, ?)";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, "sssss", $tam, $harina, $relleno, $especificaciones, $imagen);
  mysqli_stmt_execute($stmt);
  echo "Pastel guardado correctamente.";
} else {
  echo "Faltan datos.";
}
?>
