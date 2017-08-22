<?php
    require("config.php");
    
    $FundSrcPersonnelID = filter_input(INPUT_POST, 'FundSrcPersonnelID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[FundSrcPersonnel] WHERE FundSrcPersonnelID = '".$FundSrcPersonnelID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);