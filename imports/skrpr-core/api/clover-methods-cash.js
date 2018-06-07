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

Meteor.methods({
  /*
  * 1) Cash       
  */

  /* a) CashEvents
  * Get all cash events
  * SAMPLE CALL:- Meteor.call('getAllCashEvents',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
    getAllCashEvents(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/cash_events';
        return callSync(url);
    },
    /* Get all cash events for an employee
    * SAMPLE CALL:- Meteor.call('getAllCashEventsForEmployee',{'merchantId':'KRT7B7ATBE51P','empId':'SDBJ6VHGJ'},function(e,r){console.log(e); console.log(r)})
    */
    getAllCashEventsForEmployee(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId+'/cash_events';
        return callSync(url);
    },
    /* Get all cash events for a device
    * SAMPLE CALL:- Meteor.call('getAllCashEventsForEmployee',{'merchantId':'KRT7B7ATBE51P','deviceId':'DEF6VTHJ'},function(e,r){console.log(e); console.log(r)})
    */
    getAllCashEventsForEmployee(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/devices/'+params.deviceId+'/cash_events';
        return callSync(url);
    },
});