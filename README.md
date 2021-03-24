# nuxt-lightship-module

## Installation

```sh
yarn add nuxt-lightship
```

In your `nuxt.config.js`:

```javascript
module.exports = {
  modules: ['nuxt-lightship'],
  lightship: {
    /*
     If Lightship detects that it is running in a non-Kubernetes environment (e.g. your local machine) then it starts the HTTP service on any available HTTP port. This is done to avoid port collision when multiple services using Lightship are being developed on the same machine. This behaviour can be changed using detectKubernetes and port configuration.
    */
    //  Run Lightship in local mode when Kubernetes is not detected. Default: true.
    detectKubernetes: true,
    // The port on which the Lightship service listens. This port must be different than your main service port, if any. The default port is 9000.
    port: 9000,
    // Delays the shutdown handler by X milliseconds. This value should match `readinessProbe.periodSeconds`. Default 5000.
    shutdownDelay: 5000,
    // A number of milliseconds before forcefull termination if shutdown handlers do not complete. The timer starts when the first shutdown handler is called. Default: 5000.
    shutdownHandlerTimeout: 5000,
    // signals An a array of [signal events]{@link https://nodejs.org/api/process.html#process_signal_events}. Default: ['SIGTERM'].
    signals: ['SIGTERM'],
  },
}
```
