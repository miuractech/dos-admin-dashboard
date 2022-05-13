import { topbarProps } from "../components/topbar";
import { Art } from "./arts";
import { Fonts } from "./fonts/fonts";

export const CMITopbarObject: topbarProps = {
    font: {
        value: 'Font',
        mainComponent: Fonts
    },
    art: {
        value: 'Art',
        mainComponent: Art
    }
};
