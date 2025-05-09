import {
  LinearProgress,
  Typography,
  styled,
  linearProgressClasses,
} from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 10,
  border: `2px solid black`,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: "#3B2E8F",
  },
}));

/**
 * A React component that renders a progress bar.
 *
 * @param {number} value The progress value (0-100) to be displayed in the progress bar.
 *
 * @returns The rendered progress bar component.
 */
export default function ProgressBar({ value }: { value: number }) {
  return (
    <>
      <BorderLinearProgress variant="determinate" value={value} />
      <Typography variant="body2" className="text-center mt-1">
        Progresjon: {value}%
      </Typography>
    </>
  );
}
