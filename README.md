![MyReadsLogo](https://raw.githubusercontent.com/rafaelmaiach/myreads/master/readme-images/MyReads.jpg)
# MyReads
**MYREADS** is the first project from the **Udacity's React Developer Nanodegree** program. You'll create a bookshelf application that allows you to select and sort books you've read, are reading or want to read. The project emphasizes using React to build the application and provides an API server and client library, which you will use to store information as you interact with the application.

<a href="https://myreads-rafaelmaiach.herokuapp.com" target="_blank"> CHECK THE DEMO</a>

## Table of contents

 - [How to install](#how-to-install)
 - [How to run](#how-to-run)
	 - [Development mode](#development-mode)
	 - [Production mode](#production-mode)
   - [Test mode](#test-mode)
 - [How it works](#how-it-works)
	 - [Start page](#start-page)
	 - [Access page](#access-page)
	 - [Bookshelf page](#bookshelf-page)
	 - [Search page](#search-page)
 - [Walkthrough the project](#walkthrough-the-project)
	 - [Migrating from third-party boilerplates to my own boilerplate](#migrating-from-third-party-boilerplates-to-my-own-boilerplate)
	 - [Thinking about performance](#thinking-about-performance)
  - [Built with](#built-with)
  - [Contact me](#contact-me)
  - [Credits](#credits)
 

## How to install
To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com/)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/rafaelmaiach/myreads.git

# Go into the repository
$ cd myreads

# Install dependencies
$ npm install
```
[(Back to top)](#myreads)

## How to run
You can run the project in both environments: **development** and **production**. Be sure to have the dependencies installed before.
The application runs on ```http://localhost:3000``` as default if a PORT isn't specified on **.env** file.

### Development mode
In this mode, hot loader is configured to be triggered on files changes.
```bash
# Run npm script for development mode
npm run dev
```

### Production mode
In this mode, the files are uglyfied, minified and compressed with _gzip_ by Webpack and the server serves the **GZIP** files to reduce the project size for client.
```bash
# Run npm script to build the project and generate bundle files
npm run build

# Run npm script for production mode
npm start
```

### Test mode
In this mode you can run all created tests and see test coverage. It's being a great and rewardable challenge to learn unit tests on React. If you have any tips or would like to help me in this path, [contact me](#contact-me), I'll be very thankful.

```bash
# Run npm script to run all tests
npm run test

# Run npm script to see test coverage
npm run test:coverage
```

[(Back to top)](#myreads)

## How it works

This project has four pages: Start, Access, Bookshelf and Search.

### Start page
This page can be accessed through **/main** path. It shows the MyReads logo and a button (**FIND A BOOK**) to access the bookshelf. 

If the user has already logged in, this button redirects it to [Bookshelf Page](#bookshelf-page) or to [Access Page](#access-page) if not.

### Access page
This page can be accessed through **/auth** path. The user can't be logged in to see it. If it is, it will be redirect to [Start Page](#start-page).  It is separated in two parts: Author quotes, where a random author's quote is shown and the form where the user can sign in or sign up.

The authentication system is simple and was built using [localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/Window.localStorage) as its database and sign in / sign up actions have field validation using [YUP](#built-with). 

**Sign In form:** When the user provides a valid e-mail and password, the sign in button will redirect it to [Bookshelf Page](#bookshelf-page) or show an error message if it's invalid.

**Sign Up form**: When the user provides a valid fullname, e-mail and password, the sign up button will redirect it to the **sign in form** or show an error message if it's invalid.

I started it simple to learn more about the concepts of a authentication system. I'll continue studying about it to learn about missing features like data encryption, real database, recovery password system and security on front and back-end.

### Bookshelf page
This page can be accessed through **/** path, but only if the user is successful authenticated and logged in. If not, this page will redirect it to [Start Page](#start-page). 

On the header of this page, user can:

 - **Logout** from the system, using the Logout button on header
 - Change between three bookshelves **currently reading**, **want to read**, **read**, where each one has its own set of books
 - Go to [Search Page](#search-page) using the magnifying glass button

For each bookshelf, the user will see the set of books that are present on that bookshelf and, for each book, the user can see informations about it and clicking on **See more** button, a modal appears with more information. The books can also be moved to another bookshelf or removed from the current one using the **(...)** dropdown button which shows a list of the bookshelves to move it or a option to remove it.

### Search page
This page can be accessed through **/search** path, but only if the user is successful authenticated and logged in. If not, this page will redirect it to [Start Page](#start-page). 

On the header of this page, user can:

 - **Go back** to the [Bookshelf Page](#bookshelf-page) using the arrow **(<-)** button
 - Search for books using the input field

As this project is built using BooksAPI from Udacity, a list of Search Terms was given and they are shown on the page when there are no results being shown.

If the search doesn't find any book, a message of **no books were found** is shown. If the search finds, it will show a list of books that have the same set of information and functionality from the books on the [Bookshelf Page](#bookshelf-page). The only aditional information is that the current bookshelf is shown on a tag below the book image.

[(Back to top)](#myreads)

## Walkthrough the project
When I started the project I knew that I wanted to give my best to it and not just make it but learn new things, mainly about [performance](#thinking-about-performance) and below are the learns I got after finishing it.

### Migrating from third-party boilerplates to my own boilerplate

**CRA:** I started the project using the [create-react-app](https://github.com/facebook/create-react-app) boilerplate as it is simple to use. Everything was going well until I build the project to production. I didn't like the bundle it generated and even ejecting the boilerplate to have access to its hidden scripts, I wasn't satisfied, so I changed to [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).

**React-boilerplate:** This boilerplate is very famous, it has a lot of things built in it and many dependencies already configured, this makes it very complex to understand and as I didn't need all of those stuff, I deleted almost 90% of the project, lefting only the webpack configuration that I liked and used to improve my Webpack knowledge. Again, everything was going well, the build was generating good bundle files, but I wanted more, I wanted to compress them to serve as **gzip** to reduce size. I had problems because I'm still new to backend stuff and their server configuration was hard to me to understand, so I decided to make it from zero.

**My own boilerplate**: Finally, I decided to remove everything from react-boilerplate and start my own boilerplate. I had already created one for my webpack studies ([react-start-environment](https://github.com/rafaelmaiach/react-start-environment)), so I take it and improve it from what I learned from react-boilerplate configuration. I've also fixed a lot of errors on my server file that wasn't allowing me to use BrowserRouter from react-router-dom. Oh, and I could delete a lot of unused dependencies.

**So what I learned:** Using third-party boilerplates are simple and let you settup an environment fast, but creating yours gives you full control and knowledge about your project and what is happening on it. 

**My advice:** As a developer you always need to be curious and keep learning new stuff, so go ahead and build your own boilerplate, check what Babel and Webpack do to your files, it will be a great experience!

### Thinking about performance
I've already worked on a big project using React, but I actually never thought about performance because the site was running smoothly, but everything changed when I became curious about performance in React and I found this awesome article [React is Slow, React is Fast: Optimizing React Apps in Practice](https://marmelab.com/blog/2017/02/06/react-is-slow-react-is-fast.html) by [François Zaninotto](https://twitter.com/francoisz). It shows in practice how you can improve React performance just by taking care of the way your components render. 

That's why I looked for some libraries that could help me create a better performatic project and found [recompose, react-loadable and moize](#built-with) to learn and try it out. From these three, I've felt in love by **recompose**, it's an awesome library that gives you functions to give power to your components, mainly the functional ones, that gives you control over conditional re-render for example.

But, as I was learning more and more about performance, I've noticed that not only React could be optimized but using Webpack correctly could make your bundles smaller and this way the client-side would download small packages at time which will improve performance. So I studied more about Webpack and made a production configuration that I liked the generated bundle and even more when I learned how to compress them to gzip (omg, the bundles decreased their size so much). And with the gzipped version of my bundle, I found [express-static-gzip](#built-with) package for Node.js which makes my server serves the **gz** version of the bundle.

Below you can check some images from the production bundle and the result of Chrome DevTools Audit analysis. If you have any tips or feedback, [contact me](#contact-me).
<div align="center" />
<h4>Production Bundle
<img src="https://raw.githubusercontent.com/rafaelmaiach/myreads/master/readme-images/bundle.png" alt="bundle"/>

<h4>Chrome DevTool Audit from Bookshelf Page
<img src="https://raw.githubusercontent.com/rafaelmaiach/myreads/master/readme-images/performance.png" alt="performance"/>
</div>

So, I learned a lot of performance and I'll continue learning more to create great projects at the future, so **my advice** to this session is simple, learn about performance and optimization, don't matter how small the project is, it's a knowledge that makes difference.

[(Back to top)](#myreads)

## Built with
- [Enzyme](http://airbnb.io/enzyme/) - JavaScript Testing utilities for React
- [Eslint AirBnb](https://www.npmjs.com/package/eslint-config-airbnb) - The Airbnb JavaScript lint rules to follow their style guide
- [Express-static-gzip](https://www.npmjs.com/package/express-static-gzip) - Provides a small layer on top of _serve-static_, which allows to serve pre-gzipped files.
- [Flow](https://github.com/facebook/flow) - A static typechecker for JavaScript
- [Jest](https://jestjs.io/) - Testing library that can be used to test simple Javascript code or React components
- [Moize](https://github.com/planttheidea/moize) - A memoization library for JavaScript
- [Pug](https://github.com/pugjs/pug) - A high-performance template engine
- [React-loadable](https://github.com/jamiebuilds/react-loadable) - A higher order component for loading components with dynamic imports
- [Recompose](https://github.com/acdlite/recompose) - A React utility belt for function components and higher-order components. Mainly used to take care of unecessary components re-renders
- [Styled-components](https://github.com/styled-components/styled-components) - Allows you to write actual CSS code to style your components.
- [Webpack 4](https://github.com/webpack/webpack) - A bundler for javascript and friends. Packs many modules into a few bundled assets.
- [Yup](https://github.com/jquense/yup) - A JavaScript object schema validator and object parser.

You can check the other dependencies on _package.json_ file.

[(Back to top)](#myreads)

## Contact me
I'm always learning new things and I'm opened to feedbacks or just meet new people.  I'll be glad to talk to you about JavaScript, React, Web Development, Harry Potter or anything you want to. Find me on: 
- [LinkedIn](https://www.linkedin.com/in/rafaelmaiach)
- [Instagram](https://www.instagram.com/rafaelmaia.js)
- [Facebook](https://www.facebook.com/rafaelmaiach)

[(Back to top)](#myreads)

## Credits

#### Images
- Start Page: Photo by [Ugur Akdemir](https://unsplash.com/photos/XT-o5O458as) on [Unsplash](https://unsplash.com/)
- Bookshelf Page: Photo by [kazuend](https://unsplash.com/photos/DHk_mju83z0) on [Unsplash](https://unsplash.com/)
- Search Page: Photo by [Susan Yin](https://unsplash.com/photos/2JIvboGLeho) on [Unsplash](https://unsplash.com/)

#### Author quotes
All the quotes were got from [WritersDigest](http://www.writersdigest.com/writing-quotes)

#### Icons
- Icons by [Freepik](http://www.freepik.com), [Flaticon](https://www.flaticon.com) and [Iconfinder](https://iconfinder.com)

[(Back to top)](#myreads)
