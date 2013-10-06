all:
	npm install

check:
	jsstyle -t 4 ./main.js
	jsl --conf=tools/jsl.node.conf  ./main.js

clean:
	rm -r node_modules

