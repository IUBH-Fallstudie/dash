const moodle = require('moodle-client');
const MoodleUser = require('./moodle-scraper-service').MoodleUser;
const moment = require('moment');


module.exports = {
  authMoodle: async (user, pass) => {
    return (await auth(user, pass)).clientInfo || false;
  },

  getOverview: async (user, pass) => {
    try {
      const {client, clientInfo} = await auth(user, pass);

      return await getCourseOverview(client, clientInfo.moodleId);
    } catch (e) {
      console.error(e);
      return false;
    }
  }
};

async function getCourseOverview(client, userId) {
  const basicInfoCourses = await client.call({
    wsfunction: 'core_enrol_get_users_courses',
    method: 'POST',
    args: {'userid': userId}
  });

  const calendarEvents = await client.call({
    wsfunction: 'core_calendar_get_calendar_upcoming_view'
  });

  const courseIds = basicInfoCourses.map((course) => {
    return course.id;
  }).join(',');

  const detailedInfoCourses = (await client.call({
    wsfunction: 'core_course_get_courses_by_field',
    method: 'POST',
    args: {'field': 'ids', 'value': courseIds}
  })).courses;

  return mergeCourseInfos(basicInfoCourses, detailedInfoCourses, calendarEvents);
}

function mergeCourseInfos(basicInfoCourses, detailedInfoCourses, calendarEvents) {
  const courses = [];
  for (const detailedInfoCourse of detailedInfoCourses) {
    // Einführungskurse filtern (category 3)
    if (detailedInfoCourse.categoryid !== 5) {
      const courseInfo = {
        id: detailedInfoCourse.id,
        url: 'https://mycampus.iubh.de/course/view.php?id=' + detailedInfoCourse.id,
        name: detailedInfoCourse.displayname,
        shortname: detailedInfoCourse.shortname,
        image: detailedInfoCourse.overviewfiles[0].fileurl,
        events: [],
      };

      for (const event of calendarEvents.events) {
        const eventCourseId = event.url.split('?id=')[event.url.split('?id=').length - 1];
        if (eventCourseId === courseInfo.id.toString()) {
          delete event.course;
          courseInfo.events.push(event);
        }
      }

      for (const basicInfoCourse of basicInfoCourses) {
        if (detailedInfoCourse.id === basicInfoCourse.id) {
          courseInfo.progress = basicInfoCourse.progress;
        }
      }

      courses.push(courseInfo);
    }
  }
  return courses;
}

async function auth(user, pass) {
  try {
    const client = await moodle.init({
      wwwroot: 'https://mycampus.iubh.de',
      username: user,
      password: pass,
    });

    const clientInfo = await client.call({wsfunction: 'core_webservice_get_site_info'});

    return {
      client: client,
      clientInfo: {
        fullName: clientInfo.fullname,
        firstName: clientInfo.firstname,
        lastName: clientInfo.lastname,
        moodleId: clientInfo.userid,
        moodleToken: client.token,
      }
    };
  } catch (e) {
    console.error(e);
    return false;
  }
}

// mod_quiz_get_quizzes_by_courses
// core_completion_get_course_completion_status
// mod_assign_get_assignments
// core_enrol_get_users_courses
