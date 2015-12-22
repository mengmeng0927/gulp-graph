var mkdirp = require('mkdirp');
var shell = require('gulp-shell');
var fs = require('fs')


module.exports = function(gulp) {

    gulp.task('graphGenerate', function () {

        var dot = 'digraph g {\n';

        var tree = require('gulp/lib/taskTree')(this.tasks);

        tree.nodes.forEach(function (node) {
            dot += '"' + node.label + '";\n';
        });

        dot += '\n';

        tree.nodes.forEach(function (node) {
            node.nodes.forEach(function (dep) {
                dot += '"' + dep + '" -> "' + node.label + '";\n';
            });
        });

        dot += '}\n';

        mkdirp('target/gulp-graph')
        fs.writeFileSync('target/gulp-graph/gulp.dot', dot);
    });

    gulp.task('graph', ['graphGenerate'], shell.task([
        'dot -Tsvg -O target/gulp-graph/gulp.dot'
    ]));

};
