<?php
    require("config.php");
    
    $StudentID = filter_input(INPUT_POST, 'StudentID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Student] WHERE StudentID = '".$StudentID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);