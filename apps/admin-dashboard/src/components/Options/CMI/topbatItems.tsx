import { topbarProps } from "../components/topbar";

export const CMITopbarObject: topbarProps = {
    FONT: {
        value: 'Font',
        mainComponent: () => <>ProductFamily</>,
    },
    ART: {
        value: 'Art',
        mainComponent: () => <>'ProductFamily'</>,
    },
};
