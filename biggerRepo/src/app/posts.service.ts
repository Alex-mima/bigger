import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(titlelaqi: string, contentaqi: string) {
    const postData: Post = { title: titlelaqi, content: contentaqi };
    this.http
      .post<{ name: string }>(
        'https://first-project-90176-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        postData
      )
      .subscribe({
        next: (responseData) => console.log(responseData),
        error: (error) => console.log(error.message),
      });
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://first-project-90176-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        {
          headers: new HttpHeaders({ 'custom-Header': 'Hallo' }),
        }
      )
      .pipe(
        //pipe is a method that allows you to funnel your observable data through multiple operators before they reach the subscribe method
        map((responseData) => {
          //the map operator allows us to get some data and return new data which is then automatically re wrapped into an observable so that we can still subscribe to it.
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
        // catchError((errorRes) => {
        //   return throwError(errorRes);
        // })
      );
  }

  clearAndDestroyPosts(): Observable<any> {
    return this.http.delete(
      'https://first-project-90176-default-rtdb.europe-west1.firebasedatabase.app/post.json'
    );
  }
}
