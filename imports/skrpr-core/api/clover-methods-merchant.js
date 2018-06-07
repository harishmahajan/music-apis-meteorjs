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
      //console.log("error", error);
      cb && cb(new Meteor.Error(500, 'There was an error processing your request.', error));
    } else {
      //console.log("result", result);
      cb && cb(null, result);
    }
  });
}

Meteor.methods({
  /*
  * 1) Merchants       
  */

  /* a) Merchants
  * Get a single merchant
  * SAMPLE CALL:- Meteor.call('getSingleMerchant',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getSingleMerchant(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId;
    return callSync(url);
  },
  /*
  * Get a merchant's address
  * SAMPLE CALL:- Meteor.call('updateMerchantsData',{'merchantId':'KRT7B7ATBE51P','name':'Harry Mahajan'},function(e,r){console.log(e); console.log(r)})
  */
  updateMerchantsData(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId;
    return callSync(url,params);
  },

  /* b) Address
  * Get a merchant's address
  * SAMPLE CALL:- 
  * Meteor.call('getMerchantAddress',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getMerchantAddress(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/address';
    return callSync(url);
  },

  /* c) Gateway
  * Get a merchant's payment gateway configuration
  * SAMPLE CALL:- Meteor.call('getMerchantsGateway',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsGateway(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/gateway';
    return callSync(url);
  },

  /* d) Properties
  * Get a merchant's properties
  * SAMPLE CALL:- Meteor.call('getMerchantsProperties',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsProperties(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/properties';
    return callSync(url);
  },
  /* d) Properties
  * Get a merchant's properties
  * SAMPLE CALL:- Meteor.call('updateMerchantsProperties',{
    'merchantId':'KRT7B7ATBE51P',
    'allowClockOutWithOpenOrders' : false,
    'alternateInventoryNames' : false,
    'appBillingSystem' : 'INFOLEASE',
    'autoLogout' : false,
    'autoPrint' : false,
    'cashBackEnabled' : false,
    'defaultCurrency' : 'USD',
    'deleteOrders' : true,
    'groupLineItems' : true,
    'hasConsented' : true,
    'hasDefaultEmployee' : false,
    'href' :'https://sandbox.dev.clover.com/v3/merchants/KRT7B7ATBE51P/properties',
    'infoleaseSuppressBilling' : false,
    'infoleaseSuppressPlanBilling' : false,
    'locale' : 'en-US',
    'logInClockInPrompt' : true,
    'manualCloseout' : false,
    'marketingEnabled' : true,
    'merchantBoardingStatus' : 'ACCOUNT_READY_FOR_PROCESSING',
    'merchantRef' : {id: 'KRT7B7ATBE51P'},
    'notesOnOrders' : false,
    'orderTitle' : 'NONE',
    'orderTitleMax' : 99,
    'pinLength' : 4,
    'removeTaxEnabled' : false,
    'resetOnReportingTime' : false,
    'sendCloseoutEmail' : false,
    'showCloseoutOrders' : false,
    'signatureThreshold' : 0,
    'stayInCategory' : false,
    'summaryHour' : 0,
    'supportEmail' : 'dev@clover.com',
    'supportPhone' : '+1 000-000-0000',
    'timezone' : 'Pacific/Samoa',
    'tipRateDefault' : 1500,
    'tipsEnabled' : false,
    'trackStock' : false,
    'updateStock' : false,
    'vat' : false,
    'vatTaxName' : 'TAT'},function(e,r){console.log(e); console.log(r)});
 */
  updateMerchantsProperties(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/properties';
    return callSync(url,params);
  },

  /* e) DefaultServiceCharge
  * Get default service charge for a merchant
  * SAMPLE CALL:- Meteor.call('getMerchantsDefaultServiceCharge',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsDefaultServiceCharge(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/default_service_charge';
    return callSync(url);
  },

  /* f) TipSuggestions
  * Get all tip suggestions for a merchant
  * SAMPLE CALL:- Meteor.call('getMerchantsTipSuggestions',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsTipSuggestions(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tip_suggestions';
    return callSync(url);
  },
  /* 
  * Get a single tip suggestion
  * SAMPLE CALL:- Meteor.call('getMerchantsSingleTipSuggestions',{'merchantId':'KRT7B7ATBE51P','tipId':'N2XCV409PG0E6'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsSingleTipSuggestions(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tip_suggestions/' + params.tipId;
    return callSync(url);
  },
  /*
  * Update a single tip suggestion
  * SAMPLE CALL:- Meteor.call('updateMerchantsSingleTipSuggestions',{'merchantId':'KRT7B7ATBE51P','id' : 'N2XCV409PG0E6', 'isEnabled' : true, 'name' : 'Best Service Ever Now!', 'percentage' : 30},function(e,r){console.log(e); console.log(r)});
  */ 
  updateMerchantsSingleTipSuggestions(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tip_suggestions/'+params.id;
    return callSync(url,params);
  },

  /* g) OrderTypes
  * Get all order types for a merchant
  * SAMPLE CALL:- Meteor.call('getMerchantsOrderTypes',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsOrderTypes(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/order_types';
    return callSync(url);
  },
  /*
  * Create Order Type For Merchant
  * SAMPLE CALL:- Meteor.call('getMerchantsOrderTypes',{
      "merchantId":"KRT7B7ATBE51P",
      "customerIdMethod": "TABLE",
      "maxRadius": "12345678",
      "hours": {
        "reference": {
          "id": ""
        },
        "sunday": [
          {
            "start": 10,
            "end": "11"
          }
        ],
        "saturday": [
          {
            "start": 10,
            "end": "11"
          }
        ],
        "tuesday": [
          {
            "start": 10,
            "end": "11"
          }
        ],
        "name": "asd",
        "wednesday": [
          {
            "start": 10,
            "end": "11"
          }
        ],
        "thursday": [
          {
            "start": 10,
            "end": "11"
          }
        ],
        "friday": [
          {
            "start": 10,
            "end": "11"
          }
        ],
        "id": "",
        "monday": [
          {
            "start": 10,
            "end": "11"
          }
        ]
      },
      "taxable": false,
      "filterCategories": false,
      "fee": 110,
      "avgOrderTime": 1,
      "label": "aws",
      "systemOrderTypeId": "asddds",
      "isHidden": false,
      "isDefault": false,
      "minOrderAmount": 20,
      "isDeleted": false,
      "hoursAvailable": "1",
      "id": "",
      "maxOrderAmount": 500,
      "categories": [
        {
          "id": ""
        }
      ],
      "labelKey": "ASDf"
    },function(e,r){console.log(e); console.log(r)});
  */
  createMerchantsOrderType(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/order_types';
    return callSync(url,params);
  },
  /*
  * Get a single order type
  * SAMPLE CALL:- Meteor.call('getMerchantsSingleOrderType',{'merchantId':'KRT7B7ATBE51P','orderTypeId':'F8YSQ4P9T8HJ6'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsSingleOrderType(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/order_types/' + params.orderTypeId;
    return callSync(url);
  },
  /*
  * Update a single order type
  * SAMPLE CALL:- Meteor.call('updateMerchantsSingleOrderType',{'merchantId':'KRT7B7ATBE51P','orderTypeId':'F8YSQ4P9T8HJ6',
    "avgOrderTime" : 1,
    "customerIdMethod" : "NAME",
    "fee" : 110,
    "filterCategories" : false,
    "hoursAvailable" : "BUSINESS",
    "id" : "F8YSQ4P9T8HJ6",
    "isDefault" : true,
    "isHidden" : true,
    "label" : "aws",
    "maxOrderAmount" : 200,
    "maxRadius" : 12345,
    "minOrderAmount" : 25,
    "taxable" : true},function(e,r){console.log(e); console.log(r)});
  */
  updateMerchantsSingleOrderType(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/order_types/' + params.orderTypeId;
    return callSync(url, params);
  },
  /*
  * Delete an order type
  * SAMPLE CALL:- Meteor.call('deleteOrderType',{'merchantId':'KRT7B7ATBE51P','orderTypeId':'F8YSQ4P9T8HJ6'},function(e,r){console.log(e); console.log(r)});
  */
  deleteOrderType(params) {
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/order_types/'+params.orderTypeId;
    return callSync(url);
  },
  /* h) SystemOrderTypes
  * Return a list of system order types
  * SAMPLE CALL:- Meteor.call('getMerchantsSystemOrderTypes',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsSystemOrderTypes(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/system_order_types';
    return callSync(url);
  },
  /* h) Roles
  * Get all roles from a merchant
  * SAMPLE CALL:- Meteor.call('getMerchantsRoles',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsRoles(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/roles';
    return callSync(url);
  },
  /*
  * Create a role
  * SAMPLE CALL:- Meteor.call('createRole',{'merchantId':'KRT7B7ATBE51P', "systemRole": "ADMIN", "name": "HARISH" },function(e,r){console.log(e); console.log(r)});
  */
  createRole(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/roles';
    return callSync(url,params);
  },
  /* 
  * Get a single role
  * SAMPLE CALL:- Meteor.call('getMerchantsSingleRole',{'merchantId':'KRT7B7ATBE51P','roleId':'E1HMDK953V6VW'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsSingleRole(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/roles/' + params.roleId;
    return callSync(url);
  },
  /*
  * Update a single role
  * SAMPLE CALL:- Meteor.call('createRole',{'merchantId':'KRT7B7ATBE51P', "systemRole": "ADMIN", "name": "HARISH" },function(e,r){console.log(e); console.log(r)});
  */
  updateRole(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/roles/'+params.id;
    return callSync(url,params);
  },
  /*
  * Delete a role
  * SAMPLE CALL:- Meteor.call('createRole',{'merchantId':'KRT7B7ATBE51P', "systemRole": "ADMIN", "name": "HARISH" },function(e,r){console.log(e); console.log(r)});
  */
  deleteRole(params) {
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/roles/'+params.roleId;
    return callSync(url);
  },
  /* i) Tenders
  * Get all tenders for a merchant
  * SAMPLE CALL:- Meteor.call('getMerchantsTenders',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsTenders(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tenders';
    return callSync(url);
  },
  /* 
  * Get a single merchant tender
  * SAMPLE CALL:- Meteor.call('getSingleMerchantTender',{'merchantId':'KRT7B7ATBE51P','tenderId':'YVZYRW4GMJM28'},function(e,r){console.log(e); console.log(r)});
  */
  getSingleMerchantTender(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tenders/' + params.tenderId;
    return callSync(url);
  },
    /*
  * Adds a new tender
  * SAMPLE CALL:- Meteor.call('createNewTender',{'merchantId':'KRT7B7ATBE51P', 'instructions': 'assss', 'visible': true, 'editable': true, 'id': '', 'label': 'sdsdsd', 'labelKey': 'fdgfdgfg', 'opensCashDrawer': true, 'supportsTipping': true, 'enabled': true },function(e,r){console.log(e); console.log(r)});
  */

  createNewTender(params) { //There was an error processing your request.
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tenders';
    return callSync(url,params);
  },

  /* Updates an existing tender
  * 
  */

  updateTender(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);  
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tenders/'+params.id;
    return callSync(url,params);
  },
  /* Deletes an existing tender
  * SAMPLE CALL:- Meteor.call('deleteTender',{'merchantId':'KRT7B7ATBE51P','id':'2S847Q0PT6TME'},function(e,r){console.log(e); console.log(r)});
  */
  deleteTender(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);  
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tenders/'+params.id;
    return callSync(url);
  },

  /* j) OpeningHours
  * Get a list this merchant opening hours
  * SAMPLE CALL:- Meteor.call('getMerchantsOpeningHours',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsOpeningHours(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/opening_hours';
    return callSync(url);
  },
  /* Create a set of merchant opening hours
  *  SAMPLE CALL :- Meteor.call('createMerchantsOpeningHours',{"merchantId":"KRT7B7ATBE51P",
      "sunday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "saturday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "tuesday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "name": "harish",
      "wednesday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "thursday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "friday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "id": "",
      "monday": [
        {
          "start": 0,
          "end": 30
        }
      ]
    },function(e,r){console.log(e); console.log(r)});
  */
  createMerchantsOpeningHours(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/opening_hours';
    return callSync(url,params);
  }, 
    /* Create a set of merchant opening hours
    * SAMPLE CALL :- Meteor.call('updateMerchantsOpeningHours',{"merchantId":"KRT7B7ATBE51P",
      "sunday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "saturday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "tuesday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "name": "mahajan",
      "wednesday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "thursday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "friday": [
        {
          "start": 0,
          "end": 30
        }
      ],
      "id": "W6BXMWPB7ZMZM",
      "monday": [
        {
          "start": 0,
          "end": 30
        }
      ]
    },function(e,r){console.log(e); console.log(r)});
    */
  updateMerchantsOpeningHours(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/opening_hours/'+params.id;
    return callSync(url,params);
  },
  /* Delete a set of merchant opening hours
  *  SAMPLE CALL:- Meteor.call('deleteMerchantsOpeningHours',{'merchantId':'KRT7B7ATBE51P','id':'QM40GC2N6XSEE'},function(e,r){console.log(e); console.log(r)});
  */
  deleteMerchantsOpeningHours(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);  
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/opening_hours/'+params.id;
    return callSync(url);
  },
  /* 
  * Get a specific set of merchant opening hours 
  * SAMPLE CALL:- Meteor.call('getSpecificSetOfMerchantOpeningHours',{'merchantId':'KRT7B7ATBE51P','hId':'YVZYRW4GMJM28'},function(e,r){console.log(e); console.log(r)});
  */
  getSpecificSetOfMerchantOpeningHours(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/opening_hours/' + params.hId;
    return callSync(url);
  },
  /* i) Devices
  * Get all devices provisioned to a merchant
  * SAMPLE CALL:- Meteor.call('getMerchantsDevices',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsDevices(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/'+params.merchantId+'/devices';
    return callSync(url);
  },  
  /* Get a single device provisioned to a merchant
  * SAMPLE CALL:- Meteor.call('getMerchantsDevices',{'merchantId':'KRT7B7ATBE51P',id:'HSHGD23FFG'},function(e,r){console.log(e); console.log(r)});
  */
  getMerchantsSingleDevice(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/'+params.merchantId+'/devices/'+params.id;
    return callSync(url);
  },   
})

