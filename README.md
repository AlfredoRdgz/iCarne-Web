# iCarne

The following application is an online store application built on React and working with a remote webservice.

## How To Colaborate.

### Code structure:
Code structure is divided in the following:
- Components folder contains all components that will be rendered or will serve as helpers to the main components.
- Redux folder contains all redux actions, reducers, thunks and other async functions that will interact with the web service.
- Style folder contains all css, theme and font files that will provide the application look and feel.

### File structure:
Code in the project mainly consists of methods. Nevertheless, component files need to respect the following structure declaration under the respective regions:
- Private properties: All properties, constants or variables that come from the props or that the user won't interact with.
- Public properties: All properties, constants or variables that have a React state declaration and that the user will interact with.
- Public methods: All methods that the user will interact with by overwriting the react states or other public properties.
- Private methods: All methods that the user will not interact with, and are more helpers to provide functionality to the component.
- Render: The region that will control the logic that will be rendered to the user.
- Redux: Any redux mapStateToProps and mapDispatchToProps methods.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.