angular.module('starter')

.factory('InvoiceService', ['$q','$cordovaFile', '$ionicPlatform', InvoiceService]);

function InvoiceService($q) {  
    function createPdf(invoice) {
        return $q(function(resolve, reject) {
            var dd = createDocumentDefinition(invoice);
            var pdf = pdfMake.createPdf(dd);

            pdf.getBase64(function (output) {
                resolve(base64ToUint8Array(output));
            });
        });
    }

    return {
        createPdf: createPdf
    };    
}
/*--------------------------------------Descarga de PDF-------------------------------------------------*/

/*function InvoiceService($q, $cordovaFile, $ionicPlatform) {  
    function createPdf(invoice) {
        return $q(function(resolve, reject) {
            var dd = createDocumentDefinition(invoice);
            var pdf = pdfMake.createPdf(dd).getBuffer(function (buffer) {
            var utf8 = new Uint8Array(buffer); // Convert to UTF-8... 
            binaryArray = utf8.buffer; // Convert to Binary...

            $cordovaFile.writeFile(cordova.file.externalRootDirectory, "CotizaciónCM.pdf", binaryArray, true)
            .then(function (success) {
               swal("Exito!", "Se ha generado tu cotización en un archivo PDF.", "success");
            console.log("pdf created");
            }, function (error) {
                swal("Ooops!", "Has tenido problemas con el servidor", "error");
            console.log("error");
            });
          });

        });
    }

    return {
        createPdf: createPdf
    };    
}*/

function base64ToUint8Array(base64) {  
    var raw = atob(base64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}

function createDocumentDefinition(invoice) {

    var items = invoice.Items.map(function(item) {
        return [item.Description, item.Quantity, item.Price];
    });

    
    var dataURL;

    var dd = {
        content: [
            {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: [75, 'auto', '150'],
                headerRows: 2,
                // keepWithHeaderRows: 1,
                body: [
                    [{rowSpan: 2, image: invoice.icon , style: 'tableHeader', alignment: 'left', width: 70, height: 50,},{text:  'COTIZACIÓN DE PRODUCTOS', style: 'header', alignment: 'center'}, { text: invoice.Date, alignment: 'right',style: 'tableHeader'}],
                    [{text: 'Header 1', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}],


                ]
            },
             layout: 'noBorders'
            }, 

            
            //{ image: convertImgToBase64URL('img/logo2.png', function(base64Img){}), width: 150, height: 150, style: 'header', alignment:'center'},
           
            

            {
            style: 'tableExample',
            table: {
                widths: [75, 'auto', '150'],
                body: [
                    ['', 'De', ''],
                    [
                     [
                            
                            {
                                table: {
                                    body: [
                                        [''],
                                        [''],
                                        ['']
                                    ]
                                },
                                 layout: 'noBorders'
                            }
                        ],

                    [
                            {
                                table: {
                                    body: [
                                        [ invoice.AddressFrom.Name],
                                        [ invoice.AddressFrom.Address],
                                        [ invoice.AddressFrom.Country]
                                    ]
                                },
                                 layout: 'noBorders'
                            }
                        ],
                        
                        [
                            
                            {
                                table: {
                                    body: [
                                        [''],
                                        [''],
                                        ['']
                                    ]
                                },
                                 layout: 'noBorders'
                            }
                        ],
                    ]
                ]
            },
             layout: 'noBorders'
        },            

            { text: 'Productos', style: 'subheader'},
            {
                style: 'itemsTable',
                table: {
                    widths: ['*', 75, 75],
                    body: [
                        [ 
                            { text: 'Descripcion', style: 'itemsTableHeader' },
                            { text: 'Cantidad', style: 'itemsTableHeader' },
                            { text: 'Precio', style: 'itemsTableHeader' },
                        ]
                    ].concat(items)
                },
                layout: 'lightHorizontalLines'
            },
            {
                style: 'totalsTable',
                table: {
                    widths: ['*', 75, 75],
                    body: [
                        [
                            '',
                            'Subtotal',
                            invoice.Subtotal,
                        ],
                        [
                            '',
                            'Shipping',
                            invoice.Shipping,
                        ],
                        [
                            '',
                            'Total',
                            invoice.Total,
                        ]
                    ]
                },
                    layout: 'lightHorizontalLines'
            },
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'right'
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 20, 0, 5]
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            totalsTable: {
                bold: true,
                margin: [0, 30, 0, 0]
            }
        },
        defaultStyle: {
        }
    }

    return dd;
}

