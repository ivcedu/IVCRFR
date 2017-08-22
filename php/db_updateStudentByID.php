<?php
    require("config.php");
    
    $StudentID = filter_input(INPUT_POST, 'StudentID');
    $Active = filter_input(INPUT_POST, 'Active');
    $StuName = filter_input(INPUT_POST, 'StuName');
    $StuEmail = filter_input(INPUT_POST, 'StuEmail');
    $AprMgrID = filter_input(INPUT_POST, 'AprMgrID');
    $AprVPPID = filter_input(INPUT_POST, 'AprVPPID');
    
    $StuName = str_replace("'", "''", $StuName);
    $StuEmail = str_replace("'", "", $StuEmail);

    $query = "UPDATE [".$dbDatabase."].[dbo].[Student] "
                . "SET Active = '".$Active."', StuName = '".$StuName."', StuEmail = '".$StuEmail."', AprMgrID = '".$AprMgrID."', AprVPPID = '".$AprVPPID."', Modified = getdate() "
                . "WHERE StudentID = '".$StudentID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);