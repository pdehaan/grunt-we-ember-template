# grunt-we-ember-template

## Compiler for We.js clientside handlebars

## A fork from [grunt-ember-template-compiler](https://github.com/mattjmorrison/grunt-ember-template-compiler)

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-we-ember-template --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-we-ember-template');
```

## Usage Example:

```js
emberhandlebars: {
  compile: {
    options: {
      templateName: function(sourceFile){
        var newSource = sourcefile.replace('src/templates/');
        return newSource.replace('.handlebars');
      },
      // theme folder used to override templates
      // default to node_modules/we-theme-default/templates/ember/
      themeTemplatesFolder: 'node_modules/we-theme-default/templates/ember/'
    },
    // local templates
    files: [
      'src/templates/*.handlebars'
    ],
    dest: 'src/templates.js'
  }
}
```


## License
Copyright (c) 2014 Alberto Souza. Licensed under the MIT license.