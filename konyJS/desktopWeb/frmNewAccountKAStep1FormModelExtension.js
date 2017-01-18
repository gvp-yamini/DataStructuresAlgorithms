/*
 * FormModel Extension class for frmNewAccountKAStep1
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class frmNewAccountKAStep1FormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.frmNewAccountKAStep1FormModelExtension = Class({
    constructor: function(formModelObj) {
        var formModel = formModelObj;
        this.getFormModelObj = function() {
            return formModel;
        }
    },

    /**
     * This is life cycle method invoked before bindData method, primarily used for UI customization.
     * @memberof frmNewAccountKAStep1FormModelExtension#
     */
    formatUI: function() {
        //TO-DO add custom formatting
    }
});