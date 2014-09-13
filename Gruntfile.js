module.exports = function(grunt) {
  grunt.initConfig({
    THEME: 'themes/icosahedron',//my themes folder
    OUTPUT_PATH: 'output',      //default output path
    PATH: 'content',            //default content path
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    sass:{
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          'themes/icosahedron/static/css/main.css':'themes/icosahedron/static/css/sass/main.scss'
        }
      }
    },
    watch: {
      css: {
        files: 'themes/icosahedron/static/css/sass/*.scss',
        tasks: ['sass']
      },
      all: {
        files: ['themes/**/*.css','themes/**/*.html','content/*','content/pages/*','**/*.py'],
        tasks: ['pelican'],
        options: {
          livereload: true,
        },
      },
    },
    open: {
      all: {
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },
    express: {
      options: {
        // Override the command used to start the server.
        // (do not use 'coffee' here, the server will not be able to restart
        //  see below at opts for coffee-script support)
        // cmd: process.argv[0],
        // Will turn into: `node OPT1 OPT2 ... OPTN path/to/server.js ARG1 ARG2 ... ARGN`
        // (e.g. opts: ['node_modules/coffee-script/bin/coffee'] will correctly parse coffee-script)
        // opts: [ ],
        // args: [ ],
        // Setting to `false` will effectively just run `node path/to/server.js`
        // background: true,
        // Called when the spawned server throws errors
        // fallback: function() {},
        // Override node env's PORT
        // port: 9000,
        // Override node env's NODE_ENV
        // node_env: undefined,
        // Consider the server to be "running" after an explicit delay (in milliseconds)
        // (e.g. when server has no initial output)
        // delay: 0,
        // Regular expression that matches server output to indicate it is "running"
        // output: ".+",
        // Set --debug
        // debug: false,
      },
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['output'],
          livereload: true,//35729
        }
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'path/to/server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'path/to/server.js'
        }
      }
    },
    exec: {
      pygments: 'pygmentize -S monokai -f html -a .highlight > <%= THEME %>/static/css/sass/pygments.scss',
      sass: 'sass --watch <%= THEME %>/static/css/sass/main.scss:<%= THEME %>/static/css/main.css',
      pelican: 'pelican',
      pelican_publish: 'pelican -s publishconf.py',
      deploy_init: { //sometimes i accidently delete my git repo
        cmd:
        'git init && \
         git remote add origin ssh://root@192.241.228.195/~/digitalvapor.git',
        cwd: 'output',
      },
      //route_ip: 'sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000',
      //http://nicolasgallagher.com/simple-git-deployment-strategy-for-static-sites/
      deploy: {
        cmd:
        'git add -A && \
         git commit -m "autodeploy" && \
         git push -f origin +master:refs/heads/master && \
         git tag -f production',
        cwd: 'output',
      },
      // toggle_python2: 'npm config set python /usr/bin/python2.7 -g',
      // toggle_python3: 'npm config set python /usr/bin/python3.4 -g',
      // production_test: 'NODE_ENV=production node server.js',
      // production_test2: 'node server.js production',
      optimize_images: {
        cmd: 'optipng -nc -np *.png',
        cwd: 'output/images',
      },
      default: 'pelican',
    },
  });
  //instead of the below, can use matchdep
  //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  //grunt.resisterTask('optimize',['exec:optimize_images']);
  grunt.registerTask('deploy_init',['exec:deploy_init']);
  grunt.registerTask('pelican',['exec:pelican']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('server', ['express','open','watch']);
  //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['express','open','watch']);
  grunt.registerTask('compile', ['watch']);
  grunt.registerTask('dev',['sass','jshint']);
  grunt.registerTask('deploy',['exec:deploy']);
};
