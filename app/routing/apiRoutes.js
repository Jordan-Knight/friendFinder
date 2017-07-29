var express = require('express');
var router = express.Router();
var friends = require('../data/friends')

var evalFriends = function(friend){
    var newScore = friend.scores.reduce( (x,y) => x + y);
    var matchScore = 0;
    var match;

    for (var i = 0; i < friends.length; i++) {
        friendScore = friends[i].scores.reduce( (x,y) => x + y);

        if (Math.abs(friendScore - newScore) < Math.abs(matchScore - newScore)) {
            matchScore = friendScore;
            match = friends[i]
        }
    }
    return match;
}

router.get('/', function(req, res){
    res.json(friends);
})

router.post('/', function(req, res){
    var newFriend = req.body;
    newFriend.scores = newFriend.scores.map(n=> parseFloat(n));

    var match = evalFriends(newFriend);
    friends.push(newFriend);
    res.json(match)
})

module.exports = router;