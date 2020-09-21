import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
const tokenKey = "token";

/**
 * 设置token
 * @param {string} token token值
 */
function setToken(token) {
  ls.set(tokenKey, token);
}

/**
 * 获取token
 */
function getToken() {
  return ls.get(tokenKey);
}

/***
 * 删除token
 */
function removeToken() {
  ls.remove(tokenKey);
}

export { setToken, getToken, removeToken };
