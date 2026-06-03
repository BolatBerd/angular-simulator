import { Component, inject } from '@angular/core';
import { IPost } from '../IPost';
import { PostApiService } from '../post-api.service';

@Component({
  selector: 'app-post-create',
  imports: [],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  postApiService = inject(PostApiService);

  // getPosts(){
  //   this.postApiService.getPosts().subscribe((posts: IPost[]) => {
  //     console.log(posts);
  //   })
  // }

}
