import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'

var callAsyncGetMethod = function (url, cb) {
    var options = {
      'headers': {
        'Authorization': 'Bearer 0c725a3b-f725-24b0-af39-d76b78534e22',
        'Content-Type': 'application/json'
      }
    };
  
    HTTP.call('GET', url, options, (error, result) => {
      if (error) {
        console.log("error", error);
        cb && cb(new Meteor.Error(500, 'There was an error processing your request.', error));
      } else {
        console.log("result", result);
        cb && cb(null, result);
      }
    }); 
}

var callAsyncPostMethod = function (url,params, cb) {
  console.log("url:- ",url,params);
  var options = {
    'headers': {
      'Authorization': 'Bearer 0c725a3b-f725-24b0-af39-d76b78534e22',
      'Content-Type': 'application/json'
    }
  };

    var sendParams = {
          data: params,
          headers: {
            'Authorization': 'Bearer 0c725a3b-f725-24b0-af39-d76b78534e22',
            'Content-Type': 'application/json'
          }   

    };
    
    HTTP.call('POST', url, sendParams, Meteor.bindEnvironment(function(error, response) {
        if (error) {
            //console.log(error);
            cb && cb(new Meteor.Error(500, 'There was an error processing your request.', error));
        } else {
             cb && cb(null, JSON.parse(response.content)); // error, result
            //console.log(response);
        }
    }));
}

var callAsyncDeleteMethod = function (url, cb) {
  var options = {
    'headers': {
      'Authorization': 'Bearer 0c725a3b-f725-24b0-af39-d76b78534e22',
      'Content-Type': 'application/json'
    }
  };


  HTTP.call('DELETE', url, options, (error, result) => {
    if (error) {
      console.log("error", error);
      cb && cb(new Meteor.Error(500, 'There was an error processing your request.', error));
    } else {
      console.log("result", result);
      cb && cb(null, result);
    }
  });
}
Meteor.methods({
  /*
  * 1) Payments       
  */

    /* a) Authorizations
    * Get all authorizations.
    * SAMPLE CALL:- Meteor.call('getAllAuthorizations',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
    */
    getAllAuthorizations(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/authorizations';
        return callSync(url);
    },
    /* Create an authorization on a Payment
    * 
    */
    createAuthorizationsOnPayment(params) {
        var callSync = Meteor.wrapAsync(callAsyncPostMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId+'/authorizations';
        return callSync(url,params);
    },
    /* Get a single authorization
    * SAMPLE CALL:- Meteor.call('getAllAuthorizations',{'merchantId':'KRT7B7ATBE51P','authId':'JJHDHDHDHHD'},function(e,r){console.log(e); console.log(r)})
    */
    getAuthorizationById(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/authorizations/'+params.authId;
        return callSync(url);
    },
    /* Update an authorization on a Payment
    * 
    */
    updateAuthorizationsOnPayment(params) {
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/authorizations/'+params.authId;
      return callSync(url,params);
    },
    /* Delete a authorization
    * SAMPLE CALL:- Meteor.call('deleteAuthorizationById',{'merchantId':'KRT7B7ATBE51P','authId':'JJHDHDHDHHD'},function(e,r){console.log(e); console.log(r)})
    */
    deleteAuthorizationById(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/authorizations/'+params.authId;
      return callSync(url);
    },
    
    /* b) Payments
    * Get all payments
    * Meteor.call('getAllPayments',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
    */
    getAllPayments(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/payments';
      return callSync(url);
    },
    /* Get a single payment
    * Meteor.call('getPaymentById',{'merchantId':'KRT7B7ATBE51P','paymentId':'GDTYDTDBGJ'},function(e,r){console.log(e); console.log(r)})
    */
    getPaymentById(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/payments/'+params.paymentId;
      return callSync(url);
    },
    /* Update payment
    * Meteor.call('updatePaymentById',{'merchantId':'KRT7B7ATBE51P','paymentId':'GDTYDTDBGJ'},function(e,r){console.log(e); console.log(r)})
    */
    updatePaymentById(params) {
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/payments/'+params.paymentId;
      return callSync(url,params);
    },
    /* Get all payments for an order
    * Meteor.call('getAllPaymentsForOrder',{'merchantId':'KRT7B7ATBE51P','orderId':'HDBVBDGHD'},function(e,r){console.log(e); console.log(r)})
    */
    getAllPaymentsForOrder(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/payments';
      return callSync(url);
    },
    /* Get all payments under an employee
    * Meteor.call('getAllPaymentsUnderEmployee',{'merchantId':'KRT7B7ATBE51P','empId':'HDBVBDGHD'},function(e,r){console.log(e); console.log(r)})
    */
    getAllPaymentsUnderEmployee(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId+'/payments';
      return callSync(url);
    },

    /* c) Refunds
    * Get a list of credits
    * Meteor.call('getListOfCredits',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
    */
    getListOfCredits(params){
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/credits/';
      return callSync(url);
    },
    /* Get a single credit
    * Meteor.call('getCreditById',{'merchantId':'KRT7B7ATBE51P','cId':'HDJDHNCI8KSJD'},function(e,r){console.log(e); console.log(r)})
    */
    getCreditById(params){
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/credits/'+params.cId;
      return callSync(url);
    },

    /* d) CreditRefunds
    * Get a list of credit refunds
    * Meteor.call('getCreditById',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
    */
    getListOfCreditRefunds(params){
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/credit_refunds';
      return callSync(url);
    },   
    /*
    * Get a credit refund
    * Meteor.call('getCreditRefundsById',{'merchantId':'KRT7B7ATBE51P','crId':'HRTDJCKDL98HDB'},function(e,r){console.log(e); console.log(r)})
    */
    getCreditRefundsById(params){
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/credit_refunds/'+params.crId;
      return callSync(url);
    },    

});