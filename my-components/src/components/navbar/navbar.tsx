import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'js-navbar',
  styleUrl: './navbar.css',
  shadow: true,
})
export class NavBar {
  @Prop({ reflect: true }) open: boolean

  render() {
    return [
      <div>
        <h1>This is my custom Navigation Bar</h1>
      </div>,
      <div class="backdrop">
        <div class="nav-bar">
          <div class="nav-bar__item">
            <span>Home</span>
            <div class="nav-bar__item__list">
              <a href="#">Home 1</a>
              <a href="#">Home 2</a>
              <a href="#">Home 3</a>
            </div>
          </div>
          <div class="nav-bar__item">
            <span>About</span>
            <div class="nav-bar__item__list">
              <a href="#">About 1</a>
              <a href="#">About 2</a>
              <a href="#">About 3</a>
              <a href="#">About 4</a>
            </div>
          </div>
          <div class="nav-bar__item">
            <span>Services</span>
            <div class="nav-bar__item__list">
              <a href="#">Services 1</a>
              <a href="#">Services 2</a>
              <a href="#">Services 3</a>
              <a href="#">Services 4</a>
              <a href="#">Services 5</a>
            </div>
          </div>
          <div class="nav-bar__item">
            <span>Community</span>
            <div class="nav-bar__item__list">
              <a href="#">Community 1</a>
              <a href="#">Community 2</a>
              <a href="#">Community 3</a>
              <a href="#">Community 4</a>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}
