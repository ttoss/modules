import { color, Flex, FlexProps } from '@ttoss/ui';

export type AuthContainerProps = FlexProps;

export const AuthContainer = ({ sx, ...props }: AuthContainerProps) => {
  return (
    <Flex
      {...props}
      sx={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundImage: (t: any) => `
          linear-gradient(
            to right top,
            ${color.alpha('primary', 0.5)(t)},
            ${color.alpha('secondary', 0.5)(t)}
          )
        `,
        ...sx,
      }}
    />
  );
};
