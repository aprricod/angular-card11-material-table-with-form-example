import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Album {
  userId: number;
  id: number;
  title: string;

  static asFormGroup(album: Album): FormGroup {
    const fg = new FormGroup({
      userId: new FormControl(album.userId, Validators.required),
      id: new FormControl(album.id, Validators.required),
      title: new FormControl(album.title, Validators.required)
    });
    return fg;
  }
}
