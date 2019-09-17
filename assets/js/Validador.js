Validador=($Valor,$Tabla,$Id)=>{
 let Valor=jQuery('#'+$Valor).val();
console.log(Valor);
console.log ($Tabla);
console.log($Id);
jQuery.ajax({
            url:`php/Utlis/Utlis.php`,
            method:'POST',
            data : {'Peticion':'ValidaDuplicados','Valor':Valor,'Tabla':$Tabla,'Id':$Id},
            success:(data)=>{
                Obj=JSON.parse(data);
                //console.log(Obj);
                ///console.log(Object.keys(Obj).length)
                //JSON.stringify(obj)=='{}'
                if(Obj =='[]'){
                    console.log('SI procede ');
                    jQuery('#'+$Valor).addClass("is-valid");
                    jQuery('#'+$Valor).removeClass("is-invalid");
                    
                }else {
                    console.log('No procede ')
                    jQuery('#'+$Valor).addClass("is-invalid");
                    jQuery('#'+$Valor).val('');
                    document.getElementById($Valor).focus();
                    alert('El Id esta siendo usado por otro registro');
                }
                
            }
        });



}

ArmarSelect=($valor,$Tabla,$Id,$Des,$I)=>{
    jQuery.ajax({
        url:`php/Utlis/Utlis.php`,
        method:'POST',
        data : {'Peticion':'ArmaSelect','Tabla':$Tabla,'Id':$Id,'Des':$Des},
        success:(data)=>{  
            //console.log(data);
            
            Objeto=JSON.parse(data);
            Objeto2=JSON.parse(Objeto);
            
            var res='';
            Object.keys(Objeto2).forEach(
                key =>{
                    console.log(key, Objeto2[key])
                    $HtmlTablas=`
                    <option value='${Objeto2[key][$Id]}'>${Objeto2[key][$Des]}</option>
                      `;
                     res = res.concat($HtmlTablas);
                }) 
                Respuesta=' <option >Seleccione un Examen</option>' +res;
              jQuery('#'+$valor).html(Respuesta);
        }
    });

}

ValidaSession=()=>{
   jQuery.ajax({
               url:`php/Utlis/Utlis.php`,
               method:'POST',
               data : {'Peticion':'VerSessiones'},
               success:(data)=>{
                   $Usuario=data.trim();
                   console.log($Usuario.indexOf('Notice</b>:  Undefined index: USUARIO'))
                   if ($Usuario.indexOf('Notice</b>:  Undefined index: USUARIO')>0) {
                    window.location.replace("index.html");
                    
                   }else{
                       
                   }
               }
           });
   
   
   
   }
   ValidaSession();