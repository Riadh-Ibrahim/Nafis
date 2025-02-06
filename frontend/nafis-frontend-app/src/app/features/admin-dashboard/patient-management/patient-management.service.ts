import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientManagementService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  // fetch all users
  getUsers() {
    return this.http.get(this.apiUrl);
  }

  // delete user
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // update user
  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }
  // add user
  addUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }
}
