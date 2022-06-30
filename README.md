# skipMenu

## Description:

Plugin for any webpage to automatically create a menu allowing users to easily navigate to major parts of the page. skipMenu will look your page and automatically add links to headings and landmarks in the menu. This menu can replace traditional accessible "skip to content" link(s).

This project was heavily inspired by the [SkipTo Project](https://github.com/paypal/skipto), but includes:

- Separation of typescript and css for easier styling customization
- Use of [Bootstrap](https://getbootstrap.com/) and [PatternFly](https://www.patternfly.org/) classes (but can also be used without Bootstrap or PatternFly)
- Separation of typescript into multiple files for easier development
- Use of webpack to build and bundle files
- Linting
- Unit testing via Cypress
- Configuration option to automatically update the menu when the page changes. Your skipMenu is always up to date

[See skipMenu in action](https://mydobie.github.io/skipMenu/)

SkipMenu implements the keyboard support documented in the [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) for [Navigation Menu Button](https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html). This includes support for the following keys: tab, enter/return, space, arrow, escape, home, and end.

---

### Download files

Both the JavaScript and CSS files are available for download for each release on [releases page](https://github.com/mydobie/skipMenu/releases).

---

## Using skipMenu on your website

In order for skipMenu to work, you need to download the files and add them to your project. Once that is done, include both the `skipMenu.js` and a `skipMenu.css` files in your HTML file. There are three css files, one for sites that use Bootstrap (`skipMenu-bootstrap.css`), one for sites that use PatternFly (`skipMenu-patternfly.css`) and one for sites that do not use either Bootstrap or PatternFly(`skipMenu-full.css`).

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
            <td>If set to `true`, the menu button will will always show.  If set to false, the menu button will only show if has been tabbed to and while it has focus.  It is not recommended to set this.  Having the menu button always visible can help all users.</td>
        </tr>
        <tr>
            <td>headers</td>
            <td>string | false</td>
            <td>see "headings"</td>
            <td>This is a deprecated option that will be replaced by "headings"</td>
        </tr>
        <tr>
            <td>headings</td>
            <td>string | false</td>
            <td>`h1, h2, h3, h4, h5, h6, [role=heading]`</td>
            <td>Query string of items to show in the headings section of the menu.  If no headers are found, the headings section is not included in the menu.  If neither the headers or landmark have items, the menu and its button will not be shown.  Pass an empty string or set to `false` if the header section should not be shown even if there are headings on the page.</td>
        </tr>
        <tr>
            <td>landmarks</td>
            <td>string | false</td>
            <td>`main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]`</td>
            <td>Query string of items to show in the landmarks section of the menu.  If no landmarks are found, the landmarks section is not included in the menu.  If neither the headers or landmark have items, the menu and its button will not be shown. Pass an empty string or set to `false` if the landmarks section should not be shown even if there are landmarks on the page.</td>
        </tr>
        <tr>
            <td>reloadOnChange</td>
            <td>boolean</td>
            <td>false</td>
            <td>The menu is automatically rebuild anytime the DOM changes.  This replaces the need to call the update method.  It is recommended that this is set to true unless the page does not change once it is loaded or there are performance problems.  Note: This will default to `true` in future versions.</td>
       </tr>
        <tr>
            <td>useAccessKey</td>
            <td>boolean</td>
            <td>false</td>
            <td>If set to true, an accesskey will automatically be added allowing users to open the menu at any time with a keyboard command.  In addition, a tooltip will be shown when the button has focus notifying the users how to use the access key.  Note that accessible technologies including screen readers can interfere with access keys.  </td>
        </tr>
        <tr>
            <td>accessKey</td>
            <td>number | string</td>
            <td>0</td>
            <td>If `useAccessKey` is set to true, this will be the accesskey. While it doesn't prevent conflicts, it is recommended that a number is used as an access key because most assistive technologies don't use number  based access keys.</td>
        </tr>
        <tr>
            <td>ignoreClass</td>
            <td>string</td>
            <td>skipMenu-ignore</td>
            <td>Any item with this class will be ignored and not added to the menu. This is normally not recommended.</td>
        </tr>
        <tr>
            <td>tabIndex</td>
            <td>number</td>
            <td></td>
            <td>Adds the tabindex to the menu button. Normally this isn't needed.</td>
        </tr>
        <tr>
            <td>ensureAbsoluteParent</td>
            <td>boolean</td>
            <td>true</td>
            <td>If the parent element (attachTo value) of the menu does not have a position of `relative`, `absolute`, `fixed` or `sticky`, the parent's position will be set to `relative` to ensure the menu displays correctly.  Normally there isn't a need to set this to `false` - it should only be used if the introduction of the skipMenu is causing other display issues on the page.</td>
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

The following methods are available on the skipMenu object.

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

Updates the menu based on the current DOM. It is recommended calling this method anytime DOM changes impact the headers or landmarks. Normally there isn't a need to call this method if `reloadOnChange` is set to true. Example:

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

## Accessibility

The goal of skipMenu is to increase both accessibility and usability - especially for non-screenreader users who use keyboard navigation. This menu does use ARIA, but only enough to increase accessibility. SkipMenu follows patterns outlined in the [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) for [Navigation Menu Button](https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-links.html).

The use of skipMenu can help web authors fulfill or impact numerous [W3C Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/) success criteria including the following.

- 1.3.1 Info and Relationships (Level A)
- 2.1.1 Keyboard (Level A)
- 2.4.1 Bypass Blocks (Level AA)
- 2.4.6 Headings and Labels (Level AA)
- 2.4.7 Focus Visible (Level AA)
- 3.2.3 Consistent Navigation (Level AA)

### Is this an overlay?

The short answer is that skipMenu is not an overlay.

An accessibility overlay is a script that runs in the browser that attempts to fix accessibility issues or add accessibility features throughout the page. For example an overlay may change colors through out the page in order to ensure higher color contrast. While this seems like a good idea, in practices overlays have been problematic. Sometimes they don't work. Sometimes the overlay interferes with accessible technologies. The better approach would be to fix the accessibility issues in the page instead of relaying on a script.

SkipMenu does not attempt to fix any accessibility issues. In fact, it can make some accessibility issues, like out of order headers, more apparent so they can be more easily fixed by developers or content providers.

Except for adding a tabindex of -1 on headers and landmarks, skipMenu does not change any of the content or coding for the rest of the page.

---

---

---

# Developing

If you want to modify how the menu works or build a custom CSS file, the following section describes how to setup the development tools. Pull requests are always welcome.

## Get me started:

At the root of the project run the following commands in a terminal to verify you can perform all the development tasks:

1.  Verify node is installed => `node -v`. Ensure that it is version listed in the `engines` section of the `package.json` file.
1.  Install dependencies => `npm i`
1.  Verify you can check for lint errors => `npm run lint`
1.  Verify you can start Cypress => `npm run cypress` Note: this will open cypress, but the tests will fail. See testing section below.
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
- `gh-pages` - Branch that contains the files for the demo page. Updates to this branch happen automatically when a pull request is merged into `main`.

---

## Node

Your development system needs to have Node.js installed. You can verify you have node installed by running `node -v` in a terminal.

NOTE: The development tools require a node version listed in the `engines` section of the `package.json` file.

If you have an different version of node running, first verify if you have NVM installed by running `nvm --version` in a terminal. If you do have NVM running, then see the [NVM website](https://github.com/nvm-sh/nvm) on how to install and use a new version of Node.

If you don't have Node nor NVM installed, see the [NodeJS website](https://nodejs.org/en/) on how to install Node.

## Install dependencies

After checking out the project, run `npm i` in a terminal at the root of the project to install dependencies.

After installing dependencies, you can check to see what dependencies are out of date by running `npm outdated` in a terminal at the root of the project.

## Check security stats of dependencies

You can check if there are any high or critical security advisories for installed dependencies by running `npm run npmAudit`. Note that this application does not have any dependencies that are included in the build code, so this command will always pass. By running this command, any security advisories for the build tools will be shown in the terminal window.

### Run tests

Because the code depends on event listeners, the tests are run in a browser using Cypress. See the [Cypress website](https://docs.cypress.io/api/introduction/getting-started.html) for more information.

To run the tests, you first need to start the development server. In a terminal, run `npm run serve`.

In a separate terminal, run `npm run cypress` to open the cypress menu and run the tests a browser. If you would rather run the test in a headless state and view the results in the terminal, you can run `npm run cypress:run`.

### Linting

You can check the linting status of your files by running `npm run lint` in a terminal at the root of the project.

To fix known issues, you can run `npm run lint:fix`. NOTE: You may need to run this command multiple times until you get a successful run in order to fix all issues.

If you want linting issues automatically fixed as you save files, run `npm run lint:watch` in a terminal at the root of the project.

More information on fixing linting errors is available at: [esLint](https://eslint.org/docs/rules/), [Prettier](https://prettier.io/docs/en/install.html), and [airbnb JS style guide](https://github.com/airbnb/javascript)

This application uses [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to automatically install Git Hooks that will check for linting errors on files at commit time. All linting errors must be fixed before changes can be committed to git.

### Build dist files

To build the dist files that can be used on a web page run `npm run build`. If you want the files re-built when you save a file, run `npm run build:watch`. The build files will be located in the `dist`, `testPages/dist`, and `demoPage/dist` directories.

---

## GitHub actions

This repository uses numerous GitHub actions to run tests, build files, and create tags. Many of these actions will happen automatically, but some of them can be run manually.

The status of any actions can be viewed on the [actions page](https://github.com/mydobie/skipMenu/actions). The action files are located in the `.github/workflows` directory.

### Run tests

All pull requests will have the following tests run:

- Linting
- Check for high or critical security advisories
- Unit tests (Cypress)
- Verify that the code can be built

If you want to run these tests against another branch, you can do the following at any time:

1. Go to [the test code actions page](https://github.com/mydobie/skipMenu/actions/workflows/test_code.yml) and click "Run workflow" drop down.
1. Choose the branch you want to run the tests against.

If you get a "Workflow does not exist or does not have a workflow_dispatch trigger in this branch" warning, be sure that the `.github/workflows/test_and_build.yml` file exists on the branch.

### Update version, publish package, update demo site

When a pull request is merged into the `main` branch, the following is automatically run.

- Linting
- Check for high or critical security advisories
- Unit tests (Cypress)
- Updates version on package.json (see [CONTRIBUTING for more information](CONTRIBUTING.md))
- Creates a [release](https://github.com/mydobie/skipMenu/releases)
- Updates the [demo site](https://mydobie.github.io/skipMenu) on the `gh-pages` branch.

**Note** that these series of actions can take a while. Check the [actions page](https://github.com/mydobie/skipMenu/actions) to see if there are any actions still running.

**Note** that approvers will need to manually update the [release](https://github.com/mydobie/skipMenu/releases) text. See [CONTRIBUTING](CONTRIBUTING.md) on what is required for the release text.
