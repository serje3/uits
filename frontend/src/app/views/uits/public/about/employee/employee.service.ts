import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "@app/configs/api.config";
import {BehaviorSubject, map} from "rxjs";
import {IEmployee} from "@app/shared/types/models/employee";

@Injectable({
  providedIn:'root'
})
export class EmployeeService {
  teacher$: BehaviorSubject<IEmployee[]>;
  constructor(private http: HttpClient) {
    this.teacher$ = new BehaviorSubject<IEmployee[]>([]);
  }

  getAllTeachers() {
    //return this.http.get(ApiConfig.department.employee.employee)
    return this.http.get<IEmployee[]>(ApiConfig.department.employee.teacher)
      .pipe(
        map(teachers => {
            this.teacher$.next(teachers);
            return teachers;
        })
      )
  }
  createTeacher(teacher: Object) {
    return this.http.post(ApiConfig.department.employee.teacher, {
      ...teacher
    })
  }

  deleteTeacher(id:number) {
    return this.http.delete(`${ApiConfig.department.employee.teacher}/${id}`)
  }
}
