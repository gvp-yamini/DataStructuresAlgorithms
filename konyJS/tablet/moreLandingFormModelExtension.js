/*
 * FormModel Extension class for moreLanding
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class moreLandingFormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.moreLandingFormModelExtension = Class({
    constructor: function(formModelObj) {
        var formModel = formModelObj;
        this.getFormModelObj = function() {
            return formModel;
        }
    },

    /**
     * This is life cycle method invoked before bindData method, primarily used for UI customization.
     * @memberof moreLandingFormModelExtension#
     */
    formatUI: function() {
        //TO-DO add custom formatting
    }
});