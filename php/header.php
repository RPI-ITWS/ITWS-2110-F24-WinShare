<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
    session_unset();
    session_destroy();
    header("Location: /ITWS-2110-F24-winshare/Auth/Login/login.php");
    exit();
}
?>
<nav class="navbar navbar-expand-lg px-3"> 
    <div class="container-fluid">
        <a class="navbar-brand" href="#">WinShare</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/ITWS-2110-F24-winshare/index.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/ITWS-2110-F24-winshare/Statistics/index.html">Statistics</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/ITWS-2110-F24-winshare/Predictions/Predictions.html">Predictions</a>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto me-3">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <?php if (isset($_SESSION['user_id'])): ?>
                            <?= htmlspecialchars($_SESSION['username']); ?>
                        <?php else: ?>
                            Profile
                        <?php endif; ?>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="profileDropdown">
                        <?php if (isset($_SESSION['user_id'])): ?>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <form method="POST" action="" style="display: inline;">
                                    <input type="hidden" name="logout" value="1">
                                    <button type="submit" class="dropdown-item">Logout</button>
                                </form>
                            </li>
                        <?php else: ?>
                            <li><a class="dropdown-item" href="/ITWS-2110-F24-winshare/Auth/Login/login.php">Login</a></li>
                            <li><a class="dropdown-item" href="/ITWS-2110-F24-winshare/Auth/Signup/signup.php">Signup</a></li>
                        <?php endif; ?>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>