import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryConfig, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user!: User;
  galleryOptions!: GalleryConfig[];
  galleryImages: GalleryItem[] = [];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    
    this.galleryImages = this.getImages();
  }

  getImages(): GalleryItem[] {
    const galleryItems: GalleryItem[] = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      const galleryItem = new ImageItem({
        src: this.user.photos[i].url,
        thumb: this.user.photos[i].url
      });
      galleryItems.push(galleryItem);
    }
    console.log(galleryItems);
    return galleryItems;
  }
 
}
