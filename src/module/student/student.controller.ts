import { Controller, Get, Post } from "@nestjs/common";
import { StudentService } from "./student.service";

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}


    @Get('/')
    async getStudent() {
        const result = await this.studentService.getStudent();

        return result;
    }
}