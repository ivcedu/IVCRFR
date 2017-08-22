<?php
    require("config.php");
    
    $PersonnelType = filter_input(INPUT_POST, 'PersonnelType');
    
    $PersonnelType = str_replace("'", "''", $PersonnelType);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[PersonnelType] WHERE PersonnelType = '".$PersonnelType."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);