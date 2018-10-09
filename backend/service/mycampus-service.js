const moodle = require('moodle-client');


module.exports = {
  authMoodle: async (user, pass) => {
    try {
      const client = await moodle.init({
        wwwroot: 'https://mycampus.iubh.de',
        username: user,
        password: pass,
      });

      const clientInfo = await client.call({wsfunction: 'core_webservice_get_site_info'});

      return {
        fullName: clientInfo.fullname,
        firstName: clientInfo.firstname,
        lastName: clientInfo.lastname,
        moodleId: clientInfo.userid,
        moodleToken: client.token,
      };
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  getOverview: async (userId, token) => {
    try {
      const client = await moodle.init({
        wwwroot: 'https://mycampus.iubh.de',
        token: token,
      });

      const courseList = await client.call({
        wsfunction: 'core_enrol_get_users_courses',
        method: 'POST',
        args: {
          userid: userId,
        }
      });

      const courseProgressPromises = [];
      for (let course of courseList) {
        courseProgressPromises.push(client.call({
          wsfunction: 'core_completion_get_activities_completion_status',
          method: 'POST',
          args: {
            courseid: course.id,
            userid: userId,
          }
        }));
      }
      const courseProgressList = await Promise.all(courseProgressPromises);

      return mergeCourseProgress(courseList, courseProgressList);

      return courseList;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
};

function mergeCourseProgress(courseList, courseProgressList) {
  const courseOverview = [];
  for (let i = 0; i < courseList.length; i++) {
    if (courseList[i].category !== 5) {
      const course = {
        id: courseList[i].id,
        shortName: courseList[i].shortName,
        fullName: courseList[i].fullName,
      };

      let quizzes = 0;
      let completedQuizzes = 0;
      let done = false;
    }
  }
}

// mod_quiz_get_quizzes_by_courses
// core_completion_get_course_completion_status
// mod_assign_get_assignments
// core_enrol_get_users_courses
