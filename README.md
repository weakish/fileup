# When Svelte Meets LeanCloud Files

This is a simple file uploader demo built with [LeanCloud], Svelte, and TypeScript.

[LeanCloud]: https://leancloud.app

## Quick Start

### Configuration

Register an account and create an application at [LeanCloud], and fill in your application information in `src/App.svelte`:

```js
const appId = "your app id";
const appKey = "your app key";
const serverURL = "https://your-custom-domain.example.com";
```

You can obtain the required information from LeanCloud dashboard (`Settings > AppKey`).
The domain name in `serverURL` is the first domain in `Settings > AppKey > Domain whitelist > Request domain`.
 
### Install Dependencies

```sh
npm install
```

### Start a Local Server

```sh
npm run dev
```

### Build for the Production Environment

```sh
npm run build
```

Then upload the `public` directory to any web hosting service,
e.g. [LeanEngine]:

```sh
cd public
lean switch --region us-w1 --group web YOUR_APP_ID
lean deploy --prod 1 
```

[LeanEngine]: https://docs.leancloud.app/leanengine_overview.html