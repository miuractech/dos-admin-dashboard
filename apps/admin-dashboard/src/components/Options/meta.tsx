import {
  selectedSideNavItem$,
  SideNavItemObject,
} from '../../components/main/shared';

export const Meta = () => {
  const Element = SideNavItemObject[selectedSideNavItem$.value].mainComponent;

  return (
    <div>
      <Element />
    </div>
  );
};
