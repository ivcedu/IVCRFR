<?php
    require("config.php");
    
    $CommitteeID = filter_input(INPUT_POST, 'CommitteeID');
    $ComEmail = filter_input(INPUT_POST, 'ComEmail');
    
    $ComEmail = str_replace("'", "", $ComEmail);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[CommitteeMbr] WHERE CommitteeID = '".$CommitteeID."' AND ComEmail = '".$ComEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);