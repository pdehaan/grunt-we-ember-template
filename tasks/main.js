module.exports = function(grunt){
    var glob = require('glob');
    var fs = require('fs');
    var mkdirp = require('mkdirp');
    var compiler = require('ember-template-compiler');
    var dirname = require('path').dirname;

    grunt.registerMultiTask('weThemeEmberHandlebars', 'Compile We.js Ember Templates and override with theme templates',
    function(){

        // set default options
        var options = this.options({
          // default theme folder
          themeTemplatesFolder: 'node_modules/we-theme-default/templates/ember/',
          templateName: filterNameForAssetsTemplateJs
        });

        var files = this.data.files;
        var dest = this.data.dest;

        var output = '';
        files.forEach(function(pattern){

            glob.sync(pattern).forEach(function(pathMatch){

                var namesArray = pathMatch.replace(/\.hbs$/, '').split('/');
                var l = namesArray.length;

                var templateName = options.templateName(namesArray);

                // get featureName
                var featureName = '';

                if(namesArray[l -3] === 'templates') featureName = namesArray[l -4];
                else featureName = namesArray[l-3];

                var templateBasePath = '';
                templateBasePath =  featureName + '/templates/' + templateName + '.hbs';
                // get optional template overrideTemplatePath
                var overrideTemplatePath = options.themeTemplatesFolder + templateBasePath;

                var contents = '';
                // check if exists one template to override in theme
                if(fs.existsSync(overrideTemplatePath)){
                  contents = fs.readFileSync(overrideTemplatePath).toString();
                }else{
                  contents = fs.readFileSync(pathMatch).toString();
                }

                var compiled = compiler.precompile(contents).toString();
                output += "Ember.TEMPLATES['" + templateName + "'] = Ember.Handlebars.template(" + compiled + ");";
            });
        });

        mkdirp(dirname(dest));
        fs.writeFileSync(dest, output);
    });
};

/**
* Filter template name from route
* User this filter to routes like: 'assets', 'js', 'ember', 'post', 'templates', 'post', 'list'
* @param  {array} names       file path split in array
* @return {string}            template name
*/
function filterNameForAssetsTemplateJs(names){
  // remove .hbs and split url
  var l = names.length;
  switch(names[l -2]) {
  case 'components':
    // is component
    return 'components/'+ names[l-1];
  case 'layouts':
    // is one layout
    return 'layouts/'+ names[l-1];
  case 'templates':
    // is one root template
    return names[l-1];
  default:
    // else is a normal template
    // [feature]/[templatename]
    return names[l -2] + '/' + names[l-1];
  }
}