import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  imgURL = "../../assets/recruit.svg";
  textValue = "";
  @ViewChild('qrCode', { static: false }) qrCode: any;

  ngAfterViewInit() {
    this.createQRWithImage();
  }

  createQRWithImage() {
    let canvas = this.qrCode.elementRef.nativeElement.children[0];
    let context = canvas.getContext("2d");
    let img = new Image();
    img.src = this.imgURL;
    let iWidth = 30;
    let iHeight = 30;
    img.onload = () => {
      context.drawImage(img, (canvas.width / 2) - (iWidth / 2), (canvas.height / 2) - (iHeight / 2), iWidth, iHeight);
    }
  }

  
  saveQRCode() {
    let elem = this.qrCode.elementRef.nativeElement.children[0];
    saveAs(this.canvasToBlob(elem), "file.png");
    this.qrCode.elementRef.nativeElement.download;
  }





  canvasToBlob(canvas) {
    let dataurl = canvas.toDataURL("image/png");
    let byteString = window.atob(dataurl.replace(/^data:image\/(png|jpg);base64,/, ""));
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: 'image/jpeg' });
  }
}
