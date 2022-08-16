<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname="mission3";

/* Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}*/

/* Create database
$sql = "CREATE DATABASE mission3";
if ($conn->query($sql) === TRUE) {
  echo "Database created successfully";
} else {
  echo "Error creating database: " . $conn->error;
}*/

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // collect value of input field
  $name = $_POST['value'];
  if (empty($name)) {
    echo "Name is empty";
    exit(0);
  } else {
    echo $name;
    echo "Done"."<br>";
  }
}



//$sql = "Show tables";

  //echo "Table Sensor showon successfully";

/* sql to create table
$sql = "CREATE TABLE sensor (
SensorValue INT(8) 
)";

if ($conn->query($sql) === TRUE) {
  echo "Table Sensor created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}*/

$sql1 = "INSERT INTO sensor VALUES ('$name')";
$conn->query($sql1);

$sql = "SELECT SensorValue FROM sensor";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  $count=1;
  while($row = $result->fetch_assoc()) {
    echo "<br>"."id: ".$count." " . $row["SensorValue"];
    $count=$count+1;
  }
} else {
  echo "0 results";
}

$conn->close();
?>