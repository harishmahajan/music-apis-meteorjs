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
  * 1) Apps       
  */

  /* a) BillingInfo 
  * Get all cash events
  * SAMPLE CALL:- Meteor.call('getMerchantBillingInformationForApp',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
    getMerchantBillingInformationForApp(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod); 
        var url = Meteor.settings.clover.url + 'apps/' + params.aId + '/merchants/'+params.merchantId+'/billing_info';
        return callSync(url);
    },
  
  /* Create an app billing metered event
  *  POST /v3/apps/{aId}/merchants/{mId}/metereds/{meteredId}
  * SAMPLE CALL:- Meteor.call('createBillingMeteredEvent',{
          'merchantId':'KRT7B7ATBE51P',
          'orderId':'8DWDC7E6A4R46',
          "modifiedTime": 23,
          "charge": {
            "id": "asdsa"
          },
          "appMetered": {
            "app": {
              "id": "dsfgds"
            },
            "amount": 3434,
            "action": "sdfsdf",
            "active": false,
            "meteredCountries": [
              {
                "country": "IN",
                "amount": 324,
                "appMetered": {
                  "id": "sdfsdf"
                },
                "action": "SD",
                "active": false,
                "id": "sdfdf"
              }
            ],
            "id": "sdfsdf",
            "label": "sdfdsf"
          },
          "count": 15,
          "createdTime": 5,
          "id": "sdfdsf"
        },function(e,r){console.log(e); console.log(r)})
  */
  createBillingMeteredEvent(params) {
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'apps/' + params.aId + '/merchants/'+params.merchantId+'/metereds/'+params.meteredId;
    return callSync(url,params);
  },

  /* Get the app metered billing events for an app metered, e.g. all the billing events for the event 'reservation'
  * GET /v3/apps/{aId}/merchants/{mId}/metereds/{meteredId}
  * Meteor.call('getMerchantBillingInformationForApp',{'aId':'JHDFHDHHDH','merchantId':'KRT7B7ATBE51P','meteredId':'JSHSHBBXTHS'},function(e,r){console.log(e); console.log(r)})
  */
  getAppMeteredBillingEvents(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod); 
    var url = Meteor.settings.clover.url + 'apps/' + params.aId + '/merchants/'+params.merchantId+'/metereds/'+params.meteredId;
    return callSync(url);
  },

  /* c) Events
  * Get an app billing metered event
  * Meteor.call('getEvents',{'aId':'JHDFHDHHDH','merchantId':'KRT7B7ATBE51P','meteredId':'JSHSHBBXTHS','eventId':'IFM7HD8HHD'},function(e,r){console.log(e); console.log(r)})
  */
  getEvents(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod); 
    var url = Meteor.settings.clover.url + 'apps/' + params.aId + '/merchants/'+params.merchantId+'/metereds/'+params.meteredId+'/events/'+params.eventId;
    return callSync(url);
  },
  /* Delete an app billing metered event, if not charged.
  * Meteor.call('deleteAppBillingMeteredEvent',{'aId':'JHDFHDHHDH','merchantId':'KRT7B7ATBE51P','meteredId':'JSHSHBBXTHS','eventId':'IFM7HD8HHD'},function(e,r){console.log(e); console.log(r)})
  */
  deleteAppBillingMeteredEvent(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'apps/' + params.aId + '/merchants/'+params.merchantId+'/metereds/'+params.meteredId+'/events/'+params.eventId;
    return callSync(url);
  },

});