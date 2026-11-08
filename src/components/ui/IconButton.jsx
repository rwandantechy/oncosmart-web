import Icon from "../Icon";

export default function IconButton({
  name,
  label,
  onClick,
  disabled,
  className = "icon-action",
  type = "button",
  showLabel = false,
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={showLabel ? undefined : label}
      title={label}
    >
      <Icon name={name} />
      {showLabel ? label : null}
    </button>
  );
}
