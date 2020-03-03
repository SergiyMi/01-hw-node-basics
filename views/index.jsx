const React = require("react");

const { appUrl } = require("../config/config");
const DefaultLayout = require("./layouts/default");

function HomePage({ result: shortUrl }) {
  return (
    <DefaultLayout>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          Expand at lg
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample05"
          aria-controls="navbarsExample05"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample05">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="http://example.com"
                id="dropdown05"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdown05">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-md-0">
            <input class="form-control" type="text" placeholder="Search" />
          </form>
        </div>
      </nav>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-sm ">
            <h1>ShortUTL</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <form
              method="post"
              action={appUrl + "/api/url"}
              enctype="application/x-www-form-urlencoded"
            >
              <div class="form-group">
                <label htmlFor="urlInput">Write here you long url</label>
                <input
                  type="url"
                  name="url"
                  class="form-control"
                  id="urlInput"
                  aria-describedby="urlHelper"
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            {shortUrl && (
              <a href={shortUrl} class="btn btn-outline-dark" target="_blank">
                <h6>{shortUrl}</h6>
              </a>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = HomePage;
