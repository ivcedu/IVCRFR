<?php
    require("config.php");
    
    $CommitteeMbrID = filter_input(INPUT_POST, 'CommitteeMbrID');
    $Active = filter_input(INPUT_POST, 'Active');
    $CommitteeID = filter_input(INPUT_POST, 'CommitteeID');
    $ComChair = filter_input(INPUT_POST, 'ComChair');
    $ComName = filter_input(INPUT_POST, 'ComName');
    $ComEmail = filter_input(INPUT_POST, 'ComEmail');
    
    $ComName = str_replace("'", "''", $ComName);
    $ComEmail = str_replace("'", "", $ComEmail);

    $query = "UPDATE [".$dbDatabase."].[dbo].[CommitteeMbr] "
                ."SET Active = '".$Active."', CommitteeID = '".$CommitteeID."', ComChair = '".$ComChair."', ComName = '".$ComName."', ComEmail = '".$ComEmail."', Modified = getdate() "
                ."WHERE CommitteeMbrID = '".$CommitteeMbrID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);