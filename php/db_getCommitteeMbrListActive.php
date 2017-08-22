<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[CommitteeMbr] WHERE Active = 1 ORDER BY ComName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);