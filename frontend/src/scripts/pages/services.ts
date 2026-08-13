import {css, html, CSSResultGroup, LitElement} from "lit";
import {customElement, property, query, state} from "lit/decorators.js";

import "@altshiftab/web_components/box";

import {textStyles} from "../lib/common";

export const rowSelectedEventType = "row-selected";

@customElement("services-details-table-row")
class ServiceDetailsTableRow extends LitElement {
    @property({type: Boolean, reflect: true})
    private selected: boolean = false;

    @query('slot[name="content"]')
    contentSlot!: HTMLSlotElement;

    static styles = css`
        :host {
            --border-width: var(--altshift-border-width);
            --border-color: var(--altshift-border-color);
            --text-color: var(--altshift-text-color);

            > .button-container {
                all: unset;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                user-select: none;
                padding: 2rem;
                width: 100%;
                box-sizing: border-box;
                border-right: var(--border-width) solid var(--border-color);
                gap: 1rem;

                @media screen and (max-width: 1280px) {
                    border-right: unset;
                }

                &:not(:last-of-type) {
                    border-bottom: var(--border-width) solid var(--border-color);
                }

                &:focus-visible > .title-container {
                    font-weight: 900;
                }

                > .title-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-size: 1.125rem;
                    font-weight: 700;
                    line-height: 1.4375rem;
                    letter-spacing: 0.1rem;
                    text-transform: uppercase;
                    user-select: none;
                }

                > .icon-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    > svg {
                        height: 2rem;

                        > path {
                            fill: var(--text-color);
                        }
                    }
                }
            }

            > .content-container {
                max-height: 15rem;
                display: none;
                overflow-y: auto;
            }
        }

        :host(:hover) > .button-container > .title-container {
            font-weight: 900;
        }

        :host([selected]) > .button-container {
            background-color: var(--altshift-opposite-main-color);
            color: var(--altshift-opposite-text-color);

            @media screen and (max-width: 1280px) {
                border-bottom: var(--border-width) solid var(--border-color);
            }

            > .icon-container > svg {
                @media screen and (max-width: 1280px) {
                    transform: rotate(90deg);
                }

                > path {
                    fill: var(--altshift-opposite-text-color);
                }
            }

            & + .content-container {
                @media screen and (max-width: 1280px) {
                    display: block;
                }
            }
        }

        :host(:not(:last-of-type)) > :is(.button-container, .content-container) {
            border-bottom: var(--border-width) solid var(--border-color);
        }

        *, *::before, *::after {
            box-sizing: border-box;
            scrollbar-color: var(--altshift-text-color) var(--altshift-main-color);
            scrollbar-width: thin;
        }

        ::slotted([slot="content"]) {
            margin: 2rem 0;
            padding: 0 2rem;
        }
    ` as CSSResultGroup;

    getSlottedContentElements() {
        return this.contentSlot?.assignedElements() ?? [];
    }

    private _handleClick = () => {
        this.selected = !this.selected;
        this.dispatchEvent(
            new CustomEvent(rowSelectedEventType, {detail: {selected: this.selected}, bubbles: true, composed: true})
        );
    }

    render() {
        return html`
            <button class="button-container" part="button-container" @click=${this._handleClick}>
                <div class="title-container">
                    <slot name="title"></slot>
                </div>
                <div class="icon-container">
                    <svg viewBox="0 0 21 44">
                        <path part="icon-path" d="M2.80937 0.996124L0.449548 3.0077L16.4071 21.9573L16.4434 22.0005L16.4067 22.0432L0.114701 40.989L2.80638 42.9665L18.8091 23.8484L18.8092 23.8483L20.3688 21.9795L18.8092 20.1107L18.8091 20.1107L2.80937 0.996124Z"
                              fill="#F8F8F8" stroke="#F8F8F8" stroke-width="0.132513"/>
                    </svg>
                </div>
            </button>
            <div class="content-container">
                <slot name="content"></slot>
            </div>
        `;
    }
}

@customElement('services-details-table')
class ServicesDetailsTable extends LitElement {
    @query("slot")
    slotElement!: HTMLSlotElement;

    @state()
    private displayedContent: Element[] = [];

    private _currentSelected: ServiceDetailsTableRow | null = null;

    static styles = css`
        :host {
            --border-width: var(--altshift-border-width);
            --border-color: var(--altshift-border-color);

            > altshift-box {
                --offset-top: 1rem;
                --offset-left: 1rem;

                > .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;

                    @media screen and (max-width: 1280px) {
                        display: unset;
                    }

                    > .content-container {
                        margin: 2rem 0;
                        padding: 0 2rem;

                        @media screen and (max-width: 1280px) {
                            display: none;
                        }

                        p {
                            font-size: 1.125rem;
                            font-weight: 400;
                            line-height: 2.125rem;
                            height: 100%;
                        }
                    }
                }
            }
        }

        @media screen and (max-width: 1280px) {
            display: unset;
        }
    ` as CSSResultGroup;

    private _handleRowSelected = (event: CustomEvent) => {
        const {selected} = event.detail;

        if (selected) {
            const row = event.target as ServiceDetailsTableRow;

            if (row !== this._currentSelected && this._currentSelected !== null)
                this._currentSelected?.removeAttribute("selected");

            this._currentSelected = row;
            this.displayedContent = row.getSlottedContentElements();

        } else {
            this._currentSelected = null;
            this.displayedContent = [];
        }
    }

    private _handleRowHover = (event: Event) => {
        const row = event.currentTarget as ServiceDetailsTableRow;
        if (row === null)
            return;

        if (this._currentSelected !== null)
            return;

        this.displayedContent = row.getSlottedContentElements();
    }

    private _handleRowUnhover = (event: Event) => {
        const row = event.currentTarget as ServiceDetailsTableRow;
        if (row === null)
            return;

        if (this._currentSelected !== null)
            return;

        this.displayedContent = [];
    }

    private _handleSlotChange= (event: Event) => {
        const slot = event.target as HTMLSlotElement | null;
        if (slot === null)
            return;

        const elements = slot.assignedElements();

        elements.forEach(element => {
            if (element instanceof ServiceDetailsTableRow) {
                element.addEventListener(rowSelectedEventType, this._handleRowSelected);
                element.addEventListener("mouseover", this._handleRowHover);
                element.addEventListener("mouseout", this._handleRowUnhover);
            }
        });
    }

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="rows-container">
                        <slot name="row" @slotchange=${this._handleSlotChange}></slot>
                    </div>
                    <div class="content-container">
                        ${this.displayedContent.map(element => html`${element.cloneNode(true)}`)}
                    </div>
                </div>
            </altshift-box>
        `;
    }
}

declare global {
    interface HTMLElementEventMap {
        [rowSelectedEventType]: CustomEvent;
    }
}

@customElement("content-services")
export default class ContentServices extends LitElement {
    static styles = [
        textStyles,
        css`
            :host {
                > section > altshift-box {
                    --offset-top: 1rem;
                    --offset-left: 1.25rem;
                }

                > .summary-table-section > altshift-box > .summary-table {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    width: 100%;

                    @media screen and (max-width: 1280px) {
                        grid-template-columns: 1fr;
                        border-left: none;
                    }

                    > article {
                        padding: 4rem;

                        @media not screen and (max-width: 1280px) {
                            &:nth-of-type(n + 2) {
                                border-left: var(--border-width) solid var(--border-color);
                            }
                        }

                        @media screen and (max-width: 1280px) {
                            border-left: unset;
                            border-bottom: var(--border-width) solid var(--border-color);
                            padding: 2rem;

                            &:last-of-type {
                                border-bottom: unset;
                            }
                        }

                        > .title {
                            margin: 0;
                            font-size: 1.875rem;
                            font-weight: 900;
                            line-height: 2.375rem;
                        }

                        > details > summary {
                            cursor: pointer;
                            font-weight: 700;
                            user-select: none;
                        }
                    }
                }

                > .details-table-section > services-details-table {
                    > services-details-table-row {
                        > [slot="content"] > p {
                            height: 100%;
                        }
                        
                        &[selected] {
                            &::part(button-container) {
                                color: var(--service-details-table-row-selected-color);
                                background-color: var(--service-details-table-row-selected-background-color);
                            }

                            &::part(icon-path) {
                                fill: var(--service-details-table-row-selected-color);
                            }
                        }
                    }
                }
            }
        `
    ] as CSSResultGroup;

    render() {
        return html`
            <h1>Services</h1>

            <section class="summary-table-section">
                <altshift-box>
                    <div class="summary-table">
                        <article>
                            <div class="title">Security Engineering</div>
                            <p>Security that helps prevent attacks from succeeding: establishing visibility, setting up detections, performing security tests of existing setups and applications, defining processes e.g.</p>
                            <details>
                                <summary>Examples</summary>
                                <p>Setting up SIEM, writing detections covering the MITRE ATT&CK matrix, performing penetration tests of company IT environments and web applications.</p>
                            </details>
                        </article>
                        <article>
                            <div class="title">Investigations</div>
                            <p>Digital investigations of security alerts and suspected unauthorized or illegal activity.</p>
                            <details>
                                <summary>Examples</summary>
                                <p>Taking on the role of SOC analyst, performing incident response procedures, performing digital forensic investigations of company workstations, analysing log data to find unauthorized activity, data leaks, e.g.</p>
                            </details>
                        </article>
                        <article>
                            <div class="title">Software Development</div>
                            <p>Designing and implementing tools and integrations that automate work flows – security-related or not.</p>
                            <details>
                                <summary>Examples</summary>
                                <p>Setting up flows between detection systems and ticketing systems, writing tools that collect and present up-to-date data from various sources on the Internet.</p>
                            </details>
                        </article>
                    </div>
                </altshift-box>
            </section>

            <section class="details-table-section">
                <h2>Security Engineering</h2>

                <services-details-table>
                    <services-details-table-row slot="row">
                        <div slot="title">Posture Management</div>
                        <div slot="content">
                            <p>We can help you set up systems that provides broad visibility into what is occurring in an IT environment. These kinds of systems are fundamental to be able to detect threats and perform investigations of incidents.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Threat Detection</div>
                        <div slot="content">
                            <p>Once you have visibility, you want to be able to detect interesting events, including ones indicating threats. We can help you set up detections that will cover general threats, but also set up custom detections that are specific to your environment.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Penetration Testing</div>
                        <div slot="content">
                            <p>In addition to helping you build and set up solutions, we can help you test their security. We can perform penetration tests of APIs, web applications, and whole IT environments.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Processes</div>
                        <div slot="content">
                            <p>It is important to know what do to when incidents happen. Likewise, there should processes in place that enable seamless incident reporting and evaluation of alerts. We can help you define such processes.</p>
                        </div>
                    </services-details-table-row>
                </services-details-table>

                <h2>Investigations</h2>

                <services-details-table>
                    <services-details-table-row slot="row">
                        <div slot="title">Security Alerts</div>
                        <div slot="content">
                            <p>It is not uncommon for alerts to come in daily. We know how to assess and investigate many different types of alerts, and identify ones that need to be escalated.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Incident Response</div>
                        <div slot="content">
                            <p>How should a critical cybersecurity incident be approached? We have experience with many such incidents and help you first identify the breadth of the incident then perform containment, remediation, and root-cause analysis activities.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Unauthorized Activity</div>
                        <div slot="content">
                            <p>By means of log analysis and forensics, we can help you investigate suspected unauthorized activity.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Leaks</div>
                        <div slot="content">
                            <p>Has sensitive information leaked from you company? There could be traces left that point to a certain source. We can help you find and investigate such traces.</p>
                        </div>
                    </services-details-table-row>
                </services-details-table>


                <h2>Software Development</h2>

                <services-details-table>
                    <services-details-table-row slot="row">
                        <div slot="title">Tools</div>
                        <div slot="content">
                            <p>Do you have ideas about things you want to achieve programmatically? We may be able to help you in developing tools realizing those ideas. We are familiar with a variety of programming languages and environments.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Integrations</div>
                        <div slot="content">
                            <p>Do you have different systems that need to share information? By utilizing APIs, we can help you develop and implement integrations that will enable information to flow between systems.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Front-end and Back-end</div>
                        <div slot="content">
                            <p>Alt-Shift loves back-end, but we also know front-end, as this self-developed website with a full score on Lighthouse testifies to.</p>
                            <p>We can provide expertise in Go, TypeScript/JavaScript, Python, Bash, various scripting languages – you name it.</p>
                        </div>
                    </services-details-table-row>
                    <services-details-table-row slot="row">
                        <div slot="title">Automation</div>
                        <div slot="content">
                            <p>Have you identified routine tasks that you would like automated? We can help you with by writing software performing those tasks.</p>
                        </div>
                    </services-details-table-row>
                </services-details-table>
            </section>
        `;
    }
}
