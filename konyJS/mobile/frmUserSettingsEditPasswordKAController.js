/*
 * Controller class for frmUserSettingsEditPasswordKA
 * This is generated file. Please do not edit. 
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Controller.
 * @class frmUserSettingsEditPasswordKAController
 * @param {Object} applicationContext - Application Context.
 * @param {Object} config - Config Object.
 */
kony.sdk.mvvm.frmUserSettingsEditPasswordKAController = Class(kony.sdk.mvvm.BaseFormController, {

    constructor: function(applicationContext, config) {
        this.$class.$super.call(this, applicationContext, config);
    },
    /**
     * This method acts as an entry point for all fetch related flows.
     * @memberof frmUserSettingsEditPasswordKAController#
     */
    fetchData: function() {
        this.$class.$superp.fetchData.call(this);
    },
    /**
     * This method binds the data provided to the form 
     * @memberof frmUserSettingsEditPasswordKAController#
     * @param {Object} data - data map for each group, widget id as key and widget data as value
     */
    bindData: function(data) {
        this.$class.$superp.bindData.call(this, data);
    },
    /**
     * This method processes the provided data to required format for bind.
     * @memberof frmUserSettingsEditPasswordKAController#
     * @param {Object} dataMap - data
     * @returns {Object} - processed data
     */
    processData: function(dataMap) {
        return this.$class.$superp.processData.call(this, dataMap);
    },
    /**
     * This method acts as an entry point for all save related flows.
     * @memberof frmUserSettingsEditPasswordKAController#
     */
    saveData: function() {
        this.$class.$superp.saveData.call(this);
    },
    /**
     * This method acts as an entry point for all delete/remove related flows.
     * @memberof frmUserSettingsEditPasswordKAController#
     */
    deleteData: function() {
        this.$class.$superp.deleteData.call(this);
    },
    /**
     * This method returns requested model(entity controller) object.
     * @memberof frmUserSettingsEditPasswordKAController#
     * @param {String} entityName - Entity name
     * @param {String} serviceName - Service name
     * @param {Object} options - Service options
     * @returns {Object} - Model object
     */
    getModel: function(entityName, serviceName, options) {
        return this.$class.$superp.getModel.call(this, entityName, serviceName, options);
    },
    /**
     * This method returns requested meta data for an entity.
     * @memberof frmUserSettingsEditPasswordKAController#
     * @param {String} entityName - Entity name
     * @param {String} serviceName - Service name
     * @param {Object} options - Service options
     * @returns {Object} - Metadata of the entity
     */
    getApplicationEntityMetaData: function(entityName, serviceName, options) {
        return this.$class.$superp.getApplicationEntityMetaData.call(this, entityName, serviceName, options);
    },
    /**
     * This method acts as an entry point to the controller for form navigation.
     * @memberof frmUserSettingsEditPasswordKAController#
     * @param {Object} contextData - NavigationObject
     */
    loadDataAndShowForm: function(contextData) {
        this.$class.$superp.loadDataAndShowForm.call(this, contextData);
    },
    /**
     * Data Translation Logic for a variable between source type and destination type.
     * @memberof frmUserSettingsEditPasswordKAController#
     * @param {Object} val - Value to be converted.
     * @param {String} srcDataType - Data type of val.
     * @param {String} destDataType - Data type val has to be converted.
     * @param {String} entityName - Entity name
     * @param {String} fieldName - Field name
     * @param {String} serviceName - Service name
     * @param {Object} options - Service options
     * @returns {Object} - converted value
     */
    getDataAsPerType: function(val, srcDataType, destDataType, entityName, fieldName, serviceName, options) {
        return this.$class.$superp.getDataAsPerType.call(this, val, srcDataType, destDataType, entityName, fieldName, serviceName, options);
    },
    /**
     * This method exectutes given controller method/action. Method defined in controller extension.
     * @memberof frmUserSettingsEditPasswordKAController#
     * @param {String} actionName - Method name defined in controller extension.
     * @param {Array} argsArray - Array of arguments for the method.
     * @returns {Object} - Return value from method/action
     */
    performAction: function(actionName, argsArray) {
        return this.$class.$superp.performAction.call(this, actionName, argsArray);
    },
    /** 
     * This method shows form
     * @memberof frmUserSettingsEditPasswordKAController#
     */
    showForm: function() {
        this.$class.$superp.showForm.call(this);
    }
});