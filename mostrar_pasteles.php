<?php
include 'conexion.php';

$result = mysqli_query($conn, "SELECT * FROM pasteles ORDER BY fecha DESC");

while ($row = mysqli_fetch_assoc($result)) {
  echo "<div class='gallery-card'>";
  echo "<img src='uploads/" . htmlspecialchars($row['imagen']) . "' alt='Pastel'>";
  echo "<h3>" . htmlspecialchars($row['tamano']) . "</h3>";
  echo "<p>" . htmlspecialchars($row['harina']) . " - " . htmlspecialchars($row['relleno']) . "</p>";
  echo "<small>" . htmlspecialchars($row['especificaciones']) . "</small>";
  echo "</div>";
}
?>
