<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/friend.css">

    <?php include "../php/include_header.php"?>
    <title>Friends & Predictions</title>
</head>
<body>
<?php include "../php/header.php" ?>

<h1>Friends & Recent Predictions</h1>

<div class="friends-container">
    <div class="friends-list" id="friends-list">

    </div>
</div>

<template id="friend-prediction-template">
    <div class="friend-section">
        <div class="friend-header">
            <h2 class="friend-name"></h2>
            <span class="total-points"></span>
        </div>
        <div class="predictions-list">

        </div>
    </div>
</template>
<script src="./src/friend.js" defer></script>
</body>
</html>