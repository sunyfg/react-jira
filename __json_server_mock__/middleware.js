module.exports = (req, res, next) => {
  // 登录接口
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "admin" && req.body.password === "123456") {
      return res.status(200).json({
        code: 200,
        data: {
          token: "admin-token",
        },
      });
    } else {
      return res.status(400).json({ code: 400, message: "用户名或密码错误" });
    }
  }

  next();
};
