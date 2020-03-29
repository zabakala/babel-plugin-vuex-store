import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    template: `
      <div class="svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="240px" height="240px"><polygon fill="#81c784" points="23.987,17 18.734,8 2.974,8 23.987,44 45,8 29.24,8"/><polygon fill="#455a64" points="29.24,8 23.987,17 18.734,8 11.146,8 23.987,30 36.828,8"/></svg>
      </div>
    `
})
export default class Logo extends Vue {}
