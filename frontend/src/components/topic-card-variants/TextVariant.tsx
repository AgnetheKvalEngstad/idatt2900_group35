import { Typography } from "@mui/material";

/**
 * A React functional component that renders a text variant card.
 *
 * This component displays a title and text
 * using Material-UI's `Typography` component.
 *
 * @returns The rendered text variant card component.
 */
export default function TextVariant() {
  return (
    <>
      <Typography variant="h5" className="text-center pb-4">
        Eksempel på tittel
      </Typography>
      <Typography variant="body1" className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
      <br />
      <Typography variant="body1" className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </>
  );
}
