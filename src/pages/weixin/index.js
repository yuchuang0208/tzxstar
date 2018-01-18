import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../pages/layout/Layout'

import Materialmanagement from '@/pages/weixin/Materialmanagement.vue'
 import ModifyMateria  from '@/pages/weixin/ModifyMaterial.vue';
  import MenuSet  from '@/pages/weixin/MenuSet.vue';
/** 会员中心*/
const membercardmanagement = () => import('@/pages/member/member_card')
const member_profile_detail = () => import('@/pages/member/member_profile_detail')  
const member_profile_update = () => import('@/pages/member/member_profile_update')
const member_profile = () => import('@/pages/member/member_profile') 
const membershiplevelset = () => import('@/pages/member/member_level')  
const groupfilemanagement = () => import('@/pages/member/member_team')
const memberupgrademanagement = () => import('@/pages/member/member_upgraid') 
const memberfilemanagement = () => import('@/pages/member/member_center') 
const member_level_set = () => import('@/pages/member/member_level_set') 
/** 营销中心*/
const activitymanagement = () => import('@/pages/marketing/activitymanagement') 
const membershipsgroupmanagement = () => import('@/pages/marketing/membershipsgroupmanagement') 
const createactivitynew = () => import('@/pages/marketing/createActivityNew') 
const game = () => import('@/pages/marketing/game') 
const membershipmarketing = () => import('@/pages/marketing/membershipmarketing') 
const wakemarketing = () => import('@/pages/marketing/wakemarketing') 
const fillingandmarketing = () => import('@/pages/marketing/fillingandmarketing') 
const consumptioncoupons = () => import('@/pages/marketing/consumptioncoupons') 
const mallcouponsmarketing = () => import('@/pages/marketing/mallcouponsmarketing') 
const buymembership = () => import('@/pages/marketing/buymembership') 
const marketingblacklist = () => import('@/pages/marketing/marketingblacklist') 
const muchmultiplecreditmanagement = () => import('@/pages/marketing/muchmultiplecreditmanagement') 
const signinmarketing = () => import('@/pages/marketing/signinmarketing') 
const completedata = () => import('@/pages/marketing/completedata') 
const markactivity = () => import('@/pages/marketing/markactivity') 
const fullamountdecreasecash = () => import('@/pages/marketing/fullamountdecreasecash') 
const fullamountdiscount = () => import('@/pages/marketing/fullamountdiscount') 
const fullamountgivefood = () => import('@/pages/marketing/fullamountgivefood') 
const fullamountadditional = () => import('@/pages/marketing/fullamountadditional') 
const secondhalfprice = () => import('@/pages/marketing/secondhalfprice') 
const discountedunivalent = () => import('@/pages/marketing/discountedunivalent') 
const birthdaymarketingNew = () => import('@/pages/marketing/birthdaymarketingNew') 
const consumptioncouponsNew = () => import('@/pages/marketing/consumptioncouponsNew') 
const consumptionConsumptionGift = () => import('@/pages/consumptionConsumptionGift/index') 
const guanzhuzengli = () => import('@/pages/consumptionConsumptionGift/guanzhuzengli') 
const zengsongjine = () => import('@/pages/zengsongjine/index') 
const meetinggift = () => import('@/pages/marketing/meetinggift') 
const upgradegift = () => import('@/pages/marketing/upgradegift') 

/* 卡券中心*/
const couponsdish = () => import('@/pages/card/coupons_dish') 
const couponsdeduct = () => import('@/pages/card/coupons_deduct') 
const electroniccoupon = () => import('@/pages/card/electroniccoupon') 
const foodcouponmanagement = () => import('@/pages/card/foodcouponmanagement') 
const cashcouponmanagement = () => import('@/pages/card/cashcouponmanagement') 
const crmcardcommissionset = () => import('@/pages/card/crmcardcommissionset') 
const couponsrecycling = () => import('@/pages/card/couponsrecycling') 
const crmcardclassset = () => import('@/pages/card/cardclassification/crmcardclassset') 
const editeelectroniccard = () => import('@/pages/card/cardclassification/editeelectroniccard') 
const cardoffline = () => import('@/pages/card/cardclassification/cardoffline') 
const card1 = () => import('@/pages/card/card1') 
const cardAdministration = () => import('@/pages/card/cardAdministration') 
const couponList = () => import('@/pages/coupon/couponList') 
const addCouponRevertList = () => import('@/pages/coupon/addCouponRevertList') 
const couponDetail = () => import('@/pages/coupon/couponDetail') 

/* 菜品中心*/
const memberpricemanagement = () => import('@/pages/food/memberpricemanagement') 

/* 工具中心*/
const organfranchisees = () => import('@/pages/tool/organfranchisees') 
const membershipsettingreasons = () => import('@/pages/tool/membershipsettingreasons') 
const electronicinvoicesettings = () => import('@/pages/tool/electronicinvoicesettings') 
const organgroupset = () => import('@/pages/tool/organgroupset') 
const integralreset = () => import('@/pages/tool/integralreset') 
const amountadjustment = () => import('@/pages/tool/amountadjustment') 
const newamountadjustment = () => import('@/pages/tool/newamountadjustment') 
const amountadjustmentdetail = () => import('@/pages/tool/amountadjustmentdetail') 
const integraladjustment = () => import('@/pages/tool/integraladjustment') 
const newintegraladjustment = () => import('@/pages/tool/newintegraladjustment') 
const integraladjustmentdetail = () => import('@/pages/tool/integraladjustmentdetail') 
const anquanzhenduan = () => import('@/pages/anquanzhenduan/index') 
const warnreport = () => import('@/pages/anquanzhenduan/warn_report') 

/*规则中心*/
const cardruleset = () => import('@/pages/ruleCenter/cardruleset') 

/*消息中心*/
const transactionmessageset = () => import('@/pages/message/transactionmessageset') 
const marketingsmssend = () => import('@/pages/message/marketingsmssend') 
const sentsmsquery = () => import('@/pages/message/sentsmsquery') 

/*微信配置*/
const manage_newhome = () => import('@/pages/wxdeploy/manage_newhome') 
const custommenu = () => import('@/pages/wxdeploy/custommenu') 
const wx_themes_settings = () => import('@/pages/wxdeploy/wx_themes_settings') 

/* 微信消息*/
const autoreply = () => import('@/pages/wxmessage/autoreply') 
const massmessage = () => import('@/pages/wxmessage/massmessage') 
const messagemanagement = () => import('@/pages/wxmessage/messagemanagement') 
const materialmanagement = () => import('@/pages/wxmessage/materialmanagement') 
const automaticsign = () => import('@/pages/wxmessage/automaticsign') 
const usermanagement = () => import('@/pages/wxmessage/usermanagement') 

/* 微信运营*/
const scanningcodeorderingmanagement = () => import('@/pages/wxmarketing/scanningcodeorderingmanagement') 
const membercentermanagement = () => import('@/pages/wxmarketing/membercentermanagement') 
const organlistmanagement = () => import('@/pages/wxmarketing/organlistmanagement') 
const paymentmethodmanagement = () => import('@/pages/wxmarketing/paymentmethodmanagement') 

/*微信营销*/
const wechatvote = () => import('@/pages/wxoper/wechatvote') 
const reward_manage = () => import('@/pages/wxoper/reward_manage') 
const erCode_manage = () => import('@/pages/wxoper/erCode_manage') 
const game_manage = () => import('@/pages/wxoper/game_manage') 
const member_manage = () => import('@/pages/wxoper/member_manage') 
const assesspresent = () => import('@/pages/wxoper/assesspresent') 

/* 微信数据*/
const fan_statistic = () => import('@/pages/wx_data_analysis/fan_statistic') 
const member_statistic = () => import('@/pages/wx_data_analysis/member_statistic') 
const wechatreporting = () => import('@/pages/wx_data_analysis/wechatreporting') 
const menu_statistic = () => import('@/pages/wx_data_analysis/menu_statistic') 

/* 报表中心*/
const dataAnalysis = () => import('@/pages/report_center/dataAnalysis') 
const dataQuery = () => import('@/pages/report_center/dataQuery') 
const membergrowthtrendanalysis = () => import('@/pages/reportpages/membergrowthtrendanalysis') 
const memberexclusivespecialanalysis = () => import('@/pages/reportpages/memberexclusivespecialanalysis') 
const consumptiontrendanalysis = () => import('@/pages/reportpages/consumptiontrendanalysis') 
const consumptionhabitanalysis = () => import('@/pages/reportpages/consumptionhabitanalysis') 
const membermodelanalysis = () => import('@/pages/reportpages/membermodelanalysis') 
const membershipcardtrendanalysis = () => import('@/pages/reportpages/membershipcardtrendanalysis') 
const memberoperationanalysisreport = () => import('@/pages/reportpages/memberoperationanalysisreport') 
const memberconsumptionnumbermonth = () => import('@/pages/reportpages/memberconsumptionnumbermonth') 
const memberoperatingroomcontrast = () => import('@/pages/reportpages/memberoperatingroomcontrast') 
const memberconsumption = () => import('@/pages/reportpages/memberconsumption') 
const marketactivitiesreport = () => import('@/pages/reportpages/marketactivitiesreport') 
const dataodanreport = () => import('@/pages/reportpages/dataodanreport') 
const membershipgiftactivityreport = () => import('@/pages/reportpages/membershipgiftactivityreport') 
const birthdaymarketingcampaignreport = () => import('@/pages/reportpages/birthdaymarketingcampaignreport') 
const wakeupthememberactivityreport = () => import('@/pages/reportpages/wakeupthememberactivityreport') 
const prepaidmarketingactivityreport = () => import('@/pages/reportpages/prepaidmarketingactivityreport') 
const buymembershipreport = () => import('@/pages/reportpages/buymembershipreport') 
const theconsumptioncouponactivityreport = () => import('@/pages/reportpages/theconsumptioncouponactivityreport') 
const mallvolumemarketingactivitiesreport = () => import('@/pages/reportpages/mallvolumemarketingactivitiesreport') 
const memberoverallbusiness = () => import('@/pages/reportpages/memberoverallbusiness') 
const memberrechargeconsumption = () => import('@/pages/reportpages/memberrechargeconsumption') 
const cardtransactionflowquery = () => import('@/pages/reportpages/cardtransactionflowquery') 
const memberdaybusinessstatistics = () => import('@/pages/reportpages/memberdaybusinessstatistics') 
const amountofmonthlyprecipitation = () => import('@/pages/reportpages/amountofmonthlyprecipitation') 
const amountprecipitationoverallanalysis = () => import('@/pages/reportpages/amountprecipitationoverallanalysis') 
const cardrechargewaterreport = () => import('@/pages/reportpages/cardrechargewaterreport') 
const rechargepaymentmethodreport = () => import('@/pages/reportpages/rechargepaymentmethodreport') 
const commissionreport = () => import('@/pages/reportpages/commissionreport') 
const agencysalecarddetailsummaryreport = () => import('@/pages/reportpages/agencysalecarddetailsummaryreport') 
const salesstaffcardreport = () => import('@/pages/reportpages/salesstaffcardreport') 
const integralmonthlyprecipitation = () => import('@/pages/reportpages/integralmonthlyprecipitation') 
const integraltransactionqueryreport = () => import('@/pages/reportpages/integraltransactionqueryreport') 
const couponusingsummaryquery = () => import('@/pages/reportpages/couponusingsummaryquery') 
const couponssalesummaryquery = () => import('@/pages/reportpages/couponssalesummaryquery') 
const amountofmonthlysettlementmechanism = () => import('@/pages/reportpages/amountofmonthlysettlementmechanism') 

/* 其他*/
const updatelogs = () => import('@/pages/updatelogs/index') 
const updatepwd = () => import('@/pages/updatepwd/index') 
const home = () => import('@/pages/index') 
const Login = _import('login/index')
const dashboard = _import('dashboard/index')
const Err404 = _import('404')
const Form = _import('form/form')

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        name: '首页',
        hidden: true,
        children: [{ path: 'home', component: Err404 }]
    }
]
export default new Router({
    //mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
export const asyncRouterMap = [{
        path: '/member',
        component: Layout,
        redirect: 'noredirect',
        name: '会员中心',
        icon: 'huiyuan',
        children: [
            { path: 'member_profile', component: member_profile, name: '会员档案' },
            { path: 'memberfilemanagement', component: memberfilemanagement, name: '会员档案', hidden: true },
            { path: 'member_profile_update', component: member_profile_update, name: '基础资料编辑', hidden: true },
            { path: 'member_profile_detail', component: member_profile_detail, name: '会员档案详情', hidden: true },
            { path: 'groupfilemanagement', component: groupfilemanagement, name: '团体档案' ,hidden: true},
            { path: 'membershiplevelset', component: membershiplevelset, name: '会员等级' },
            { path: 'memberupgrademanagement', component: memberupgrademanagement, name: '会员升级' },
            { path: 'membercardmanagement', component: membercardmanagement, name: '会员卡',hidden:true },
			{ path: 'member_level_set', component: member_level_set, name: '会员等级设置',hidden:true },
        ]
   },
    {
        path: '/message',
        component: Layout,
        redirect: 'noredirect',
        name: '消息中心',
        icon: 'message',
        children: [
            { path: 'transactionmessageset', component: transactionmessageset, name: '短信设置' },
            { path: 'marketingsmssend', component: marketingsmssend, name: '营销短信' },
            { path: 'sentsmsquery', component: sentsmsquery, name: '短信查询' }
        ]
    },
    {
        path: '/wxdeploy',
        component: Layout,
        redirect: 'noredirect',
        name: '微信配置',
        icon: 'wxdeploy',
        children: [
            { path: 'manage_newhome', component: manage_newhome, name: '公众号管理' },
            { path: 'custommenu', component: MenuSet, name: '3*5菜单管理' },
            { path: 'wx_themes_settings', component: wx_themes_settings, name: '主题设置' }
        ]
    },
    {
        path: '/wxmessage',
        component: Layout,
        redirect: 'noredirect',
        name: '微信消息',
        icon: 'wx_message',
        children: [
            { path: 'Materialmanagement', component: Materialmanagement, name: '素材管理' },
            { path: 'ModifyMateria', component: ModifyMateria, hidden: true,name:"素材修改" },
            { path: 'messagemanagement', component: messagemanagement, hidden: true,name:"客服管理" },
        ]
    },

    {
        path: '/wxmarketing',
        component: Layout,
        redirect: 'noredirect',
        name: '微信运营',
        icon: 'wxyy',
        children: [
            { path: 'scanningcodeorderingmanagement', component: scanningcodeorderingmanagement, name: '扫码点餐管理' },
            { path: 'membercentermanagement', component: membercentermanagement, name: '会员中心管理' },
            { path: 'organlistmanagement', component: organlistmanagement, name: '门店列表管理' },
            { path: 'paymentmethodmanagement', component: paymentmethodmanagement, name: '支付方式管理' },
        ]
    },
    {
        path: '/wxoper',
        component: Layout,
        redirect: 'noredirect',
        name: '微信营销',
        icon: 'wxyx',
        children: [
            { path: 'wechatvote', component: wechatvote, name: '投票管理' },
            { path: 'assesspresent', component: assesspresent, name: '评价管理' },
            { path: 'reward_manage', component: reward_manage, name: '微信打赏' },
            { path: 'erCode_manage', component: erCode_manage, name: '二维码管理' },
            { path: 'member_manage', component: member_manage, name: '会员管理', hidden: true  },
            { path: 'game_manage', component: game_manage, name: '活动管理' , hidden: true },
        ]
    },
    {
        path: '/wx_data_analysis',
        component: Layout,
        redirect: 'noredirect',
        name: '微信数据',
        icon: 'wx_da',
        children: [
            { path: 'fan_statistic', component: fan_statistic, name: '粉丝数据分析' },
            { path: 'member_statistic', component: member_statistic, name: '会员数据分析' },
            { path: 'wechatreporting', component: wechatreporting, name: '用户数据分析' },
            { path: 'menu_statistic', component: menu_statistic, name: '菜单数据分析' },
        ]
    },
    {
        path: '/report_center',
        component: Layout,
        redirect: 'noredirect',
        name: '报表中心',
        icon: 'wx_da',
        children: [
            { path: 'dataAnalysis', component: dataAnalysis, name: '数据查询' },
            { path: 'dataQuery', component: dataQuery, name: '数据分析' },

        ]
    },
    {
        path: '/dataAnalysis',
        component: Layout,
        redirect: 'noredirect',
        name: '数据分析',
        hidden: true,
        children: [
            { path: 'membergrowthtrendanalysis', component: membergrowthtrendanalysis, name: '会员增长趋势分析' },
            { path: 'memberexclusivespecialanalysis', component: memberexclusivespecialanalysis, name: '会员属性分析' },
            { path: 'consumptiontrendanalysis', component: consumptiontrendanalysis, name: '会员消费趋势分析' },
            { path: 'consumptionhabitanalysis', component: consumptionhabitanalysis, name: '会员消费习惯分析' },
            { path: 'membermodelanalysis', component: membermodelanalysis, name: '会员模型分析' },
            { path: 'membershipcardtrendanalysis', component: membershipcardtrendanalysis, name: '会员售卡趋势分析' },
            { path: 'memberoperationanalysisreport', component: memberoperationanalysisreport, name: '会员操作分析报告' },
            { path: 'memberconsumptionnumbermonth', component: memberconsumptionnumbermonth, name: '会员消费次数分析' },
            { path: 'memberoperatingroomcontrast', component: memberoperatingroomcontrast, name: '会员操作店间分析' },
            { path: 'memberconsumption', component: memberconsumption, name: '会员交易分析报告' },
            { path: 'marketactivitiesreport', component: marketactivitiesreport, name: '营销活动综合报告' },
            { path: 'membershipgiftactivityreport', component: membershipgiftactivityreport, name: '入会送礼活动报告' },
            { path: 'birthdaymarketingcampaignreport', component: birthdaymarketingcampaignreport, name: '生日营销活动报告' },
            { path: 'wakeupthememberactivityreport', component: wakeupthememberactivityreport, name: '唤醒会员活动报告' },
            { path: 'prepaidmarketingactivityreport', component: prepaidmarketingactivityreport, name: '充值营销活动报告' },
            { path: 'buymembershipreport', component: buymembershipreport, name: '购买会籍活动报告' },
            { path: 'theconsumptioncouponactivityreport', component: theconsumptioncouponactivityreport, name: '消费赠券活动报告' },
            { path: 'mallvolumemarketingactivitiesreport', component: mallvolumemarketingactivitiesreport, name: '商城券营销报告' },
            { path: 'dataodanreport', component: dataodanreport, name: '大逃单游戏报告' },
        ]
    },
    {
        path: '/dataQuery',
        component: Layout,
        redirect: 'noredirect',
        name: '数据查询',
        hidden: true,
        children: [
            { path: 'memberoverallbusiness', component: memberoverallbusiness, name: '会员交易整体分析' },
            { path: 'memberrechargeconsumption', component: memberrechargeconsumption, name: '会员充值消费报表' },
            { path: 'cardtransactionflowquery', component: cardtransactionflowquery, name: '卡交易流水查询' },
            { path: 'memberdaybusinessstatistics', component: memberdaybusinessstatistics, name: '会员卡日统计报表' },
            { path: 'amountofmonthlyprecipitation', component: amountofmonthlyprecipitation, name: '金额沉淀区间分析' },
            { path: 'amountprecipitationoverallanalysis', component: amountprecipitationoverallanalysis, name: '金额沉淀整体分析' },
            { path: 'cardrechargewaterreport', component: cardrechargewaterreport, name: '卡充值流水汇总表' },
            { path: 'rechargepaymentmethodreport', component: rechargepaymentmethodreport, name: '充值付款方式统计表' },
            { path: 'commissionreport', component: commissionreport, name: '门店售卡提成报表' },
            { path: 'agencysalecarddetailsummaryreport', component: agencysalecarddetailsummaryreport, name: '门店售卡明细报表' },
            { path: 'salesstaffcardreport', component: salesstaffcardreport, name: '员工售卡提成报表' },
            { path: 'integralmonthlyprecipitation', component: integralmonthlyprecipitation, name: '积分沉淀分析' },
            { path: 'integraltransactionqueryreport', component: integraltransactionqueryreport, name: '积分消费流水查询' },
            { path: 'couponusingsummaryquery', component: couponusingsummaryquery, name: '优惠券发售使用汇总表' },
            { path: 'couponssalesummaryquery', component: couponssalesummaryquery, name: '优惠券发售使用流水表' },
            { path: 'amountofmonthlysettlementmechanism', component: amountofmonthlysettlementmechanism, name: '机构金额结算' },
        ]
    },
    {
        path: '/form2',
        component: Layout,
        redirect: 'noredirect',
        name: '更新密码',
        hidden: true,
        children: [
            { path: 'updatepwd', component: updatepwd, name: '修改密码', hidden: true },
            { path: 'updatelogs', component: updatelogs, name: '更新日志', hidden: true },


        ]
    },
    { path: '*', redirect: '/404', hidden: true },
]
