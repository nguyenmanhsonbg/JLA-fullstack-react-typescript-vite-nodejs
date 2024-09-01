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
	Course,
	Week,
	Day,
	Vocabulary,
	Kanji,
	KanjiWord,
	Video,
	VideoOption,
	VideoQuestion,
	Grammar,
	GrammarExample,
	VocabularyProgress,
	KanjiProgress,
	GrammarProgress,
	VideoProgress
} = require("../../models");
const {
	COURSE_GET_FAILED,
	COURSE_CREATED,
	COURSE_CREATED_FAILED,
	COURSE_UPDATED,
	COURSE_UPDATED_FAILED,
	COURSE_DELETED,
} = require("../messages/course");
const { transformCourseData } = require("../helper/course");
const { Op, where } = require("sequelize");
const { getExamWithoutAnswerById } = require('../services/examService');
const { getExamByCourseAndWeek, assignExamToCourse } = require('../services/courseExamService');


const getAllCourse = async (req, res) => {
	try {
		const course = await Course.findAll({
			where: { [Op.or]: [{ course_status_id: 2 }, { course_status_id: 1 }, { course_status_id: 3 }] },
			order: [["course_id", "asc"]]
		});
		if (course) {
			return responseWithData(res, 200, course);
		} else {
			return badRequest(res, COURSE_GET_FAILED);
		}
	} catch (e) {
		console.log("getAllCourse", e);
		return error(res);
	}
};

const getAllCourseExtend = async (req, res) => {
  try {
    const { accountId } = req.body;

    const courses = await Course.findAll({
      where: {
        [Op.or]: [
          //{ course_status_id: 1 },
          { course_status_id: 2 },
          //{ course_status_id: 3 }
        ]
      },
      include: {
        model: Week,
        include: {
          model: Day,
          include: ['Vocabularies', 'Kanjis', 'Grammars', 'Videos']
        }
      },
      order: [["course_id", "asc"]],
    });

    if (courses.length > 0) {
      const coursesWithProgress = await Promise.all(courses.map(async (course) => {
        let totalVocabulary = 0;
        let totalKanji = 0;
        let totalGrammar = 0;
        let totalVideo = 0;

        let learnedVocabulary = 0;
        let learnedKanji = 0;
        let learnedGrammar = 0;
        let learnedVideo = 0;

        for (const week of course.Weeks) {
          for (const day of week.Days) {
            const vocabularies = day.Vocabularies.filter(v => v.vocab_status_id === 1);
            const kanjis = day.Kanjis.filter(k => k.kanji_status_id === 1);
            const grammars = day.Grammars.filter(g => g.grammar_status_id === 1);
            const videos = day.Videos.filter(v => v.video_status_id === 1);

            totalVocabulary += vocabularies.length;
            totalKanji += kanjis.length;
            totalGrammar += grammars.length;
            totalVideo += videos.length;

            learnedVocabulary += await VocabularyProgress.count({
              where: {
                account_id: accountId,
                learned: true,
                vocabulary_id: vocabularies.map(v => v.vocab_id),
              }
            });

            learnedKanji += await KanjiProgress.count({
              where: {
                account_id: accountId,
                learned: true,
                kanji_id: kanjis.map(k => k.kanji_id),
              }
            });

            learnedGrammar += await GrammarProgress.count({
              where: {
                account_id: accountId,
                learned: true,
                grammar_id: grammars.map(g => g.grammar_id),
              }
            });

            learnedVideo += await VideoProgress.count({
              where: {
                account_id: accountId,
                watched: true,
                video_id: videos.map(v => v.video_id),
              }
            });
          }
        }

        const totalItems = totalVocabulary + totalKanji + totalGrammar + totalVideo;
        const totalProgress = learnedVocabulary + learnedKanji + learnedGrammar + learnedVideo;
        const progressPercentage = totalItems > 0 ? (totalProgress / totalItems) * 100 : 0;
        console.log(totalItems);
        console.log(totalProgress);
        console.log(progressPercentage);
        return {
          ...course.toJSON(),
          progress: {
            vocabulary: {
              total: totalVocabulary,
              learned: learnedVocabulary,
              percentage: totalVocabulary > 0 ? (learnedVocabulary / totalVocabulary) * 100 : 0,
            },
            kanji: {
              total: totalKanji,
              learned: learnedKanji,
              percentage: totalKanji > 0 ? (learnedKanji / totalKanji) * 100 : 0,
            },
            grammar: {
              total: totalGrammar,
              learned: learnedGrammar,
              percentage: totalGrammar > 0 ? (learnedGrammar / totalGrammar) * 100 : 0,
            },
            video: {
              total: totalVideo,
              watched: learnedVideo,
              percentage: totalVideo > 0 ? (learnedVideo / totalVideo) * 100 : 0,
            },
            totalItems,
			totalProgress,     
			progressPercentage
			}
        };
      }));

      return responseWithData(res, 200, coursesWithProgress);
    } else {
      return badRequest(res, 'COURSE_GET_FAILED');
    }
  } catch (e) {
    console.error("getAllCourse", e);
    return error(res);
  }
};


const getCourseById = async (req, res) => {
	try {
		const { course_id } = req.params;

		const course = await Course.findOne({
			where: {
				course_id,
			},
		});
    if (course) {
   
			return responseWithData(res, 200, course);
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("getCourseById", e);
		return error(res);
	}
};

const getCourseDetailById = async (req, res) => {
    try {
        const { course_id } = req.params;

        const courseDetails = await Course.findOne({
            where: {
                course_id: course_id,
                course_status_id: { [Op.or]: [1, 2, 3] }
            },
            include: [
                {
                    model: Week,
                    include: [
                        {
                            model: Day,
                            include: [
                                {
                                    model: Grammar,
                                    include: [
                                        {
                                            model: GrammarExample,
                                        }
                                    ],
                                },
                                {
                                    model: Kanji,
                                    include: [
                                        {
                                            model: KanjiWord,
                                        },
                                    ],
                                },
                                {
                                    model: Video,
                                },
                                {
                                    model: Vocabulary,
                                },
                            ],
                        },
                    ],
                },
            ],
        });

      if (courseDetails) {
            const transformedCourseData = transformCourseData(courseDetails);
            // Iterate directly over weekData
            transformedCourseData.weekData = transformedCourseData.weekData || []; 

            for (const week of transformedCourseData.weekData) {
                // Fetch exam ID based on course_id and week_id
                const exam = await getExamByCourseAndWeek(course_id, week.week_id);
                if (exam) {
                    week.exam_id = exam.exam_id;
                } else { 
                    week.exam_id = null; 
                }
            }
            return responseWithData(res, 200, transformedCourseData);
        } else {
            return notfound(res);
        }
    } catch (e) {
        console.log("getCourseDetailById", e);
        return error(res);
    }
};

const getProgressByWeekId = async (req, res) => {
  try {
	  const { accountId, weekId } = req.body;

    // Fetch the week with associated days, each including vocabulary, kanji, grammar, and video records
    const week = await Week.findOne({
      where: { week_id: weekId },
      include: {
        model: Day,
        include: ['Vocabularies', 'Kanjis', 'Grammars', 'Videos']
      }
    });

    if (!week) {
      return notfound(res);
    }

    const dayProgress = await Promise.all(week.Days.map(async (day) => {
      const vocabularies = day.Vocabularies.filter(v => v.vocab_status_id === 1);
      const kanjis = day.Kanjis.filter(k => k.kanji_status_id === 1);
      const grammars = day.Grammars.filter(g => g.grammar_status_id === 1);
      const videos = day.Videos.filter(v => v.video_status_id === 1);

      const totalVocabulary = vocabularies.length;
      const totalKanji = kanjis.length;
      const totalGrammar = grammars.length;
      const totalVideo = videos.length;

      const learnedVocabulary = await VocabularyProgress.count({
        where: {
          account_id: accountId,
          learned: true,
          vocabulary_id: vocabularies.map(v => v.vocab_id),
        }
      });

      const learnedKanji = await KanjiProgress.count({
        where: {
          account_id: accountId,
          learned: true,
          kanji_id: kanjis.map(k => k.kanji_id),
        }
      });

      const learnedGrammar = await GrammarProgress.count({
        where: {
          account_id: accountId,
          learned: true,
          grammar_id: grammars.map(g => g.grammar_id),
        }
      });

      const watchedVideo = await VideoProgress.count({
        where: {
          account_id: accountId,
          watched: true,
          video_id: videos.map(v => v.video_id),
        }
      });

      return {
        day_id: day.day_id,
        day_name: day.day_name,
        vocabulary: {
          total: totalVocabulary,
          learned: learnedVocabulary,
          percentage: totalVocabulary > 0 ? (learnedVocabulary / totalVocabulary) * 100 : 0,
        },
        kanji: {
          total: totalKanji,
          learned: learnedKanji,
          percentage: totalKanji > 0 ? (learnedKanji / totalKanji) * 100 : 0,
        },
        grammar: {
          total: totalGrammar,
          learned: learnedGrammar,
          percentage: totalGrammar > 0 ? (learnedGrammar / totalGrammar) * 100 : 0,
        },
        video: {
          total: totalVideo,
          watched: watchedVideo,
          percentage: totalVideo > 0 ? (watchedVideo / totalVideo) * 100 : 0,
        }
      };
    }));

    return responseWithData(res, 200, dayProgress);
  } catch (e) {
    console.error("getProgressByWeekId", e);
    return error(res);
  }
};


const getProgressByDayId = async (req, res) => {
  try {
    const { accountId, dayId } = req.body;

    // Fetch the day with associated vocabulary, kanji, grammar, and video records
    const day = await Day.findOne({
      where: { day_id: dayId },
      include: ['Vocabularies', 'Kanjis', 'Grammars', 'Videos']
    });

    if (!day) {
      return notfound(res);
    }

    const vocabularies = day.Vocabularies.filter(v => v.vocab_status_id === 1);
    const kanjis = day.Kanjis.filter(k => k.kanji_status_id === 1);
    const grammars = day.Grammars.filter(g => g.grammar_status_id === 1);
    const videos = day.Videos.filter(v => v.video_status_id === 1);

    const totalVocabulary = vocabularies.length;
    const totalKanji = kanjis.length;
    const totalGrammar = grammars.length;
    const totalVideo = videos.length;

    const learnedVocabulary = await VocabularyProgress.count({
      where: {
        account_id: accountId,
        learned: true,
        vocabulary_id: vocabularies.map(v => v.vocab_id),
      }
    });

    const learnedKanji = await KanjiProgress.count({
      where: {
        account_id: accountId,
        learned: true,
        kanji_id: kanjis.map(k => k.kanji_id),
      }
    });

    const learnedGrammar = await GrammarProgress.count({
      where: {
        account_id: accountId,
        learned: true,
        grammar_id: grammars.map(g => g.grammar_id),
      }
    });

    const watchedVideo = await VideoProgress.count({
      where: {
        account_id: accountId,
        watched: true,
        video_id: videos.map(v => v.video_id),
      }
    });

    const response = {
      vocabulary: {
        total: totalVocabulary,
        learned: learnedVocabulary,
        percentage: totalVocabulary > 0 ? (learnedVocabulary / totalVocabulary) * 100 : 0,
      },
      kanji: {
        total: totalKanji,
        learned: learnedKanji,
        percentage: totalKanji > 0 ? (learnedKanji / totalKanji) * 100 : 0,
      },
      grammar: {
        total: totalGrammar,
        learned: learnedGrammar,
        percentage: totalGrammar > 0 ? (learnedGrammar / totalGrammar) * 100 : 0,
      },
      video: {
        total: totalVideo,
        watched: watchedVideo,
        percentage: totalVideo > 0 ? (watchedVideo / totalVideo) * 100 : 0,
      },
    };

    return responseWithData(res, 200, response);
  } catch (e) {
    console.error("getProgressByDayId", e);
    return error(res);
  }
};


const updateCourseDetail = async (req, res) => {
    const { courseData, weeksData } = req.body;
    let {
        course_id,
        course_name,
        description,
        course_image,
        course_status_id = 1,
        week,
        course_level,
        course_skill
  } = courseData;
  //after edit will change to status pending
  course_status_id = 1;


    try {
        await Course.upsert({
            course_id,
            course_name,
            description,
            course_image,
            course_status_id,
            week,
            course_level,
            course_skill
        });

        for (const week of weeksData) {
            const { week_id, week_name, week_topic, week_status_id = 1, days, exam_id } = week;

            const [weekRecord] = await Week.upsert(
                { week_id, week_name, week_topic, week_status_id, course_id },
                { returning: true }
            );

            // Assign or update the exam_id for the course and week
            if (exam_id) {
                await assignExamToCourse({
                    course_id,
                    exam_id,
                    week_id: weekRecord.week_id
                });
            }

            for (const day of days) {
                const { day_id, day_name, day_status_id = 1, lessons, repeat_lesson } = day;
                const [dayRecord] = await Day.upsert(
                    {
                        day_id,
                        day_name,
                        day_status_id,
                        week_id: weekRecord.week_id,
                        repeat_lesson: typeof repeat_lesson === 'object' ? JSON.stringify(repeat_lesson) : repeat_lesson,
                    },
                    { returning: true }
                );

                await Promise.all(lessons.map(async (lesson) => {
                    const lessonDefaults = {
                        vocab_status_id: 1,
                        kanji_status_id: 1,
                        grammar_status_id: 1,
                        video_status_id: 1,
                    };

                    switch (lesson.type) {
                        case 'vocab':
                            await Vocabulary.upsert({
                                vocab_id: lesson.vocab_id,
                                ...lesson,
                                vocab_status_id: lesson.vocab_status_id || lessonDefaults.vocab_status_id,
                                day_id: dayRecord.day_id,
                            });
                            break;
                        case 'kanji':
                            const [kanjiRecord] = await Kanji.upsert(
                                {
                                    kanji_id: lesson.kanji_id,
                                    ...lesson,
                                    kanji_status_id: lesson.kanji_status_id || lessonDefaults.kanji_status_id,
                                    day_id: dayRecord.day_id,
                                },
                                { returning: true }
                            );
                            await Promise.all(lesson.kanji_words?.map(word =>
                                KanjiWord.upsert({
                                    kanji_word_id: word.kanji_word_id,
                                    ...word,
                                    kanji_word_status_id: word.kanji_word_status_id || lessonDefaults.kanji_status_id,
                                    kanji_id: kanjiRecord.kanji_id,
                                })
                            ));
                            break;
                        case 'grammar':
                            const [grammarRecord] = await Grammar.upsert(
                                {
                                    grammar_id: lesson.grammar_id,
                                    ...lesson,
                                    grammar_status_id: lesson.grammar_status_id || lessonDefaults.grammar_status_id,
                                    day_id: dayRecord.day_id,
                                },
                                { returning: true }
                            );
                            await Promise.all(lesson.grammar_examples?.map(example =>
                                GrammarExample.upsert({
                                    grammar_example_id: example.grammar_example_id,
                                    ...example,
                                    grammar_example_status_id: example.grammar_example_status_id || lessonDefaults.grammar_status_id,
                                    grammar_id: grammarRecord.grammar_id,
                                })
                            ));
                            break;
                        case 'video':
                            const [videoRecord] = await Video.upsert(
                                {
                                    video_id: lesson.video_id,
                                    ...lesson,
                                    video_status_id: lesson.video_status_id || lessonDefaults.video_status_id,
                                    day_id: dayRecord.day_id,
                                },
                                { returning: true }
                            );
                            // await Promise.all(lesson.questions?.map(async question => {
                            //     const [questionRecord] = await VideoQuestion.upsert(
                            //         {
                            //             video_question_id: question.video_question_id,
                            //             ...question,
                            //             video_question_status_id: question.video_question_status_id || lessonDefaults.video_status_id,
                            //             video_id: videoRecord.video_id,
                            //         },
                            //         { returning: true }
                            //     );
                            //     await Promise.all(question.options?.map(option =>
                            //         VideoOption.upsert({
                            //             option_id: option.option_id,
                            //             ...option,
                            //             video_option_status_id: option.video_option_status_id || lessonDefaults.video_status_id,
                            //             video_question_id: questionRecord.video_question_id,
                            //         })
                            //     ));
                            // }));
                            break;
                        default:
                            console.error('Unknown lesson type:', lesson.type);
                            break;
                    }
                }));
            }
        }
        return ok(res, COURSE_UPDATED);
    } catch (e) {
        console.error(e);
        return error(res);
    }
};


const createNewCourse = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}
		const course = await Course.create(req.body);
		if (course) {
			return responseWithData(res, 201, {
				data: course,
				message: COURSE_CREATED,
			});
		} else {
			return badRequest(res, COURSE_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewCourse", e);
		return error(res);
	}
};

const updateCourseById = async (req, res) => {
  try {
    const { accountId } = req;
    const { course_status_id, course_name, description, week, course_image, note } = req.body;
    const { course_id } = req.params;
    
    // // Check if the user has permission to update the course
    // if (accountId && accountId.toString() !== account_id.toString()) {
    //   return forbidden(res, "You do not have permission to update this course.");
    // }

    // Find the course by its ID
    const course = await Course.findOne({
      where: { course_id },
    });

    if (!course) {
      return notfound(res, "Course not found.");
    }

    // Prepare update data
    const updateData = {};
    if (course_name) updateData.course_name = course_name;
    if (description) updateData.description = description;
    if (week !== undefined) updateData.week = week;
    if (course_status_id !== undefined) updateData.course_status_id = course_status_id;
    if (course_image) updateData.course_image = course_image;
    if (note) updateData.note = note; 

    // Check if there is any data to update
    if (Object.keys(updateData).length === 0) {
      return badRequest(res, "No valid fields provided for update.");
    }

    // Perform the update
    const [update] = await Course.update(updateData, {
      where: { course_id },
    });

    if (update) {
      return ok(res, "Course updated successfully.");
    } else {
      return badRequest(res, "Failed to update course.");
    }
  } catch (e) {
    return error(res, "An error occurred while updating the course.");
  }
};


async function deleteCourseById(req, res) {
	try {
		const { course_id } = req.params;
		const course = await Course.findOne({ where: { course_id } });
		if (!course) {
			return notfound(res);
		}
		course.course_status_id = 3;
		await course.save();
		return ok(res, COURSE_DELETED);
	} catch (err) {
		console.error("Error deactivating course:", err);
		return error(res);
	}
}

module.exports = {
	getAllCourse,
	createNewCourse,
	updateCourseById,
	getCourseById,
	getCourseDetailById,
	deleteCourseById,
	updateCourseDetail,
	getAllCourseExtend,
	getProgressByDayId,
	getProgressByWeekId
};
