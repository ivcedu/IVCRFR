<?php
    require("config.php");
    
    $PersonnelTypeID = filter_input(INPUT_POST, 'PersonnelTypeID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[PersonnelType] WHERE PersonnelTypeID = '".$PersonnelTypeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);