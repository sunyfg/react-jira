module.exports = (req, res, next) => {
  // 登录接口
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "admin" && req.body.password === "123456") {
      return res.status(200).json({
        code: 200,
        user: {
          // 随机id，模拟数据库
          id: Math.floor(Math.random() * 10000),
          name: req.body.username,
          // 随机 token，模拟数据库
          token: Math.random().toString(36).substr(2) + "==",
        },
      });
    } else {
      return res.status(400).json({ code: 400, message: "用户名或密码错误" });
    }
  }

  // 注册接口
  if (req.method === "POST" && req.path === "/register") {
    // 校验用户名和密码不为空
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ code: 400, message: "用户名或密码不能为空" });
    }
    if (req.body.username === "admin") {
      return res.status(400).json({ code: 400, message: "用户名已存在" });
    } else {
      // 模拟注册成功
      return res.status(200).json({
        code: 200,
        user: {
          // 随机id，模拟数据库
          id: Math.floor(Math.random() * 10000),
          name: req.body.username,
          // 随机 token，模拟数据库
          token: Math.random().toString(36).substr(2) + "==",
        },
      });
    }
  }

  if (req.method === "POST" && req.path === "/kanbans/reorder") {
    // 看板排序
    return res.status(200).json({ code: 200 });
  }

  if (req.method === "POST" && req.path === "/tasks/reorder") {
    // 任务排序
    return res.status(200).json({ code: 200 });
  }

  next();
};
