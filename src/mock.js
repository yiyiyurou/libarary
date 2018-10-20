
// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const userList = function () {
  let Data = []
  for (let i = 0; i < 20; i++) {
    let data = {
      nickname: Random.cname(),
      name: Random.cname(),
      city: Random.city(),
      email: Random.email(),
      address: Random.region()}
    Data.push(data)
  }
  return {
    Data: Data
  }
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/userlist', 'get', userList)
