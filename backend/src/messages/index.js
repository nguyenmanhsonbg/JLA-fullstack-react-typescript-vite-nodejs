const userMessages = require("./user");
const handlerMessages = require("./handler");
const enrollMessages = require("./enroll");
const courseMessages = require("./course");
const dayMessages = require("./day");
const grammarMessages = require("./grammar");
const grammarExampleMessages = require("./grammar_example");
const lessonMessages = require("./lesson");
const quiz_Messages = require("./quiz");
const noti_Messages = require("./notification");

// Common messages
const UNEXPECTED_ERROR = 'Got unexpected error, please contact your system administrator for more information'

module.exports = {
	userMessages,
	handlerMessages,
	enrollMessages,
	courseMessages,
	dayMessages,
	grammarMessages,
	grammarExampleMessages,
	lessonMessages,
	quiz_Messages,
	noti_Messages,
	UNEXPECTED_ERROR
};
