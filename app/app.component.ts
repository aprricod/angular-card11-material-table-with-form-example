import {
  Component, ElementRef, OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AlbumService } from './album.service';
import { UserService } from './user.service';
import { Album } from './album.model';
import { User } from './user.model';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'table-form-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'userId', 'title']
  constructor(
    private _albumService: AlbumService,
    private _userService: UserService,
    private _formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      albums: this._formBuilder.array([])
    });
    this._albumService.getAllAsFormArray().subscribe(albums => {
      this.form.setControl('albums', albums);
      this.dataSource = new MatTableDataSource((this.form.get('albums') as FormArray).controls);
      this.dataSource.filterPredicate = (data: FormGroup, filter: string) => { 
          return Object.values(data.controls).some(x => x.value == filter); 
        };
    });
    this._userService.getAll().subscribe(users => {
      this.users = users;
    })
  }

  get albums(): FormArray {
    return this.form.get('albums') as FormArray;
  }

  // On user change I clear the title of that album 
  onUserChange(event, album: FormGroup) {
    const title = album.get('title');

    title.setValue(null);
    title.markAsUntouched();
    // Notice the ngIf at the title cell definition. The user with id 3 can't set the title of the albums
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
