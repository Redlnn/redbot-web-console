# Web Console TODO

- [x] uvicorn 随 Ariadne 启动（不使用 Ariadne 的 Reverse Adapter）
- [ ] 基于 JWT Token 的登录与验证
  - [ ] 角色管理
    - [ ] 添加/删除 Bot 管理员（同时也为 web console 用户）
    - [ ] 设置角色权限
- [x] 概览（Overview）
- [ ] 好友管理
  - [ ] 好友列表
  - [ ] 移除好友
  - [ ] 查询好友资料
  - [ ] 发送消息
- [ ] 群组管理
  - [x] 已加入群列表
    - [x] 群头像、名称、人数
    - [x] Bot 群权限
    - [x] 群员列表
    - [ ] 查询群员资料
    - [x] 修改 Bot 群名片
    - [x] 发送消息
    - [ ] 管理员功能
      - [ ] 修改成员名片
      - [ ] 禁言/解除禁言群成员
      - [ ] 全体禁言/解除全体禁言
      - [ ] 踢出群成员
  - [ ] 退出群聊
- [ ] 获取任一用户的资料
- [ ] 查询任一群/群成员的历史消息或统计（每日发言条数）
- [ ] 模块管理
  - [ ] 显示模块状态
  - [ ] 分群启用/禁用模块
  - [ ] 模块总开关
  - [ ] 加载/卸载/重载模块（高危）
  - [ ] 查看模块源代码
  - [ ] 查看模块信息
- [ ] 控制台
  - [ ] 执行预定义的命令
  - [ ] 接收实时 log
- [ ] 文件管理
  - [ ] 打开、编辑、保存 Bot 目录下的文件
  - [ ] 上传、下载文件
