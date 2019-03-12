//var Factory = require('rosie').Factory;
//var faker = require('faker');
var assert = require('assert');


Feature('Mage Login');

Scenario('Test-MageLogin', async (I) => {

  // Magento auth
  var login_parameters = {
  	"username": "user",
  	"password": "123123Qa"
  };

  let token = await I.sendPostRequest(
  	'/index.php/rest/V1/integration/admin/token',
  	login_parameters
  );

  // console.log(token)
  assert.equal(token.status, 200)
  assert.notEqual(token.data, "")

  // get product data
  let product = await I.sendGetRequest(
  	'/index.php/rest/V1/products/test2',
  	{'Authorization': 'Bearer ' + token.data}
  );

  // console.log(product.data)
  assert.equal(product.status, 200)
  assert.equal(product.data.sku, "test2")
  assert.equal(product.data.status, 1)
  assert.equal(product.data.type_id, "simple")
  assert.equal(product.data.price, 2)

  // update price
  let updated_product = await I.sendPutRequest(
  	'/index.php/rest/V1/products/test2',
  	{'product': {'price': 10}},
  	{'Authorization': 'Bearer ' + token.data}
  );
  assert.equal(updated_product.status, 200)
  assert.equal(updated_product.data.price, 10)

  // revert price
  let reverted_product = await I.sendPutRequest(
  	'/index.php/rest/V1/products/test2',
  	{'product': {'price': 2}},
  	{'Authorization': 'Bearer ' + token.data}
  );
  assert.equal(reverted_product.status, 200)
  assert.equal(reverted_product.data.price, 2)

});

