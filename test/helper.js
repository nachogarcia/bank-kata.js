const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinonChaiInOrder = require('sinon-chai-in-order').default

global.sinon = require('sinon')
global.expect = chai.expect

chai.use(sinonChai)
chai.use(sinonChaiInOrder)
