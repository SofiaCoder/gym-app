const express = require('express');
const { followUser } = require('../controllers/friends/followUser');
const { getFollowedUsersPosts } = require('../controllers/friends/getFollowedUsersPosts');
const { getUsersFriends } = require('../controllers/friends/getUsersFriends');
const { checkAuthentication } = require('../middleware/middleware');
const friendRouter = express.Router();

friendRouter.use(checkAuthentication);

friendRouter.get('/posts', getFollowedUsersPosts);
friendRouter.get('/', getUsersFriends);
friendRouter.patch('/', followUser);

exports.friendRouter = friendRouter;
