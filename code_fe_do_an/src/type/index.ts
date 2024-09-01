export type AlphabetResponse = {
  alphabet_id: number;
  type_id: number;
  japanese_character: string;
  romaji_character: string;
  alphabet_audio: string;
  alphabet_image: string;
};

export type CourseResponse = {
  course_id: number;
  course_name: string;
  description: string;
  course_image: string;
  week: number;
  //totalProgress: number;
  course_level: string;
  course_skill: string;
  progressPercentage: number;
};
export type WeekResponse = {
    week_id: number;
    week_name: string;
    week_topic: string;
    course_id: number;
};

export type ContentHomeProps = {
  image: string;
  title: string;
  description: string;
};

export type GrammarItemList = {
  grammar_name: string;
  grammar_structure: string;
  grammar_id: string;
  checkIsRepeat: boolean;
  isLearned: boolean;
};
