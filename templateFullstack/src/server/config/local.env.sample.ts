'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  // App secret
  SESSION_SECRET: 'fullstack-secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
