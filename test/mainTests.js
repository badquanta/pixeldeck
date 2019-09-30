const test = {
  get request(){return require('supertest')},
  get should(){return require('should')},
  get server(){return require('../lib/server')},
}

describe('/',function(){
  it('works',function(){
    return test.agent.get('/')
  })
})