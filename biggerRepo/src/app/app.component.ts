import { PostsService } from './posts.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'biggerRepo';
  isFetching = false;

  loadedPosts: Post[] = [];

  constructor(private http: HttpClient, private postsaqi: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsaqi.fetchPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsaqi.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsaqi.fetchPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
