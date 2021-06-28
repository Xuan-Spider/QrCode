import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  title = 'qr-code-test';
  imgURL = "../../assets/recruit.svg";
  textValue = "";
  @ViewChild('qrCode', {static : false}) qrCode:any;

  createQRWithImage(){
    
    let elem =  this.qrCode.elementRef.nativeElement.children[0];
    let context = elem.getContext("2d");

    let img = new Image();
    img.src = this.imgURL;
    let iWidth = 50;
    let iHeight = 50;
    let me = this; 
    img.onload = () => {
      context.drawImage(img, (elem.width/2) - (iWidth/2),(elem.height/2) - (iHeight/2), iWidth, iHeight);    
      saveAs(me.canvasToBlob(elem), "file.png");
    }
    this.qrCode.elementRef.nativeElement.download
  }

  canvasToBlob(canvas){
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
