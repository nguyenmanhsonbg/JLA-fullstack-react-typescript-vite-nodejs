const { Kanji } = require("../../models");
const {
	error,
	forbidden,
	responseWithData,
	notfound,
	created,
	badRequest,
	ok,
} = require("../handlers/response_handler");
const {
	KANJI_GET_FAILED,
	KANJI_CREATED,
	KANJI_CREATED_FAILED,
	KANJI_UPDATED_FAILED,
	KANJI_DELETED,
	KANJI_UPDATED,
} = require("../messages/kanji");
const { Op, where } = require("sequelize");

async function getAllKanji(req, res) {
	try {
		const kanji = await Kanji.findAll();
		return responseWithData(res, 200, kanji);
	} catch (error) {
		console.error("Error getting all kanji:", error);
		throw error;
	}
}

async function getAllKanjiByDayId(req, res) {
	try {
		const { day_id } = req.query;
		const kanjis = await Kanji.findAll({ where: { day_id } });
		if (kanjis) {
			return responseWithData(res, 200, kanjis);
		} else {
			return badRequest(res, KANJI_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllKanjiByDayId:", error);
		return error(res);
	}
}

async function getKanjiById(req, res) {
	try {
		const { kanji_id } = req.params;
		const kanjis = await Kanji.findAll({ where: { kanji_id } });
		if (kanjis) {
			return responseWithData(res, 200, kanjis);
		} else {
			return badRequest(res, KANJI_GET_FAILED);
		}
	} catch (er) {
		console.error("getKanjiById:", error);
		return error(res);
	}
}

const createNewKanji = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const kanji = await Kanji.create(req.body);
		if (kanji) {
			return responseWithData(res, 201, {
				data: kanji,
				message: KANJI_CREATED,
			});
		} else {
			return badRequest(res, KANJI_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewKANJI", e);
		return error(res);
	}
};

const updateKanjiById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { kanji_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const kanji = await Kanji.findOne({
			where: {
				kanji_id,
			},
		});
		if (kanji) {
			const [updatedKanji] = await Kanji.update(req.body, {
				where: { kanji_id },
			});
			if (updatedKanji) {
				return ok(res, KANJI_UPDATED);
			} else {
				return badRequest(res, KANJI_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateGrammarById", e);
		return error(res);
	}
};

async function deleteKanjiById(req, res) {
	try {
		const { kanji_id } = req.params;
		const kanji = await Kanji.findOne({ where: { kanji_id } });
		if (!kanji) {
			return notfound(res);
		}
		kanji.kanji_status_id = 3;
		await kanji.save();
		return ok(res, KANJI_DELETED);
	} catch (err) {
		console.error("deleteKanjiById:", err);
		return error(res);
	}
}

async function generateKanjiPracticeData(req, res) {
    try {
        const { kanjiIds } = req.body;
        console.log("Creating questions for " + kanjiIds);

        // Fetch kanji entries from the database based on kanji IDs
        let kanjiEntries = await Kanji.findAll({
            where: { kanji_id: kanjiIds }
        });

         // If there are fewer than 4 kanji entries, fetch additional kanji entries from the database
        let allKanjis = kanjiEntries;
        if (kanjiEntries.length < 4) {
            const additionalKanjis = await Kanji.findAll({
                where: { kanji_id: { [Op.notIn]: kanjiIds } },
                limit: 10  
            });
            allKanjis = kanjiEntries.concat(additionalKanjis);
        }

        // Generate a question for each kanji entry
        const questions = kanjiEntries.map(kanji => {
            const questionType = Math.floor(Math.random() * 3) + 1;
            switch (questionType) {
                case 1:
                    return createKunyomiQuestion(kanji, allKanjis);
                case 2:
                    return createOnyomiQuestion(kanji, allKanjis);
                case 3:
                    return createImageQuestion(kanji, allKanjis);
                default:
                    return null;
            }
        }).filter(question => question);

        console.log("Returning questions " + questions);

        // Return the questions with a successful HTTP status
        return responseWithData(res, 200, questions);
    } catch (error) {
        console.error("Error generating kanji practice data:", error);
        return responseWithError(res, 500, "Failed to generate kanji practice data");
    }
}

function createKunyomiQuestion(kanji, allKanjis) {
    const validDistractors = allKanjis.filter(item => item.kanji_id !== kanji.kanji_id && item.kanji_name);
    const options = generateOptions(kanji.kanji_name, validDistractors);

    if (options.length < 4) return null;

    return {
        question: `Chọn Kanji tương ứng với Kunyomi "${kanji.kanji_kunyomi}"?`,
        options: options,
        correctAnswer: kanji.kanji_name
    };
}

function createOnyomiQuestion(kanji, allKanjis) {
    const validDistractors = allKanjis.filter(item => item.kanji_id !== kanji.kanji_id && item.kanji_name);
    const options = generateOptions(kanji.kanji_name, validDistractors);

    if (options.length < 4) return null;

    return {
        question: `Chọn Kanji tương ứng với Onyomi "${kanji.kanji_onyomi}"?`,
        options: options,
        correctAnswer: kanji.kanji_name
    };
}

function createImageQuestion(kanji, allKanjis) {
    const validDistractors = allKanjis.filter(item => item.kanji_id !== kanji.kanji_id && item.kanji_name);
    const options = generateOptions(kanji.kanji_name, validDistractors);

    if (options.length < 4) return null;

    return {
        question: `Chọn Kanji tương ứng với hình ảnh dưới đây:`,
        image: kanji.kanji_image,
        options: options,
        correctAnswer: kanji.kanji_name
    };
}

function generateOptions(correctAnswer, distractors) {
    const wrongOptions = distractors
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(item => item.kanji_name)
        .filter(option => option && option.trim() !== '');

    if (wrongOptions.length < 3) return [];

    const options = [correctAnswer, ...wrongOptions].sort(() => 0.5 - Math.random());
    return options;
}

module.exports = {
	getAllKanji,
	getAllKanjiByDayId,
	getKanjiById,
	deleteKanjiById,
	createNewKanji,
	updateKanjiById,
	generateKanjiPracticeData
};
