# CarrIOTA Nelson GUI/Monitor

This is a small http server that monitors the Nelson instance and outputs the status as a web page.
Based on [create-react-app](https://github.com/facebookincubator/create-react-app).

## Getting Started

### Prerequisites

* A Nelson instance (including IRI) should be running locally on your machine.
* `node` (version >6.9) and `yarn` and `npm` should be installed
* install `serve` globally: `sudo npm install -g serve`

### Installing Manually

Checkout the project

```
    git checkout https://github.com/SemkoDev/nelson.gui.git
    cd nelson.gui
    yarn install --pure-lockfile
    yarn run build
    serve -s build -p 5000
```

Now your server runs at `http://localhost:5000`
Is your Nelson running on a non-standard host:port (localhost:18600)?
Simply provide it in browsers's url, like: `http://localhost:5000/yourhost/1234`
The data is refreshed automatically each 5 seconds (or at the heartbeat rate of your Nelson)
Work in progress.

## Development

The monitor is under heavy development. Please be patient.
Contribution / Pull Requests are welcome, but at this early stages where so much changes, your
work might become quickly non-mergeable and thus be in vain.
Please, for now, refrain to small PRs, thank you!

### What's Next
* Make it responsive
* Add optional listing of all known hosts (already fetching)
* Add a dialog to change hostname/port of Nelson
* Implement Menu
* Add some visualization of nodes / connections
* Add favicon / logo and some visuals
* Add version of the package to the Web output
* Add tests
* Improve documentation & clean up code
* ...
