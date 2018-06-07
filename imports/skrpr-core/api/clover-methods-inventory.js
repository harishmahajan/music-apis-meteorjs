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
  * Inventory       
  */

  /* a) Items
  * Get all inventory items
  * SAMPLE CALL:- Meteor.call('getInventoryItems',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getInventoryItems(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/items';
    return callSync(url);
  },
  /*
  * Create an inventory item
  * SAMPLE CALL:- Meteor.call('createInventoryItems',{'merchantId':'KRT7B7ATBE51P',
    "modifiedTime": 1516860107001,
    "code": "EAN",
    "cost": 1516860107001,
    "hidden": false,
    "unitName": "HA",
    "priceType": "FIXED",
    "alternateName": "KA",
    "isRevenue": true,
    "price": 500,
    "name": "Hello Harish",
    "sku": "INR",
    "defaultTaxRates": true,
    "stockCount": 50},function(e,r){console.log(e); console.log(r)});
  */
  createInventoryItems(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/items';
    return callSync(url,params);      
  },
  /* Get a single inventory item
  * SAMPLE CALL:- Meteor.call('getInventoryItemById',{'merchantId':'KRT7B7ATBE51P','itemId':'YG86V4FGGD3BA'},function(e,r){console.log(e); console.log(r)})
  */
  getInventoryItemById(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/items/'+params.itemId;
    return callSync(url);
  },
  /* Bulk delete inventory items 
  * SAMPLE CALL:- Meteor.call('deleteInventoryItemsBulkDelete',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  deleteInventoryItemsBulkDelete(params) {
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/items';
    return callSync(url);
  },
  /* Update an existing inventory item
  *  SAMPLE CALL:- Meteor.call('updateInventoryItems',{'merchantId':'KRT7B7ATBE51P',
    "modifiedTime": 1516860107001,
    "itemId":"YG86V4FGGD3BA",
    "code": "EAN",
    "cost": 1516860107001,
    "hidden": false,
    "unitName": "HA",
    "priceType": "FIXED",
    "alternateName": "KA",
    "isRevenue": true,
    "price": 500,
    "name": "Hello Harish",
    "sku": "INR",
    "defaultTaxRates": true,
    "stockCount": 50},function(e,r){console.log(e); console.log(r)});
  */
  updateInventoryItems(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/items';
    return callSync(url,params);      
  },
  /*
  * Delete an inventory item
  * SAMPLE CALL:- Meteor.call('deleteInventoryItemsById',{'merchantId':'KRT7B7ATBE51P','itemId':'GECD7YM6KCFM2'},function(e,r){console.log(e); console.log(r)})
  */
  deleteInventoryItemsById(params) {
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/items/'+params.itemId;
    return callSync(url);
  },
  /* Get all items for a single tag
  * 
  */
  getItemsForSingleTag(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tags/'+params.tagId+'/items';
    return callSync(url);
  },
  /* Get all items in a single category
  * 
  */
  getItemsForSingleCategory(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/categories/'+params.catId+'/items';
    return callSync(url);
  },
  /* Get items by tax rate
  *  
  */
  getItemsByTaxRate(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tax_rates/'+params.taxId+'/items';
    return callSync(url);
  },
  
  /* b) ItemStocks
  * Get the stock of all inventory items
  * SAMPLE CALL:- Meteor.call('getStockOfAllInventoryItems',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */ 
  getStockOfAllInventoryItems(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_stocks';
    return callSync(url);
  },
  /*
  * Get the stock of an inventory item
  * SAMPLE CALL:- Meteor.call('getStockOfInventoryItemById',{'merchantId':'KRT7B7ATBE51P','itemId':'ASDAZXEW'},function(e,r){console.log(e); console.log(r)})
  */
  getStockOfInventoryItemById(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_stocks/'+params.itemId;
    return callSync(url);    
  },
  /*
  * Update the stock of an inventory item 
  * SAMPLE CALL:- Meteor.call('getStockOfInventoryItemById',{'merchantId':'KRT7B7ATBE51P','itemId':'ASDAZXEW'},function(e,r){console.log(e); console.log(r)})
  */
  updateStockOfInventoryItemById(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_stocks/'+params.itemId;
    return callSync(url,params);    
  },
  /* Delete the stock of an inventory item
  * SAMPLE CALL:- Meteor.call('getStockOfInventoryItemById',{'merchantId':'KRT7B7ATBE51P','itemId':'ASDAZXEW'},function(e,r){console.log(e); console.log(r)})
  */
  deleteStockOfInventoryItemById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_stocks/'+params.itemId;
    return callSync(url);    
  },

  /* c) ItemGroups
  * Create an item group
  * SAMPLE CALL:- Meteor.call('createItemGroup',{
        "merchantId":"KRT7B7ATBE51P", 
        "name": "Computers",
        "id": "ASDZXCASD", 
        "attributes": [
          {
            "id": "ssddsadsad"
          }
        ],
        "items": [
          {
            "id": "sdfsdfdsfcxv"
          }
        ]      
      },function(e,r){console.log(e); console.log(r)});
  */
  createItemGroup(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_groups';
    return callSync(url,params);    
  },
  /* Get a single inventory item
  * SAMPLE CALL:- Meteor.call('getItemGroupsById',{'merchantId':'KRT7B7ATBE51P','itemGroupId':'SJXJFCP3CSQN8'},function(e,r){console.log(e); console.log(r)})
  */
  getItemGroupsById(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_groups/'+params.itemGroupId; 
    return callSync(url);
  },
  /* Get a single inventory item
  * SAMPLE CALL:- Meteor.call('getAllItemGroups',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getAllItemGroups(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_groups'; 
    return callSync(url);
  },
   /*
  * Update an item group
  * SAMPLE CALL:- Meteor.call('updateItemGroup',{
        "merchantId":"KRT7B7ATBE51P", 
        "name": "Acer Computers",
        "itemGroupId": "SJXJFCP3CSQN8", 
        "attributes": [
          {
            "id": "ssddsadsad"
          }
        ],
        "items": [
          {
            "id": "sdfsdfdsfcxv"
          }
        ]      
      },function(e,r){console.log(e); console.log(r)});
  */
  updateItemGroup(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_groups/'+params.itemGroupId; 
    return callSync(url,params);    
  },
  /* Delete an item group
  * SAMPLE CALL:- Meteor.call('deleteItemGroupById',{'merchantId':'KRT7B7ATBE51P','itemGroupId':'SJXJFCP3CSQN8'},function(e,r){console.log(e); console.log(r)})
  */
  deleteItemGroupById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/item_groups/'+params.itemGroupId;
    return callSync(url);    
  },

  /* d) Tags
  * Get all tags
  * SAMPLE CALL:- Meteor.call('getAllTags',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getAllTags(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tags'; 
    return callSync(url);
  },
  /*
  * Create a tag
  * SAMPLE CALL:- Meteor.call('createTag',{
    "name": "TAG3",
    "merchantId":"KRT7B7ATBE51P",
    "showInReporting": true,
    "id":"sdfsdaasdf",
    "printers": [],
    "items": []
  },function(e,r){console.log(e); console.log(r)});
  */
  createTag(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tags'; 
    return callSync(url,params);    
  },
  /* Get a single tag
  * SAMPLE CALL:- Meteor.call('getTagById',{'merchantId':'KRT7B7ATBE51P','tagId':'3QMJV3XDRE400'},function(e,r){console.log(e); console.log(r)})
  */
  getTagById(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tags/'+params.tagId; 
    return callSync(url);
  },
  /* Update a single tag
  * SAMPLE CALL:- Meteor.call('updateTag',{
    "name": "TAG4",
    "merchantId":"KRT7B7ATBE51P",
    "showInReporting": true,
    "tagId":"3QMJV3XDRE400",
    "printers": [],
    "items": []
  },function(e,r){console.log(e); console.log(r)});
  */
  updateTag(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tags/'+params.tagId;  
    return callSync(url,params);    
  },
  /* Delete a Tag
  * SAMPLE CALL:- Meteor.call('deleteTag',{'merchantId':'KRT7B7ATBE51P','tagId':'3QMJV3XDRE400'},function(e,r){console.log(e); console.log(r)})
  */
  deleteTag(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tags/'+params.tagId;
    return callSync(url);    
  },
  /* Get tags for a single item
  * Meteor.call('getTagForItem',{'merchantId':'KRT7B7ATBE51P','itemId':'3QMJV3XDRE400'},function(e,r){console.log(e); console.log(r)})
  */
  getTagForItem(params) {
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/items/'+params.itemId+'/tags'; 
    return callSync(url);
  },
  /* e) TagItems
  * Create or delete tag items
  * Remaining :- Because parameters are not mentioned there.
  */

  /* f) TaxRates
  * Create a tax rate for a merchant
  Meteor.call('createTaxRateForMerchant',{
    "merchantId":"KRT7B7ATBE51P",
    "isDefault": true,
    "rate": 12344,
    "name": "harish mahajan",
    "id": "asasassa",
    "taxAmount": 122,
    "items": [
    ]
  },function(e,r){console.log(e); console.log(r)});
  */
  createTaxRateForMerchant(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tax_rates';  
    return callSync(url,params);    
  },
  /* Get all tax rates
  * Meteor.call('getAllTaxRates',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getAllTaxRates(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tax_rates/'; 
    return callSync(url);
  },
  /* Get a single tax rate
  * Meteor.call('getTaxRateById',{'merchantId':'KRT7B7ATBE51P','taxId':'YC44BBZV0RD9M'},function(e,r){console.log(e); console.log(r)})
  */
  getTaxRateById(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tax_rates/'+params.taxId; 
    return callSync(url);
  },
  /*
  * Update a single tax rate
  Meteor.call('updateTaxRateForMerchant',{
    'taxId':'YC44BBZV0RD9M',
    "merchantId":"KRT7B7ATBE51P",
    "isDefault": true,
    "rate": 12344,
    "name": "Harry Mahajan",
    "id": "asasassa",
    "taxAmount": 122,
    "items": [
    ]
  },function(e,r){console.log(e); console.log(r)});
  */
  updateTaxRateForMerchant(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tax_rates/'+params.taxId;  
    return callSync(url,params);    
  },
  /* Delete a single tax rate
  * SAMPLE CALL:- Meteor.call('deleteTaxRateById',{'merchantId':'KRT7B7ATBE51P','taxId':'YC44BBZV0RD9M'},function(e,r){console.log(e); console.log(r)})
  */
  deleteTaxRateById(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/tax_rates/'+params.taxId;
    return callSync(url);    
  },
  /* g) Categories
  * Create an item category
    Meteor.call('createItemCategory',{
    "merchantId":"KRT7B7ATBE51P",
    "deleted": true,
    "sortOrder": 3,
    "name": "electronic",
    "id": "",
    "items": [
      {
        "id": ""
      }
    ]
  },function(e,r){console.log(e); console.log(r)});
  */
  createItemCategory(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/categories/';  
    return callSync(url,params);    
  },
  /* Get all categories
  * Meteor.call('getAllCategories',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getAllCategories(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/categories/'; 
    return callSync(url);
  },
  /* Get a category
  * Meteor.call('getItemCategoryById',{'merchantId':'KRT7B7ATBE51P','categoryId':'5W7JH92R0YC58'},function(e,r){console.log(e); console.log(r)})
  */
  getItemCategoryById(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/categories/'+params.categoryId; 
    return callSync(url);
  },
  /* Update a category
   Meteor.call('updateItemCategory',{
    "merchantId":"KRT7B7ATBE51P",
    'categoryId':'5W7JH92R0YC58',
    "deleted": true,
    "sortOrder": 3,
    "name": "electronic item",
    "id": "",
    "items": [
      {
        "id": ""
      }
    ]
  },function(e,r){console.log(e); console.log(r)});
  * */
  updateItemCategory(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/categories/'+params.categoryId;  
    return callSync(url,params);    
  },
  /* Delete a single item category
  * Meteor.call('deleteItemCategory',{'merchantId':'KRT7B7ATBE51P','categoryId':'5W7JH92R0YC58'},function(e,r){console.log(e); console.log(r)})
  */
  deleteItemCategory(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/categories/'+params.categoryId;
    return callSync(url);    
  },
  /* Get all categories of a single item
  *  Meteor.call('getAllCatgoriesOfItem',{'merchantId':'KRT7B7ATBE51P','itemId':'5W7JH92R0YC58'},function(e,r){console.log(e); console.log(r)})
  */
  getAllCatgoriesOfItem(params){ ///v3/merchants/{mId}/items/{itemId}/categories
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/items/'+params.itemId+'/categories'; 
    return callSync(url);
  },
  /* h) CategoryItems
  * Create or delete an item/category association
  * Remaining, Because what parameters needed is not mentioned there.
  */

  /* i) TaxRateItems
  * Create or delete a tax rate item
  * Remaining, Because what parameters needed is not mentioned there.
  */

  /* j) ModifierGroups
  * Create a modifier group
   Meteor.call('createModifierGroup',{
    'merchantId':'KRT7B7ATBE51P',
    "maxAllowed": 1,
    "minRequired": 1,
    "sortOrder": 1,
    "name": "HarishGROUP",
    "alternateName": "HPM",
    "modifierIds": "SSDSD",
    "id": "SDSD",
    "modifiers": [
      {
        "price": 1234,
        "name": "Harish",
        "modifierGroup": {
          "id": "sasdsd"
        },
        "alternateName": "cxvx",
        "id": "sdfsdf"
      }
    ],
    "items": [
      {
        "id": "xxcvxcv"
      }
    ],
    "showByDefault": true
  },function(e,r){console.log(e); console.log(r)});
  * */
  createModifierGroup(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/modifier_groups/';
    return callSync(url,params);    
  },
  /* Get all modifier groups
  * Meteor.call('getAllModifierGroup',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getAllModifierGroup(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/modifier_groups/';
    return callSync(url);    
  },
  /* Get a modifier group
  * Meteor.call('getModifierGroupById',{'merchantId':'KRT7B7ATBE51P','id':'568YPKMDGARQR'},function(e,r){console.log(e); console.log(r)})
  */
  getModifierGroupById(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/modifier_groups/'+params.id;
    return callSync(url);    
  },
   /*
  * Update a modifier group
   Meteor.call('updateModifierGroup',{
    'merchantId':'KRT7B7ATBE51P',
    'mgId':'568YPKMDGARQR',
    "maxAllowed": 1,
    "minRequired": 1,
    "sortOrder": 1,
    "name": "HarishGROUPAAAA",
    "alternateName": "HPM",
    "modifierIds": "SSDSD",
    "id": "SDSD",
    "modifiers": [
      {
        "price": 1234,
        "name": "Harish",
        "modifierGroup": {
          "id": "sasdsd"
        },
        "alternateName": "cxvx",
        "id": "sdfsdf"
      }
    ],
    "items": [
      {
        "id": "xxcvxcv"
      }
    ],
    "showByDefault": false
  },function(e,r){console.log(e); console.log(r)});
  * */
  updateModifierGroup(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/modifier_groups/'+params.mgId;
    return callSync(url,params);    
  },
  /* Delete a modifier group
  * Meteor.call('deleteModifierGroup',{'merchantId':'KRT7B7ATBE51P','mgId':'568YPKMDGARQR'},function(e,r){console.log(e); console.log(r)})
  */
  deleteModifierGroup(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/modifier_groups/'+params.mgId;
    return callSync(url);    
  },
  /* k) ItemModifierGroups
  *  Remaining, Because what parameters needed is not mentioned there.
  */

  /* l) ModifierGroupSortOrders
  * Update the priorities for a collection of up to 200 modifier groups at a time
  *  Meteor.call('updateModifierGroupSortOrders',{'merchantId':'KRT7B7ATBE51P',  "modifierGroups": [
        {
          "maxAllowed": 1,
          "minRequired": 2,
          "sortOrder": 2,
          "name": "AWSASW",
          "alternateName": "AASASAS",
          "modifierIds": "ASAS",
          "id": "J5HV83GP3GA90",
          "modifiers": [
            {
              "price": 121,
              "name": "ASAS",
              "modifierGroup": {
                "id": "asas"
              },
              "alternateName": "",
              "id": "asas"
            }
          ],
          "items": [
            {
              "id": "asdsd"
            }
          ],
          "showByDefault": true
        }
      ]
      },function(e,r){console.log(e); console.log(r)})
  */
  updateModifierGroupSortOrders(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/modifier_group_sort_orders';
    return callSync(url,params);    
  },
  
  /* m) Modifiers
  * Get all modifiers
  * Meteor.call('getModifiers',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getModifiers(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/modifiers/';
    return callSync(url);    
  },
  /* Get all modifiers belonging to a single modifier group
  * Meteor.call('getModifiers',{'mId':'KRT7B7ATBE51P','modGroupId':'EDSGGV2ASXE'},function(e,r){console.log(e); console.log(r)})
  */
  getAllModifiersBelongingToSingleModifierGroup(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.mId + '/modifier_groups/'+params.modGroupId+'/modifiers';
    return callSync(url);    
  },
  /* Create a modifier
  *  Meteor.call('createModifier',{
          "mId": "KRT7B7ATBE51P", 
          "modGroupId": "LJKBNMTYU8HJ",
          "price": 1234,
          "name": "HERRE",
          "modifierGroup": {
            "id": "DDQAWHYTV"
          },
          "alternateName": "Applw",
          "id": "ASDCVBXC"
        },function(e,r){console.log(e); console.log(r)})
  */
  createModifier(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.mId + '/modifier_groups/'+params.modGroupId+'/modifiers';
    return callSync(url,params);    
  },
  /* Get a single modifier
  * Meteor.call('getModifierById',{'mId':'KRT7B7ATBE51P','modGroupId':'TRVCEGJ43FSF'},function(e,r){console.log(e); console.log(r)})
  */
  getModifierById(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.mId + '/modifier_groups/'+params.modGroupId+'/modifiers/'+params.modId;
    return callSync(url);    
  },
  /* Update a single modifier
  *  Meteor.call('updateModifier',{
          "mId": "KRT7B7ATBE51P", 
          "modGroupId": "LJKBNMTYU8HJ",
          "modId": "OPREFV32BNM",
          "price": 1234,
          "name": "HERRE",
          "modifierGroup": {
            "id": "DDQAWHYTV"
          },
          "alternateName": "Applw",
          "id": "ASDCVBXC"
        },function(e,r){console.log(e); console.log(r)})
  */
  updateModifier(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.mId + '/modifier_groups/'+params.modGroupId+'/modifiers/'+params.modId;
    return callSync(url,params);    
  },
  /* Delete a single modifier
  * Meteor.call('deleteModifier',{
          "mId": "KRT7B7ATBE51P", 
          "modGroupId": "LJKBNMTYU8HJ",
          "modId": "OPREFV32BNM"
        },function(e,r){console.log(e); console.log(r)})
  */
  deleteModifier(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/modifier_groups/'+params.mgId;
    return callSync(url);    
  },

  /* n) Attributes
  * Get all attributes
  * Meteor.call('getAttributes',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getAttributes(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/';
    return callSync(url);    
  },
  /* Create an attribute
  * Meteor.call('createAttributes',{
          "merchantId": "KRT7B7ATBE51P", 
          "itemGroup": {
            "id": "AGZXWQUIKH"
          },
          "name": "hsrud",
          "options": [
            {
              "name": "dfgfdg",
              "id": "dfgfg",
              "attribute": {
                "id": "dfgfg"
              },
              "items": [
                {
                  "id": "fdgg"
                }
              ]
            }
          ],
          "id": "dfgdfg"
    },function(e,r){console.log(e); console.log(r)})
  */
  createAttributes(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/';
    return callSync(url,params); 
  },
  /* Get a single attribute
  * Meteor.call('getAttributesById',{'mId':'KRT7B7ATBE51P','attributeId':'TRVCEGJ43FSF'},function(e,r){console.log(e); console.log(r)})
  */
  getAttributesById(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.mId + '/attributes/'+params.attributeId;
    return callSync(url);    
  },
   /* Update an attribute
  * Meteor.call('updateAttributes',{
          "merchantId": "KRT7B7ATBE51P", 
          "attributeId":"NIVMTYYHGHHK",
          "itemGroup": {
            "id": "AGZXWQUIKH"
          },
          "name": "hsrud",
          "options": [
            {
              "name": "dfgfdg",
              "id": "dfgfg",
              "attribute": {
                "id": "dfgfg"
              },
              "items": [
                {
                  "id": "fdgg"
                }
              ]
            }
          ],
          "id": "dfgdfg"
    },function(e,r){console.log(e); console.log(r)})
  */
  updateAttributes(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/'+params.attributeId;
    return callSync(url,params); 
  },
  /* Delete a single attribute
  * Meteor.call('deleteAttribute',{
          "merchantId": "KRT7B7ATBE51P", 
          "attributeId": "LJKBNMTYU8HJ"
        },function(e,r){console.log(e); console.log(r)})
  */
  deleteAttribute(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/'+params.attributeId;
    return callSync(url);    
  },

  /* o) Options
  * Get all options
    GET /v3/merchants/{mId}/options 
  * Meteor.call('getAllOptions',{'merchantId':'KRT7B7ATBE51P'},function(e,r){console.log(e); console.log(r)})
  */
  getAllOptions(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/options';
    return callSync(url);    
  },
  /*
  * Get all options with a given attribute
  * Meteor.call('getAllOptions',{'merchantId':'KRT7B7ATBE51P','attributeId':'FDQNYXWH5YHF'},function(e,r){console.log(e); console.log(r)})
  * 
  */
  getAllOptionsWithAttribute(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/'+params.attributeId+'/options';
    return callSync(url);    
  },
  /* Create an attribute
  * Meteor.call('createOption',{
          "merchantId": "KRT7B7ATBE51P", 
          "name": "DSZXEWWE",
          "attributeId":"JNHBHUIOODI",
          "id": "SDADSSSS",
          "attribute": {
            "id": ""
          },
          "items": [
            {
              "id": ""
            }
          ]
    },function(e,r){console.log(e); console.log(r)})
  */
  createOption(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/'+params.attributeId+'/options';
    return callSync(url,params); 
  },
  /* Get all options with a given attribute
  * Meteor.call('getAllOptions',{'merchantId':'KRT7B7ATBE51P','attributeId':'FDQNYXWH5YHF','optionId':'WESLVOPDFG'},function(e,r){console.log(e); console.log(r)})
  */
  getAllOptionsWithAttributeByOptionId(params){
    var callSync = Meteor.wrapAsync(callAsyncGetMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/'+params.attributeId+'/options/'+params.optionId;
    return callSync(url);    
  },
  /* Update an attribute
  * Meteor.call('updateOption',{
          "merchantId": "KRT7B7ATBE51P", 
          "name": "DSZXEWWE",
          "optionId" : "OKSDPLJSNM",
          "attributeId":"JNHBHUIOODI",
          "id": "SDADSSSS",
          "attribute": {
            "id": ""
          },
          "items": [
            {
              "id": ""
            }
          ]
    },function(e,r){console.log(e); console.log(r)})
  */
  updateOption(params){
    var callSync = Meteor.wrapAsync(callAsyncPostMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/'+params.attributeId+'/options/'+params.optionId;
    return callSync(url,params); 
  },
  /* Delete an option
  * Meteor.call('deleteOption',{
          "merchantId": "KRT7B7ATBE51P", 
          "optionId": "XZJPLFMFJSC",
          "attributeId": "LJKBNMTYU8HJ"
        },function(e,r){console.log(e); console.log(r)})
  */
  deleteOption(params){
    var callSync = Meteor.wrapAsync(callAsyncDeleteMethod);
    var url = Meteor.settings.clover.url + 'merchants/' + params.merchantId + '/attributes/'+params.attributeId+'/options/'+params.optionId;
    return callSync(url);    
  },

  /* p) OptionItems
  * Remaining :- Because parameters are not mentioned there.
  */
});
