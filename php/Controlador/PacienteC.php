<?php
/*Controlador  
GitHub:Edinson1408
email: edinsoncarlosflorian@gmial.com
*/
require '../Modelo/PacienteM.php';

/*class CarreraC extends */

 class PacienteC extends PacienteM
{
    

    public function BuscarPaciente($POST){
        return $this->Paciente($POST);
    }

   


    

}

$Obje=new PacienteC();

switch ($_POST['Peticion']) {
    case 'BuscarPaciente':
        $vita=$Obje->BuscarPaciente($_POST);
        echo $vita;
        break;

    default:
        # code...
        break;
}

?>