import { createLogger, DEBUG, INFO, TRACE, stdSerializers } from "browser-bunyan";
import { ConsoleFormattedStream } from "@browser-bunyan/console-formatted-stream";

const log = createLogger({
	name: "kor-app",
	streams: [
		{
			level: INFO, // or use the string 'info'
			stream: new ConsoleFormattedStream()
		}
	],
	serializers: stdSerializers,
	src: true
});

export default log;
