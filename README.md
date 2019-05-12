# vsf-wp-rest-api

Wordpress REST API module for Vue Storefront providing an out-of-box routing and data handling.

## Installation

### 1. Download the module

#### a. Via `git`

Go to your `vue-storefront`'s `modules` catalog and clone the repository with the module.

```bash
cd ../vue-storefront/src/modules;
git clone https://github.com/new-fantastic/vsf-wp-rest-api.git;
```

#### b. Via `npm` / `yarn`

Go to your theme's catalog and install the module from `npm`.

```bash
cd ../vue-storefront/src/themes/your-theme;
yarn add vsf-wp-rest-api;
```

### 2. Import and register the module inside `vue-storefront/src/modules/index.ts`


```js
import { WpRestApi } from './vsf-wp-rest-api' // if installed via Git
// or
import { WpRestApi } from 'vsf-wp-rest-api'  // if installed via NPM
...
export const registerModules: VueStorefrontModule[] = [
...
WpRestApi
...
]
```
