const moodle = require('moodle-client');
const MoodleUser = require('./moodle-scraper-service').MoodleUser;


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

  getOverview: async (user, pass) => {
    const moodleUser = new MoodleUser(user, pass, 'https://mycampus.iubh.de');
    await moodleUser.login();
    return moodleUser.fetchModules();
  }
};

// mod_quiz_get_quizzes_by_courses
// core_completion_get_course_completion_status
// mod_assign_get_assignments
// core_enrol_get_users_courses
