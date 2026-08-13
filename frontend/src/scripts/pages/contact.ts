import {css, CSSResultGroup, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"
import {textStyles} from "../lib/common";

@customElement("content-contact")
export default class ContentContact extends LitElement {
    static styles = [
        textStyles,
        css`
            :host {
                > .text-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;

                    @media screen and (max-width: 1280px) {
                        width: 100%;
                    }
                }

                > .button-section {
                    display: flex;
                    gap: 2rem;

                    @media screen and (max-width: 1280px) {
                        gap: 2rem;
                    }

                    > a > svg {
                        fill: var(--altshift-text-color);
                        height: 2.6875rem;
                    }
                }
            }
        `
    ] as CSSResultGroup;

    render() {
        return html`
            <h1>Contact</h1>

            <section class="text-section">
                <div class="text-container">
                    <h2>Contact us</h2>
                    <p>If you find our services interesting, don't hesitate to contact us via the buttons below.</p>
                </div>
            </section>

            <section class="button-section">
                <a class="email-a" href="mailto:contact@altshift.se" aria-label="Email" target="_blank">
                    <svg viewBox="0 0 43 43">
                        <path d="M21.5 0C9.60918 0 0 9.60918 0 21.5C0 33.3908 9.60918 43 21.5 43C33.3908 43 43 33.3908 43 21.5C43 9.60918 33.3908 0 21.5 0ZM9.87245 12.5929H32.8428C33.0182 12.5929 32.8248 12.7559 32.6931 12.8437L21.6318 21.7954C21.544 21.8392 21.4564 21.8392 21.3686 21.7954L10.4228 12.5929C10.2909 12.505 9.69677 12.5929 9.87245 12.5929ZM33.3469 30.1878C33.3469 30.3194 33.2591 30.4072 33.1275 30.4072H9.87239C9.74078 30.4072 9.65294 30.3194 9.65294 30.1878L9.65324 14.0408C9.65324 13.8654 9.87269 13.7776 10.0043 13.8654L21.3686 23.2991C21.4564 23.3429 21.544 23.3429 21.6318 23.2991L32.9961 13.8654C33.1277 13.7776 33.3471 13.8654 33.3471 14.0408L33.3469 30.1878Z"/>
                    </svg>
                </a>

                <a href="https://www.linkedin.com/company/alt-shift-ab" aria-label="LinkedIn" target="_blank">
                    <svg viewBox="0 0 42 42">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 0C32.5902 0 42 9.40981 42 21C42 32.5902 32.5902 42 21 42C9.40981 42 0 32.5902 0 21C0 9.40981 9.40981 0 21 0ZM14.4345 32.8019V16.4021H8.98234V32.8019H14.4345ZM34.0908 32.8019V23.3974C34.0908 18.3599 31.4012 16.0165 27.8147 16.0165C24.9227 16.0165 23.6272 17.607 22.9019 18.7241V16.4021H17.4512C17.5234 17.9408 17.4512 32.8019 17.4512 32.8019H22.9018V23.6431C22.9018 23.1529 22.9371 22.6629 23.0815 22.3125C23.4749 21.3335 24.3725 20.3192 25.8784 20.3192C27.8499 20.3192 28.6398 21.8237 28.6398 24.0274V32.8019H34.0908ZM11.7452 8.49434C9.87984 8.49434 8.66111 9.7207 8.66111 11.3281C8.66111 12.9016 9.84277 14.1618 11.673 14.1618H11.7082C13.6093 14.1618 14.7926 12.9016 14.7926 11.3281C14.7573 9.7207 13.6094 8.49434 11.7452 8.49434Z"/>
                    </svg>
                </a>
            </section>
        `;
    }
}
