

exports.get_all = async (req, res, next) => {

    res.status(200).json({
        message: 'GET route properly working'
    });
}