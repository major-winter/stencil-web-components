import { Component, h, Prop } from "@stencil/core"

@Component({
   tag: 'side-drawer',
   styleUrl: './side-drawer.css',
   shadow: true
})

export class SideDrawer {
   @Prop({ reflect: true }) myTitle: string
   @Prop({ reflect: true, mutable: true }) open: boolean

   onCloseDrawer() {
      this.open = false
   }

   render() {
      return (
         <aside>
            <header>
               <h1>{this.myTitle}</h1>
               <button onClick={this.onCloseDrawer.bind(this)}>Close</button>
            </header>
            <section id="tabs">
               <button class="active">Navigation</button>
               <button>Contact</button>
            </section>
            <main>
               <slot></slot>
               <slot name="slider"></slot>
            </main>
         </aside>
      )
   }

}
