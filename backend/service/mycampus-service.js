const moodle = require('moodle-client');
const MoodleUser = require('./moodle-scraper-service').MoodleUser;
const moment = require('moment');


module.exports = {
  authMoodle: async (user, pass) => {
    try {
      const client = await moodle.init({
        wwwroot: 'https://mycampus.iubh.de',
        username: user,
        password: pass,
      });

      const clientInfo = await client.call({wsfunction: 'core_webservice_get_site_info'});

      await getCourseOverview(client, clientInfo.userid);

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

  getOverview: async (user, pass) => {
    const moodleUser = new MoodleUser(user, pass, 'https://mycampus.iubh.de');
    await moodleUser.login();
    return moodleUser.fetchModules();
  }
};


async function getCourseOverview(client, userId) {
  const courses = await client.call({
    wsfunction: 'core_enrol_get_users_courses',
    method: "POST",
    args: {'userid': userId}
  });

  const courseIds = courses.map((course) => {
    return course.id;
  }).join(',');

  const courseIdsArray = courses.map((course) => {
    return course.id;
  });

  const coursesDetails = await client.call({
    wsfunction: 'core_course_get_courses_by_field',
    method: "POST",
    args: {'field': 'ids', 'value': courseIds}
  });

  const navOptions = await client.call({
    wsfunction: 'core_course_get_user_navigation_options',
    method: "POST",
    args: {'courseids': courseIdsArray}
  });


  const today = moment().unix();

  courses.forEach((course) => {
    const navOptions = client.call({
      wsfunction: 'core_completion_get_course_completion_status',
      method: "POST",
      args: {'courseid': course.id, 'userid': userId}
    }).then(console.log);

  });
}

// mod_quiz_get_quizzes_by_courses
// core_completion_get_course_completion_status
// mod_assign_get_assignments
// core_enrol_get_users_courses
