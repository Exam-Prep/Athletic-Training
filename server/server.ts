/** @format */

import path from "path";
import express, { Request, Response } from "express";
import compression from "compression";

const PORT = 3000;
const DIST_DIR = path.join(__dirname);

const app = express();

app.use(compression());

app.use(
	express.static(DIST_DIR, {
		etag: true,
		lastModified: true,
		setHeaders: (res: Response, path: string) => {
			if (path.endsWith(".html"))
				res.setHeader("Cache-Control", "no-cache");
			else if (path.match(/.[\da-f]+./g))
				res.setHeader("Cache-Control", "max-age=31536000");
		},
	}),
);

app.get("/", (req: Request, res: Response) => {
	res.sendfile(DIST_DIR + "/index.html");
});

app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`);
});
