const axios = require('axios');
let request = require('request-promise').defaults({jar: true});
const cheerio = require('cheerio');
const chalk = require('chalk');


/**
 * A new moodle user object which is used to fetch info for a specific person.  Can be linked to different moodle websites.
 */
class MoodleUser {

  /**
   * Create a new moodle user object
   * @param {String} username - The users moodle username
   * @param {String} password - The users moodle password
   * @param {String} moodleURL - The moodle websites address
   */
  constructor(username = '', password = '', moodleURL = '') {

    this.username = username;
    this.password = password;
    this.moodleURL = (moodleURL.endsWith('/') ? moodleURL.slice(0, -1) : `${moodleURL}`);

    this.loggedIn = false;
    this.loginReTrys = 0;
  }

  /**
   * Returns the current users login status
   * @return {Boolean} - If the user object is currently logged in.
   */
  get status() {
    return this.loggedIn;
  }

  /**
   * Returns the last login time
   * @return {Date} The time since the last login
   */
  get lastLogin() {
    return this.login ? Date.now() - this.login : null;
  }

  /**
   * Returns the cached user grades
   * @return {Array<Object>} - The users cached grades.
   */
  get grades() {
    return this.moduleGrades;
  }

  /**
   * Returns the cached user modules
   * @return {Array<Object>} - The users cached modules.
   */
  get modules() {
    return this.userModules;
  }

  /**
   * Returns the user info
   * @return {Array<Object>} - The users cached personal information.
   */
  get info() {
    return this.userInfo
  }

  static _statusCheck(res) {
    if (!(res.status >= 200 && res.status < 300)) return console.error(`Unable to fetch user data, ${chalk.red(`Status Code: ${res.statusText}`)}`);
  }

  /**
   * Will attempt log the account in.  Recalling this method will refresh the auth token.
   * @async
   * @return {Promise<Boolean>} - Weather or not the login was successful
   */
  async login() {
    try {
      let res = await request.post({
        url: `${this.moodleURL}/login/index.php`,
        followAllRedirects: true,
        form: {username: this.username, password: this.password},
        resolveWithFullResponse: true
      });
      this.cookie = res.request.headers.cookie; // Stupid website only returns a 200 status code for everything #SmartPeople

      this.loggedIn = !!(this.cookie); // If we can't get a login token we haven't logged in

      if (!this.loggedIn) {
        this.loginReTrys++;
        return this.loggedIn;
      }

      this.login = Date.now();
      return this.loggedIn;

    } catch (err) {
      // If the actual post fails
      this.loggedIn = false;
      this.loginReTrys++;
      return this.loggedIn;
    }
  }

  /**
   * Logs the current user out.  Can be logged back in refreshing the auth token.
   * @async
   * @return {Promise<Boolean>} - The current logged in status of the account.
   */
  async logout() {
    try {
      await this._checkLogin();

      let res = await axios.get(`${this.moodleURL}/user/profile.php`, {headers: {Cookie: this.cookie}});
      MoodleUser._statusCheck(res);

      this.loggedIn = false;
      this.cookie = '';
      return this.loggedIn;

    } catch (err) {
      console.error(`Unable to log user ${chalk.green(this.username)} out! Error: ${chalk.red(err.name)}`);
      throw new UnhandledMoodleError(`Unable to log user ${chalk.green(this.username)} out!`, err);
    }
  }

  /**
   * Fetches the users information and stores it in the cache
   * @async
   * @return {Promise<Object>}
   */
  async fetchUserInfo() {
    try {
      await this._checkLogin();

      let res = await axios.get(`${this.moodleURL}/user/profile.php`, {headers: {Cookie: this.cookie}});
      MoodleUser._statusCheck(res);

      const $ = cheerio.load(res.data);
      this.userInfo = {
        'name': $('.usertext').text(),
        'avatar': $('.contentnode').first().first().last().text()
      };

      return this.userInfo;
    } catch (err) {
      throw new UnhandledMoodleError(`Unable to fetch user info!`, err);
    }
  }

  /**
   * Fetches the users course modules and stores it in the cache
   * @async
   * @return {Promise<Array(Object)>}
   */
  async fetchModules() {
    //try {
      await this._checkLogin();

      let res = await axios.get(`${this.moodleURL}/my`, {headers: {Cookie: this.cookie}});
      MoodleUser._statusCheck(res);
      const $ = cheerio.load(res.data);

      return {
        active: this.parseCourses($, '#courses-active'),
        done: this.parseCourses($, '#courses-pz'),
      };
    //} catch (err) {
     // throw new UnhandledMoodleError(`Unable to fetch user modules!`, err);
    //}
  }

  parseCourses($, query) {
    const courses = [];
    $(query).find('a').each((i, element) => {
      courses.push({
        url: $(element).attr('href'),
        id: $($(element).find('.course_title').find('h2')[1]).html(),
        name: $(element).find('.course_title').find('h3').html(),
        img: $(element).find('.courseimage.img-fluid').find('img').first().attr('src'),
        progress: {
          done: $(element).find('.progress-display').first().text().split(' / ')[0],
          all: $(element).find('.progress-display').first().text().split(' / ')[1]
        }
      });
    });
    return courses;
  }

  /**
   * Fetches the users module grades and stores it in the cache
   * @async
   * @return {Promise<Array(Object)>}
   */
  async fetchGrades() {
    try {
      await this._checkLogin();

      let res = await axios.get(`${this.moodleURL}/grade/report/overview/index.php`, {headers: {Cookie: this.cookie}});
      MoodleUser._statusCheck(res);

      const $ = cheerio.load(res.data);
      this.moduleGrades = $('#overview-grade').children().last().children().not('.emptyrow').map((i, elem) => {
        return {name: $(elem).children().first().text(), value: $(elem).children().last().text()}
      }).get();

      return this.moduleGrades;
    } catch (err) {
      throw new UnhandledMoodleError(`Unable to fetch user grades!`, err);
    }
  }

  /**
   * Fetches the users blog posts and stores them in the cache
   * @async
   * @return {Promise<Array(Object)>}
   */
  async fetchBlogPosts() {
    try {
      await this._checkLogin();

      let res = await axios.get(`${this.moodleURL}/blog/index.php`, {headers: {Cookie: this.cookie}});
      MoodleUser._statusCheck(res);

      const $ = cheerio.load(res.data);
      this.blogPosts = $('.blog_entry').map((i, elem) => {
        return {
          subject: $(elem).children().first().children().last().children().first().text(),
          author: $(elem).children().first().children().last().children().last().text(),
          authorPicture: $(elem).children().first().children().first().children().first().children().first().attr('src'),
          text: $(elem).children().last().children().first().children().filter('.no-overflow').text()
        }
      }).get();

      return this.blogPosts;

    } catch (err) {
      throw new UnhandledMoodleError(`Unable to fetch moodle blog posts!`, err);
    }
  }

  /**
   * Fetches the users upcoming calender and stores it in the cache
   * @async
   * @return {Promise<Array(Object)>}
   */
  async fetchCalender() {
    try {
      await this._checkLogin();

      let res = await axios.get(`${this.moodleURL}/calendar/view.php`, {headers: {Cookie: this.cookie}});
      MoodleUser._statusCheck(res);

      const $ = cheerio.load(res.data);
      this.calender = $('.eventlist').children().map((i, elem) => {
        return {
          name: $(elem).children().filter('.referer').text(),
          course: $(elem).children().filter('.course').text(),
          date: $(elem).children().filter('.date').text(),
          description: $(elem).children().filter('.description').text()
        };
      }).get();

      return this.calender || [];
    } catch (err) {
      throw new UnhandledMoodleError(`Unable to fetch user calender!`, err);
    }
  }

  /**
   * Fetches the users sessions and stores it in the cache
   * @async
   * @return {Promise<Array(Object)>}
   */
  async fetchSessions() {
    try {
      await this._checkLogin();

      let res = await axios.get(`${this.moodleURL}/report/usersessions/user.php`, {headers: {Cookie: this.cookie}});
      MoodleUser._statusCheck(res);

      const $ = cheerio.load(res.data);
      this.sessions = $('.generaltable').children().last().children().map((i, elem) => {
        return {
          date: $(elem).children().filter('.c0').text(),
          lastAccess: $(elem).children().filter('.c1').text(),
          ip: $(elem).children().filter('.c2').text()
        }
      }).get();

      return this.sessions;

    } catch (err) {
      throw new UnhandledMoodleError(`Unable to fetch users sessions!`, err);
    }
  }

  async _checkLogin() {
    try {
      if (!this.loggedIn) {
        return console.log(`Unable to login user ${chalk.red(this.username)} for website ${chalk.red(this.moodleURL)}\n${chalk.green(`Make sure you've called {MoodleUser}.login() first!`)}`);
      }
    } catch (err) {
      console.error(`Error handling re-login attempts, Error: ${err.stack}`);
      throw new UnhandledMoodleError(`Unable to check if a user is logged in!`, err);
    }
  }
}

module.exports = {
  MoodleUser: MoodleUser
};

class ExtendableError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown if an unhandled exception occurres
 */
class UnhandledMoodleError extends ExtendableError {
  /**
   * Create a new unhandled error
   * @param {String} message - The message to be displayed to the console
   * @param err - The error object to be thrown
   */
  constructor(message, err) {
    super(`Unhandled Moodle error occurred: ${message}`);
    this.data = {message, err}
  }

}
