import { color, Flex, FlexProps, useBreakpointIndex } from '@ttoss/ui';

export type AuthContainerProps = FlexProps & { backgroundImageUrl?: string };

export const AuthContainer = ({
  sx,
  backgroundImageUrl,
  ...props
}: AuthContainerProps) => {
  const index = useBreakpointIndex();

  return (
    <Flex
      {...props}
      sx={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundImage: (t: any) =>
          backgroundImageUrl && index !== 0
            ? `url("${backgroundImageUrl}")`
            : `linear-gradient(
            to right top,
            ${color.alpha('primary', 0.5)(t)},
            ${color.alpha('secondary', 0.5)(t)}
          )`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        ...sx,
      }}
    />
  );
};
