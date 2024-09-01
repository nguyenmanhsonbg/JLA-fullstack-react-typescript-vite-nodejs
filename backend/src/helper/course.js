const sortByKey = (array, key) => {
	return array.sort((a, b) => a[key] - b[key]);
};
function transformCourseData(courseData) {
	if (courseData) {
		courseData.Weeks = sortByKey(courseData.Weeks, "week_id");
		courseData.Weeks.forEach((week) => {
			week.Days = sortByKey(week.Days, "day_id");
			week.Days.forEach((day) => {
				day.Grammars = sortByKey(day.Grammars, "grammar_id");
				day.Grammars.forEach((grammar) => {
					grammar.GrammarExamples = sortByKey(grammar.GrammarExamples, "example_id");
				});
				day.Kanjis = sortByKey(day.Kanjis, "kanji_id");
				day.Kanjis.forEach((kanji) => {
					kanji.KanjiWords = sortByKey(kanji.KanjiWords, "word_id");
				});
				day.Videos = sortByKey(day.Videos, "video_id");
				day.Videos.forEach((video) => {
					// video.VideoQuestions = sortByKey(video.VideoQuestions, "question_id");
					// video.VideoQuestions.forEach((question) => {
					// 	question.VideoOptions = sortByKey(question.VideoOptions, "option_id");
					// });
				});
				day.Vocabularies = sortByKey(day.Vocabularies, "vocabulary_id");
			});
		});
	}
	const transformedWeeks = courseData.Weeks.filter(
		(item) => item.week_status_id === 2 || item.week_status_id === 1,
	).map((week) => {
		const days = week.Days.filter(
			(item) => item.day_status_id === 2 || item.day_status_id === 1,
		).map((day) => {
			const lessons = [];
			// Vocabulary lessons
			day.Vocabularies.filter(
				(item) => item.vocab_status_id === 2 || item.vocab_status_id === 1,
			).forEach((vocab) => {
				lessons.push({
					vocab_id: vocab.vocab_id,
					vocab_name: vocab.vocab_name,
					day_id: day.day_id,
					vocab_kanji: vocab.vocab_kanji,
					vocab_meaning: vocab.vocab_meaning,
					vocab_example: vocab.vocab_example,
					vocab_image: vocab.vocab_image,
					vocab_audio: vocab.vocab_audio,
					type: "vocab",
				});
			});
			// Kanji lessons
			day.Kanjis.filter(
				(item) => item.kanji_status_id === 2 || item.kanji_status_id === 1,
			).forEach((kanji) => {
				const kanjiWords = kanji.KanjiWords.filter(
					(item) => item.kanji_word_status_id === 2 || item.kanji_word_status_id === 1,
				).map((kw) => ({
					kanji_word_id: kw.kanji_word_id,
					kanji_word: kw.kanji_word,
					hiragana_character: kw.hiragana_character,
					kanji_word_meaning: kw.kanji_word_meaning,
				}));
				lessons.push({
					kanji_id: kanji.kanji_id,
					kanji_image: kanji.kanji_image,
					kanji_name: kanji.kanji_name,
					day_id: day.day_id,
					cv_spelling: kanji.cv_spelling,
					kanji_kunyomi: kanji.kanji_kunyomi,
					kanji_onyomi: kanji.kanji_onyomi,
					kanji_words: kanjiWords,
					type: "kanji",
				});
			});
			// Grammar lessons
			day.Grammars.filter(
				(item) => item.grammar_status_id === 2 || item.grammar_status_id === 1,
			).forEach((grammar) => {
				const grammarExamples = grammar.GrammarExamples.filter(
					(item) =>
						item.grammar_example_status_id === 2 || item.grammar_example_status_id === 1,
				);
				lessons.push({
					grammar_id: grammar.grammar_id,
					grammar_name: grammar.grammar_name,
					day_id: day.day_id,
					grammar_image: grammar.grammar_image,
					grammar_structure: grammar.grammar_structure,
					grammar_description: grammar.grammar_description,
					grammar_examples: grammarExamples,
					type: "grammar",
				});
			});

			//Video lessons
			day.Videos.filter(
				(item) => item.video_status_id === 2 || item.video_status_id === 1,
			).forEach((video) => {
				// const questions = video.VideoQuestions.filter(
				// 	(item) => item.video_question_status_id === 2 || item.video_question_status_id === 1,
				// ).map((question) => ({
				// 	video_question_id: question.video_question_id,
				// 	question_content: question.question_content,
				// 	question_answer: question.question_answer,
				// 	options: question.VideoOptions.filter(
				// 		(item) => item.video_option_status_id === 2 || item.video_option_status_id === 1,
				// 	).map((option) => ({
				// 		option_content: option.option_content,
				// 		option_id: option.option_id,
				// 	})),
				// }));

				// lessons.push({
				// 	video_id: video.video_id,
				// 	video_link: video.video_link,
				// 	video_name: video.video_name,
				// 	day_id: day.day_id,
				// 	questions,
				// 	type: "video",
				// });
			
				lessons.push({
					video_id: video.video_id,
					video_link: video.video_link,
					video_name: video.video_name,
					day_id: day.day_id,
					type: "video",
				});
			});

			return {
				day_name: day.day_name,
				lessons,
				day_status_id: day.day_status_id,
				week_id: week.week_id,
				day_id: day.day_id,
				repeat_lesson: day.repeat_lesson,
			};
		});

		return {
			week_id: week.week_id,
			week_name: week.week_name,
			week_topic: week.week_topic,
			course_id: courseData.course_id, 
			week_status_id: week.week_status_id,
			days,
		};
	});

	const courseDetails = {
		course_id: courseData.course_id,
		course_name: courseData.course_name,
		description: courseData.description,
		course_image: courseData.course_image,
		course_status_id: courseData.course_status_id,
		week: courseData.week.toString(),
		course_note: courseData.course_note,
		course_level: courseData.course_level,
		course_skill: courseData.course_skill
	};

	return { weekData: transformedWeeks, courseData: courseDetails };
}

module.exports = { transformCourseData };
