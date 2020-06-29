import { HomeComponent } from "../Home/Home";
import { toggleButtonState } from "../Home/toggleButtonState";
import { renderProductTable, fixTableHeader } from "./renderProductTable";
import { renderInvoiceRejectionModal } from "./renderInvoiceRejectionModal";
import {NotFoundComponent} from "../NotFound/NotFound";

export const ProductComponent = {
    main: (component) => {
        if (component === 'received-invoice') {
            return HomeComponent.render();
        } else if (component === 'sent-invoice') {
            return HomeComponent.render();
        } else if (component === 'received-order') {
            return HomeComponent.render();
        } else if (component === 'sent-order') {
            return HomeComponent.render();
        }

    },
    render: (component) => {

        // Check what component we're in so we could manage the state of sidebar and render the correspondent table
        if (component === 'received-invoice') {
            toggleButtonState(document.getElementById('received-invoice'));
        } else if (component === 'sent-invoice') {
            toggleButtonState(document.getElementById('sent-invoice'));
        } else if (component === 'received-order') {
            toggleButtonState(document.getElementById('received-order'));
        } else if (component === 'sent-order') {
            toggleButtonState(document.getElementById('sent-order'));
        }

        // The main page render
        const main = document.querySelector('.main');
        const html = `
            <div class="product">
                <div class="container"> 
                
                    <a class="product__btn-back" id="goBack" href="#/${component}"><span><img src="src/img/arrow-left.svg"/></span>Înapoi</a>
                    
                    <!-- Credentials -->
                    <div class="credentials"> 
                        <div class="credentials-col"> 
                            <dl class="credentials-col__info"> 
                                <dt>Account Manager:</dt>
                                <dd>Nicolae Suman</dd>
                            </dl>
                            <dl class="credentials-col__info"> 
                                <dt>Email:</dt>
                                <dd>nicolaesuman@gmail.com</dd>
                            </dl>
                            <dl class="credentials-col__info"> 
                                <dt>Telefon:</dt>
                                <dd>+971 50 2259 235</dd>
                            </dl>
                        </div>
                        
                        <div class="credentials-col"> 
                            <dl class="credentials-col__info"> 
                                <dt>RTA Trade License:</dt>
                                <dd>9982-2456-7811</dd>
                            </dl>
                            <dl class="credentials-col__info"> 
                                <dt>Membership ID:</dt>
                                <dd>0012559</dd>
                            </dl>
                            <dl class="credentials-col__info"> 
                                <dt>On boarder:</dt>
                                <dd>Nick Reynolds</dd>
                            </dl>
                        </div>
                    </div>
                
                    <!-- Table -->
                    <div class="product-container">
                    </div>
                </div>

                <!-- Buttons -->
                <div class="product-buttons"> 
                    <button class="product__btn  accept" id="acceptBtn">ACCEPTĂ</button>
                    <button class="product__btn  deny" id="rejectBtn">REFUZĂ</button>
                </div>
                
                <!-- Rejection modal -->
                <div class="rejection"> 
                    <div class="rejection__inner"> 
                        <h4 class="rejection__title">Reason of invoice rejection:</h4>
                        <textarea class="rejection__textarea"></textarea>
                        <div class="rejection-buttons"> 
                            <button class="product__btn accept" id="ok">OK</button>
                            <button class="product__btn deny" id="cancel">Renunță</button>
                        </div>
                    </div>
                </div>
                
            </div>
        `;
        main.innerHTML = `${html}`;

        const invoiceComponent = component === 'received-invoice' || component === 'sent-invoice';
        const orderComponent = component === 'received-order' || component === 'sent-order';

        /* Render table */
        try {
            renderProductTable(document.querySelector('.product-container'), history.state.dataLines, invoiceComponent, orderComponent);
        } catch(error) {
            history.pushState(null, null, window.location = '#/404');
        }

        /* Fix header table */
        document.querySelectorAll('.product-container').forEach(el => el.addEventListener('scroll', fixTableHeader));

        /* Render Invoice Rejection Modal */
        renderInvoiceRejectionModal(document.querySelector('#rejectBtn'), document.querySelector('.rejection'), document.querySelector('#cancel'));


    },
    goBack: () => {
        // Go Back Button functionality
        document.getElementById('goBack').addEventListener('click', function() {
            history.pushState({}, document.title, window.location = `#/${this.dataset.href}`);
        });
    },

}