const userModel = require("../models/userSchema");

const follow = async (req, res) => {
  try {
    const { personThatFollowsId, personThatGetFollowedId } = req.body;

    await userModel.findByIdAndUpdate(personThatFollowsId, {
      $push: {
        following: personThatGetFollowedId,
      },
    });

    await userModel.findByIdAndUpdate(personThatGetFollowedId, {
      $push: {
        follower: personThatFollowsId,
      },
    });

    res.status(200).json({ message: "followed" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const unfollow = async (req, res) => {
  try {
    const { personThatUnfollowsId, personThatGetUnfollowedId } = req.body;

    await userModel.findByIdAndUpdate(personThatUnfollowsId, {
      $pull: {
        following: personThatGetUnfollowedId,
      },
    });

    await userModel.findByIdAndUpdate(personThatGetUnfollowedId, {
      $pull: {
        follower: personThatUnfollowsId,
      },
    });

    res.status(200).json({ message: "unfollowed" });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { follow, unfollow };
