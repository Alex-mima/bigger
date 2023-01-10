import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePost(titlelaqi: string, contentaqi: string) {
    const postData: Post = { title: titlelaqi, content: contentaqi };
    this.http
      .post<{ name: string }>(
        'https://first-project-90176-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://first-project-90176-default-rtdb.europe-west1.firebasedatabase.app/post.json'
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
      );
  }
}
