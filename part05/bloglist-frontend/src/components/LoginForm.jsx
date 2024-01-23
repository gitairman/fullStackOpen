const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
    <form onSubmit={handleSubmit}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange} /><br />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange} />
      </div><br />
      <button type="submit">login</button>
    </form>
  )}

  export default LoginForm