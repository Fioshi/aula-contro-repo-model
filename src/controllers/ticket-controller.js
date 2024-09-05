exports.get = async(req , res, next) => {
    const data = await repository.get();
    return res.status(200).send(data);
}

exports.post = async(req, res) => {
    serviceTicket.post();
    res.status(201).send({mensagem: "criado com sucesso"})
}