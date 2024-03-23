const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).render('page/login', { alert_message: 'No posee sesion.' });
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (error) {
        return res.status(401).send('Token inválido');
      }

    next();
};

module.exports = auth