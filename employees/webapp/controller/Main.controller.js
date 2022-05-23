sap.ui.define([
    "sap/ui/core/mvc/Controller"

], function (Controller) {

    return Controller.extend("logaligroup.employees.controller.Main", {

        onInit: function () {
            var oView = this.getView();
            //var i18nBundle = oView.getModel("i18n").getResourceBundle();

            var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
            oJSONModelEmpl.loadData("./localService/mockdata/Employee.json", false);
            oView.setModel(oJSONModelEmpl, "jsonEmployees");
            oJSONModelEmpl.attachRequestCompleted(function (oEventModel) {
                console.log(JSON.stringify(oJSONModelEmpl.getData()));
            });

            //Paises
            var oJSONModelCountries = new sap.ui.model.json.JSONModel();
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);
            oView.setModel(oJSONModelCountries, "jsonCountries");
            oJSONModelCountries.attachRequestCompleted(function (oEventModel) {
                console.log(JSON.stringify(oJSONModelCountries.getData()));
            });
            //Layout
            var oJSONModelLayout = new sap.ui.model.json.JSONModel();
            oJSONModelLayout.loadData("./localService/mockdata/Layouts.json", false);
            oView.setModel(oJSONModelLayout, "jsonLayout");

            const oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleId: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });
            oView.setModel(oJSONModelConfig, "jsonModelConfig");
            
            this._bus = sap.ui.getCore().getEventBus();
            this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this);
        },
        showEmployeeDetails: function(category, nameEvent, path){
            var detailView = this.getView().byId("detailEmployeeView");
            detailView.bindElement("jsonEmployees>" + path);
            this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded");

            //Modelo JSON vacio
            var incidenceModel = new sap.ui.model.json.JSONModel([]);
            detailView.setModel(incidenceModel, "incidenceModel");
            detailView.byId("tableIncidence").removeAllContent();
            
        }
    });


});