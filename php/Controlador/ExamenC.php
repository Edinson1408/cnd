<?php
/*Controlador  
GitHub:Edinson1408
email: edinsoncarlosflorian@gmial.com
*/
require '../Modelo/ExamenM.php';

/*class CarreraC extends */

 class ExamenC extends ExamenM
{
    

    public function BuscarExamen($POST){
        return $this->Examen($POST);
    }

   


    

}

$Obje=new ExamenC();

switch ($_POST['Peticion']) {
    case 'BuscarExamen':
        $vita=$Obje->BuscarExamen($_POST);
        echo $vita;
        break;

    default:
        # code...
        break;
}

?>