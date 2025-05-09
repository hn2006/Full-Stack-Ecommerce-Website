const sendJwtToken = (user, statusCode, res) => {
  const token = user.getJwtToken(user);
  return res.status(statusCode).json({
    success: true,
    user,
    token
  });
};

module.exports=sendJwtToken;