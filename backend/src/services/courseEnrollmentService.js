const { CourseEnrollment, Account, Course } = require('../../models'); // Adjust the path as necessary

const enrollUserInCourse = async (accountId, courseId) => {
    // Check if user is already enrolled in the course
    const existingEnrollment = await CourseEnrollment.findOne({
        where: {
            account_id: accountId,
            course_id: courseId,
        },
    });
    if (existingEnrollment) {
        throw new Error('User is already enrolled in this course');
    }

    // Create new enrollment
    const enrollment = await CourseEnrollment.create({
        account_id: accountId,
        course_id: courseId,
        enrollment_date: new Date(),
    });
    return enrollment;
};

const getUserEnrollments = async (accountId, courseId) => {
    const enrollments = await CourseEnrollment.findAll({
        where: {
            account_id: accountId,
            course_id: courseId,
        },
        include: [
            {
                model: Course,
            },
            {
                model: Account,
            },
        ],
    });

    return enrollments;
};

const getCourseEnrollments = async (courseId) => {
    const enrollments = await CourseEnrollment.findAll({
        where: {
            course_id: courseId,
        },
        include: [
            {
                model: Account,
            },
        ],
    });

    return enrollments;
};

const checkEnrollment = async (accountId, courseId) => {
    const existingEnrollment = await CourseEnrollment.findOne({
        where: {
            account_id: accountId,
            course_id: courseId,
        },
    });

    return !!existingEnrollment;
};

module.exports = {
    enrollUserInCourse,
    getUserEnrollments,
    getCourseEnrollments,
    checkEnrollment,
};
