interface CourseTypes {
	name: string;
	duration: number;
	educator: string;
}

class CreateCourseService {
	execulte({ name, duration, educator }: CourseTypes) {
		console.log(name, duration, educator);
	}
}

export default new CreateCourseService();