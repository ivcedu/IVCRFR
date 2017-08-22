<?php
    require("config.php");
    
    $PersonnelTypeID = filter_input(INPUT_POST, 'PersonnelTypeID');
    $FundingSrcID = filter_input(INPUT_POST, 'FundingSrcID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[FundSrcPersonnel] WHERE PersonnelTypeID = '".$PersonnelTypeID."' AND FundingSrcID = '".$FundingSrcID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);