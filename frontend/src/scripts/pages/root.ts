import {css, CSSResultGroup, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"

import "@altshiftab/web_components/box";
import "@altshiftab/web_components/button";

import {textStyles} from "../lib/common";
import config from "../../../../config.json";

@customElement("services-table")
class ServicesTable extends LitElement {
    static styles = css`
        :host {
            --new-offset-top: 1rem;

            --title-container-padding: 2rem;
            --title-container-font-size: 1.875rem;
            --title-container-line-height: 1.3;
            --new-filler-top-height: calc(50% - 0.5 * var(--new-offset-top));
        }

        altshift-box {
            --offset-top: var(--new-offset-top);
            --offset-left: 1.25rem;
            --inner-border: unset;
            --filler-top-height: var(--new-filler-top-height);

            @media screen and (max-width: 1280px) {
                --filler-top-height: 100%;
            }

            &::part(box-container) {
                border-left: unset;
                border-right: unset;
                border-bottom: unset;
            }

            > .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 1fr;
                width: 100%;

                @media screen and (max-width: 1280px) {
                    //--new-filler-top-height: calc(100% - var(--new-offset-top));
                    grid-template-columns: 1fr;
                }

                > .title-container {
                    grid-row: 1 / 3;
                    grid-column: 1;
                    padding: var(--title-container-padding);

                    border-left: var(--border-width) solid var(--border-color);
                    border-bottom: var(--border-width) solid var(--border-color);

                    font-weight: 900;
                    font-size: var(--title-container-font-size);
                    line-height: var(--title-container-line-height);

                    @media screen and (max-width: 1280px) {
                        & {
                            border-right: var(--border-width) solid var(--border-color);
                        }
                    }
                }

                > .texts-container {
                    display: contents;
                }
            }
        }

        ::slotted([slot="text"]) {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 2rem;
            box-sizing: border-box;
            border-bottom: var(--border-width) solid var(--border-color);
            border-left: var(--border-width) solid var(--border-color);
            border-right: var(--border-width) solid var(--border-color);

            grid-column: 2;

            font-weight: 700;
            font-size: 1.125rem;
            line-height: 1.4375rem;
            text-transform: uppercase;

            @media not screen and (max-width: 1280px) {
                &:first-of-type {
                    border-top: var(--border-width) solid var(--border-color);
                }
            }

            @media screen and (max-width: 1280px) {
                grid-column: 1;
            }
        }
    ` as CSSResultGroup;

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="title-container"><slot name="title"></slot></div>
                    <div class="texts-container"><slot name="text"></slot></div>
                </div>
            </altshift-box>
        `;
    }
}

@customElement("customer-quote")
class CustomerQuote extends LitElement {
    static styles = css`
        :host {
            --offset-top: 1rem;
            --offset-left: 1.25rem;
            --icon-container-height: 5rem;
        }

        altshift-box {
            --offset-top: 1rem;
            --offset-left: 1.25rem;
            --inner-border: unset;
            --filler-top-height: var(--icon-container-height);
            --filler-bottom-height: calc(var(--offset-top) + var(--border-width));

            &::part(box-container) {
                border-left: unset;
                border-bottom: unset;
            }

            > .container {
                display: grid;
                grid-template-rows: 1fr 1fr;
                width: 100%;

                > .icon-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: var(--icon-container-height);
                    aspect-ratio: 1 / 1;
                    grid-column: 1;

                    border-left: var(--border-width) solid var(--border-color);
                    border-bottom: var(--border-width) solid var(--border-color);

                    > .icon {
                        width: 50%;
                        path {
                            fill: var(--altshift-orange);
                        }
                    }
                }

                > .text-container {
                    grid-column: 2;
                    grid-row: 1 / 4;
                    padding: 2rem;

                    border-left: var(--border-width) solid var(--border-color);
                    border-bottom: var(--border-width) solid var(--border-color);
                }
            }
        }

        .quote-scroll-hider {
            width: 100%;

            @media screen and (max-width: 1280px) {
                & {
                    max-height: 24rem;
                    overflow-y: auto;
                }
            }
        }
    ` as CSSResultGroup;

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="icon-container">
                        <div class="icon">
                            <svg viewBox="0 0 45 36">
                                <path d="M44.5376 0.123969V11.9546C44.5376 16.3132 43.7419 20.2914 42.1507 23.889C40.5594 27.4866 37.8612 31.2226 34.056 35.097L26.9992 29.5968C29.6974 26.8985 31.6346 24.3733 32.8107 22.021C33.9869 19.7379 34.5749 17.2127 34.5749 14.4453L38.6223 19.0115H25.3387V0.123969H44.5376ZM19.9423 0.123969V11.9546C19.9423 16.3132 19.1467 20.2914 17.5554 23.889C15.9642 27.4866 13.266 31.2226 9.4608 35.097L2.40393 29.5968C5.10215 26.8985 7.03932 24.3733 8.21547 22.021C9.39161 19.7379 9.97969 17.2127 9.97969 14.4453L14.027 19.0115H0.743493V0.123969H19.9423Z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="text-container">
                        <slot></slot>
                    </div>
                </div>
            </altshift-box>
        `;
    }
}

@customElement("customer-icon-container")
class CustomerIconContainer extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        }
        
        ::slotted(svg) {
            fill: var(--text-color);
            height: 4rem;

            @media screen and (max-width: 1280px) {
                height: 3rem;
            }
        }
    `;

    render() {
        return html`<slot></slot>`;
    }
}

@customElement("customers-table")
class CustomersTable extends LitElement {
    static styles = css`
        @media screen and (max-width: 1280px) {
            ::slotted(*) {
                padding: 2rem;
                border-bottom: var(--border-width) solid var(--border-color);
            }
            ::slotted(*:last-of-type) {
                border-bottom: unset;
            }
        }

        @media not screen and (max-width: 1280px) {
            ::slotted(*) {
                border-bottom: var(--border-width) solid var(--border-color);
            }

            ::slotted(*:not(:nth-of-type(2n + 1))) {
                border-left: var(--border-width) solid var(--border-color);
            }

            ::slotted(*:nth-last-of-type(-n+2)) {
                border-bottom: unset;
            }
        }

        altshift-box {
            --offset-top: 1rem;
            --offset-left: 1.25rem;

            > .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 1fr;

                @media screen and (max-width: 1280px) {
                    grid-template-columns: 1fr;
                }
            }
        }
    ` as CSSResultGroup;

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <slot name="icon"></slot>
                </div>
            </altshift-box>
        `;
    }
}

@customElement("contact-us")
class ContactUs extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            cursor: pointer;
        }

        :host(:hover) > a, a:focus-visible {
            font-weight: 900;
        }

        :focus-visible {
            outline: none;
        }

        a {
            display: block;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 1.125rem;
            letter-spacing: 0.1rem;
            text-decoration: none;
        }

        .icon {
            margin-left: 0.5rem;
            height: 1rem;
        }
    ` as CSSResultGroup;

    render() {
        return html`
            <a part="text" href="${config.routes.contact}">Contact us</a>
            <svg class="icon" viewBox="0 0 32 23">
                <path part="icon-path" d="M31.0404 12.373C31.615 11.7985 31.615 10.8669 31.0404 10.2924L21.6773 0.929254C21.1028 0.354687 20.1712 0.354687 19.5966 0.929254C19.0221 1.50382 19.0221 2.43538 19.5966 3.00994L27.9194 11.3327L19.5966 19.6555C19.0221 20.23 19.0221 21.1616 19.5966 21.7362C20.1712 22.3107 21.1028 22.3107 21.6773 21.7362L31.0404 12.373ZM0.314453 12.804H30.0001V9.86143H0.314453V12.804Z"/>
            </svg>
        `;
    }
}

@customElement("content-root")
export default class ContentRoot extends LitElement {
    static styles = [
        textStyles,
        css`
            :host {
                width: 100%;

                > article {
                    @media screen and (max-width: 1280px) {
                        min-height: unset;
                    }

                    &#introduction {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 5rem;

                        > .info-section {
                            > .info-section-text-container {
                                width: 50%;

                                @media screen and (max-width: 1280px) {
                                    width: unset;
                                }

                                > .info-button-container {
                                    padding-top: 2rem;
                                    display: flex;
                                    gap: 4rem;

                                    @media screen and (max-width: 1280px) {
                                        padding-top: 4rem;
                                        gap: unset;
                                        justify-content: space-around;
                                    }

                                    > altshift-button {
                                        width: fit-content;
                                    }
                                }
                            }
                        }
                    }

                    &#our-services {
                        > .tables-section {
                            display: flex;
                            flex-direction: column;

                            > .services-table-container {
                                display: flex;
                                flex-direction: column;
                                flex: 1;
                                gap: 2rem;

                                > .service-table-container {
                                    display: flex;
                                    flex-direction: column;
                                    gap: 1rem;
                                    
                                    > contact-us {
                                        &::part(text) {
                                            color: var(--contact-us-color);
                                        }

                                        &::part(icon-path) {
                                            fill: var(--contact-us-color);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    &#our-customers {
                        display: flex;
                        flex-direction: column;
                        gap: 4rem;

                        .quote-container {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 4rem;

                            @media screen and (max-width: 1280px) {
                                grid-template-columns: 1fr;
                                gap: 2rem;
                            }

                            > customer-quote {
                                > figure {
                                    display: flex;
                                    flex-direction: column;
                                    gap: 1rem;
                                    margin: 0;

                                    @media screen and (max-width: 1280px) {
                                        max-height: 12rem;
                                        overflow-y: auto;
                                    }

                                    > blockquote {
                                        margin: 0;
                                        font-weight: 400;
                                        font-size: 1.125rem;
                                        line-height: 2.125rem;

                                        @media screen and (max-width: 1280px) {
                                            font-size: 1rem;
                                            line-height: calc((1/1.125) * 2.125rem);
                                        }
                                    }
                                    > figcaption {
                                        font-weight: 700;
                                        font-size: 1.125rem;
                                        line-height: 2.125rem;

                                        @media screen and (max-width: 1280px) {
                                            font-size: 1rem;
                                            line-height: unset;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    ] as CSSResultGroup;

    render() {
        return html`
            <article id="introduction">
                <section class="info-section">
                    <div class="info-section-text-container">
                        <h2>Level up your digital security</h2>

                        <p>Alt-Shift offers consulting services that help you level up your digital security.</p>
                        <p>From experience with a variety of customers, we know what solutions work and how they can be used to effectively detect threats and prevent them from having an impact on your business.</p>

                        <div class="info-button-container">
                            <altshift-button animated selectable textBox><a href="${config.routes.services}">Show services</a></altshift-button>
                            <altshift-button animated selectable textBox><a href="${config.routes.contact}">Contact us</a></altshift-button>
                        </div>
                    </div>
                </section>
            </article>

            <article id="our-services">
                <section class="tables-section">
                    <h2>Our services</h2>

                    <div class="services-table-container">
                        <div class="service-table-container">
                            <services-table>
                                <div slot="title">Security Engineering</div>
                                <div slot="text">Posture management</div>
                                <div slot="text">Threat detection</div>
                                <div slot="text">Penetration testing</div>
                                <div slot="text">Processes</div>
                            </services-table>
                            <contact-us></contact-us>
                        </div>

                        <div class="service-table-container">
                            <services-table>
                                <div slot="title">Investigations</div>
                                <div slot="text">Security alerts</div>
                                <div slot="text">Incident response</div>
                                <div slot="text">Unauthorized activity</div>
                                <div slot="text">Leaks</div>
                            </services-table>
                            <contact-us></contact-us>
                        </div>

                        <div class="service-table-container">
                            <services-table>
                                <div slot="title">Software development</div>
                                <div slot="text">Tools</div>
                                <div slot="text">Integrations</div>
                                <div slot="text">Front-end and back-end</div>
                                <div slot="text">Automation</div>
                            </services-table>
                            <contact-us></contact-us>
                        </div>
                    </div>
                </section>
            </article>

            <article id="our-customers">
                <section>
                    <h2>Some of our customers</h2>
                    <customers-table>
                        <customer-icon-container slot="icon">
                            <svg viewBox="0 0 265 52">
                                <path d="M109.173 26.2501C109.877 29.5084 105.254 32.2824 99.0015 33.2071C99.0015 31.754 99.5298 27.8352 103.228 25.9419C105.826 24.6649 108.865 24.709 109.173 26.2501ZM116.526 37.9625C115.733 37.9625 111.154 43.0261 105.298 43.4664C101.159 43.7746 98.9574 40.8245 98.9574 38.8871C111.683 37.0818 116.922 32.1063 116.922 25.7657C116.922 21.4947 113.268 17.0475 107.235 17.0475C94.0259 17.0475 90.5474 29.7726 90.1071 38.5789C89.7989 42.4537 87.5533 43.0261 85.836 42.938C84.0748 42.85 82.7979 41.3089 83.1061 38.5349L85.7039 21.0544C85.748 20.7461 86.4084 17.2236 83.8987 17.1355C81.2568 17.0035 77.7783 18.2363 77.1618 22.0231C76.5894 25.7217 76.3252 27.8352 75.8409 30.8294C75.4886 33.3392 75.0043 35.893 74.7841 38.3147C74.2998 40.6044 73.5072 41.7492 71.0855 41.7492C68.0033 41.441 68.0913 38.755 68.3996 36.4654L70.5571 21.0984C70.6011 20.7902 71.2616 17.2236 68.7518 17.1355C66.1099 17.0035 62.6314 18.2804 62.015 22.0671C61.8829 22.9918 61.7508 23.8283 61.6187 24.6209V24.5769C61.0022 28.98 58.9328 30.9174 56.5551 30.4331C54.1774 29.9047 55.3662 23.388 55.4102 23.3C56.2028 17.8401 54.2654 15.9027 49.51 17.9281C47.0002 18.9849 44.4024 21.7589 42.6851 23.8284L43.0814 21.0544C43.1254 20.7461 43.7859 17.2236 41.2761 17.1355C38.6342 17.0035 35.1557 18.2363 34.5393 22.0231C34.5393 22.1551 34.4953 22.2872 34.4953 22.4193C34.4953 22.4193 34.187 24.0485 33.7908 25.4575C33.6146 26.0299 33.4385 26.6023 33.3064 26.9986C32.778 28.5397 32.2056 30.0368 31.5892 31.4898C30.9287 32.9429 30.2682 34.3519 29.4757 35.7169C29.0794 36.3773 28.6831 37.0378 28.2428 37.6543C27.8025 38.2707 27.3622 38.8871 26.8778 39.4155C25.9531 40.5163 24.8964 41.441 23.8396 42.1014C23.6635 42.2335 23.4874 42.3216 23.3112 42.4097C18.2036 44.6112 17.2789 39.6797 17.1468 38.9752C17.1028 38.6229 17.0588 38.2267 17.0588 37.8304C17.0147 37.2139 17.0147 36.5535 17.0588 35.849C17.0588 35.1885 17.1028 34.484 17.1909 33.7795C17.323 32.3705 17.5431 30.9174 17.8513 29.4644C18.1155 28.1434 18.4237 26.8665 18.776 25.5456C21.7701 25.8978 24.5882 26.162 25.6009 26.2061C28.0226 26.3822 29.3876 25.1493 29.6078 23.7843C29.7839 22.7276 29.6518 23.3 30.0921 20.7902C30.7526 17.0915 29.96 17.0915 26.9218 17.0915C26.9218 17.0915 24.7643 17.0915 21.6821 17.0915C21.7701 16.9154 21.8142 16.7393 21.9022 16.5191C23.0471 13.7451 24.5001 11.2353 25.9972 8.46133C27.8905 4.89478 27.4062 4.05818 25.0725 2.07676C17.8513 -3.25106 14.1967 6.25976 13.3601 7.75684C12.6996 9.25391 12.0832 10.751 11.4227 12.5122C10.8503 14.0093 10.3219 15.5504 9.88163 17.0915H2.26417C-0.025466 17.0915 0.194692 19.205 0.194692 19.205C0.194692 21.1865 4.90607 22.9477 8.07634 23.8724C7.81215 25.1493 7.59199 26.4702 7.41586 27.7472C7.15167 29.5084 7.01958 31.3137 6.93152 33.163C6.88749 35.0124 6.93152 36.9057 7.19571 38.8871C7.3278 39.8558 7.54796 40.8685 7.85618 41.9253C8.03231 42.4537 8.20843 42.9821 8.38456 43.5104C8.60472 44.0388 8.86891 44.5672 9.13309 45.0956C9.7055 46.1523 10.4981 47.2091 11.5108 48.1338C12.5235 49.0584 13.7564 49.8069 15.0333 50.2913C15.6938 50.5115 16.3102 50.6876 16.9707 50.7756C17.5872 50.8637 18.3797 50.9077 18.9521 50.9077C20.0969 50.9077 21.2858 50.7316 22.3866 50.4234C23.4874 50.1152 24.5441 49.5868 25.4688 49.0144C26.3935 48.3979 27.2301 47.7375 27.9346 46.9889C29.3436 45.5359 30.3563 43.9067 31.1929 42.2776C31.369 41.9253 31.5451 41.529 31.7213 41.1768C31.4131 44.5232 31.5892 47.5173 32.8221 49.0584C35.2438 52.0085 38.5902 51.0398 38.9424 48.7062C39.2507 46.6367 39.8671 42.5418 40.3515 39.4595C40.9239 36.2893 41.5403 34.3959 42.6851 31.798C44.0501 28.7599 47.8808 26.2061 47.7928 29.7726C47.5726 40.2081 55.4102 40.3842 59.9455 35.7609C59.285 40.3402 59.1089 44.6112 61.5306 47.5614C66.286 53.2854 73.3751 50.4674 77.0738 47.9576C80.3761 52.4488 88.9623 51.4802 92.705 46.9449C95.3909 50.6436 100.41 51.0398 104.109 50.9077C114.721 50.3353 121.325 37.9625 116.526 37.9625Z"/>
                                <path d="M138.233 17.134C142.196 17.134 145.499 18.6311 147.656 20.8327L143.297 26.7769C141.756 25.456 140.303 24.8836 138.806 24.8836C134.183 24.8836 131.276 28.4501 131.276 34.0862C131.276 39.6782 134.315 43.2888 138.498 43.2888C140.831 43.2888 142.725 42.188 144.266 40.9551L148.097 47.0314C144.97 49.7614 140.875 51.0824 137.397 51.0824C128.414 51.0824 121.501 44.8739 121.501 34.1302C121.501 23.3425 129.339 17.134 138.233 17.134Z"/>
                                <path d="M162.601 43.5781C164.802 43.5781 166.255 42.5213 167.928 40.8481V35.168C161.103 36.0927 158.902 38.0301 158.902 40.4959C158.902 42.6094 160.355 43.5781 162.601 43.5781ZM167.928 29.4439C167.752 26.5819 166.299 24.7326 162.865 24.7326C160.135 24.7326 157.405 25.8334 154.279 27.6827L150.888 21.3421C154.983 18.8764 159.606 17.1151 164.67 17.1151C172.904 17.1151 177.439 21.8265 177.439 31.6896V50.1828H169.646L168.941 46.8804H168.765C166.035 49.3022 162.997 50.9754 159.342 50.9754C153.486 50.9754 149.787 46.6603 149.787 41.2004C149.831 34.4635 155.203 30.7649 167.928 29.4439Z"/>
                                <path d="M182.001 50.2463H191.556V4.58557H182.001M196.355 50.2463H205.91V4.58557H196.355M230.612 30.7403C230.612 27.0417 229.071 24.4438 225.24 24.4438C222.246 24.4438 219.648 26.4692 218.987 30.7403H230.612ZM225.064 17.1346C234.222 17.1346 238.758 23.8274 238.758 32.6337C238.758 34.3069 238.581 35.892 238.361 36.6846H219.076C219.912 41.5721 223.17 43.7296 227.442 43.7296C229.863 43.7296 232.065 43.0251 234.398 41.5721L237.569 47.3842C234.266 49.6739 229.951 51.0388 226.121 51.0388C216.918 51.0388 209.829 44.7864 209.829 34.0867C209.873 23.6072 217.314 17.1346 225.064 17.1346ZM242.676 17.9271H250.47L251.13 23.6072H251.395C253.728 19.2481 257.251 17.1786 260.553 17.1786C262.359 17.1786 263.459 17.4428 264.384 17.8391L262.843 26.117C261.654 25.8088 260.685 25.5886 259.32 25.5886C256.899 25.5886 253.949 27.1738 252.231 31.5329V50.2903H242.676C242.676 50.2463 242.676 17.9271 242.676 17.9271Z"/>
                            </svg>
                        </customer-icon-container>
                        <customer-icon-container slot="icon">
                            <svg viewBox="0 0 1128 450">
                                <g clip-path="url(#clip0_830_18246)">
                                    <path d="M0 44.3145C2.79955 44.3145 5.47313 44.2305 8.20269 44.2305H89.6697V441.067H0V44.3145Z"/>
                                    <path d="M235.13 440.93H147.882V136.143H235.032V188.621C235.493 188.185 235.924 187.717 236.32 187.221C253.859 157.91 279.867 141.126 313.307 135.121C327.568 132.491 342.128 131.874 356.56 133.287C405.413 138.229 437.747 170.242 448.4 212.529C451.312 224.685 452.722 237.152 452.599 249.651C452.599 312.473 452.599 375.285 452.599 438.089V440.888H365.183V437.865C365.183 383.162 365.183 328.468 365.183 273.783C365.183 259.519 362.09 246.039 353.355 234.351C344.186 222.089 331.742 215.482 316.737 213.271C303.757 211.183 290.454 212.633 278.229 217.47C258.632 225.351 246.678 240.356 239.861 259.869C236.6 269.692 235.019 279.994 235.186 290.342C235.186 339.409 235.186 388.471 235.186 437.529L235.13 440.93Z"/>
                                    <path d="M684.678 360.018C687.03 368.234 689.325 376.143 691.565 384.066C695.134 396.664 698.564 409.262 702.273 421.86C702.422 422.165 702.504 422.499 702.513 422.839C702.521 423.179 702.457 423.517 702.325 423.83C702.192 424.143 701.994 424.424 701.744 424.654C701.493 424.884 701.197 425.058 700.873 425.163C685.426 433.847 668.565 439.733 651.069 442.548C640.716 444.4 630.201 445.202 619.686 444.942C595.694 444.2 573.704 437.831 555.297 421.622C542.153 410.046 534.3 395.446 530.409 378.551C528.363 369.361 527.368 359.969 527.441 350.555C527.441 304.727 527.441 258.898 527.441 213.069V209.598H485.168V149.687H527.301V65.7988H614.227V149.449H696.926V210.27H614.339V213.223C614.339 254.405 614.255 295.586 614.437 336.781C614.479 342.225 615.222 347.64 616.649 352.893C619.882 364.889 628.715 371.272 641.159 371.342C655.703 371.426 669.155 367.143 682.2 361.151L684.678 360.018Z"/>
                                    <path d="M913.148 20.4062H999.935V440.913H913.148V20.4062Z"/>
                                    <path d="M752.974 136.111H840.04V440.969H752.974V136.111Z"/>
                                    <path d="M843.537 46.8084C843.537 66.2653 837.518 80.403 823.114 90.2015C813.316 96.8504 802.314 98.6841 790.668 97.5923C774.36 96.0525 762.49 87.7939 754.651 73.6701C749.206 63.8717 748.045 53.2194 749.248 42.1752C750.156 31.625 754.669 21.7091 762.028 14.0957C771.113 4.74516 782.325 0.48984 795.245 0.405853C814.114 0.279874 828.728 7.79664 837.98 24.566C841.704 31.383 843.617 39.0411 843.537 46.8084Z"/>
                                    <path d="M1082.81 449.096C1059.01 449.712 1038.43 429.499 1038.82 404.471C1039.05 392.847 1043.84 381.777 1052.15 373.645C1060.46 365.513 1071.63 360.97 1083.25 360.994C1089.12 360.996 1094.93 362.174 1100.33 364.459C1105.74 366.745 1110.63 370.091 1114.71 374.3C1118.8 378.509 1122 383.496 1124.13 388.964C1126.26 394.433 1127.27 400.272 1127.09 406.137C1126.53 429.975 1106.43 449.698 1082.81 449.096ZM1083.17 365.474C1077.97 365.405 1072.8 366.372 1067.98 368.32C1063.15 370.268 1058.77 373.156 1055.07 376.817C1051.37 380.479 1048.44 384.839 1046.45 389.645C1044.46 394.45 1043.44 399.605 1043.46 404.807C1043.35 427.316 1060.62 444.925 1082.65 444.939C1087.9 444.978 1093.09 443.974 1097.95 441.985C1102.8 439.996 1107.21 437.061 1110.91 433.353C1114.62 429.644 1117.55 425.235 1119.54 420.383C1121.53 415.53 1122.53 410.331 1122.49 405.087C1122.49 382.747 1105.34 365.474 1083.14 365.474H1083.17Z"/>
                                    <path d="M1065.31 381.12C1073.8 381.12 1082.1 380.462 1090.31 381.302C1098.51 382.142 1103.11 387.111 1103.56 394.306C1103.94 400.409 1101.83 406.316 1092.97 409.592L1105.23 426.865C1101.59 426.865 1098.42 426.935 1095.26 426.865C1094.71 426.865 1094.11 426.011 1093.71 425.465C1090.73 421.266 1087.74 417.066 1084.87 412.867C1084.54 412.258 1084.03 411.762 1083.41 411.441C1082.79 411.12 1082.1 410.988 1081.4 411.061C1079.02 411.173 1076.63 411.061 1073.96 411.061V426.767H1065.31V381.12ZM1074 403.209C1078.53 403.209 1082.83 403.335 1087.11 403.209C1088.95 403.244 1090.74 402.59 1092.12 401.376C1093.51 400.161 1094.39 398.473 1094.59 396.644C1094.72 395.776 1094.67 394.892 1094.45 394.044C1094.23 393.195 1093.85 392.398 1093.32 391.7C1092.79 391.003 1092.12 390.418 1091.36 389.981C1090.6 389.544 1089.76 389.263 1088.89 389.155C1084.02 388.679 1079.09 389.029 1074 389.029V403.209Z"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_830_18246">
                                        <rect width="1128" height="450"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </customer-icon-container>
                    </customers-table>
                </section>
                <section>
                    <div class="quote-container">
                        <customer-quote>
                            <figure>
                                <blockquote>
                                    Viktor [the founder of Alt-Shift] is an expert consultant in the fields of proactive cybersecurity, security investigations, and building detection and monitoring capabilities. Viktor has an impressive command of the subject matter and has provided unparalleled insight into emerging threats and trends in the industry. He has proven to be a valuable sparring partner during vendor assessments and strategy development. Viktor is an innovative thinker and an excellent problem solver. I highly recommend Viktor for any consulting job involving cybersecurity, and software development.
                                </blockquote>
                                <figcaption>
                                    Baris Färnman, VP Information Security at Truecaller
                                </figcaption>
                            </figure>
                        </customer-quote>
                        <customer-quote>
                            <figure>
                                <blockquote>
                                    Viktor [the founder of Alt-Shift] is an appreciated colleague and team player. His deep knowledge of both programming and security in combination with his curiosity and solution-oriented attitude provides a highly valued contribution in our work.
                                </blockquote>
                                <figcaption>
                                    Johan Wiktorin & Mina Nadjafi, Founders of Intil
                                </figcaption>
                            </figure>
                        </customer-quote>
                    </div>
                </section>
            </article>
        `;
    }
}
