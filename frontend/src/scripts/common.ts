import {css} from "lit";

export const textStyles = css`
    h1 {
        margin: 0;
        font-weight: 900;
        font-size: 15.625em;
        text-transform: lowercase;

        /* Crop the leading the font reserves above/below the glyphs so the
           heading's box hugs the letters. Progressive enhancement: unsupported
           browsers (currently Firefox) simply keep the default leading. */
        text-box-trim: trim-both;
        text-box-edge: cap alphabetic;

        @media screen and (max-width: 1280px) {
            font-size: 5.2083em;
        }
    }

    h2 {
        font-weight: 900;
        font-size: 2.5em;
    }

    p {
        font-size: 1.125rem;
        font-weight: 400;
        line-height: 2.125rem;
    }
`;