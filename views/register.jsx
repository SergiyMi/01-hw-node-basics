const React = require("react");

const { appUrl } = require("../config/config");
const DefaultLayout = require("./layouts/default");

function Register() {
  return (
    <DefaultLayout>
      <div class="container">
        <div class="row justify-content-sm-center">
          <div class="col-12 col-sm-6">
            <form
              class="form-signin"
              method="post"
              action={appUrl + "/api/auth/register"}
              enctype="application/x-www-form-urlencoded"
            >
              <div class="text-center mb-4">
                <img
                  class="mb-4"
                  src="/docs/4.4/assets/brand/bootstrap-solid.svg"
                  alt=""
                  width="72"
                  height="72"
                />
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
              </div>

              <div class="form-label-group">
                <input
                  type="email"
                  name="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Email address"
                  required
                  autofocus
                />
                <label for="inputEmail">Email address</label>
              </div>

              <div class="form-label-group">
                <input
                  type="password"
                  name="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  required
                />
                <label for="inputPassword">Password</label>
              </div>

              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">
                Sign up
              </button>
              <p class="mt-5 mb-3 text-muted text-center">
                © {new Date().getFullYear()}
              </p>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = Register;
