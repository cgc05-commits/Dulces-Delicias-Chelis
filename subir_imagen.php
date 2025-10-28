<?php
$targetDir = "../uploads/";
$targetFile = $targetDir . basename($_FILES["imagen"]["name"]);
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

if (in_array($imageFileType, ["jpg", "jpeg", "png"])) {
  if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $targetFile)) {
    echo "Imagen subida correctamente.";
  } else {
    echo "Error al subir la imagen.";
  }
} else {
  echo "Formato no permitido.";
}
?>
