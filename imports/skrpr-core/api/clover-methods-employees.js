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
  * 1) Employees       
  */

  /* a) Employees
  * Get all employees
  * SAMPLE CALL:- Meteor.call('getEmployees',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
    getEmployees(params) {
        var callSync = Meteor.wrapAsync(callAsyncGetMethod);
        var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees';
        return callSync(url);
    },
   /* 
   * Create an employee
   * SAMPLE CALL :- Meteor.call('createEmployees',
      {
        "merchantId":"KRT7B7ATBE51P",
        "role": "MANAGER",
        "inviteSent": false,
        "customId": "",
        "pin": "121212",
        "isOwner": true,
        "name": "harish mahajan",
        "nickname": "harry",
        "email": "hellddo@gmail.com"
      },function(e,r){console.log(e); console.log(r)});
   */
    createEmployees(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees';
      return callSync(url,params);      
    },
    /*
      * Get a single employee 
      * SAMPLE CALL:- Meteor.call('getEmployeeById',{'merchantId':'KRT7B7ATBE51P','empId':'J6NATZQCQ6AY4'},function(e,r){console.log(e); console.log(r)})
    */
    getEmployeeById(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId;
      return callSync(url);
    },
    /*
      * Update an employee
      * SAMPLE CALL:- Meteor.call('updateEmployee',
        {
          "empId":"J6NATZQCQ6AY4",
          "merchantId":"KRT7B7ATBE51P",
          "inviteSent": false,
          "pin": "121213",
          "isOwner": false,
          "nickname": "PPPP",
        },function(e,r){console.log(e); console.log(r)});
    */
    updateEmployee(params) {
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId;
      return callSync(url,params);
    },
    /* Delete a customer
      * SAMPLE CALL:- Meteor.call('deleteEmployee',{'merchantId':'KRT7B7ATBE51P','empId':'J6NATZQCQ6AY4'},function(e,r){console.log(e); console.log(r)})
    */
    deleteEmployee(params) {
      var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId;
      return callSync(url);
    },

    /* b) Shifts
    * Get all shifts
    * SAMPLE CALL:- Meteor.call('getAllShifts',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
    */
    getAllShifts(params) {
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/shifts/';
      return callSync(url);
    },
    /* Create shift for an employee
    * SAMPLE CALL :-  Meteor.call('createShiftForEmployee',
      {
        "merchantId":"KRT7B7ATBE51P",
        "empId":"71S600HDC9WK2",
        "inTime": 1516860107001,
        "cashTipsCollected": 123455,
        "serverBanking": true,
        "overrideInEmployee": {
          "role": "ADMIN",
          "inviteSent": false,
          "customId": "",
          "pin": "123213",
          "isOwner": true,
          "claimedTime": 1516860107001,
          "name": "Hario",
          "nickname": "haru",
          "unhashedPin": "sdfsdff",
          "deletedTime": 1516860107001,
          "email": "sdfsdf@gmail.com"
        },
        "overrideInTime": 1516860107001,
        "employee": {
          "role": "ADMIN",
          "inviteSent": true,
          "customId": "",
          "pin": "121312",
          "isOwner": true,
          "claimedTime": 1516860107001,
          "name": "sdfsdf",
          "nickname": "sdfsdf",
          "unhashedPin": "sdfxcvdf",
          "deletedTime": 1516860107001,
          "email": "dsdfsdf@fd.com"
        },
        "overrideOutEmployee": {
          "role": "ADMIN",
          "inviteSent": false,
          "customId": "sdf",
          "pin": "123123",
          "isOwner": false,
          "claimedTime": 1516860107001,
          "name": "cxvxcv",
          "nickname": "asdsd",
          "unhashedPin": "123213",
          "deletedTime": 1516860107001,
          "email": "sdfsdf@gmailc.om"
        },
        "outTime": 1516860107001,
        "overrideOutTime": 1516860107001
      },function(e,r){console.log(e); console.log(r)});
    */
    createShiftForEmployee(params) {
      var callSync = Meteor.wrapAsync(callAsyncPostMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId+'/shifts';
      return callSync(url,params);
    },
    /* 
    * Get a single shift
    * SAMPLE CALL :- Meteor.call('getShiftById',{'merchantId':'KRT7B7ATBE51P','shiftId':'EVN0F0PADHG9R'},function(e,r){console.log(e); console.log(r)})
    */ 
    getShiftById(params){
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/shifts/'+params.shiftId;
      return callSync(url);
    },
    /* 
    * Get all shifts for an employee
    * SAMPLE CALL :- Meteor.call('getShiftForEmployee',{'merchantId':'KRT7B7ATBE51P','empId':'J6NATZQCQ6AY4','shiftId':'EVN0F0PADHG9R'},function(e,r){console.log(e); console.log(r)})
    */ 
    getShiftForEmployee(params){
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId +'/shifts';
      return callSync(url);
    },
    /* Update a single shift
    * SAMPLE CALL :-  Meteor.call('updateShift',
      {
        "merchantId":"KRT7B7ATBE51P",
        "shiftId":"EVN0F0PADHG9R",
        'empId':'71S600HDC9WK2',
        "inTime": 1516860107001,
        "cashTipsCollected": 1516860107001,
        "serverBanking": false,
        "overrideInEmployee": {
          "role": "ADMIN",
          "inviteSent": false,
          "customId": "",
          "pin": "123214",
          "isOwner": false,
          "claimedTime": 1516860107001,
          "name": "Hario",
          "nickname": "haru",
          "unhashedPin": "sdfsdff",
          "deletedTime": 1516860107001,
          "email": "sssss@gmail.com"
        },
        "id": "",
        "overrideInTime": 1516860107001,
        "employee": {
          "role": "ADMIN",
          "inviteSent": false,
          "customId": "",
          "pin": "121311",
          "isOwner": false,
          "claimedTime": 1516860107001,
          "name": "sdfsdf",
          "nickname": "sdfsdf",
          "unhashedPin": "sdfxcvdf",
          "deletedTime": 1516860107001,
          "email": "dsdfsdf@fd.com"
        },
        "overrideOutEmployee": {
          "role": "ADMIN",
          "inviteSent": false,
          "customId": "sdf",
          "pin": "123123",
          "isOwner": false,
          "claimedTime": 1516860107001,
          "name": "cxvxcv",
          "nickname": "asdsd",
          "unhashedPin": "123213",
          "deletedTime": 1516860107001,
          "email": "sdfsdf@gmailc.om"
        },
        "outTime": 1516860107001,
        "overrideOutTime": 1516860107001
      },function(e,r){console.log(e);console.log(r)});
    */
    updateShift(params){
      var callSync = Meteor.wrapAsync(callAsyncPostMethod); 
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId + '/shifts/'+params.shiftId;
      return callSync(url,params);
    },
    /* Delete a single shift
    *  SAMPLE CALL :- Meteor.call('deleteShift', { "merchantId":"KRT7B7ATBE51P", "shiftId":"EVN0F0PADHG9R", 'empId':'71S600HDC9WK2' },function(e,r){console.log(e);console.log(r)});
    */
    deleteShift(params){
      var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);  //DELETE /v3/merchants/{mId}/employees/{empId}/shifts/{shiftId}
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId + '/shifts/'+params.shiftId;
      return callSync(url);
    },
    /* ShiftsCSV
    * Get .csv of all shifts
    * SAMPLE CALL:- Meteor.call('getShiftsCSV',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
    */  
    getShiftsCSV(params){
      var callSync = Meteor.wrapAsync(callAsyncGetMethod);
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/shifts.csv';
      return callSync(url);
    },
    /* Get all orders for an employee
    * SAMPLE CALL:- Meteor.call('getOrdersForEmployee',{'merchantId':'KRT7B7ATBE51P','empId':'71S600HDC9WK2'},function(e,r){console.log(e); console.log(r)})
    */
    getOrdersForEmployee(params){
      var callSync = Meteor.wrapAsync(callAsyncGetMethod); ///v3/merchants/{mId}/employees/{empId}/orders
      var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employees/'+params.empId+'/orders';
      return callSync(url);
    },
    /* EmployeeCards (Remaining to implement, Because of "401 Unauthorized")
    POST /v3/merchants/{mId}/employee_cards
    GET /v3/merchants/{mId}/employee_cards
    GET /v3/merchants/{mId}/employee_cards/{employeeCardId}
    DELETE /v3/merchants/{mId}/employee_cards/{employeeCardId}
    * */
    // createEmployeeCard(params){
    //   var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    //   var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/employee_cards';
    //   return callSync(url,params);
    // }, 
});