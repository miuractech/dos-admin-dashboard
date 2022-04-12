import React from 'react'
import ProductType from '../main/meta/product-type'
import {
    selectedSideNavItem$,
    SideNavItemObject,
    sideNavToggled$,
} from '../../components/main/shared';

export const Meta = () => {

    const Element = SideNavItemObject[selectedSideNavItem$.value].mainComponent;

    return (
        <div>
            <ProductType />
            <Element />
        </div>
    )
}
