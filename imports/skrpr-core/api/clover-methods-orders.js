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
  * 1) Orders       
  */

  /* a) Orders
  * Gets a list of orders
  * SAMPLE CALL:- Meteor.call('getAllOrders',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
    getAllOrders(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders';
        return callSync(url);
    },

  /*
  * Create an order
  * SAMPLE CALL:- Meteor.call('createOrder',{
    "merchantId":"KRT7B7ATBE51P", 
    "note": "hdhdh",
    "modifiedTime": 2,
    "employee": {
    },
    "title": "sdfvc",
    "deletedTimestamp": 2,
    "total": 500,
    "serviceCharge": {
      "percentage": 5,
      "name": "dfsdf",
      "enabled": false,
      "percentageDecimal": 2
    },
    "payType": "FULL",
    "discounts": [
      {
        "approver": {
        },
        "amount": 123,
        "percentage": 123,
        "name": "sdfdsf",
        "discount": {
        },
      }
    ],
    "createdTime": 12,
    "currency": "INR",
    "state": "sdf",
    "groupLineItems": false,
    "isVat": false,
    "manualTransaction": false,
    "clientCreatedTime": 12,
    "testMode": false,
    "taxRemoved": false,
    "device": {
    }
  },function(e,r){console.log(e); console.log(r)})
  */
  createOrder(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId+'/orders';
    return callSync(url,params);
  },
  /* Get a single order
  * SAMPLE CALL:- Meteor.call('getOrderById',{'merchantId':'KRT7B7ATBE51P','orderId':'XCT11H42BPVDA'},function(e,r){console.log(e); console.log(r)})
  */ 
  getOrderById(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId;
    return callSync(url);
  },
  /* Update an order
  * SAMPLE CALL:- Meteor.call('updateOrder',{
    "merchantId":"KRT7B7ATBE51P",
    'orderId':'XCT11H42BPVDA',
    "note": "Helllo",
    "modifiedTime": 2,
    "employee": {
    },
    "title": "sdfvc",
    "deletedTimestamp": 2,
    "total": 500,
    "serviceCharge": {
      "percentage": 5,
      "name": "dfsdf",
      "enabled": false,
      "percentageDecimal": 2
    },
    "payType": "FULL",
    "discounts": [
      {
        "approver": {
        },
        "amount": 123,
        "percentage": 123,
        "name": "sdfdsf",
        "discount": {
        },
      }
    ],
    "createdTime": 12,
    "currency": "INR",
    "state": "sdf",
    "groupLineItems": false,
    "isVat": false,
    "manualTransaction": false,
    "clientCreatedTime": 12,
    "testMode": false,
    "taxRemoved": false,
    "device": {
    }
  },function(e,r){console.log(e); console.log(r)})
  */
  updateOrder(params)
  {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId;
    return callSync(url,params);
  },
  /* Delete an order
  * SAMPLE CALL:- Meteor.call('deleteOrderById',{'merchantId':'KRT7B7ATBE51P','orderId':'XCT11H42BPVDA'},function(e,r){console.log(e); console.log(r)})
  */
  deleteOrderById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId;
    return callSync(url);
  },

  /* b) Discounts
  * Get all discounts for an order
  * SAMPLE CALL:- Meteor.call('getAllDiscountsForAnOrder',{'merchantId':'KRT7B7ATBE51P','orderId':'8DWDC7E6A4R46'},function(e,r){console.log(e); console.log(r)})
  */
  getAllDiscountsForAnOrder(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod); //discounts
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/discounts';
    return callSync(url);
  },
  /* Create a discount on an order or line item
  * SAMPLE CALL:- Meteor.call('createDiscountOnAnOrderOrLineItem',{
    "merchantId":"KRT7B7ATBE51P",
    'orderId':'8DWDC7E6A4R46',
          "approver": {
            "id": "asdsad"
          },
          "amount": -5,
          "percentage": 1,
          "name": "Harish",
          "discount": {
            "id": "asdasd"
          },
    },function(e,r){console.log(e); console.log(r)})
  */
  createDiscountOnAnOrderOrLineItem(params)
  {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/discounts';
    return callSync(url,params);
  },
  /*Delete a discount
  * SAMPLE CALL:- Meteor.call('deleteDiscountById',{'merchantId':'KRT7B7ATBE51P','orderId':'8DWDC7E6A4R46','discountId':'HAAPTJP4QWMFY'},function(e,r){console.log(e); console.log(r)})
  */
  deleteDiscountById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/discounts/'+params.discountId;
    return callSync(url);
  },
  /* Create a discount on an order or line item
  * SAMPLE CALL:- Meteor.call('createDiscountOnAnOrderOrLineItem',{
    "merchantId":"KRT7B7ATBE51P",
    "orderId":'8DWDC7E6A4R46',
    "lineItemId":'4DESFG23DERR',
          "approver": {
            "id": "asdsad"
          },
          "amount": -5,
          "percentage": 1,
          "name": "Harish",
          "discount": {
            "id": "asdasd"
          },
    },function(e,r){console.log(e); console.log(r)})
  */
  createDiscountOnAnOrderOrLineItem2(params)
  {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/'+params.lineItemId+'/discounts';
    return callSync(url,params);
  },
  /* Delete a discount
  * SAMPLE CALL:- Meteor.call('deleteDiscountById',{'merchantId':'KRT7B7ATBE51P','orderId':'8DWDC7E6A4R46','discountId':'HAAPTJP4QWMFY'},function(e,r){console.log(e); console.log(r)})
  */ 
  deleteDiscountById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/'+params.lineItemId+'/discounts/'+params.discountId;
    return callSync(url);
  },

  /* c) LineItems
  * Get all line items for an order
  * SAMPLE CALL:- Meteor.call('getAllLineItemsForAnOrder',{'merchantId':'KRT7B7ATBE51P','orderId':'8DWDC7E6A4R46'},function(e,r){console.log(e); console.log(r)})
  */ 
  getAllLineItemsForAnOrder(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod); 
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items';
    return callSync(url);
  },
  /* Create a new line item
  * SAMPLE CALL:- Meteor.call('createLineItem',{
    "merchantId":"KRT7B7ATBE51P",
    "orderId":"8DWDC7E6A4R46",
    "note": "ssss",
    "userData": "dddd",
    "itemCode": "101S",
    "payments": [],
    "discountAmount": 1231,
    "revenueAmount": 1211,
    "exchangedLineItem": {},
    "taxRates": [],
    "discounts": [
        {
          "approver": {
            "id": "sdssd"
          },
          "amount": 1550,
          "percentage": 1,
          "name": "ASDDX",
          "discount": {
            "id": "asas"
          },
          "id": "asdsad"
        }
      ],
    "price": 1400,
    "createdTime": 1,
    "refunded": false,
    "quantitySold": 0,
    "orderClientCreatedTime": 1,
    "modifications": [],
    "unitName": "sssdsd",
    "alternateName": "dsadsf",
    "isRevenue": false,
    "binName": "sdfdsf",
    "printed": false,
    "name": "dsfdf",
    "unitQty": 5,
    "exchanged": false
  },function(e,r){console.log(e); console.log(r)})
  */
  createLineItem(params)
  { 
    var callSync = Meteor.wrapAsync(callAsyncPostMethod); // POST /v3/merchants/{mId}/orders/{orderId}/line_items
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/';
    return callSync(url,params);
  },
  /* Get a line item
  * SAMPLE CALL:- Meteor.call('getLineItemById',{'merchantId':'KRT7B7ATBE51P','orderId':'8DWDC7E6A4R46','lineItemId':'BR5SF40QDM91R'},function(e,r){console.log(e); console.log(r)})
  */
  getLineItemById(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/'+params.lineItemId;
    return callSync(url);
  },
    /* Create a new line item
  * SAMPLE CALL:- Meteor.call('updateLineItem',{
    "merchantId":"KRT7B7ATBE51P",
    "orderId":"8DWDC7E6A4R46",
    "lineItemId":"BR5SF40QDM91R",
    "note": "HHHHHHHHHHH",
    "userData": "GGGGGGG",
    "itemCode": "101S",
    "payments": [],
    "discountAmount": 1231,
    "revenueAmount": 1211,
    "exchangedLineItem": {},
    "taxRates": [],
    "discounts": [
        {
          "approver": {
            "id": "sdssd"
          },
          "amount": 1550,
          "percentage": 1,
          "name": "HHHHHHHHHHH",
          "discount": {
            "id": "asas"
          },
          "id": "asdsad"
        }
      ],
    "price": 1400,
    "createdTime": 1,
    "refunded": false,
    "quantitySold": 0,
    "orderClientCreatedTime": 1,
    "modifications": [],
    "unitName": "HHHHHHHHHHH",
    "alternateName": "HHHHHHHHHHH",
    "isRevenue": false,
    "binName": "HHHHHHHHHHH",
    "printed": false,
    "name": "HHHHHHHHHHH",
    "unitQty": 5,
    "exchanged": false
  },function(e,r){console.log(e); console.log(r)})
  */
  updateLineItem(params)
  { 
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/'+params.lineItemId;
    return callSync(url,params);
  },
  /* Void a line item
  * SAMPLE CALL:- Meteor.call('deleteLineItemById',{'merchantId':'KRT7B7ATBE51P','orderId':'8DWDC7E6A4R46','lineItemId':'BR5SF40QDM91R'},function(e,r){console.log(e); console.log(r)})
  */
  deleteLineItemById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/'+params.lineItemId;
    return callSync(url);
  },

  /* d) Modifications
  * Apply a modification to a line item 
    Meteor.call('applyModificationToLineItem',{
    "merchantId":"KRT7B7ATBE51P",
    'orderId':'8DWDC7E6A4R46',
    'lineItemId':'788NWBXRZ1HE8',
    "amount": 123,
    "modifier": {
      "price": 1222,
      "name": "AWSED",
      "modifierGroup": {
        "id": "1211"
      },
      "alternateName": "asdasd",
      "id": "122"
    },
    "name": "sdfdf",
    "alternateName": "asdsd",
     "quantitySold": 123
  },function(e,r){console.log(e); console.log(r)})
  */
  applyModificationToLineItem(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod); ///v3/merchants/{mId}/orders/{orderId}/line_items/{lineItemId}/modifications
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/'+params.lineItemId+'/modifications';
    return callSync(url,params);
  },
  /* Remove a modification from a line item
  * SAMPLE CALL:- Meteor.call('deleteModificationFromLineItemById',{'merchantId':'KRT7B7ATBE51P','orderId':'8DWDC7E6A4R46','lineItemId':'BR5SF40QDM91R','modificationId':'HYDG7GS7HH'},function(e,r){console.log(e); console.log(r)})
  */
  deleteModificationFromLineItemById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/'+params.lineItemId+'/modifications/'+params.modificationId;
    return callSync(url);
  },

  /* e) BulkLineItems
  * Create multiple line items in bulk.
  * Meteor.call('createBulkLineItems',{
          "merchantId":"KRT7B7ATBE51P",
          'orderId':'8DWDC7E6A4R46',
          "items": [
            {
              "note": "sdfdsf",
              "userData": "sdfdsf",
              "itemCode": "ssdf",
              "price": 2333,
              "createdTime": 2,
              "unitName": "sdfsdfs",
              "alternateName": "sdfdsf",
              "unitQty": 3,
              "exchanged": false
            }
          ]
        },function(e,r){console.log(e); console.log(r)})
  */
  createBulkLineItems(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/bulk_line_items';
    return callSync(url,params);
  },
  /* f) Payments
  * Create a payment record on an order
    Meteor.call('createPaymentRecordForAnOrder',{
      "merchantId":"KRT7B7ATBE51P",
      "orderId":"8DWDC7E6A4R46",
      "modifiedTime": 1,
      "note": "sdfsdf",
      "voidReason": "USER_CANCEL",
      "cashbackAmount": 1234,
      "result": "SUCCESS",
      "offline": false,
      "serviceCharge": {
        "amount": 122,
        "name": "sdsdf",
        "id": "sdd"
      },
      "createdTime": 1212,
      "externalPaymentId": "dsfsdf",
      "order": {
        "id": "sdfsdf"
      },
      "tender": {
          "instructions": "ert",
          "visible": false,
          "editable": false,
          "id":"JHDHNHHCHDUJ",
          "label": "ertret",
          "labelKey": "ertret",
          "opensCashDrawer": false,
          "supportsTipping": false,
          "enabled": false
        },
      "amount": 213,
      "tipAmount": 2323,
      "clientCreatedTime": 2323,
      "taxAmount": 3444
  },function(e,r){console.log(e); console.log(r)})
  */
  createPaymentRecordForAnOrder(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/payments';
    return callSync(url,params);
  },

  /* g) ServiceCharge
  * Create Service Charge
  * 
  */
  createServiceCharge(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/service_charge/';
    return callSync(url,params);
  },
  /* Remove service charge from an order
  * SAMPLE CALL:- Meteor.call('deleteServiceChargeById',{'merchantId':'KRT7B7ATBE51P','orderId':'8DWDC7E6A4R46','chargeId':'BR5SF40QDM91R'},function(e,r){console.log(e); console.log(r)})
  */
  deleteServiceChargeById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/service_charge/'+params.chargeId;
    return callSync(url);
  },
  /* h) VoidedLineItems
  * Void a line item
    Meteor.call('voidLineItem',{
          'merchantId':'KRT7B7ATBE51P',
          'orderId':'8DWDC7E6A4R46',
          "reason": "USER_CANCEL",
          "environment": "dfgfdg",
          "lineItem": {
            "note": "dfgdfg",
            "userData": "dfgdg",
            "itemCode": "dfgfg",
            "discountAmount": 23,
            "revenueAmount": 43,
            "exchangedLineItem": {
              "id": "dsdfsdfds"
            },
            "price": 233,
            "createdTime": 33,
            "refunded": false,
            "id": "0748EA7P4CSAT",
            "quantitySold": 0,
            "orderClientCreatedTime": 33,
            "item": {
              "id": "sdfsdf"
            },
            "unitName": "sdfsdf",
            "alternateName": "sdfsdf",
            "isRevenue": false,
            "binName": "sdfsdfdsf",
            "printed": false,
            "name": "sdfsdf",
            "unitQty": 33,
            "exchanged": false
          },
          "clientEventType": "MOVED_TABLE",
          "deletedTime": 4
        },function(e,r){console.log(e); console.log(r)})
  */
  voidLineItem(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/voided_line_items';
    return callSync(url,params);
  },
  /* Get order line items that were recorded after a void
  * SAMPLE CALL:- Meteor.call('getOrderLineItem',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getOrderLineItem(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/voided_line_items';
    return callSync(url);
  },

  /* i) Exchange
  * Create or exchange a line item 
    POST /v3/merchants/{mId}/orders/{orderId}/line_items/{oldLineItemId}/exchange/{lineItemId}
    Meteor.call('createOrExchangeLineItem',{
          'merchantId':'KRT7B7ATBE51P',
          'orderId':'8DWDC7E6A4R46',
          'oldLineItemId':'ASDASDASD',
          'lineItemId':'ASDASDASD',
          "note": "sdfsdfsdf",
          "userData": "sdfdsf",
          "itemCode": "dsfsdf",
          "payments": [
            {
              "binName": "sdfdsf",
              "percentage": 3,
              "refunded": false,
              "id": "dsfsdf"
            }
          ],
          "discountAmount": 4,
          "revenueAmount": 44,
          "exchangedLineItem": {
            "id": "sdfsdf"
          },
          "taxRates": [
            {
              "isDefault": false,
              "rate": 2,
              "name": "xcvxcv",
              "id": "asdasd",
              "taxAmount": 23,
              "items": [
                {
                  "id": "asdsad"
                }
              ]
            }
          ],
          "discounts": [
            {
              "approver": {
                "id": "asdsad"
              },
              "amount": 22,
              "percentage": 5,
              "name": "sdfsdf",
              "discount": {
                "id": "sdfsdf"
              },
              "id": "sdfdsf"
            }
          ],
          "price": 4,
          "createdTime": 4,
          "refunded": false,
          "id": "sdfsdf",
          "quantitySold": 0,
          "orderClientCreatedTime": 6,
          "modifications": [
            {
              "amount": 33,
              "modifier": {
                "price": 44,
                "name": "dsfsdf",
                "modifierGroup": {
                  "id": "sdfdsf"
                },
                "alternateName": "xcvxcv",
                "id": "edsfsd"
              },
              "name": "xcvxcv",
              "alternateName": "fdsfsd",
              "id": "xcvcxv",
              "quantitySold": 33
            }
          ],
          "item": {
            "id": "xcvxcv"
          },
          "unitName": "xcvxcvcxv",
          "alternateName": "dsfsdfsdf",
          "isRevenue": false,
          "binName": "dsfsdfds",
          "printed": false,
          "name": "dfdsf",
          "unitQty": 33,
          "exchanged": false
        },function(e,r){console.log(e); console.log(r)})
  */
  createOrExchangeLineItem(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/orders/'+params.orderId+'/line_items/'+params.oldLineItemId+'/exchange/'+lineItemId;
    return callSync(url,params);
  },
});