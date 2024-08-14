const express = require("express");

const {
	getAllGrammarExampleByGrammarId,
	deleteGrammarExampleById,
	updateGrammarExampleById,
	getGrammarExampleById,
	createNewGrammarExample,
} = require("../controllers/grammar_example");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/grammar_example", checkAuthAndRole([1, 2, 3, 4]), getAllGrammarExampleByGrammarId);
router.get(
	"/grammar_example/:grammar_example_id",
	checkAuthAndRole([1, 2, 3, 4]),
	getGrammarExampleById,
);
router.post("/grammar_example", checkAuthAndRole([1, 3]), createNewGrammarExample);
router.put(
	"/grammar_example/:grammar_example_id",
	checkAuthAndRole([1, 2, 3]),
	updateGrammarExampleById,
);
router.patch(
	"/grammar_example/:grammar_example_id",
	checkAuthAndRole([1, 2, 3]),
	deleteGrammarExampleById,
);

module.exports = router;
