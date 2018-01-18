import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TabViews = 'tab-views'
const ActiveName = 'activeName'
const Session = 'session'
const TenancyId = 'tenancyId';
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getTenancyId() {
  return Cookies.get(TenancyId)
}

export function setTenancyId(tenancyId) {
  return Cookies.set(TenancyId, tenancyId)
}

export function removeTenancyId() {
  return Cookies.remove(TenancyId)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getTabViews() {
  return localStorage.getItem(TabViews);
}
export function getActiveName() {
  return localStorage.getItem(ActiveName);
}
export function setSession(session) {
  return Cookies.set(Session, session)
}
export function getSession(session) {
  return Cookies.get(Session)
}
export function removeSession() {
  return Cookies.remove(Session)
}
