import { Progress } from "reactstrap";

function ProgressItem({
  label,
  value,
  color,
}: {
  readonly label: string;
  readonly value: number;
  readonly color: string;
}) {
  return (
    <>
      <label className={`text-lg font-bold`} style={{ color }}>
        {label}
      </label>
      <Progress
        striped
        color={color}
        value={value === 0 ? 5 : value}
        min={1}
        max={100}
      >
        {`${value}%`}
      </Progress>
    </>
  );
}

export default ProgressItem;
