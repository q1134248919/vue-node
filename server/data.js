const successData = (data = null, code = 200, msg = '操作成功') => {
  return {
    msg,
    data,
    code,
  };
};

const errData = (msg, code = 500) => {
  return {
    data: null,
    code,
    msg,
  };
};

module.exports = {
  successData,
  errData,
};
