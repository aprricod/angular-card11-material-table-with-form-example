
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from './user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<User[]> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return this._http.get<User[]>(url);
  }
}

