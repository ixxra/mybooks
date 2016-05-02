var spawn = require('child_process').spawn;


module.exports = function builder(){
  spawn('sass', [
    '-I', 'foundation/assets/scss',
    '--watch',
    'src/scss/main.scss:public/stylesheets/main.css']);
};
