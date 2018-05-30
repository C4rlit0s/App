/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods                     //
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    function showEditProfile() {
    $ionicModal.fromTemplateUrl('templates/modal/edit-profile.html', {
      scope: $scope,
      animation: 'slide-in-up',
      hideDelay:920
    }).then(function(modal) {
      $scope.modalSettings = modal;
      $scope.modalSettings.show();
      $scope.hideSettings = function(){
        $scope.modalSettings.hide();
      }
    });
  };

})

.controller('LoginCtrl', function($ionicLoading, $scope, $http, $sce, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, $state) {

    $ionicSideMenuDelegate.canDragContent(false)



//Registro
      $scope.rsJSON = [ ];

      $scope.entrar = function() {
         consultarUsuario($http,$scope);
        };

 function consultarUsuario($http,$scope){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/index.php',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     data: { usuario : $scope.usuario1 , 
            password : $scope.password2 , 
              nombre : $scope.nombre , 
            apellido : $scope.apellido , 
           direccion : $scope.direccion , 
              correo : $scope.correo , 
                telf : $scope.telf , 
              pueblo : $scope.pueblo },
     dataType: "jsonp"
    }

    $http(req)
            .success(function(data, espera){ 
                 swal("Exito!", "Tu cuenta ha sido creada.", "success");
                  location.reload();
             })
              .error(function(data) {
            swal("Ooops!", "Has tenido problemas con el servidor. Prueba con otro usuario u otra contraseña...", "error");
        });    
  
}

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
        
    }, 0);
    ionicMaterialInk.displayEffect();

})

.controller('EntrarCtrl', function($scope, $http, $state, $stateParams) {

    

    //Login
     $scope.rsJSON = [ ];

     
     $scope.login = function() {
        Login($http,$scope);
      };


 function Login($http,$scope){



    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/login.php',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded' },
     data: {      usuario  : $scope.usuario , 
                  password : $scope.password },
     dataType: "jsonp"
    }

    $http(req)
       .success(function(data, profile) {
           if (typeof(data.password && data.usuario) == "undefined"){
                swal("Ooops!", "No te has registrado.", "error");  
           }else{
               $state.go('app.profile', {data: data.id_user_c})
               swal("Bienvenido!", data.nombre, "success")
           }
        })
        .error(function(dataLogin) {
         swal("Ooops!", "Has tenido problemas con el servidor. Verifica tus datos!", "error");
        });

}
})

.controller('RegistrarCtrl', function($scope, $http, $state, $stateParams) {

  //Llamada por ID
 $scope.edit = function(data){

           $http.get('http://www.im20.org/ionicBD/select_id_user.php/'+($stateParams.data))

           .success(function(datos){
            $scope.cliente = datos;
          });
};
$scope.edit();


     $scope.rsJSON = [ ];
      $scope.register = function() {
        Register($http,$scope);
      };

 function Register($http,$scope){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/register.php/'+($stateParams.data),
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded' },
     data: {     
                    name_c : $scope.name_c ,
                      tel1 : $scope.tel1 ,
                   email_c : $scope.email_c ,
                  physical : $scope.physical },
                   dataType: "jsonp"
    }
    $http(req)
            .success(function(data, formactividad){ 
                 swal("Exito!", "Tu cliente ha sido registrado.", "success");
                  $state.go('app.profile.friends')
             })
              .error(function(data) {
            swal("Ooops!", "Has tenido problemas con el servidor", "error");
        });  

}
})

.controller('RegistrarReporteCtrl', function($scope, $http, $state, $stateParams) {

  $scope.importar1 = function(data){

           $http.get('http://www.im20.org/ionicBD/select-cliente.php/'+($stateParams.data))

           .success(function(datos){

            $scope.equipos1 = datos;
           
    });

    $scope.cambiausuario = function(usuario){
    $scope.usuario = usuario;
    $scope.usuarios = null;
    }
};
$scope.importar1();

  $scope.importar = function(data){

           $http.get('http://www.im20.org/ionicBD/clientactivity.php/'+($stateParams.data))

           .success(function(datos){

            $scope.equipos = datos;
           
    });
};
$scope.importar();


     $scope.rsJSON = [ ];
      $scope.register = function() {
        Register($http,$scope);
      };

 function Register($http,$scope){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/register-reports.php',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded' },
     data: {    
                id_reports : $scope.id_reports ,
                   id_user : $scope.id_user ,
           aver_pay_energy : $scope.aver_pay_energy ,
              date_reports : $scope.date_reports ,
                    cuenta : $scope.cuenta ,
                      pies : $scope.pies , 
                  personas : $scope.personas ,
                   id_pais : $scope.id_pais ,
                  id_rtype : $scope.id_rtype ,
                  typocalc : $scope.typocalc ,
                    medida : $scope.medida ,
              report_price : $scope.report_price },
                   dataType: "jsonp"
    }
    $http(req)
            .success(function(data, formactividad){ 
                 swal("Exito!", "Tu reporte ha sido creado.", "success");
                  $state.go('app.profile.reportePdf')
             })
              .error(function(data) {
            swal("Ooops!", "Has tenido problemas con el servidor", "error");
        });  

}
})

.controller('EditarReporteCtrl', function($scope, $http, $state, $stateParams) {

  $scope.importar = function(id){

           $http.get('http://www.im20.org/ionicBD/select_report.php/'+($stateParams.id))

           .success(function(datos){

            $scope.equipos = datos;
           
    });
};
$scope.importar();


     $scope.rsJSON = [ ];
      $scope.update = function() {
        Update($http,$scope);
      };

 function Update($http,$scope){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/updatereports.php/'+($stateParams.id),
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     data: {  
             aver_pay_energy : $scope.usuario.aver_pay_energy ,
                      cuenta : $scope.usuario.cuenta ,
                        pies : $scope.usuario.pies , 
                    personas : $scope.usuario.personas ,
                    id_rtype : $scope.usuario.id_rtype ,
                    typocalc : $scope.usuario.typocalc ,
                      medida : $scope.usuario.medida ,
                report_price : $scope.usuario.report_price },
                     dataType: "jsonp"

    }


    $http(req)
            .success(function(data){ 
                 swal("Exito!", "Tu reporte ha sido actualizado.", "success");
                  $state.go('app.activity')

             })
              .error(function(data) {
            swal("Ooops!", "Has tenido problemas con el servidor", "error");
          
        });

}
})

.controller('EditarEquipoCtrl', function($scope, $http, $state, $stateParams) {


  $scope.importar = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-edit-equipo.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.equipo = datos;
           
    });
};
$scope.importar();


     $scope.rsJSON = [ ];
      $scope.updateequipo = function() {
        UpdateEquipo($http,$scope);
      };

 function UpdateEquipo($http,$scope){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/updateequipo.php/'+($stateParams.clienteID),
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     data: {       
                  consumo_ritems : $scope.usuario.consumo_ritems ,
                    horas_ritems : $scope.usuario.horas_ritems ,
                    dias         : $scope.usuario.dias ,
                    equipo       : $scope.usuario.equipo ,
                    cat          : $scope.usuario.cat ,
                    btu          : $scope.usuario.btu ,
                    marca        : $scope.usuario.marca ,
                    tipo         : $scope.usuario.tipo ,
                    area         : $scope.usuario.area , 
                    notas        : $scope.usuario.notas ,
             recomendaciones     : $scope.usuario.recomendaciones },
                   dataType: "jsonp"           
}


    $http(req)
            .success(function(data){ 
                 swal("Exito!", "Tu equipo ha sido actualizado.", "success");
                 $state.go('app.profile.reportePdf')
             })
              .error(function(data) {
            swal("Ooops!", "Has tenido problemas con el servidor", "error");
          
        });

}
})

.controller('AnadirEquipoFormCtrl', function($scope, $http, $state, $stateParams) {

 $scope.rsJSON = [ ];
      $scope.registerequipo = function() {
        RegisterEquipo($http,$scope);
      };

 function RegisterEquipo($http,$scope,clienteID){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/registerequipo.php/'+($stateParams.clienteID),
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded' },
     data: {       
                    
                  consumo_ritems : $scope.consumo_ritems ,
                    horas_ritems : $scope.horas_ritems ,
                    dias         : $scope.dias ,
                    equipo       : $scope.equipo ,
                    temperatura  : $scope.temperatura ,
                    cat          : $scope.cat ,
                    btu          : $scope.btu ,
                    marca        : $scope.marca ,
                    tipo         : $scope.tipo ,
                    area         : $scope.area ,
                    notas        : $scope.notas ,
              recomendaciones    : $scope.recomendaciones  },
                   dataType: "jsonp"           
}
    $http(req)
            .success(function(data){ 
                 swal("Exito!", "Tus datos han sido registrados.", "success");
                  $state.go('app.reportePdf')
             })
              .error(function(data){
            swal("Ooops!", "Has tenido problemas con el servidor", "error");
        });  

}

})

.controller('RecuerdameCtrl', function($scope, $http, $state, $stateParams) {

     $scope.rsJSON = [ ];
      $scope.recuerdame = function() {
        Recuerdame($http,$scope);
      };

 function Recuerdame($http,$scope){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/recuerdame.php',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded' },
     data: {      
                  id_clientes : $scope.id_clientes ,
             fecha_recuerdame : $scope.fecha_recuerdame ,
          servicio_recuerdame : $scope.servicio_recuerdame ,
       observacion_recuerdame : $scope.observacion_recuerdame ,
              reco_recuerdame : $scope.reco_recuerdame 
            },
     dataType : "jsonp"
    }
  
    $http(req)
            .success(function(data){ 
                 swal("Exito!", "Tu actividad ha sido creada.", "success");
                  $state.go('app.profile.cliente-activity')
             })
              .error(function(data) {
            swal("Ooops!", "Has tenido problemas con el servidor", "error");
        });  

}
})

.controller('ClienteEditCtrl', function($scope, $http, $stateParams, $ionicSideMenuDelegate) {

$ionicSideMenuDelegate.canDragContent(false)


//Editar
 $scope.importar = function(data){

           $http.get('http://www.im20.org/ionicBD/clientactivity.php/'+($stateParams.data))

           .success(function(datos){

            $scope.equipos = datos;
           
    });
};
$scope.importar();


//Editar
 $scope.importar1 = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/clientactivity-equipo.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.equipos1 = datos;
           
    });
};
$scope.importar1();


})

.controller('ClientesEditCtrl', function($scope, $http, $stateParams) {


$scope.importar = function(data){

           $http.get('http://www.im20.org/ionicBD/select-cliente.php/'+($stateParams.data))

           .success(function(datos){

            $scope.equipos = datos;

           
    });
};
$scope.importar();


})

.controller('VerReporteCtrl', function($scope, $http, $stateParams, $ionicSideMenuDelegate, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/modal-equipo.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });



//Editar
 $scope.reporte = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select_equipo.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.equipo = datos;
           
    });
};
$scope.reporte();

 $scope.reporte = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select_equipo_gasto.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.gastos = datos;
           
    });
};
$scope.reporte();


//Editar
 $scope.reporte = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select_report.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.report = datos;
           
    });
};
$scope.reporte();

$scope.activitydel = function(deletingId){

swal({
  title: "Estas seguro?",
  text: "Tu equipo no podrá ser recuperado",
  type: "warning",
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si, deseo eliminarlo",
  closeOnConfirm: false,
},
function(data){
  if (data){
    $http.get('http://www.im20.org/ionicBD/delete-equipo.php?id=' + deletingId),
  swal("Eliminado!", "Tu equipo ha sido eliminado.", "success"); 
  
  }
   location.reload();
}

);

};

})

.controller('EquipoCtrl', function($scope, $http) {
//Editar
 $scope.traer = function(){

           $http.get('http://www.im20.org/ionicBD/equipo.php')

           .success(function(datos1){

            $scope.equipo = datos1;
           
    });
};
$scope.traer();

})

.controller('Cliente-ActivityCtrl', function($scope, $http, $stateParams) {

 $scope.activity = function(data){

           $http.get('http://www.im20.org/ionicBD/select_activity.php/'+($stateParams.data))

           .success(function(datos){
            $scope.cliente = datos;
          });
};
$scope.activity();

$scope.importar = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-activity-id.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.equipos = datos;
           
    });
};
$scope.importar();


$scope.activitydel = function(deletingId){

swal({
  title: "Estas seguro?",
  text: "Tu actividad no podrá ser recuperada",
  type: "warning",
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si, deseo eliminarla",
  closeOnConfirm: false,
},
function(data){
  if (data){
    $http.get('http://www.im20.org/ionicBD/delete.php?id=' + deletingId),
  swal("Eliminado!", "Tu actividad ha sido eliminada.", "success"); 
   
  }
   location.reload();
}

);

};




})

.controller('Cliente-ReporteCtrl', function($scope, $http, $stateParams) {

 $scope.report = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select_report.php/'+($stateParams.clienteID))

           .success(function(data){
            $scope.report = data;
          });
};
$scope.report();

})

.controller('ClienteUpdateCtrl',function($scope, $http, $stateParams, $state, $ionicSideMenuDelegate) {



  $scope.activitydel = function(deletingId){

swal({
  title: "Estas seguro?",
  text: "Tu cliente no podrá ser recuperado",
  type: "warning",
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si, deseo eliminarlo",
  closeOnConfirm: false,
},
function(data){
  if (data){
    $http.get('http://www.im20.org/ionicBD/delete-cliente.php?id=' + deletingId),
   swal("Eliminado!", "Tu cliente ha sido eliminado.", "success");
  $state.go('app.friends')
  } 
}

);

};


 //Llamada por ID
 $scope.edit = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select_id.php/'+($stateParams.clienteID))

           .success(function(datos){
            $scope.clientes = datos;
          });
};
$scope.edit();


      $scope.rsJSON = [ ];
      $scope.update = function() {
      Update($http,$scope);
      };

 function Update($http,$scope){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/update.php/'+($stateParams.clienteID),
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded' },
     data: {        name_c : $scope.usuario.name_c ,
                      tel1 : $scope.usuario.tel1 ,
                   email_c : $scope.usuario.email_c ,
                  physical : $scope.usuario.physical },
                   dataType: "jsonp"
    }

    $http(req)
            .success(function(data){ 
                 swal("Exito!", "Se actualizó tu registro.", "success");
                  $state.go('app.friends')
             })
              .error(function(data) {
            swal("Ooops!", "Has tenido problemas con el servidor", "error");
        });  
}
})


.controller('EmailController', function($scope) {
    $scope.sendFeedback= function() {
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                swal("Exito!", "Se actualizó tu registro.", "success");
            }, 
            "Cotización ClimActiva", // Subject
            '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><link rel="stylesheet" type="text/css" href="stylesheets/email.css" /></head><body bgcolor="#FFFFFF"><!-- HEADER --><table class="head-wrap"><tr><td></td><td class="header container" ><div class="content"><table><tr><td><img src="../img/logo2.png" /></td><td align="center"></td></tr></table></div></td><td></td></tr></table><!-- /HEADER --><!-- BODY --><table class="body-wrap"><tr><td></td><td class="container" bgcolor="#FFFFFF"><div class="content"><table><tr><td><h3>Empecemos por especificar tu pedido.</h3><p class="lead"></p><p>Nombre y modelo del producto:</p><p>Cantidad:</p><br><table class="social" width="108%"><tr><td><!-- column 1 --><!-- /column 1 --><!-- column 2 --><table align="left" class="column"><tr><td><h5 class="">Infomación de Contacto:</h5><p>Nombre completo:<strong> tu nombre.</strong><br/><p>teléfono:<strong> tu numero.</strong><p>Email: <strong>tucorreo@hotmail.com</strong></p></td></tr></table><!-- /column 2 --><span class="clear"></span></td></tr></table><!-- /social & contact --> </td></tr></table><br><center><em>NOTA: Con esta información estaremos en contacto para cuando esté listo tu pedido.</div><!-- /content --></td><td></td></tr></table><!-- /BODY --><!-- FOOTER --><table class="footer-wrap"><tr><td></td><td class="container"><!-- content --><div class="content"></div><!-- /content --></td><td></td></tr></table><!-- /FOOTER --></body></html>',
            ["crist_g12@hotmail.com"], // To
            null,                    // CC
            null,                    // BCC
            true,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
    }
})





.controller('EsperaCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,  $ionicSideMenuDelegate) {
   
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 300);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})


.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

   
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('FormCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('Vista-ClienteCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('Vista-ActividadCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('Form-ActividadCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('AnadirEquipoCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate) {
  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

  

    
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('imagen', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller("ChartCtrl", function($scope, $http, $stateParams, $ionicSideMenuDelegate) {



   $scope.reporte = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select_equipo.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.equipo = datos;
           
    });
};
$scope.reporte();

$scope.enseres = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-enseres.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.enseres = datos;
           
    });
};
$scope.enseres();

$scope.aire = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-aire.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.aire = datos;
           
    });
};
$scope.aire();

$scope.iluminacion = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-iluminacion.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.iluminacion = datos;
           
    });
};
$scope.iluminacion();

$scope.standby = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-standby.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.standby = datos;
           
    });
};
$scope.standby();

$scope.otros = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-otros.php/'+($stateParams.clienteID))

           .success(function(datos){

            $scope.otros = datos;
           
    });
};
$scope.otros();

$scope.pdf = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-cliente-pdf.php/'+($stateParams.clienteID))
           .success(function(datos){
            $scope.pdf = datos;
           
    });
};
$scope.pdf();



$scope.chart = function(clienteID){

 $http.get('http://www.im20.org/ionicBD/select-chart.php/'+($stateParams.clienteID))
      .success(function(datos){

       $scope.labels = [];  
       $scope.data = datos;
       $scope.options = {legend: {display: true}};
       

       angular.forEach(datos, function(value, key){
          $scope.labels[key] = value.cat;
          $scope.data[key] = value.consumo_ritems;
         
        });
    });
  };

$scope.chart();

})

.controller("ExampleController", function($scope, $cordovaPrinter, $stateParams) { 

  $scope.done = function () {

            var url_base64 = document.getElementById("doughnut").toDataURL("image/png");
          
            link1.href = url_base64;
           

            var url = link1.href.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

        };


  $scope.print = function()
    {

     // Open in external browser
     window.open('http://im20.org/MyPDF/tcpdf/examples/climactiva-report.php/'+($stateParams.clienteID),'_system','location=yes'); 

    }

        /*$scope.print = function() {
        if($cordovaPrinter.isAvailable()) {
            var page = location.href;
            $cordovaPrinter.print(page, "ReportePdf.html");
        } else {
            alert("Printing is not available on device");
        }
}*/
 
})

/*.controller("paypal", function($scope) {

$scope.Pay = function(){

var value1 = "_s-xclick";
var value2 = "-----BEGIN PKCS7-----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-----END PKCS7-----";


var formAttributes = '<html><form id="loginForm" action="https://www.paypal.com/cgi-bin/webscr" method="post">' +
'<input type="hidden" name="cmd" value="' + value1 + '">' +
'<input type="hidden" name="encrypted" value="' + value2 + '">' +
'</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
var formUrl = 'data:text/html;base64,' + btoa(formAttributes);

var browserOpen = window.cordova.InAppBrowser.open(
    formUrl ,
    "_blank",
    "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
);
};


})*/

.controller("paypal", function($scope) {

$scope.Pay = function()
    {

     // Open in external browser
     window.open(' https://secure.paguelofacil.com/LinkDeamon.cfm?CCLW=7AC8796621B47AE5768CA8B75E533929F99874E6F10CCFB21B5C835E69FBFBFF&CMTN=3.00&CDSC=Compra de pdf','_system','location=yes'); 

    }

 

/*$scope.Pay = function(){

var formAttributes = '<form id="loginForm" action="https://www.paypal.com/cgi-bin/webscr" method="post">' +
'<input type="hidden" name="cmd" value="_xclick">' +
'<input type="hidden" name="business" value="hp@climactiva.com">' +
'<input type="hidden" name="lc" value="AL">' +
'<input type="hidden" name="item_name" value="Energy Report">' +
'<input type="hidden" name="amount" value="10.00">' +
'<input type="hidden" name="currency_code" value="USD">' +
'<input type="hidden" name="button_subtype" value="services">' +
'<input type="hidden" name="no_note" value="0">' +
'<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest"><script type="text/javascript">document.getElementById("loginForm").submit();</script></form>';


var formUrl = 'data:text/html;base64,' + btoa(formAttributes);

var browserOpen = window.cordova.InAppBrowser.open(
    formUrl ,
    "_blank",
    "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
);
};*/

})

.controller('ImagePickerController', function($scope, $cordovaImagePicker, $ionicPlatform, $cordovaContacts) {
 
    $scope.collection = {
        selectedImage : ''
    };
 
    $ionicPlatform.ready(function() {
 
        $scope.getImageSaveContact = function() {       
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
                width: 800,
                height: 800,
                quality: 80            // Higher is better
            };
 
            $cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
                    $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
 
                    window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.collection.selectedImage = base64;
                        $scope.addContact();    // Save contact
                    });
                }
            }, function(error) {
                console.log('Error: ' + JSON.stringify(error));    // In case of error
            });
        };  
 
    }); 
 
    
 
    $scope.addContact = function() {
        $cordovaContacts.save($scope.contact).then(function(result) {
            console.log('Contact Saved!');
        }, function(err) {
            console.log('An error has occured while saving contact data!');
        });
    };  
 
})

.controller("listController", ["$scope",
   function($scope) {
     $scope.data=  [{"agence":"CTM","secteur":"Safi","statutImp":"operationnel"}];
     
     $scope.export = function(){
        html2canvas(document.getElementById('exportthis'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("test.pdf");
            }
        });
     }
   }
 ])




.controller('DocumentController', function($scope, $ionicModal, InvoiceService, $cordovaFile, $http, $stateParams) { 

//Cotización de los equipos para compra.

$scope.rsJSON = [ ];
      $scope.registerequipo = function() {
        RegisterEquipo($http,$scope);
      };

 function RegisterEquipo($http,$scope){
    var req = {
     method: 'POST',
     url: 'http://www.im20.org/ionicBD/registerequipo-shop.php/'+($stateParams.data),
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded' },
     data: {        
                    cantidad               : $scope.cantidad ,
                    cantidad_2             : $scope.cantidad_2 ,
                    cantidad_3             : $scope.cantidad_3  },
                   dataType: "jsonp"           
}
    $http(req)
            .success(function(data){ 
                 swal("Exito!", "Tu cotización ha sido creada.", "success");
                  
             })
              .error(function(data){
            swal("Ooops!", "Has tenido problemas con el servidor", "error");
        });  

}

//Factura de cotización

    $scope.openInExternalBrowser = function()
    {
     // Open in external browser
     window.open('http://im20.org/MyPDF/tcpdf/examples/climactiva-shop.php/'+($stateParams.data),'_system','location=yes'); 

   };


  function checkAll(){
      $scope.checkAll = function(name){
          if (name == 1){
             name = 'Monitor de Energía';
               console.log(name)
        } else if (name == 2){
             name = 'Aire Acondicionado con sistema WiFi';
               console.log(name)
             name = 'aire';
        } else if (name == 3) {
             name = 'Regleta';
               console.log(name)
          }
        }
      }
  checkAll();


    var vm = this;

    setDefaultsForPdfViewer($scope);

    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('pdf-viewer.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        vm.modal = modal;
    });

    vm.createInvoice = function () {
        var invoice = getDummyData();

                            InvoiceService.createPdf(invoice).then(function(pdf) {
                            var blob = new Blob([pdf], {type: 'application/pdf'});
                            $scope.pdfUrl = URL.createObjectURL(blob);

                            // Display the modal view
                            vm.modal.show();
                        });         
                      };    

    // Clean up the modal view.
    $scope.$on('$destroy', function () {
        vm.modal.remove();
    });

    return vm;
 

function setDefaultsForPdfViewer($scope) {  
    $scope.scroll = 0;
    $scope.loading = 'loading';

    $scope.onError = function (error) {
        console.error(error);
    };

    $scope.onLoad = function () {
        $scope.loading = '';
    };

    $scope.onProgress = function (progress) {
        console.log(progress);
    };
}


/*

 $scope.pdf = function(){

           $http.get('http://www.im20.org/ionicBD/select-cliente.php/1494426015')
           .success(function(datos){
            $scope.pdf = datos;  
           
    });
};
$scope.pdf(); 

$scope.pdf = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-cliente.php/'+($stateParams.clienteID))
           .success(function(datos){
            $scope.pdf = datos;  
           
    });
};
$scope.pdf();

function getBase64FromImageUrl(url) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        return(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };

    img.src = url;

}



/*$scope.pdf = function(clienteID){

           $http.get('http://www.im20.org/ionicBD/select-cliente-pdf.php/'+($stateParams.clienteID))
           .success(function(datos){
            $scope.pdf = datos;
           
    });
};
$scope.pdf();

$scope.chart = function(clienteID){

 $http.get('http://www.im20.org/ionicBD/select-chart.php/'+($stateParams.clienteID))
      .success(function(datos){

       $scope.labels = [];  
       $scope.data = datos;

       angular.forEach(datos, function(value, key){
          $scope.labels[key] = value.cat;
          $scope.data[key] = value.consumo_ritems;
         
        });
    });
  };

$scope.chart();

})

angular.forEach(materia.paralelos, function(paralelo) {
    console.log("  - Paralelo:", paralelo.paralelo, paralelo.dia, materia.creditos);

  });

  function buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
}

var externalDataRetrievedFromServer = [
{ name: 'Bartek', age: 34 },
{ name: 'John', age: 27 },
{ name: 'Elizabeth', age: 30 },
];


app.factory('albumService', ['$http', '$q'],
    function albumService($http, $q) {
        // interface
        var service = {
            albums: [],
            getAlbums: getAlbums
        };
        return service;

        // implementation
        function getAlbums() {
            var def = $q.defer();

            $http.get("./albums.ms")
                .success(function(data) {
                    service.albums = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get albums");
                });
            return def.promise;
        }
    });

 table(externalDataRetrievedFromServer, ['name', 'age'])

   function albumService($http, $q) {

  // interface
        var service = {
            albums: [],
            getAlbums: getAlbums
        };
        return service;

         // implementation
        function getAlbums() {
            var def = $q.defer();

             $http.get('http://localhost/ionicBD/select-cliente.php/1488564708')
                .success(function(data) {
                    service.albums = data;
                    def.resolve(data);
                    console.log( service.albums)
                })
                .error(function() {
                    def.reject("Failed to get albums");
                });
            return def.promise;
        }

   }

*/


function getDummyData() {

           var request = $http.get('http://localhost/ionicBD/select-cliente.php/1488564708')
           .success(function(datos){
            $scope.pdf = datos; 

           });

request.success(function(request) {
  console.log(JSON.stringify(request))
});


   
 function buildTableBody(data, columns) {

    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
  }

  function table(data, columns) {


      return {
          table: {
              headerRows: 1,
              body: buildTableBody(data, columns)
          },
          layout: 'noBorders'
      };
  }


/*icon: 'data:image/png;base64,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',
 */       
    return {
       icon: 'data:image/png;base64,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',
 
        Date: new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long", day: "numeric" }),
        AddressFrom: {
            Name:    chance.name(),
            Address: chance.address(),
            Country: chance.country({ full: true })
        },
        
        Items: [
            { Description: 'Monitor de Energía', Quantity: '1', Price: '$700' },
            { Description: 'Aire Acondicionado con sistema WiFi', Quantity: '2', Price: '$655' },
            { Description: 'Regleta', Quantity: '2', Price: '$655' }
               ],
        Subtotal: '$2010',
        Shipping: '$6',
        Total: '$2016'
      };
  }

}) 


.controller('ImagePickerController', function($scope, $cordovaImagePicker, $ionicPlatform) {

$scope.selectImage = function(){        
        var options = {
           maximumImagesCount: 1,
           width: 800,
           height: 800,
           quality: 80
          };
        
          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);   // Print image URI
                        $scope.picData = results[i];//SOME IOS VERSION NOT SUPPORT resolveLocalFileSystemURL
                        $window.resolveLocalFileSystemURL(results[i], function(fileEntry) {                                
            $scope.picData = fileEntry.nativeURL;
            });
              }
            }, function(error) {
               // error getting photos
               console.log('Error: ' + JSON.stringify(error));
        });
    };

    $scope.testFileUpload = function () {

      // Destination URL 
      var url = "http://www.im20.org/ionicBD/upload.php";
   
     //File for Upload
   var targetPath = $scope.picData;
   
   // File name only
     var filename = targetPath.split("/").pop();
   
     var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
      params : {'directory':'upload', 'fileName':filename}
      };
        
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
          alert("SUCCESS: " + JSON.stringify(result.response));
      }, function (err) {
      alert("ERROR: " + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });

/*
   // Destination URL 
   var fileURL = "http://www.im20.org/ionicBD/upload.php";
   
   //File for Upload
   var uri  = $scope.picData;
   
   var options = new FileUploadOptions();
   options.fileKey = "photoPath";
   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
   options.mimeType = "image/jpg";
   options.params = {'directory':'upload', 'fileName':filename};

   
   var headers = {'headerParam':'headerValue'};
   options.headers = headers;
   var ft = new FileTransfer();
   ft.upload(fileURL, uri, onSuccess, onError, options);

   function onSuccess(r) {
      alert("Code = " + r.responseCode);
      alert("Response = " + r.response);
      alert("Sent = " + r.bytesSent);
   }

   function onError(error) {
      alert("An error has occurred: Code = " + error.code);
      alert("upload error source " + error.source);
      alert("upload error target " + error.target);
   }*/


  }



})
                                            //prueba de upload file

.controller('FileTransferController', function($scope, $cordovaFileTransfer) {
          
 /*$scope.testFileUpload = function () {
   // Destination URL 
      var url = "http://www.im20.org/ionicBD/upload.php";
   
     //File for Upload
   var targetPath = cordova.file.externalRootDirectory + "logo_radni.png";
   
   // File name only
     var filename = targetPath.split("/").pop();
   
     var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
      params : {'directory':'upload', 'fileName':filename}
      };
        
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
          console.log("SUCCESS: " + JSON.stringify(result.response));
      }, function (err) {
      console.log("ERROR: " + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });
  }*/




})




;




