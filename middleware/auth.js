import jwt from 'jsponwebtoken';
const auth = (req, res, next) => {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        const isCustomAuth = token.lengtn < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;
        }
        next();
    } catch (error) {}
}