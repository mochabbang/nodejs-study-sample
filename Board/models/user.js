function User(user) {
  this.userId = user.userId;
  this.userName = user.userName;
  this.userPwd = user.userPwd;
  this.userEmail = user.userEmail;
  this.userNickName = user.userNickName;

  return this;
}

module.exports = {
  User: User
};