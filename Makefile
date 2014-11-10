serve:
	./node_modules/.bin/browser-sync start --config bs-config.js

test:
	./node_modules/karma/bin/karma start karma.conf.js
