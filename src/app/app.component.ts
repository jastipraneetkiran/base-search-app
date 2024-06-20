import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { environment } from '../environments/environment';

import axios from 'axios';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'base-search-app';
  title = '';
  error = '';
  apiKey = environment.apiKey;
  loader = false;

  async search() {
    if (this.title.trim() === '') {
      this.error = 'Movie/Series Title is required';
      return;
    }
    this.loader = true;
    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${this.title}&apikey=${this.apiKey}`);
      if (response.data.Response === 'False') {
        this.loader = false;
        this.error = response.data.Error;
      } else {
        this.error = '';
        const iframe = document.getElementById('childFrame') as HTMLIFrameElement;
        iframe?.contentWindow?.postMessage(response.data, '*');
        this.loader = false;
      }
    } catch (error) {
      this.error = 'An error occurred while fetching data';
    }
  }

  onEnter() {
      this.search()
  }

}
