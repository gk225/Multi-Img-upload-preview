import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import './multi-image-upload.component.less';

@Component({
  selector: 'app-multi-image-upload',
  templateUrl: './multi-image-upload.component.html',
  styleUrls: ['./multi-image-upload.component.less'],
})
export class MultiImageUploadComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  @ViewChild('uploadImage') uploadImage!: ElementRef;
  listOfFiles: string[] = [];
  flag: boolean[] = [];
  images: Array<any> = [];
  imagesUploaded: Array<string> = [];

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        var selected = event.target.files[i];
        if (this.listOfFiles.indexOf(selected.name) === -1) {
          this.listOfFiles.push(selected.name);
        }
        console.log('lastfile', selected);
        reader.onload = () => {
          this.images.push(reader.result);
          this.flag.push(true);
        };

        reader.readAsDataURL(selected);
      }
    }
  }

  previewSelected(index: number) {
    this.flag[index] = false;
  }

  removeSelectedFile(index: number) {
    if (this.imagesUploaded.length > 0) {
      this.imagesUploaded.forEach((items, i) => {
        if (this.images[index] === items) {
          this.imagesUploaded.splice(i, 1);
          this.images.splice(index, 1);
          this.listOfFiles.splice(index, 1);
          this.flag.splice(index, 1);
          this.uploadImage.nativeElement.value = '';
        }
      })
    } else {
      this.images.splice(index, 1);
      this.listOfFiles.splice(index, 1);
      this.flag.splice(index, 1);
      this.uploadImage.nativeElement.value = '';
    }
  }

  upload(index: number) {
    if (!this.imagesUploaded.includes(this.images[index])) {
      this.imagesUploaded.push(this.images[index]);
    }

  }
  deleteImg(index: number) {
    this.imagesUploaded.splice(index, 1);
  }
}
