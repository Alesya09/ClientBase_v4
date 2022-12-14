import {expect} from "chai"
import ClientHelper from "../helpers/client.helper";

describe('Client', function () {
  describe ('Create client', function () {
    let clientHelper = new ClientHelper()
    let client

    before(async function () {
      client = (await clientHelper.create())
    })

    after(async function() {
      await clientHelper.delete(client.body.payload)
    })

    it('response status code is 200', function () {
      expect(clientHelper.response.status).to.eq(200)
    })

    it('response message', function () {
      expect(clientHelper.response.body.message).to.eq("Client created")
    })

    it('response for created id', function () {
      expect(clientHelper.response.body.payload).to.be.a('string')
    })
  })

  describe('Get client', function () {
    let clientHelper = new ClientHelper()
    let client

    before(async function () {
      client = (await clientHelper.create()).body
      await clientHelper.get(client.payload)
    })

    after(async function() {
      await clientHelper.delete(client.payload)
    })

    it('response status code is 200', function () {
      expect(clientHelper.response.status).to.eq(200)
    })

    it('response message', function () {
      expect(clientHelper.response.body.message).to.eq("Get Client by id ok")
    })

    it('response body contains client id', function () {
      expect(clientHelper.response.body.payload._id).to.eq(client.payload)
    })
  })

  describe('Get All clients', function () {
    let clientHelper = new ClientHelper()

    before(async function () {
      await clientHelper.getAllclients()
    })

    it('response status code is 200', function () {
      expect(clientHelper.response.status).to.eq(200)
    })

    it('response message', function () {
      expect(clientHelper.response.body.message).to.eq("ClientSearch ok")
    })
  })

  describe('delete clients', function () {
    let clientHelper = new ClientHelper()
    let client

    before(async function () {
      client = (await clientHelper.create()).body
      await clientHelper.delete(client.payload)
    })

    it('response status code is 200', function () {
      expect(clientHelper.response.status).to.eq(200)
    })

    it('response message', function () {
      expect(clientHelper.response.body.message).to.eq("Client deleted")
    })
  })

  describe('Change client', function () {
    let clientHelper = new ClientHelper()
    let client

    before(async function () {
      client = (await clientHelper.create()).body
      await clientHelper.patch(client.payload)
    })

    after(async function() {
      await clientHelper.delete(client.payload)
    })

    it('response status code is 200', function () {
      expect(clientHelper.response.status).to.eq(200)
    })

    it('response message', function () {
      expect(clientHelper.response.body.message).to.eq("Client updated")
    })
  })
})




