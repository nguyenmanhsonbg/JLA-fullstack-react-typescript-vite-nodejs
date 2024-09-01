const { Vocabulary } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");

const {
	VOCABULARY_GET_FAILED,
	VOCABULARY_CREATED,
	VOCABULARY_CREATED_FAILED,
	VOCABULARY_UPDATED_FAILED,
	VOCABULARY_UPDATED,
	VOCABULARY_DELETED,
} = require("../messages/vocabulary");
const { Op } = require("sequelize");
async function getAllVocab(req, res) {
	try {
		const vocabs = await Vocabulary.findAll();
		return responseWithData(res, 200, vocabs);
	} catch (error) {
		console.error("Error getting all vocabulary:", error);
		throw error;
	}
}

async function getVocabById(req, res) {
	try {
		const { vocab_id } = req.query;
		const vocabs = await Vocabulary.findAll({ where: { vocab_id } });
		if (vocabs) {
			return responseWithData(res, 200, vocabs);
		} else {
			return badRequest(res, VOCABULARY_GET_FAILED);
		}
	} catch (er) {
		console.error("getVocabById:", error);
		return error(res);
	}
}

async function getAllVocabByDayId(req, res) {
	try {
		const { day_id } = req.query;
		const vocabs = await Vocabulary.findAll({ where: { day_id } });
		if (vocabs) {
			return responseWithData(res, 200, vocabs);
		} else {
			return badRequest(res, VOCABULARY_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllVocabByDayId:", error);
		return error(res);
	}
}

async function createNewVocab(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const vocab = await Vocabulary.create(req.body);
		if (vocab) {
			return responseWithData(res, 201, {
				data: vocab,
				message: VOCABULARY_CREATED,
			});
		} else {
			return badRequest(res, VOCABULARY_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewVocabulary", e);
		return error(res);
	}
}

async function updateVocabById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { vocab_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const vocab = await Vocabulary.findOne({
			where: {
				vocab_id,
			},
		});
		if (vocab) {
			const [updatedVocab] = await Vocabulary.update(req.body, {
				where: { vocab_id },
			});
			if (updatedVocab) {
				return ok(res, VOCABULARY_UPDATED);
			} else {
				return badRequest(res, VOCABULARY_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateVocabById", e);
		return error(res);
	}
}

async function deleteVocabById(req, res) {
	try {
		const { vocab_id } = req.params;
		const vocab = await Vocabulary.findOne({ where: { vocab_id } });
		if (!vocab) {
			return notfound(res);
		}
		vocab.vocab_status_id = 3;
		await vocab.save();
		return ok(res, VOCABULARY_DELETED);
	} catch (err) {
		console.error("deleteVocabById:", err);
		return error(res);
	}
}

async function generatePracticeData(req, res) {
    try {
		const { vocabularyIds } = req.body;


        // Fetch vocabulary entries based on provided IDs
        let vocabEntries = await Vocabulary.findAll({
            where: { vocab_id: vocabularyIds }
		});
		
 		// If there are fewer than 4 kanji entries, fetch additional kanji entries from the database
        let all_vocabulary = vocabEntries;
        // If there are fewer than the provided vocabulary entries, fetch additional random vocabulary entries
        if (vocabEntries.length < 4) {
            const additionalVocabEntries = await Vocabulary.findAll({
                where: { vocab_id: { [Op.notIn]: vocabularyIds } },
                limit: 10
            });
           all_vocabulary  = vocabEntries.concat(additionalVocabEntries);
        }

        // Ensure each vocabulary entry generates a question
        const questions = vocabEntries.map(vocab => {
            let question = null;
            let attempt = 0;
            // Attempt to create a question up to 3 times
            while (!question && attempt < 20) {
                const questionType = Math.floor(Math.random() * 7);
                switch (questionType) {
                    case 0:
                        question = createImageQuestion(vocab, all_vocabulary);
                        break;
                    case 1:
                        question = createMeaningQuestion(vocab, all_vocabulary);
                        break;
                    case 2:
                        question = createKanjiQuestion(vocab, all_vocabulary);
						break;
					case 3:
                        question = createImageQuestion(vocab, all_vocabulary);
						break;
					case 4:
                        question = createImageQuestion(vocab, all_vocabulary);
						break;
					case 5:
                        question = createImageQuestion(vocab, all_vocabulary);
						break;
					default:
						break;
                }
                attempt++;
            }
            return question;
		}).filter(question => question);
	
        // Ensure the number of questions matches the number of vocabulary entries
        if (questions.length < vocabularyIds.length) {
            return notfound(res, 500, "Failed to generate sufficient questions");
        }

		// Return the questions with a successful HTTP status
        return responseWithData(res, 200, questions);
    } catch (error) {
        console.error("Error generating practice data:", error);
        return badRequest(res, "Failed to generate practice data");
    }
}

function createImageQuestion(vocab, allVocabs) {
    const validDistractors = allVocabs.filter(item => item.vocab_id !== vocab.vocab_id && item.vocab_name && item.vocab_name.trim() !== '');
    const options = generateOptions(vocab, validDistractors, 'name');

    if (!options || options.length < 4) return null;

    return {
        question: `Chọn từ vựng đúng cho hình ảnh dưới đây:`,
        image: vocab.vocab_image,
        options: options,
        correctAnswer: vocab.vocab_name
    };
}

function createKanjiQuestion(vocab, allVocabs) {
    const validDistractors = allVocabs.filter(item => item.vocab_id !== vocab.vocab_id && item.vocab_kanji && item.vocab_kanji.trim() !== '');
    const options = generateOptions(vocab, validDistractors, 'kanji');

    if (!options || options.length < 4) return null;

    return {
        question: `Chọn Kanji tương ứng với nghĩa "${vocab.vocab_meaning}"?`,
        options: options,
        correctAnswer: vocab.vocab_kanji
    };
}

function createMeaningQuestion(vocab, allVocabs) {
    const validDistractors = allVocabs.filter(item => item.vocab_id !== vocab.vocab_id && item.vocab_meaning && item.vocab_meaning.trim() !== '');
    const options = generateOptions(vocab, validDistractors, 'meaning');

    if (!options || options.length < 4) return null;

    return {
        question: `Chọn nghĩa của từ "${vocab.vocab_name}"?`,
        options: options,
        correctAnswer: vocab.vocab_meaning
    };
}

function generateOptions(correctVocab, distractors, type) {
    // Determine the correct option based on the question type
    let correctOption;
    if (type === 'kanji') {
        correctOption = correctVocab.vocab_kanji;
    } else if (type === 'name') {
        correctOption = correctVocab.vocab_name;
    } else {
        correctOption = correctVocab.vocab_meaning;
    }

    // Shuffle distractors and filter to ensure they are distinct and not the same as the correct option
    const wrongOptions = new Set();
    distractors
        .sort(() => 0.5 - Math.random())  // Shuffle distractors randomly
        .forEach(item => {
            // Extract the distractor option based on the question type
            let option = type === 'kanji' ? item.vocab_kanji : (type === 'name' ? item.vocab_name : item.vocab_meaning);
            // Add only non-empty, non-duplicate options
            if (option && option.trim() !== '' && option !== correctOption && !wrongOptions.has(option)) {
                wrongOptions.add(option);
            }
        });

    // Ensure we have exactly 3 wrong options
    if (wrongOptions.size < 3) return [];

    // Convert Set to Array and take exactly 3 elements
    const wrongOptionsArray = Array.from(wrongOptions).slice(0, 3);

    // Combine correct option with wrong options and shuffle the final list
    const options = [correctOption, ...wrongOptionsArray].sort(() => 0.5 - Math.random());
    return options;
}


module.exports = {
	getAllVocab,
	getVocabById,
	createNewVocab,
	getAllVocabByDayId,
	updateVocabById,
	deleteVocabById,
	generatePracticeData
};
