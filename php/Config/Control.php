<?php

session_start();
require 'Conexion.php';

class Control extends Conexion 
{
    public function ControlLogin($User,$Pass){
        //echo $User;
        //echo $Pass;
        
        
        $Sql="SELECT NOMBRE FROM `usuarios_tbl` WHERE NOMBRE='$User' AND CONTRASENA='$Pass' ";
        $Array=$this->SelectArray($Sql);
        echo $Array;
        if ($Array=='[]')
        {
            session_destroy();
        }
        else{
            $_SESSION['USUARIO']=$User;
        }
        
        //echo $_SESSION['USUARIO'];
    }

    public function TraerTipoUsuario(){
        $Usuario=$_SESSION['USUARIO'];
        $Sql="SELECT NOMBRE,TIPO_USUARIO FROM `usuarios_tbl` WHERE NOMBRE='$Usuario' ";
        $Array=$this->SelectArray($Sql);
        echo $Array;
    }
}

$Control=new Control();


switch ($_POST['Control']) {
    case 'Login':
        $Control->ControlLogin($_POST['User'],$_POST['Pass']);
        break;
    case 'TraerTipoUsuario':
            //echo $_SESSION['USUARIO'];
            $Control->TraerTipoUsuario();
        break;
    default:
        # code...
        break;
}





?>