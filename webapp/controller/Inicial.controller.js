sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {
               // table type dentro de estrutura
                let ImageList = {
                    Imagens : [
                        //ocultar lista na inicialização
                    //    {
                    //        url : "http://cdn.shopify.com/s/files/1/0309/8755/0851/products/CocaCola_1200x1200.jpg?v=1585705641",
                    //       thumbnail : "https://rapidapi.usearch.com/api/thumbnail/get?value=549732196490595880",
                    //        title : "Coca Cola Mary's Mountain Cookies in Omaha",
                    //        provider : {
                    //            name : "shopify"
                    //        }
                    //    },
                    //    {
                    //        url : "https://cdn.neowin.com/news/images/uploaded/2023/02/1675411085_coca-cola_realme_story.jpg",
                    //        thumbnail : "https://rapidapi.usearch.com/api/thumbnail/get?value=7925907436089732950",
                    //        title : "Realme to launch Coca-Cola edition of the Realme 10 Pro 5G next week - Neowin",
                    //        provider : {
                    //            name : "neowin"
                    //        }
                    //    },
                    //    {
                    //        url : "https://d1fto35gcfffzn.cloudfront.net/images/og/OG-dell.jpg",
                    //        thumbnail : "https://rapidapi.usearch.com/api/thumbnail/get?value=27358533626295142",
                    //        title : "Dell Technologies | Customers | VMware Tanzu",
                    //        provider : {
                    //            name : "nd1fto35gcfffzn"
                    //        }
                    //    }
                    ]
                };

                // Criação do Modelo para exibir dados na tela
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();
               view.setModel(ImageModel, "ModeloImagem");
               
                // conchete indica que variável é do tipo tabela interna
                // var lista = ["PAO", "BANANA","LEITE"]
               
                // this.produto = {
                //    nome: "margarina",
                //   marca: "doriana",
                //    peso: 500,
                //    uom: 'G',
                //    estoque : 12,
                //    adicionarEstoque: function(){
                //        this.estoque++;
                //        return this.estoque + 'Unidades em Estoque';
                //    }
                // }
            },
            onPressBuscar:function(){
                //instancia objeto input na variavel
                let inputBusca = this.byId("inpBusca");
                //coleta o valor digitado no input
                let query = inputBusca.getValue();
                //exibe na tela
                //alert(query)

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //concatenate
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                    + query
                    + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "e5fad4818fmsh2fc0d9ff7bec63ep1916ddjsn414a67509f0c",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                //parenteses serve para passar parametros
                //callback (respnse): uma função executada no final de outra função 
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    //instanciar o Modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();

                    //clear na tabela interna = array
                    oDadosImage.Imagens = [];

                    //loop que adiciona dados de uma tabela em outra tabela
                    let listaResultados = response.value;
                    let newItem;

                    //loop = for
                    for(var i = 0; i < listaResultados.length; i++){
                        //read table pelo indice
                        newItem = listaResultados[i];
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    }

                    oImageModel.refresh();


                }.bind(this)
                
                );

                







                //variáveis
             //   var material = "Coca Cola";
             //   var unidades = 10;
             //   var peso = 1.8;
                //tabela interna
             //   let lista_compras = ["pao", "banana"];

                //objetos = estrutura no abap
                //var produto = {
                //    nome: "margarina",
                //    marca: "doriana",
                //    peso: 500,
                //    uom: 'G',
                //    estoque : 12,
                //    adicionarEstoque: function(){
                //        this.estoque++;
                //        return this.estoque + 'Unidades em Estoque';
                //    }
             //   }

             //   var total = this.produto.adicionarEstoque();
             //   alert(total);
            }
        });
    });
