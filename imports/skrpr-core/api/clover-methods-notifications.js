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
  /* Notifications
  * Create a notification for an app
  * Meteor.call('createNotificationForApp',{
    "app": {
      "id": "asdasd"
    },
    "aId":"BHCHJSHDHCH",
    "mId":"JNUDUHFHHF",
    "timeToLive": 2,
    "data": "adsad",
    "event": "asdasasd"
    },function(e,r){console.log(e); console.log(r)})
  */ 
  createNotificationForApp(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'apps/' + params.aId + '/merchants/'+params.mId+'/notifications';
    return callSync(url,params); 
  },
  /*
  Create a notification for a device
  POST /v3/apps/{aId}/devices/{dId}/notifications
  * Meteor.call('createNotificationForDevice',{
    "app": {
      "id": "asdasd"
    },
    "aId":"BHCHJSHDHCH",
    "dId":"JNUDUHFHHF",
    "timeToLive": 2,
    "data": "adsad",
    "event": "asdasasd"
    },function(e,r){console.log(e); console.log(r)})
  */ 
  createNotificationForDevice(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'apps/' + params.aId + '/devices/'+params.dId+'/notifications';
    return callSync(url,params); 
  },

});