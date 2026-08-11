import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"
import {privacyPolicy} from "@altshiftab/web_components/privacy_policy";

@customElement("content-privacy-policy")
export default class ContentPrivacyPolicy extends LitElement {
    // The site forces page-content hosts to `display: contents`, so the layout
    // lives on an inner wrapper rather than on :host.
    static styles = css`
        .policy {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            max-width: 45rem;

            h1 {
                margin: 0;
            }

            h2 {
                margin: 1rem 0 0;
            }

            p {
                margin: 0;
                line-height: 1.6;
            }

            a {
                color: var(--altshift-text-color);
            }
        }
    `;

    render() {
        return html`<div class="policy">${privacyPolicy()}</div>`;
    }
}
