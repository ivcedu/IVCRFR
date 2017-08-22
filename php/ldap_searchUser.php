<?php
    $server = "ivc.edu";
    $baseDN = "dc=ivc,dc=edu";
         
    $username = filter_input(INPUT_POST, 'username');
    $result = array();

    $ldapconn = ldap_connect($server);   
    if($ldapconn) {          
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

        $ldapbind = ldap_bind($ldapconn, "IVCSTAFF\\wifilookup", "lookitup"); 
        if($ldapbind) {
            $filter = "(&(objectClass=user)(objectCategory=person)(cn=".$username."))";
            $ladp_result = ldap_search($ldapconn, $baseDN, $filter);
            $data = ldap_get_entries($ldapconn, $ladp_result);

            if ($data != null) {
                if (array_key_exists('displayname', $data[0])) {
                    $name = $data[0]["displayname"][0];
                }
                if (array_key_exists('mail', $data[0])) {
                    $email = $data[0]["mail"][0];
                }
                if (array_key_exists('title', $data[0])) {
                    $title = $data[0]["title"][0];
                }
                if (array_key_exists('division', $data[0])) {
                    $division = $data[0]["division"][0];
                }
                if (array_key_exists('department', $data[0])) {
                    $department = $data[0]["department"][0];
                }
                if (array_key_exists('manager', $data[0])) {
                    $manager = setApproverUserName($data[0]["manager"][0]);
                }

                $result = array($name, $email, $title, $division, $department, $manager);
            }
        }          
        ldap_close($ldapconn);
    }
    echo json_encode($result);
    
    function setApproverUserName($manager) {
        $pos = strpos($manager, ',');
        return substr($manager, 3, $pos - 3);
    }