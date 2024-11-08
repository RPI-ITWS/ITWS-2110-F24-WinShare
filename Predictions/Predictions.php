<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Predictions</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="../assets/MainPage.css">
    <link rel="stylesheet" href="../assets/navbar.css">

    <link rel="stylesheet" href="./src/predictions.css"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>

<?php include '../php/header.php'; ?>

<header id="header1">Predictions</header>
<div id="mainframe">
    <div>
        <img src="../assets/Photos/teamLogo/hawks.png" alt="Left Image 1">
        <div class="content">
            <h2>Wednesday, 10/21</h2>
            <p>Semi-Finals</p>
        </div>
        <img src="../assets/Photos/teamLogo/hornets.png" alt="Left Image 1">
    </div>

    <div>
        <img src="../assets/Photos/teamLogo/nets.png" alt="Left Image 1">
        <div class="content">
            <h2>Thursday, 10/22</h2>
            <p>Semi-Finals</p>
        </div>
        <img src="../assets/Photos/teamLogo/magic.png" alt="Left Image 1">
    </div>

    <div>
        <img src="../assets/Photos/teamLogo/nets.png" alt="Left Image 1">
        <div class="content">
            <h2>Friday, 10/23</h2>
            <p>Finals</p>
        </div>
        <img src="../assets/Photos/teamLogo/hawks.png" alt="Left Image 1">
    </div>

    <div>
        <img src="../assets/Photos/teamLogo/nets.png" alt="Left Image 1">
        <div class="content">
            <h2>Friday, 10/23</h2>
            <p>Finals</p>
        </div>
        <img src="../assets/Photos/teamLogo/hawks.png" alt="Left Image 1">
    </div>

</div>



</body>
</html>