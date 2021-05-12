import { Request, Response } from 'express';
import CreateCoursesService from './CreateCoursesService ';

export function createCourse(request: Request, response: Response) {
	CreateCoursesService.execulte("nodejs", 10, "eu mesmo");

	return response.send();
};
