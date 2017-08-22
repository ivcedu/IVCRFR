<?php
    require("config.php");
    
    $CommitteeMbrID = filter_input(INPUT_POST, 'CommitteeMbrID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[CommitteeMbr] WHERE CommitteeMbrID = '".$CommitteeMbrID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);