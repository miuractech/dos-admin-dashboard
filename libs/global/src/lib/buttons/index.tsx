import React from 'react';
import {
  BehaviorSubject,
  fromEvent,
  interval,
  map,
  Observable,
  tap,
} from 'rxjs';
import { useSubject } from 'rxf-rewrite/dist';

import styles from './buttons.module.scss';

interface IButton {
  variant:
    | 'edit'
    | 'cancel'
    | 'disable'
    | 'enable'
    | 'default'
    | 'default-not-padding';
  clickAction: () => void;
  dimension?: {
    height: string;
    width: string;
  };
  disabled?: boolean;
}

const buttonObject: { [key: string]: string } = {
  edit: styles['edit'],
  cancel: styles['cancel'],
  disable: styles['disable'],
  default: styles['default'],
  enable: styles['enable'],
  'default-not-padding': styles['default-not-padding'],
};

const ApplicationButton: React.FC<IButton> = ({
  children,
  variant,
  clickAction,
  dimension,
  disabled,
}) => {
  const position$ = React.useMemo(
    () => new BehaviorSubject({ top: 0, left: 0 }),
    []
  );
  const styleRipple$ = React.useMemo(() => new BehaviorSubject(''), []);
  const styleObject = dimension !== undefined ? dimension : {};
  const buttonEl = React.useRef<HTMLButtonElement>(null);
  const position = useSubject(position$);
  const styleRipple = useSubject(styleRipple$);

  React.useEffect(() => {
    if (buttonEl.current !== null) {
      const click$ = fromEvent(
        buttonEl.current,
        'click'
      ) as Observable<PointerEvent>;
      const sub = click$
        .pipe(
          map((val) => {
            position$.next({ top: val.clientY, left: val.clientX });
            styleRipple$.next(styles['ripple']);
            return [val];
          })
        )
        .subscribe();
      return () => sub.unsubscribe();
    } else {
      return () => {
        return;
      };
    }
  }, [buttonEl, position$, styleRipple$]);

  function handleClick(event: React.MouseEvent) {
    clickAction();
  }

  return (
    <button
      style={styleObject}
      onClick={handleClick}
      className={buttonObject[variant]}
      disabled={disabled}
      ref={buttonEl}
    >
      <span
        style={{ left: position.left, top: position.top, position: 'absolute' }}
        className={styleRipple}
      ></span>
      {children}
    </button>
  );
};

export default ApplicationButton;
