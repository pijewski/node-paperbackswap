all:
	npm install

check:
	jsstyle -t 4 ./agent.js
	jsl --conf=tools/jsl.node.conf  ./agent.js

clean:
	rm -r node_modules

