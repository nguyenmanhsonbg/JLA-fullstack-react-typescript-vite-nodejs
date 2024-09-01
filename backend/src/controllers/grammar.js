const { Grammar } = require("../../models");
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
	GRAMMAR_GET_FAILED,
	GRAMMAR_CREATED,
	GRAMMAR_CREATED_FAILED,
	GRAMMAR_UPDATED_FAILED,
	GRAMMAR_DELETED,
	GRAMMAR_UPDATED,
} = require("../messages/grammar");
const { Op, where } = require("sequelize");

async function getAllGrammarByDayId(req, res) {
	try {
		const { day_id } = req.query;
		const grammars = await Grammar.findAll({ where: { day_id } });
		if (grammars) {
			return responseWithData(res, 200, grammars);
		} else {
			return badRequest(res, GRAMMAR_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllGrammarByDayId:", error);
		return error(res);
	}
}

async function getGrammarById(req, res) {
	try {
		const { grammar_id } = req.params;
		const grammars = await Grammar.findAll({ where: { grammar_id } });
		if (grammars) {
			return responseWithData(res, 200, grammars);
		} else {
			return badRequest(res, GRAMMAR_GET_FAILED);
		}
	} catch (er) {
		console.error("getGrammarById:", error);
		return error(res);
	}
}

const createNewGrammar = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const grammar = await Grammar.create(req.body);
		if (grammar) {
			return responseWithData(res, 201, {
				data: grammar,
				message: GRAMMAR_CREATED,
			});
		} else {
			return badRequest(res, GRAMMAR_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewGrammar", e);
		return error(res);
	}
};

const updateGrammarById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { grammar_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const grammar = await Grammar.findOne({
			where: {
				grammar_id,
			},
		});
		if (grammar) {
			const [updatedGrammar] = await Grammar.update(req.body, {
				where: { grammar_id },
			});
			if (updatedGrammar) {
				return ok(res, GRAMMAR_UPDATED);
			} else {
				return badRequest(res, GRAMMAR_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateGrammarById", e);
		return error(res);
	}
};

async function deleteGrammarById(req, res) {
	try {
		const { grammar_id } = req.params;
		const grammar = await Grammar.findOne({ where: { grammar_id } });
		if (!grammar) {
			return notfound(res);
		}
		grammar.grammar_status_id = 3;
		await grammar.save();
		return ok(res, GRAMMAR_DELETED);
	} catch (err) {
		console.error("deleteGrammarById:", err);
		return error(res);
	}
}

async function generateGrammarPracticeData(req, res) {
    try {
        const { grammarIds } = req.body;

        // Fetch grammar entries from the database based on grammar IDs
        let grammarEntries = await Grammar.findAll({
            where: { grammar_id: grammarIds }
        });

        // If there are fewer than 4 grammar entries, fetch additional grammar entries from the database
        let allGrammars = grammarEntries;
        if (grammarEntries.length < 4) {
            const additionalGrammars = await Grammar.findAll({
                where: { grammar_id: { [Op.notIn]: grammarIds } },
                limit: 10  // Adjust the limit as needed
            });
            allGrammars = grammarEntries.concat(additionalGrammars);
        }

        // Generate a question for each grammar entry
        const questions = grammarEntries.map(grammar => {
            return createGrammarQuestion(grammar, allGrammars);
        }).filter(question => question);

        // Return the questions with a successful HTTP status
        return responseWithData(res, 200, questions);
    } catch (error) {
        //console.error("Error generating grammar practice data:", error);
        return responseWithError(res, 500, "Failed to generate grammar practice data");
    }
}

function createGrammarQuestion(grammar, allGrammars) {
    const validDistractors = allGrammars.filter(item => item.grammar_id !== grammar.grammar_id && item.grammar_description);
    const options = generateOptions(grammar.grammar_description, validDistractors);

    if (options.length < 4) return null;

    return {
        question: `Ngữ pháp "${grammar.grammar_structure}" nghĩa là gì?`,
        options: options,
        correctAnswer: grammar.grammar_description
    };
}

function generateOptions(correctAnswer, distractors) {
    const wrongOptions = distractors
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(item => item.grammar_description)
        .filter(option => option && option.trim() !== '');

    if (wrongOptions.length < 3) return [];

    const options = [correctAnswer, ...wrongOptions].sort(() => 0.5 - Math.random());
    return options;
}
module.exports = {
	getAllGrammarByDayId,
	getGrammarById,
	createNewGrammar,
	updateGrammarById,
	deleteGrammarById,
	generateGrammarPracticeData
};
