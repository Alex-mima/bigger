import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'biggerRepo';

  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://first-project-90176-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
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
      )
      .subscribe((posts) => {
        // ...
        console.log(posts);
      });
  }
}
