import { Component, inject, OnInit } from '@angular/core';
import { IPost } from '../IPost';
// import { PostApiService } from '../post-api.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
// import { Observable } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  imports: [    CommonModule,
    TableModule,
    SkeletonModule,
    ContextMenuModule,
    PaginatorModule,
    ButtonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  // private postApiService: PostApiService = inject(PostApiService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  // post$!: Observable<IPost>;
  post!: IPost;

  ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) { this.post$ = this.postApiService.getPostById(+id); }
  // }
    this.route.data.subscribe(data => {
    this.post = data['post'];
  });
}
}
