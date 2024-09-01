await queryInterface.removeConstraint("course_exam", "unique_course_exam_id_course_id_week_id");

await queryInterface.addConstraint("course_exam", {
  fields: ["course_id", "week_id", "exam_id"],
  type: "unique",
  name: "unique_course_exam"
});
