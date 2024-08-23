const repository = require('../repositories/produto-repository');

exports.get = async(req , res, next) => {
    const data = await repository.get();
    return res.status(200).send(data);
}