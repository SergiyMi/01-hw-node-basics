const React = require("react");

const { appUrl } = require("../config/config");
const DefaultLayout = require("./layouts/default");

function SignIn() {
  return (
    <DefaultLayout>
      <div class="container">
        <div class="row justify-content-sm-center">
          <div class="col-12 col-sm-6">
            <form
              class="form-signin"
              method="post"
              action={appUrl + "/api/auth/login"}
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
                <h1 class="h3 mb-3 font-weight-normal">Floating labels</h1>
                <p>
                  Build form controls with floating labels via the{" "}
                  <code>:placeholder-shown</code> pseudo-element.{" "}
                  <a href="https://caniuse.com/#feat=css-placeholder-shown">
                    Works in latest Chrome, Safari, and Firefox.
                  </a>
                </p>
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
                Sign in
              </button>
              <p class="mt-5 mb-3 text-muted text-center">© 2017-2019</p>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = SignIn;
