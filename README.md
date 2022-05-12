# skipMenu

## Description:

Plugin for any webpage to automatically create a menu allowing users to easily navigate to major parts of the page. This allows you automatically add an accessible "skip to content" link(s).

This project was heavily inspired by the [SkipTo Project](https://github.com/paypal/skipto), but includes:

- Separation of typescript and css for easier styling customization
- Use of Bootstrap classes (but can also be used without Bootstrap)
- Separation of typescript into multiple files for easier development
- Use of webpack to build and bundle files
- Linting
- Unit testing via Cypress
- Methods to update menu when the page is changed, so your menu can always be up to date

[See a skipMenu in action](https://mydobie.github.io/skipMenu/)

---

### Download files

Both the JavaScript and CSS files are available for download for each release on [releases page](https://github.com/mydobie/skipMenu/releases).

---

## Using skipMenu on your website

In order for skipMenu to work, you need to download the files and add them to your project. Once that is done, include both the `skipMenu.js` and a `skipMenu.css` files in your HTML file. There are two css files, one for sites that use Bootstrap (`skipMenu-bootstrap.css`) and one for sites that do not (`skipMenu-full.css`).

In the head section of your HTML file, add the following:

```html
<link rel="stylesheet" href="/path-to/skipMenu-full.css" />
<script src="/path-to/skipMenu.js"></script>
```

At the very bottom of your HTML file, add the following:

```html
<script>
  const skipMenu = new SkipMenu();
  skipMenu.init();
</script>
```

### Options

When you create a `new SkipMenu()`, you can pass in an object of options. For example:

```js
<script>
  const skipMenu = new SkipMenu({alwaysShow: true, text:{buttonLabel: 'Skip Menu Shortcuts'}});
  skipMenu.init();
</script>

```

NOTE: All options are optional.

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>string</td>
            <td>`skipMenu`</td>
            <td>Id tied to the menu.  Note that you must set the id if you have multiple skipMenus on a single page.</td>
        </tr>
        <tr>
            <td>attachTo</td>
            <td>HTMLElement</td>
            <td>body</td>
            <td>HTML element that the menu should be attached to.  Usually this would be the header or navigation.</td>
        </tr>
        <tr>
            <td>alwaysShow</td>
            <td>boolean</td>
            <td>true</td>
            <td>If set to `true`, the menu button will will always show.  If set to false, the menu button will only show if has been tabbed to and while it has focus.</td>
        </tr>
        <tr>
            <td>headers</td>
            <td>string</td>
            <td>`h1, h2, h3, h4, h5, h6, [role=heading]`</td>
            <td>Query string of items to show in the headings section of the menu.  If no headers are found, that section is not included in the menu.  If neither the headers or landmark have items, the menu and its button will not be shown.</td>
        </tr>
        <tr>
            <td>landmarks</td>
            <td>string</td>
            <td>`main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]`</td>
            <td>Query string of items to show in the landmarks section of the menu.  If no landmarks are found, that section is not included in the menu.  If neither the headers or landmark have items, the menu and its button will not be shown.</td>
        </tr>
        <tr>
            <td>reloadOnChange</td>
            <td>boolean</td>
            <td>false</td>
            <td>EXPERIMENTAL.  The menu is automatically rebuild anytime the DOM changes.  This replaces the need to call the update method.</td>
       </tr>
        <tr>
            <td>useAccessKey</td>
            <td>boolean</td>
            <td>false</td>
            <td>If set to true, an accesskey will automatically be added.  In addition, a tooltip will be shown when the button has focus notifying the users how to use the access key.</td>
        </tr>
        <tr>
            <td>accessKey</td>
            <td>number | string</td>
            <td>0</td>
            <td>If `useAccessKey` is set to true, this will be the accesskey.</td>
        </tr>
        <tr>
            <td>ignoreClass</td>
            <td>string</td>
            <td>skipMenu-ignore</td>
            <td>Any item with this class will be ignored and not added to the menu.</td>
        </tr>
        <tr>
            <td>tabIndex</td>
            <td>number</td>
            <td></td>
            <td>Adds the tabindex to the menu button.</td>
        </tr>
        <tr>
            <td>ensureAbsoluteParent</td>
            <td>boolean</td>
            <td>true</td>
            <td>If the parent element (attachTo value) of the menu does not have a position of `relative`, `absolute`, `fixed` or `sticky`, the parent's position will be set to `relative` to ensure the menu displays correctly.</td>
        <tr>
            <td>text</td>
            <td>object</td>
            <td></td>
            <td>Object containing labels within the menu.  See the "Labeling Options" section below.</td>
        </tr>
    </tbody>
</table>

### Labeling Options

In order to support internationalization and customization, you can pass in an object of options for custom labels.

Note: All options are optional.

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Default</th>
        </tr>
    </thead>
   <tbody>
        <tr>
            <td>buttonLabel</td>
            <td>`Skip to content`</td>
        </tr>
        <tr>
            <td>headingLabel</td>
            <td>`Headings`</td>
        </tr>
        <tr>
            <td>landmarksLabel</td>
            <td>`Landmarks`</td>
        </tr>
        <tr>
            <td>tooltipLabel</td>
            <td>`Shortcut: `</td>
        </tr>
        <tr>
            <td>controlKeyLabel</td>
            <td>`Control`</td>
        </tr>
        <tr>
            <td>optionKeyLabel</td>
            <td>`Option`</td>
        </tr>
        <tr>
            <td>AltKeyLabel</td>
            <td>`Alt`</td>
        </tr>
        <tr>
            <td>shiftKeyLabel</td>
            <td>`Shift`</td>
        </tr>
         <tr>
            <td>mainLabel</td>
            <td>`Main`</td>
        </tr>
         <tr>
            <td>searchLabel</td>
            <td>`Search`</td>
        </tr>
         <tr>
            <td>navigationLabel</td>
            <td>`Navigation`</td>
        </tr>
         <tr>
            <td>regionLabel</td>
            <td>`Region`</td>
        </tr>
         <tr>
            <td>complementaryLabel</td>
            <td>`Complementary`</td>
        </tr>
         <tr>
            <td>bannerLabel</td>
            <td>`Banner`</td>
        </tr>
         <tr>
            <td>footerLabel</td>
            <td>`Footer`</td>
        </tr>
         <tr>
            <td>sectionLabel</td>
            <td>`Section`</td>
        </tr>
         <tr>
            <td>formLabel</td>
            <td>`Form`</td>
        </tr>
      </tbody>
  
</table>

---

## Methods available

The following methods are available on the SkipMenu object.

### init()

Creates the menu and attaches it to the DOM. Example:

```
skipMenu.init()
```

### open()

Opens the menu and puts focus on the first item. Example:

```
skipMenu.open()
```

### close()

Closes the menu and puts focus on the button. Example:

```
skipMenu.close()
```

### update()

Updates the menu based on the current DOM. It is recommended calling this method anytime DOM changes impact the headers or landmarks. Example:

```
skipMenu.update()
```

### remove()

This removes the menu and event listeners. Example:

```
skipMenu.remove()
```

### version

Prints out the skipMenu version. Example:

```
SkipMenu.version
```

```

```

---

---

---

# Developing

If you want to modify how the menu works, the following section describes how to setup the development tools. Pull requests are always welcome.

## Get me started:

At the root of the project run the following commands in a terminal to verify you can perform all the development tasks:

1.  Verify node is installed => `node -v`. Ensure that it is version listed in the `engines` section of the `package.json` file.
1.  Install dependencies => `npm run i`
1.  Verify you can check for lint errors => `npm run lint`
1.  Verify you can run the tests => `npm run cypress` Note: this will open cypress, but the tests will fail. See testing section below.
1.  Verify you can check for security advisories => `npm run npmAudit`
1.  Verify you can build the files in watch mode => `npm run build:watch`

---

## Project structure

All of the files that will be built are located in the `js` and `scss` directories. All other files are demo pages, test pages and development config files.

## Versioning

The version of the application is done automatically when merging a pull request into the main branch. Do not increment the version on the package.json file manually. See [Contributing.md](CONTRUBUTING.md) for more information.

## Special branches

There are special branches that should not be committed to directly.

- `main` - Branch that contains the latest published code. All changes into main should go through a pull request.
- `gh-pages` - Branch that contains the files for the demo page. Updates to this branch happen automatically when there is a pull request is merged into `main`.

---

## Node

The only requirement is that your development system has Node.js installed. You can verify you have node installed by running `node -v` in a terminal.

NOTE: The development tools require a node version listed in the `engines` section of the `package.json` file.

If have an different version of node running, first verify if you have NVM installed by running `nvm --version` in a terminal. If you do have NVM running, then see the [NVM website](https://github.com/nvm-sh/nvm) on how to install and use a new version of Node.

If you don't have Node nor NVM installed, see the [NodeJS website](https://nodejs.org/en/) on how to install Node.

## Install dependencies

After checking out the project, run `npm i` in a terminal at the root of the project to install dependencies.

After installing dependencies, you can check to see what dependencies are out of date by running `npm outdated` in a terminal at the root of the project.

## Check security stats of dependencies

You can check if there is any high or critical security advisories for installed dependencies by running `npm run npmAudit`.

### Run tests

Because the code depends on event listeners, the tests are run in a browser using Cypress. See the [Cypress website](https://docs.cypress.io/api/introduction/getting-started.html) for more information.

To run the tests, you first need to start the development server. In a terminal, run `npm run serve`.

In a separate terminal, run `npm run cypress` to open the cypress menu and run the tests a browser. If you would rather run the test in a headless state and view the results in the terminal, you can run `npm run cypress:run`.

### Linting

You can check the linting status of your files by running `npm run lint` in a terminal at the root of the project.

To fix known issues, you can run `npm run lint:fix`. NOTE: You may need to run this command multiple times until you get a successful run in order to fix all issues.

If you want linting issues fixed as you save files, run `npm run lint:watch` in a terminal at the root of the project.

More information on fixing linting errors is available at: [esLint](https://eslint.org/docs/rules/), [Prettier](https://prettier.io/docs/en/install.html), and [airbnb JS style guide](https://github.com/airbnb/javascript)

This application uses [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to automatically install Git Hooks that will check for linting errors on files at commit time. All linting errors must be fixed before changes can be committed to git.

### Build dist files

To build the dist files that can be used on a web page run `npm run build`. If you want the files re-built when you save a file, run `npm run build:watch`. The build files will be located in the 'dist' and 'testPages/dist' directories.

---

## GitHub actions

This repository uses numerous GitHub actions to run tests, build files, and create tags. Many of these actions will happen automatically, but some of them can be run manually.

The status of any actions can be viewed on the [actions page](https://github.com/mydobie/skipMenu/actions). The action files are located in the `.github/workflows` directory.

### Run tests

All pull requests will have the following tests run:

- Linting
- Check for high or critical security advisories
- Unit tests
- Verify that the code can be built as a package

If you want to run these tests against another branch, you can do the following at any time:

1. Go to [the test code actions page](https://github.com/mydobie/skipMenu/actions/workflows/test_code.yml) and click "Run workflow" drop down.
1. Choose the branch you want to run the tests against.

If you get a "Workflow does not exist or does not have a workflow_dispatch trigger in this branch" warning, be sure that the `.github/workflows/test_and_build.yml` file exists on the branch.

### Update version, publish package, update demo site

When a pull request is merged into the `main` branch, the following is automatically run.

- Linting
- Check for high or critical security advisories
- Unit tests
- Updates version on package.json (see [CONTRIBUTING for more information](CONTRIBUTING.md))
- Creates a [release](https://github.com/mydobie/skipMenu/releases)
- Updates the [demo site](https://mydobie.github.io/skipMenu) on the `gh-pages` branch.

**Note** that these series of actions can take a while. Check the [actions page](https://github.com/mydobie/skipMenu/actions) to see if there are any actions still running.

**Note** that approvers will need to manually update the [release](https://github.com/mydobie/skipMenu/releases) text. See [CONTRIBUTING](CONTRIBUTING.md) on what is required for the release text.
