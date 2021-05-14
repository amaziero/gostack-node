import { Request, Response } from 'express';
import CreateCoursesService from './CreateCoursesService ';

export function createCourse(request: Request, response: Response) {
	CreateCoursesService.execulte({
		name: "nodejs",
		duration: 10,
		educator: "eu mesmo"
	});

	return response.send();
};
