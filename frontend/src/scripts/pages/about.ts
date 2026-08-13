import {css, unsafeCSS, CSSResultGroup, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"

import "@altshiftab/web_components/box";
import "@altshiftab/web_components/button";

import {textStyles} from "../lib/common";
import meImage from "../../images/me.avif"
import config from "../../../../config.json";

@customElement("about-box")
class AboutBox extends LitElement {
    static styles = css`
        altshift-box {
            --offset-top: 1rem;
            --offset-left: 1.25rem;

            > .container {
                width: 100%;
                aspect-ratio: 2;
                display: flex;

                @media screen and (max-width: 1280px) {
                    display: block;
                }

                > .image-container {
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;

                    background-image: var(--image);
                    background-size: contain;
                    background-repeat: round;

                    border-right: var(--border-width) solid var(--border-color);
                    aspect-ratio: 1 / 1;

                    @media screen and (max-width: 1280px) {
                        box-sizing: content-box;
                        border-bottom: var(--border-width) solid var(--border-color);
                        width: 100%;
                    }

                    > .buttons-container {
                        display: flex;
                        margin-top: auto;
                    }
                }

                > .text-container {
                    box-sizing: border-box;
                    aspect-ratio: 1 / 1;
                    padding: 4rem;
                    overflow-y: auto;

                    @media screen and (max-width: 1280px) {
                        padding: 2rem;
                        width: 100%;
                    }
                }
            }
        }

        ::slotted(altshift-box[slot="button"]) {
            border-top: var(--border-width) solid var(--border-color);
            border-right: var(--border-width) solid var(--border-color);
        }
    `;

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="image-container">
                        <div class="buttons-container"><slot name="button"></slot></div>
                    </div>
                    <div class="text-container">
                        <slot name="text"></slot>
                    </div>
                </div>
            </altshift-box>
        `;
    }
}

@customElement("content-about")
export default class ContentAbout extends LitElement {
    static styles = [
        textStyles,
        css`
            :host {
                > .text-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 50%;

                    @media screen and (max-width: 1280px) {
                        width: 100%;
                    }

                    > altshift-button {
                        width: fit-content;
                    }
                }

                > #about-viktor > about-box {
                    --image: url(${unsafeCSS(meImage)});

                    > altshift-box[slot="button"] {
                        background-color: var(--altshift-main-color);

                        &:not([selectable]) {
                            &::part(box-container) {
                                &:hover, &:focus-visible {
                                    color: var(--altshift-opposite-text-color);
                                }

                                @media screen and (max-width: 1280px) {
                                    padding: 0.5rem 1.2rem;
                                    font-size: 0.675rem;
                                }
                            }

                            &:hover, &:focus-visible {
                                background-color: var(--altshift-opposite-main-color);
                                --text-color: var(--altshift-opposite-text-color);
                            }
                        }

                        > * {
                            display: block;
                            @media screen and (max-width: 1280px) {
                                padding: 0.5rem 1.2rem;
                                font-size: 0.675rem;
                            }
                        }
                    }
                }
            }
        `
    ] as CSSResultGroup;

    render() {
        return html`
            <h1>About us</h1>

            <section class="text-section">
                <div class="text-container">
                    <h2>Level up your digital security</h2>
                    <p>Alt-Shift offers consulting services that help you level up your digital security, including protecting you from attacks, investigating unauthorized activity, and designing and implementing customized technical solutions.</p>
                    <p>Alt-Shift was founded in Stockholm, Sweden in 2022 by Viktor Persson.</p>
                </div>
                <altshift-button>
                    <a href="${config.routes.contact}">Contact us</a>
                </altshift-button>
            </section>

            <section id="about-viktor" class="about-viktor-section">
                <h2>About Viktor</h2>
                <about-box>
                    <altshift-box contracted unbordered textBox slot="button">Viktor</altshift-box>
                    <altshift-box contracted unbordered textBox selectable slot="button">
                        <a href="https://www.linkedin.com/in/viktor-persson/">LinkedIn</a>
                    </altshift-box>
                    <altshift-box contracted unbordered textBox selectable slot="button">
                        <a href="https://github.com/vphpersson" target="_blank">GitHub</a>
                    </altshift-box>
                    <div slot="text">
                        <p>Hello!</p>
                        <p>Currently, Alt-Shift is just me, Viktor. I founded Alt-Shift in 2022, after I had worked with larger consulting companies for several years and wanted to have more of a decision about the types of projects to work on.</p>
                        <p>My two greatest interests are cybersecurity and programming; cybersecurity because of the ingenuity involved, and programming because it gives me great satisfaction to architect and implement solutions and see them solve real problems.</p>
                        <p>Aside from engaging in either of my two greatest interests, you might in my spare time find me pulling off Caro-Kann openings or contemplating prehistory at the gym.</p>
                    </div>
                </about-box>
            </section>
        `;
    }
}
