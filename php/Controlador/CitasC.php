<?php
/*Controlador  
GitHub:Edinson1408
email: edinsoncarlosflorian@gmial.com
*/
require '../Modelo/CitasM.php';

/*class CarreraC extends */

 class CitasC extends CitasM
{
    

    public function AgregarDoctor($POST){
        return $this->RegistrarCita($POST);
        print_r($POST);

    }

    public function AgregarTomografo2($POST){
        return $this->RegistrarCita2($POST);
    }


    public function ValidaCruce($POST)
    {
        $Res=$this->consultarCurce($POST);
        $Respuesta= array('Respuesta' => $Res);
        echo json_encode($Respuesta);
    }
   
    public function EliminarTemporal($POST)
    {
         $this->DeleteTemporal($POST);
    }

    public function BuscarPrecio($POST){
        return $this->PrecioExamen($POST);
    }

    public function MostrarCita($POST){
        return $this->VerCita($POST);
    }
    public function MostrarCitas($POST){
        return $this->VerTodasCitas($POST);
    }

    public function ActualizaCita($POST){
            $this->UpdateCita($POST);
    }
}

$Obje=new CitasC();

switch ($_REQUEST['Peticion']) {
    case 'AgregarDoctor':
        $vita=$Obje->AgregarDoctor($_POST);
        echo $vita;
        break;
    case 'ValidaCruce':
            $Obje->ValidaCruce($_POST);
        break;
    case 'EliminaTemporal':
            $Obje->EliminarTemporal($_POST);
        break;
    case 'BuscarPrecio':
            $Precio=$Obje->BuscarPrecio($_POST);
            echo $Precio;
        break;
    case 'TrarCita':
        $MostrarCita=$Obje->MostrarCita($_POST);
        echo $MostrarCita;

        break;
    case 'MostrarCitas':
        $MostrarCitas=$Obje->MostrarCitas($_REQUEST);
        echo $MostrarCitas;
        break;
    case 'ActualizaCita':
            $Obje->ActualizaCita($_POST);
        break;
    
    case 'TomoGrafo2Insert':
        $vita=$Obje->AgregarTomografo2($_POST);
        echo $vita;
        break;

    default:
        # code...
        break;
}

?>