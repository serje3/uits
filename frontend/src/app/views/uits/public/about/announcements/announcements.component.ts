import {Component, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AnnouncementsService} from "@app/views/uits/public/about/announcements/announcements.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {ru} from "date-fns/locale";
import {AuthService} from "@app/shared/services/auth.service";
import {Profile} from "@app/shared/types/models/auth";
import {BehaviorSubject} from "rxjs";
import {ListPost} from "@app/shared/types/models/news";
import {PagesConfig} from "@app/configs/pages.config";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  @Input() title = 'Новости'
  @Input() isEditable: boolean = true

  locale = ru;

  isMobile: boolean;

  selectedImage: File | null = null;

  constructor(private announcementService: AnnouncementsService,
              private modalService: BsModalService,
              private authService: AuthService) {

    this.isMobile = window.innerWidth < 992;
  }

  get profile(): Profile {
    return this.authService.profile$.getValue();
  }

  get posts$(): BehaviorSubject<ListPost[]> {
    return this.announcementService.posts$;
  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    if (event.target.innerWidth < 992) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  post(id: number) {
    return this.posts$.getValue().find(p => p.id === id);
  }

  ngOnInit(): void {
    this.setPosts();
  }

  setPosts() {
    this.announcementService.getPosts().subscribe();
  }

  getPostURL(id: number) {
    return PagesConfig.about.announcements + id;
  }


  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log("Selected image: ", this.selectedImage);
  }

  getDateFromString(dateISO: string): Date {
    return new Date(dateISO);
  }

}
