import { Component, OnInit } from '@angular/core';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  subscription: any;

  constructor(
    private inAppBrowser: InAppBrowser,
    private platform: Platform,
    private statusBar: StatusBar
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.changeStatusBarColor();
      this.launchsite();
    });
  }

  changeStatusBarColor() {
    this.statusBar.backgroundColorByHexString('#000000');
  }

  launchsite() {
    const options: InAppBrowserOptions = {
      hardwareback: 'yes',
      zoom: 'no',
      allowInlineMediaPlayback: 'no',
      location: 'no',
      toolbar: 'no',
      fullscreen: 'no',
      hideurlbar: 'yes',
    };

    const url = 'http://192.168.125.86/mcuflix/'; // palitan mo lang po ito, Sir

    const browser = this.inAppBrowser.create(url, '_self', options);

    browser.on('loadstop').subscribe((event) => {
      browser.executeScript({
        code: `
        document.addEventListener('click', function(event) {
          const target = event.target;
          if (target.tagName.toLowerCase() === 'a') {
            const url = target.href;
            const fileExtensions = ['.pdf', '.docx', '.xlsx', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.zip', '.rar', '.tar', '.gz', '.mp4'];
            const isDownloadable = fileExtensions.some(ext => url.includes(ext));
            if (isDownloadable) {
              event.preventDefault();
              window.open(url, '_system');
            }
          }
        }, false);
      `,
      });
    });

    browser.on('loadstop').subscribe(() => {
      browser.executeScript({
        code: `
          const style = document.createElement('style');
          style.innerHTML = \`
            *:focus {
              outline: none;
            }
            *:active {
              outline: none;
            }
          \`;
          document.head.appendChild(style);
        `,
      });
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
