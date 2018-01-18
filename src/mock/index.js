import Mock from 'mockjs'
import articleAPI from './article'

Mock.setup({
  timeout: '350-2000'
})
// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/times/, 'get', articleAPI.getTimes)
Mock.mock(/\/article\/names/, 'get', articleAPI.getNames)
Mock.mock(/\/article\/reports/, 'get', articleAPI.getReports)
Mock.mock(/\/article\/members/, 'get', articleAPI.getMembers)
Mock.mock(/\/article\/getActivityById/, 'get', articleAPI.getActivityById)
Mock.mock(/\/article\/getReportById/, 'get', articleAPI.getReportById)
Mock.mock(/\/article\/getUserRoles/, 'get', articleAPI.getUserRoles)
Mock.mock(/\/article\/coupons/, 'get', articleAPI.getAllCoupons)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
export default Mock
