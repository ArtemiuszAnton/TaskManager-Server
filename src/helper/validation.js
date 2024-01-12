function isValidId(req, _res, next) {
    if (!req.params.hasOwnProperty('id')) throw new Error('id not found');
    const { id } = req.params;
    if (id < 0) throw new Error('id отрицательный');
    if (typeof (id) != 'number' && typeof (id) != 'string') throw new Error('type id not correct');
    if (isNaN(id)) throw new Error('id not number')

    next()
}


module.exports = { isValidId }