import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;

  @Prop({ reflectToAttr: true }) title: string;
  @Prop({ reflectToAttr: true, mutable: true }) open: boolean;

  onCloseDrawer() {
    this.open = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 1234567890</li>
            <li>E-mail: <a href="mailto:something@gmail.com">something@gmail.com</a></li>
          </ul>
        </div>
      );
    }

    return (
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}
            >
              Navigation
          </button>
          <button
            class={this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'contact')}>
              Contact
          </button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    );
  }
}
