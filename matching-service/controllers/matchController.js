const { Match, Pair } = require('../models');
/* const { axios } = require('axios') */
const { Op } = require('sequelize');

const findMatch = async (req, res, next) => {
    try {
        const username1 = req.body.username;
        const complexity = req.body.complexity;
        //const qn_id = req.params.qn_id

        const match = await Match.findOne({
            where: {
                complexity,
                /* username: { $ne: username1 } */
            },
        });

        if (match && match.username != username1) {
            if (match.username !== username1) {
                const username2 = match.username;
                /* const qns = async() => {await axios.get(`https://localhost:8080/api/v1/questions`)}
                let qn;
                for (const question of qns) {
                    if (question.complexity == complexity) {
                        qn = question;
                        break;
                    }
                } */
                const pair = await Pair.create({
                    username1: username1,
                    username2: username2,
                    complexity: complexity,
                    //question: qn_id
                })
                await Match.destroy({ where: { username: username1 } })
                await Match.destroy({ where: { username: username2 } })
                res.status(200).json({ res: pair })
            }
        } else {
            const newMatch = await Match.create({
                username: username1,
                complexity: complexity
            })

            /* setTimeout(async () => { */
            const startTime = Date.now();
            while (!match && Date.now() - startTime < 30000) {
                const match = await Match.findOne({
                    where: {
                        complexity,
                        /* username: { $ne: username1 }, */
                    },
                });

                if (match && match.username !== username1) {
                    const username2 = match.username;
                    /* const qns = async() => {await axios.get(`https://localhost:8080/api/v1/questions`)}

                    let qn;
                    for (const question of qns) {
                        if (question.complexity == complexity) {
                            qn = question;
                            break;
                        }
                    } */

                    const pair = await Pair.create({
                        username1: username1,
                        username2: username2,
                        complexity: complexity,
                        //question: qn_id,
                    });
                    await Match.destroy({ where: { username: username1 } })
                    await Match.destroy({ where: { username: username2 } })

                    res.status(200).json({ res: pair });


                }
            }
            res.status(404).json({ error: 'No match found, please try again later' });
        }

    } catch (err) {
        next(err)
    }
}

const cancelFindMatch = async (req, res, next) => {
    try {
        const name = req.params.username;

        const match = await Match.findOne({
            where: { username: name }
        })
        if (!match) {
            res.status(404).json({ error: "Match does not exist!" });
        } else {
            await Match.destroy({ where: { username: name } })
            res.sendStatus(204)
        }
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
}

const getPairByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const pair = await Pair.findOne({
            where: {
                [Op.or]: [
                    { username1: username },
                    { username2: username }
                ]
            }
        })
        if (pair instanceof Pair) {
            res.status(200).json({ res: pair })
        } else {
            res.status(404).json({ error: 'You do not have a pair' })
        }
    } catch (err) {
        next(err)
    }
}

const getAllPairs = async (req, res, next) => {
    try {
        const pairList = await Pair.findAll();
        res.status(200).json({ res: pairList })
    } catch (err) {
        next(err)
    }
}

const getAllMatch = async (req, res, next) => {
    try {
        const matchList = await Match.findAll();
        res.status(200).json({ res: matchList })
    } catch (err) {
        next(err)
    }
}

const deletePair = async (req, res, next) => {
    try {
        const username = req.params.username
        const pair = await Pair.findOne({
            where: {
                [Op.or]: [
                    { username1: username },
                    { username2: username }
                ]
            }
        })
        if (!pair) {
            res.status(404).json({ error: 'Pair is not found' })
        }
        await Pair.destroy({
            where: {
                [Op.or]: [
                    { username1: username },
                    { username2: username }
                ]
            }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    findMatch,
    cancelFindMatch,
    getPairByUsername,
    deletePair,
    getAllPairs,
    getAllMatch
}


