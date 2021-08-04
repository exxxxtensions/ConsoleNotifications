let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>
  .notificationItemWrapper {
    cursor: pointer;
    width: 350px;
    min-height: 50px;
    background: white;
    opacity: 0.85;
    z-index:  999999999999;
    border-radius: 3px;
    box-shadow: 3px -3px 9px;
    margin: 10px 5px 5px 2px;
  }
  .notificationItem {
    position: absolute;
    width: 350px;  
   }
  .close {
    color: black;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
  .notificationItemMessage {
    padding: 5px 15px 0 10px;
    color: #ef4000;
  }
  </style> <!-- look ma, scoped styles -->
  <div class="notificationItemWrapper">
      <div class="notificationItem">
        <div class="notificationItemMessage">
        
        </div>
        <div class="close">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="16" height="16"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><defs><linearGradient x1="86" y1="24.44192" x2="86" y2="147.55808" gradientUnits="userSpaceOnUse" id="color-1_T9nkeADgD3z6_gr1"><stop offset="0" stop-color="#cccccc"></stop><stop offset="1" stop-color="#333333"></stop></linearGradient></defs><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="url(#color-1_T9nkeADgD3z6_gr1)"><path d="M129.516,147.55808c-1.42693,0.00287 -2.7958,-0.56481 -3.80192,-1.57667l-39.71408,-39.71408l-39.71408,39.71408c-2.09894,2.0983 -5.50131,2.0983 -7.60025,0l-12.66708,-12.68142c-2.0983,-2.09894 -2.0983,-5.50131 0,-7.60025l39.71408,-39.69975l-39.71408,-39.71408c-2.0983,-2.09894 -2.0983,-5.50131 0,-7.60025l12.68142,-12.66708c2.09894,-2.0983 5.50131,-2.0983 7.60025,0l39.69975,39.71408l39.71408,-39.71408c2.09894,-2.0983 5.50131,-2.0983 7.60025,0l12.66708,12.68142c2.0983,2.09894 2.0983,5.50131 0,7.60025l-39.71408,39.69975l39.71408,39.71408c2.0983,2.09894 2.0983,5.50131 0,7.60025l-12.68142,12.66708c-1.00152,1.00779 -2.3632,1.57516 -3.784,1.57667z"></path></g></g></svg>
        </div>
       
       </div>
  </div>

  <slot></slot>
`;

function createCustomElement() {
    customElements.define('notification-custom-html', class extends HTMLElement {
        constructor() {
            super();
        }

        static set shadowRoot(shadowRoot) {
            this.shadowRootCustomeValue = shadowRoot;
        }

        static get observedAttributes() {
            return ['message'];
        }

        connectedCallback() {
            this.shadowRootCustomeValue = this.attachShadow({mode: 'open'});
            this.shadowRootCustomeValue.append(tmpl.content.cloneNode(true));
            this.shadowRootCustomeValue.querySelector('.close').addEventListener('click', () => this.close());
            this.addEventListener('click', () => this.close());
        }

        attributeChangedCallback(name, oldValue, newValue) {
            const textNode = document.createElement('div');
            textNode.innerHTML = newValue;
            const messagesNode = this.shadowRootCustomeValue.querySelector('.notificationItemMessage');
            messagesNode.prepend(textNode);
            // TODO: also react to the open attribute changing.
        }

        set message(mess) {
            console.log('mess ', mess);
        }

        close() {
            this.shadowRootCustomeValue.querySelector('.notificationItemWrapper').style.backgroundColor = 'red';
            setTimeout(() => {
                this.remove();
            }, 300);
        }
    });
}

createCustomElement();
