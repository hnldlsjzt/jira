module.exports = (req, res, next) => {
    // console.log('打印', req.method, req.path);
    if (req.method === 'POST' && req.path === '/login' && req.body && typeof req.body === 'object') {
        const { username, password } = req.body;
        // console.log('进入');
        if (username === 'jack' && password === '123456') {
            return res.status(200).json({
                user: {
                    token: '123',
                },
            });
        } else {
            return res.status(400).json({
                message: '用户名或密码错误',
            });
        }
    }
    next();
};
