var parser = require('galaxy-parser');
var Range = require('atom').Range, Point = require('atom').Point;

module.exports.activate = function () {}
module.exports.deactivate = function () {}

var linter = {
	name: 'Galaxy',
	grammarScopes: ['source.galaxy'],
	scope: 'file',
	lintOnFly: true,
	lint: function(editor) {
		try {
			parser(editor.getText());
			return Promise.resolve([]);
		} catch (err) {
			var line = err.location.line - 1;
			var col = err.location.column;
			var lineRange = editor.getBuffer().rangeForRow(line, false);
			var message = err.message;

			return Promise.resolve([{
				type: 'Error',
				text: message,
				filePath: editor.getPath(),
				range: new Range(new Point(line, col), lineRange.end)
		    }]);
		}
	}
};

module.exports.provideLinter = function () {
	return linter;
}