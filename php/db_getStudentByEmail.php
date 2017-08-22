<?php
    require("config.php");
    
    $StuEmail = filter_input(INPUT_POST, 'StuEmail');
    
    $StuEmail = str_replace("'", "", $StuEmail);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Student] WHERE StuEmail = '".$StuEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);