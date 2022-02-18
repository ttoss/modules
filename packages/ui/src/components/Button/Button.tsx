import { Button as ButtonUi } from '@theme-ui/components';

import type { ButtonProps } from '@theme-ui/components';

export type { ButtonProps };

const Button = (props: ButtonProps) => {
  return (
    <ButtonUi
      {...props}
      sx={{ cursor: 'pointer', fontFamily: 'body', ...props.sx }}
    />
  );
};

export default Button;
