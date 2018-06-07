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
    * Customers       
    */

    /* a) CustomersCSV
    * Get a list of customers
    * SAMPLE CALL:- Meteor.call('getCustomersListCSV',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
    */
    getCustomersListCSV(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers.csv';
      return callSync(url);
    },
    
    /* b) Customers
    * Get a list of customers 
    * SAMPLE CALL:- Meteor.call('getCustomersList',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
    */
    getCustomersList(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers';
        return callSync(url);
    },
    /*
    * Create a customer
    * SAMPLE CALL:- Meteor.call('createCustomer',{'merchantId':'KRT7B7ATBE51P',
      "firstName": "harish",
      "lastName": "mahajan",
      "addresses": [
        {
          "zip": "123456",
          "country": "IN",
          "address3": "shivajiagar",
          "address2": "surat",
          "city": "surat",
          "address1": "shivaji",
          "id": "ASDGD",
          "state": "GUJARAT"
        }
      ],

      "emailAddresses": [
        {
          "emailAddress": "hmahajan.dm@gmail.com",
          "id": "",
        }
      ],
      "cards": [
        {
          "last4": "asd",
          "firstName": "xcxzc",
          "lastName": "asdsad",
          "id": "",
        }
      ],
      "marketingAllowed": false,
      "merchant": {
        "id": ""
      },
      "orders": [
        {
          "id": ""
        }
      ],
      "id": "",
      "phoneNumbers": [
        {
          "phoneNumber": "",
          "id": ""
        }
      ]
      },function(e,r){console.log(e); console.log(r)})
    */
    createCustomer(params) {
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers';
      return callSync(url,params);
    },
    /* 
    * Get a single customer
    * SAMPLE CALL:- Meteor.call('getSingleCustomerList',{'merchantId':'KRT7B7ATBE51P','id':'W3V942TWK205R'},function(e,r){console.log(e); console.log(r)})
    */
    getSingleCustomerList(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.id;
      return callSync(url);
    },
    /*
    * Update a customer
    * SAMPLE CALL:- Meteor.call('updateCustomer',{"merchantId":"KRT7B7ATBE51P", "customerId":"W3V942TWK205R", "customerSince": 1516860107001,
      "firstName": "Hello",
      "lastName": "Mahajan",
      "emailAddresses": [
        {
          "emailAddress": "hmaAsshajan.dm@gmail.com",
          "id": "",
        }
      ],
      "cards": [
        {
          "last4": "asd",
          "firstName": "xcxzc",
          "lastName": "asdsad",
          "id": "",
        }
      ],
      "marketingAllowed": false,
      "merchant": {
        "id": ""
      },
      "orders": [
        {
          "id": ""
        }
      ]},function(e,r){console.log(e); console.log(r)});
    */
    updateCustomer(params) {
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId;
      return callSync(url,params);
    },
    /* Delete a customer
    * SAMPLE CALL:- Meteor.call('deleteCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'W3V942TWK205R'},function(e,r){console.log(e); console.log(r)})
    */
    deleteCustomer(params) {
      var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId;
      return callSync(url);
    },

    /* c) PhoneNumbers
    * Create a phone number for a customer
    * SAMPLE CALL:- Meteor.call('createPhoneNumberForCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'ENNGAM7KKBZ0W', 'phoneNumber': '987654321',},function(e,r){console.log(e); console.log(r)})
    */ 
    createPhoneNumberForCustomer(params) {
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/phone_numbers";
      return callSync(url,params);
    },
    /* 
    * Update a phone number for a customer
    * SAMPLE CALL:- Meteor.call('updatePhoneNumberForCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'ENNGAM7KKBZ0W', 'phoneId':'ZZ89GY3MW193T', 'phoneNumber': '1234567890',},function(e,r){console.log(e); console.log(r)})
    */ 
    updatePhoneNumberForCustomer(params) {
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/phone_numbers/"+params.phoneId;
      return callSync(url,params);
    },
    /* 
    * Delete a phone number for a customer
    * SAMPLE CALL:- Meteor.call('deletePhoneNumberForCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'ENNGAM7KKBZ0W', 'phoneId':'ZZ89GY3MW193T', 'phoneNumber': '1234567890',},function(e,r){console.log(e); console.log(r)})
    */ 
    deletePhoneNumberForCustomer(params) {
      var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/phone_numbers/"+params.phoneId;
      return callSync(url);
    },
    /* d) EmailAddresses
    * Create an email address for a customer
    * SAMPLE CALL:- Meteor.call('createEmailAddressForCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'ENNGAM7KKBZ0W', 'emailAddress': 'hpm@gmail.com',},function(e,r){console.log(e); console.log(r)})
    */
    createEmailAddressForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/email_addresses";
      return callSync(url,params);
    },
    /* 
    * Update an email address for a customer
    * SAMPLE CALL:- Meteor.call('updateEmailAddressForCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'ENNGAM7KKBZ0W', 'emailId':'Z67HCPBF0G8SP', 'emailAddress': 'abc@gmail.com'},function(e,r){console.log(e); console.log(r)})
    */
    updateEmailAddressForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/email_addresses/"+params.emailId;
      return callSync(url,params);
    },
    /* 
    * Delete an email address for a customer
    * SAMPLE CALL:- Meteor.call('deleteEmailAddressForCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'ENNGAM7KKBZ0W', 'emailId':'Z67HCPBF0G8SP'},function(e,r){console.log(e); console.log(r)})
    */
    deleteEmailAddressForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/email_addresses/"+params.emailId;
      return callSync(url);
    },
    /* e) Addresses
    * Create an address for a customer
    * SAMPLE CALL:- Meteor.call('createAddressForCustomer',
      {"merchantId":"KRT7B7ATBE51P",
      "customerId":"ENNGAM7KKBZ0W", 
        "zip": "12328",
        "country": "IN",
        "address3": "SURAT",
        "address2": "SURAT",
        "city": "SURAT",
        "address1": "SURAT",
        "id": "",
        "state": "GUJARAT"
      },function(e,r){console.log(e); console.log(r)})
    */
    createAddressForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/addresses";
      return callSync(url,params);
    },
    /* 
    * Update an address for a customer
    * SAMPLE CALL:- Meteor.call('updateAddressForCustomer',
      {"merchantId":"KRT7B7ATBE51P",
      "customerId":"ENNGAM7KKBZ0W", 
      "addressId" : "368M6AP41N66E",
        "zip": "12328",
        "country": "IN",
        "address3": "SURAT",
        "address2": "SURAT",
        "city": "SURAT",
        "address1": "SURAT",
        "id": "",
        "state": "GUJARAT"
      },function(e,r){console.log(e); console.log(r)})
    */
    updateAddressForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/addresses";
      return callSync(url,params);
    },
    /* 
    * Delete a customer address
    * SAMPLE CALL:- Meteor.call('deleteAddressForCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'ENNGAM7KKBZ0W', "addressId" : "976F2C4BXXXST"},function(e,r){console.log(e); console.log(r)})
    */
    deleteAddressForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/addresses/"+params.addressId;
      return callSync(url);
    },
    /* f) Cards
    * Create a credit/debit card entry for a customer
    * SAMPLE CALL :- Meteor.call('createCreditOrDebitCardForCustomer',
      {"merchantId":"KRT7B7ATBE51P",
      "customerId":"ENNGAM7KKBZ0W", 
        "last4": "1234",
        "firstName": "harish",
        "lastName": "mahajan",
        "cardType": "VISA",
        "id": "",
        "first6": "124565",
        "expirationDate": "",
        "token": ""
      },function(e,r){console.log(e); console.log(r)})
    */
    createCreditOrDebitCardForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/cards";
      return callSync(url,params);      
    }, 
    /* 
    * Update a credit/debit card record for a customer
    * SAMPLE CALL:- Meteor.call('updateCreditOrDebitCardForCustomer',
        {"merchantId":"KRT7B7ATBE51P",
        "customerId":"ENNGAM7KKBZ0W", 
        "cardId":"RW30ZH4S3ADET",
        "last4": "7894",
        "firstName": "harry",
        "lastName": "porter",
        "cardType": "VISA",
        "id": "",
        "first6": "124565",
        "expirationDate": "",
        "token": ""
        },function(e,r){console.log(e); console.log(r)})
    */
    updateCreditOrDebitCardForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/cards/"+params.cardId;
      return callSync(url,params);      
    }, 
    /*
    * Delete a customer card
    * SAMPLE CALL:- Meteor.call('deleteCreditOrDebitCardForCustomer',{'merchantId':'KRT7B7ATBE51P','customerId':'ENNGAM7KKBZ0W', "cardId" : "RW30ZH4S3ADET"},function(e,r){console.log(e); console.log(r)})
    */
    deleteCreditOrDebitCardForCustomer(params){
      var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/cards/"+params.cardId;
      return callSync(url);
    },

    /* g) Metadata
    * Create note, birthday, business name for a customer
    */
    createMetadata(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/customers/'+params.customerId+"/metadata";
      return callSync(url,params);      
    }, 
});