
<?php 
/*Incluir las conexiones*/
//Utlis.php
session_start();
require '../Config/Conexion.php';
class UtlisM extends Conexion
{
    public function ValidaDuplicados($Valor,$Tabla,$Campo){
         $Sql="SELECT * FROM $Tabla WHERE $Campo = '$Valor' ";
        $Query=$this->SelectArray($Sql);
        echo json_encode($Query);
    }    

    public function ArmaSelect($Tabla,$Id,$Des){
            $Sql="SELECT $Id,$Des FROM $Tabla";
            $Query=$this->SelectArray($Sql);
            return json_encode($Query);
    }

    public function ArmaSelectCascada($Tabla,$Id,$Des,$CampoWhere,$ValorWhere){
        $Sql="SELECT $Id,$Des FROM $Tabla where $CampoWhere = '$ValorWhere' ";
        $Query=$this->SelectArray($Sql);
        return json_encode($Query);
    }

    public function CambiarContrasena($POST){
        $Sql="UPDATE `usuarios_tbl` SET `CONTRASENA`='".$POST['Pass']."' WHERE NOMBRE='".$POST['Usuarios']."' ";
        $this->Query($Sql);
        //session_start();
        session_destroy();
        
         
        
    }

    public function VerSessiones(){
        
        $Sql="SELECT * FROM usuarios_tbl WHERE NOMBRE='".$_SESSION['USUARIO']."' ";
        $Query=$this->SelectArray($Sql);
        echo $Query;
    }
}

$Objeto= new UtlisM();

switch ($_POST['Peticion']) {
    case 'ValidaDuplicados':
        $Objeto->ValidaDuplicados($_POST['Valor'],$_POST['Tabla'],$_POST['Id']);
        break;
    case 'ArmaSelect':
        $selec=$Objeto->ArmaSelect($_POST['Tabla'],$_POST['Id'],$_POST['Des']);
        echo $selec;
        break;
    case 'ArmaSelectCascada':
            $selec=$Objeto->ArmaSelectCascada($_POST['Tabla'],$_POST['Id'],$_POST['Des'],$_POST['CampoW'],$_POST['ValorW']);
            echo $selec;
        break;
    case 'VerSessiones':
        //echo $_SESSION['USUARIO'];
        $Objeto->VerSessiones($_POST);
        break;
    case 'CambiarContrasena':
        $Objeto->CambiarContrasena($_POST);
        break;
    default:
    case 'Salir':
    session_destroy();
        break;
        # code...
        break;
}

?>

