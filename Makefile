all:
	npm install

check:
	jsstyle -t 4 ./lib/main.js
	jsl --conf=tools/jsl.node.conf  ./lib/main.js

clean:
	rm -r node_modules

