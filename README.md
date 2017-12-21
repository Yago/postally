# 📨 Postally

> AiO email creator assitant

## Prerequisites

Your project need [NodeJS 8+](https://nodejs.org/en/).

**Postally** are using the following libraries to offer an full email development environment :
- **[🌾 Twig.js](https://github.com/twigjs/twig.js)** as the main template engine
- **[🐙 Inky](https://github.com/zurb/inky)** as the Email template engine
- **[✉️ Foundation for Emails](https://github.com/zurb/foundation-emails/)** as HTML/CSS framework

To **help** your Email creation process, you can take a look at :
- [Twig documentation](https://twig.symfony.com/doc/2.x/)
- [Foundation for Emails documentation](https://foundation.zurb.com/emails/docs/)
- [Inky templates examples](https://github.com/zurb/foundation-emails/tree/develop/templates)
- [Available Sass variables](https://github.com/zurb/foundation-emails/blob/develop/scss/_global.scss)

## Installation

First, install *postally* globally

```bash
$ npm install -g postally
# or
$ yarn global add postally
```

## Usage

#### Init your project

To create a new *postally* project, you can choose to create a new directory (f.ex. `new_project`) or bootstrap the project inside the current one.

```bash
$ postally init new_project
$ cd new_project
# or
$ postally init
```

This will produce the following file structure inside your project directory :

```plain
.
├── build            👈 your project's build (to use with MailChimp or CM)
├── data.json        👈 the json data to inject in the markup
├── images           👈 your image folder
├── index.html       👈 the inky/twig newsletter template
├── node_modules     👈 your only dependency
│    └── foundation-emails
├── package-lock.json
├── package.json     👈 npm settings
├── styles.scss      👈 your custom styles
└── variables.scss   👈 your custom and overrided Foundation for Emails variables
```

#### Start the development environment

In your project directory, you can use the following command to start a web server into your default browser. It will automaticaly reload the rendered page and remake the build each time you will save your working files. 

```bash
$ postally start
```

#### Create a once build

Almost the same as the *start* command, it only creates a once build.

```bash
$ postally build
```