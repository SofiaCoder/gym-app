const express = require('express');
const { followUser } = require('../controllers/friends/followUser');
const { getFollowedUsersPrograms } = require('../controllers/friends/getFollowedUsersPrograms');
const { getUsersFriends } = require('../controllers/friends/getUsersFriends');
const { checkAuthentication } = require('../middleware/middleware');
const friendRouter = express.Router();

friendRouter.use(checkAuthentication);

friendRouter.get('/posts', getFollowedUsersPrograms);
friendRouter.get('/', getUsersFriends);
friendRouter.patch('/', followUser);

exports.friendRouter = friendRouter;
